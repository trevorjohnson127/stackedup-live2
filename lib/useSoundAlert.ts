
// lib/useSoundAlert.ts

import { useEffect } from 'react';

export default function useSoundAlert(trigger: boolean) {
  useEffect(() => {
    if (trigger) {
      const audio = new Audio('/alert.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, [trigger]);
}
