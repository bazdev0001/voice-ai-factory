# Voice AI Factory — Product Design Document

**Tagline:** "Build, deploy, and manage AI voice agents — no code required."

---

## Problem It Solves

Businesses want AI voice agents (phone bots, IVR replacements, outbound callers) but building them requires deep Twilio + LLM + STT/TTS integration expertise. Voice AI Factory is a no-code/low-code platform where users define an agent's personality, knowledge base, and call flow via a visual interface, then get a live phone number in minutes. It productises the infrastructure Barry already built for `voice-assistance-app` and `voice-assistance-lawoffice`.

---

## Target User

- Small business owners who want a 24/7 AI receptionist (law, medical, real estate, home services)
- Marketing teams needing outbound voice campaigns
- Developers who want a headless API to embed voice agents in their own products
- Barry's Apex studio — this is the platform layer that all vertical voice apps are built on

---

## Core Features

- **Agent builder (no-code)** — visual form: set name, persona, greeting, knowledge docs, fallback behaviour
- **Flow designer** — drag-and-drop call flow (greet → gather intent → route → action → hangup)
- **Knowledge base upload** — attach PDFs, URLs, or plain-text docs; agent answers from them
- **Phone number provisioning** — buy/assign a Twilio number with one click; instantly live
- **Outbound campaign manager** — upload CSV of contacts, set script template, schedule call batch
- **Call logs & recordings** — full transcripts, recordings, sentiment score per call
- **Live call monitoring** — supervisor view: see active calls, whisper to agent, barge in
- **Multi-tenant** — each business has isolated agents, numbers, and billing

---

## Tech Stack

- **Backend:** Node.js / Fastify (REST API + Twilio webhooks)
- **Voice infra:** Retell AI (already integrated in existing voice apps) for STT/TTS/LLM orchestration
- **LLM:** Claude (agent responses, intent detection, knowledge retrieval)
- **Frontend:** Next.js + React (agent builder dashboard)
- **Database:** PostgreSQL (tenants, agents, call logs)
- **File storage:** AWS S3 or Cloudflare R2 (recordings, knowledge base docs)
- **Queue:** BullMQ + Redis (outbound call scheduling)
- **Auth:** NextAuth.js (Google + email magic link)
- **Payments:** Stripe (usage-based: per minute + per agent seat)
- **Deployment:** Railway or Fly.io

---

## Key Screens / Pages

- **Dashboard (home)** — stats: calls today, active agents, total minutes used
- **Agents list** — cards for each agent with status (live/draft), calls today, quick-edit
- **Agent Builder** — tabbed form: Identity | Knowledge | Call Flow | Phone Number | Test
- **Flow Designer** — drag-and-drop node canvas (powered by React Flow)
- **Phone Numbers** — list of provisioned numbers; buy/release; assign to agent
- **Outbound Campaigns** — create campaign, upload contacts CSV, set schedule
- **Call Logs** — searchable table: date, caller ID, agent, duration, transcript, recording
- **Analytics** — charts: call volume, avg duration, top intents, satisfaction scores
- **Billing** — current plan, usage meter, invoice history
- **Settings** — team members, API keys, webhooks

---

## Data Models

### Tenant
```
id, name (str), plan (enum: starter/pro/enterprise), stripe_customer_id (str),
created_at (ts), monthly_minutes_used (int)
```

### Agent
```
id, tenant_id, name (str), persona_prompt (text), greeting (str),
status (enum: draft/live/paused), retell_agent_id (str),
phone_number (str), created_at (ts), updated_at (ts)
```

### KnowledgeDoc
```
id, agent_id, filename (str), source_url (str), content_text (text),
embedding_status (enum: pending/done/failed), created_at (ts)
```

### CallLog
```
id, agent_id, call_sid (str), direction (enum: inbound/outbound),
caller_number (str), duration_sec (int), transcript (text),
recording_url (str), sentiment (enum: positive/neutral/negative),
started_at (ts), ended_at (ts)
```

---

## MVP Scope

### v1 (MVP)
- Single-tenant (one account, Barry's use)
- Agent builder: persona, greeting, knowledge base (text paste only)
- Retell AI integration: inbound calls on a Twilio number
- Call log with transcripts
- Deploy to Railway

### v2 (Post-MVP)
- Multi-tenant with auth and billing (Stripe)
- Visual flow designer
- Outbound campaigns with CSV upload
- Knowledge base from PDF/URL with RAG
- Live call monitoring / supervisor view
- Analytics dashboard
- Public API for developers

---

## Estimated Complexity

**Large (L)** — Multi-tenant SaaS with telephony, real-time call handling, and a visual builder is high complexity. De-risk by building on Retell AI (handles STT/TTS/LLM orchestration) and starting single-tenant.
