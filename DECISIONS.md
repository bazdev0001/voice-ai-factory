# DECISIONS.md — Voice AI Factory

## Current State (Phase 2 Start)
- Only DESIGN.md existed, ~10% complete
- No source files, no package.json, no build tooling

## Technical Decisions

### Framework
- **React Native + Expo SDK 57** — cross-platform mobile (iOS + Android), Expo managed workflow
- **expo-router** for file-based routing (auth group + tabs group)
- **TypeScript strict mode** — noImplicitAny, strictNullChecks

### Auth
- **Firebase Auth** (email/password) — simplest path to working auth
- Auth guard in `app/_layout.tsx` — redirects unauthenticated to sign-in, authenticated away from auth screens

### Data
- **Firebase Firestore** — `voiceAgents` collection, `callLogs` collection
- `saveVoiceAgent()` in `services/firestore.ts` persists wizard output
- Usage stats: **mock data** for MVP (real metering deferred to v2)

### Phone Numbers
- **Mock `+1 (555) 000-APEX`** for MVP — real Twilio/Vonage integration deferred to v2
- Deploy screen shows static "Deployed" status — real infra provisioning deferred

### Styling
- **Dark mode first** — background `#0f172a`, surface `#1e293b`
- **Blue/purple gradient accent** — primary `#7c3aed`, secondary `#3b82f6`
- All colors in `constants/colors.ts` — never hardcoded

### Testing
- **jest-expo** preset with `@testing-library/react-native`
- Button component test + useAuth hook test

### CI/CD
- **GitHub Actions** — TypeScript check + ESLint + Jest on push/PR
- **EAS** for builds (preview + production profiles configured)

## What Was Built (Phase 2)

### Screens (5 tabs + 2 auth)
1. Dashboard — quick stats, agent list, create CTA
2. Create AI — 4-step wizard (name → voice → greeting → phone number)
3. Deploy — deployment status, infrastructure health, test call modal
4. Usage — monthly stats, top call reasons, 7-day bar chart
5. Profile — account info, plan, sign out
6. Sign In / Sign Up — Firebase Auth forms

### Infrastructure
- Full TypeScript types in `types/index.ts`
- Firebase services (firebase.ts, auth.ts, firestore.ts)
- React hooks (useAuth, useFirestore)
- UI components (Button, Card, Input, LoadingScreen)
- jest.config.js, eslint.config.js, tsconfig.json
- eas.json, app.config.ts
- CI: .github/workflows/ci.yml
- Smoke test: .maestro/flows/smoke.yaml
- Pre-push hook: scripts/pre-push.sh

## EAS Build Status
- EAS build attempted: BLOCKED (requires EAS account login + paid plan for builds)
- Local TypeScript + ESLint + Jest checks: PASSING

## Open Decisions (v2)
- Real Twilio phone number provisioning
- Real voice synthesis integration (ElevenLabs, Google TTS)
- Real usage metering from call logs
- Sentry error monitoring (DSN configured via env var)
- Push notifications for call events
