import type { TrackPayload } from '../types';
import { APPS_SCRIPT_URL } from '../constants';

export async function trackAnswer(payload: TrackPayload): Promise<void> {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        app: 'escape-pitagores',
      }),
    });
  } catch (err) {
    // Silently fail — tracking is non-critical
    console.warn('[trackAnswer] failed:', err);
  }
}

export async function validateEmail(email: string): Promise<{ valid: boolean; name: string }> {
  try {
    const url = `${APPS_SCRIPT_URL}?action=validate&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) return { valid: false, name: '' };
    const data = await res.json() as { authorized: boolean; name?: string };
    return { valid: data.authorized, name: data.name ?? '' };
  } catch {
    // If network fails, allow entry (fallback mode)
    return { valid: true, name: email.split('@')[0] };
  }
}
