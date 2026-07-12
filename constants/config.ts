export const Collections = {
  USERS: 'users',
  VOICE_AGENTS: 'voiceAgents',
  CALL_LOGS: 'callLogs',
} as const;

export const AppConfig = {
  appName: 'Voice AI Factory',
  appSlug: 'voice-ai-factory',
  bundleId: 'com.apex.voiceaifactory',
  version: '1.0.0',
  sentryDsn: process.env.SENTRY_DSN ?? '',
} as const;
