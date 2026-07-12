# Voice AI Factory — Agent Instructions

## App Purpose
Voice AI Factory is a no-code platform for creating, deploying, and managing AI voice agents.
Users create agents via a 4-step wizard, configure voice/personality, deploy to a phone number,
and monitor usage via dashboard.

## Key Architecture Decisions
- Firestore collection: `voiceAgents/{agentId}` stores all agent configs
- Phone number is mock `+1 (555) 000-APEX` for MVP (real Twilio integration in v2)
- Usage stats are hardcoded mock data (real metering in v2)
- Deploy screen shows static "Deployed" status (real infra in v2)

## Screens
- (tabs)/index — Dashboard with active agents + quick stats
- (tabs)/create — 4-step wizard (name → voice → greeting → phone)
- (tabs)/deploy — Deployment status + test call
- (tabs)/usage — Usage stats + call reasons + daily chart
- (tabs)/profile — Account info + sign out
- (auth)/sign-in, sign-up — Firebase Auth

## When adding features
- New voice agent fields → update types/index.ts VoiceAgent interface + firestore.ts saveVoiceAgent
- New screens → add to app/(tabs)/ and register in app/(tabs)/_layout.tsx
- Follow Colors from constants/colors.ts (dark mode, blue/purple theme)
