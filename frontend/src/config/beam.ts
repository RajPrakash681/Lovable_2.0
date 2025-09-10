console.log('Environment variables:', {
  VITE_BEAM_WS_URL: import.meta.env.VITE_BEAM_WS_URL,
  VITE_BEAM_TOKEN: import.meta.env.VITE_BEAM_TOKEN ? 'Set (hidden)' : 'Not set'
});

export const BEAM_CONFIG = {
  WS_URL: import.meta.env.VITE_BEAM_WS_URL,
  TOKEN: import.meta.env.VITE_BEAM_TOKEN,
} as const;