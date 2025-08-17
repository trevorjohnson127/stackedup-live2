import type { NextApiRequest, NextApiResponse } from 'next';

const REPO = process.env.GITHUB_REPO!;      // "owner/repo"
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN!;
const COMMITTER_NAME = process.env.GITHUB_COMMITTER_NAME || 'StackedUp Bot';
const COMMITTER_EMAIL = process.env.GITHUB_COMMITTER_EMAIL || 'bot@stackedup.live';
const DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_URL;

function isAuthorized(req: NextApiRequest) {
  const raw =
    (req.headers.authorization as string | undefined) ??
    (req.headers['x-bridge-secret'] as string | undefined) ??
    '';
  const token = raw.trim();
  return (
    token === process.env.BRIDGE_SECRET ||
    token === `Bearer ${process.env.BRIDGE_SECRET}`
  );
}

type FileSpec = { path: string; content: string; message?: string };

async function getFileSha(path: string) {
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' }
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`getFileSha failed: ${r.status} ${await r.text()}`);
  const j = await r.json();
  return j.sha as string;
}

async function putFile({ path, content, message }: FileSpec, globalMessage?: string) {
  const sha = await getFileSha(path);
  const body = {
    message: message || globalMessage || `chore: update ${path}`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: BRANCH,
    committer: { name: COMMITTER_NAME, email: COMMITTER_EMAIL },
    ...(sha ? { sha } : {})
  };
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`putFile(${path}) failed: ${r.status} ${await r.text()}`);
  return r.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthorized(req)) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const { message, files } = req.body as { message?: string; files?: FileSpec[] };
  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ ok: false, error: 'files[] required' });
  }

  try {
    for (const f of files) {
      if (!f.path || typeof f.content !== 'string') {
        return res.status(400).json({ ok: false, error: 'each file needs path + content' });
      }
    }
    for (const f of files) await putFile(f, message);
    if (DEPLOY_HOOK) await fetch(DEPLOY_HOOK, { method: 'POST' }).catch(() => {});
    res.json({ ok: true, committed: files.map(f => f.path), branch: BRANCH });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
