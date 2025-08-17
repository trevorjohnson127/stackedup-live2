import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient';

interface ChecksheetResponse {
  id: string;
  user_id: string;
  timestamp: string;
  period: 'Pre-Market' | 'Midday' | 'Final 15' | 'Post-Market';
  question: string;
  answer: string;
  score: number;
  notes: string | null;
}

export function useDailyChecksheetSync(userId: string, period: string) {
  const [responses, setResponses] = useState<ChecksheetResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResponses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('daily_checksheet_responses')
      .select('*')
      .eq('user_id', userId)
      .eq('period', period)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching checksheet responses:', error);
    } else {
      setResponses(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userId && period) {
      fetchResponses();
    }
  }, [userId, period]);

  const submitResponse = async (
    question: string,
    answer: string,
    score: number,
    notes?: string
  ) => {
    await supabase.from('daily_checksheet_responses').insert([
      {
        user_id: userId,
        period,
        question,
        answer,
        score,
        notes,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return {
    responses,
    loading,
    submitResponse,
  };
}


