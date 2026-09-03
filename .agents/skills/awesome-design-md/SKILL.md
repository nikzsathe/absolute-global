---
name: awesome-design-md
description: >
  Provides access to a curated collection of DESIGN.md files from popular websites and applications.
  Enables AI agents to generate UI that matches specific design systems by providing ready-to-use
  design system documents in the Stitch DESIGN.md format.
argument-hint: "[website-name]"
license: MIT
---

# Awesome DESIGN.md Skill

This skill provides access to a curated collection of DESIGN.md files from popular websites and applications including AI platforms (Claude, OpenAI, Cohere), developer tools (Vercel, Warp, Cursor), fintech (Stripe, Revolut), e-commerce (Apple, Nike, Shopify), and many more.

## What is DESIGN.md?

DESIGN.md is a plain-text design system document that AI agents read to generate consistent UI. It's a new concept introduced by Google Stitch that defines how a project should look and feel, complementing AGENTS.md which tells coding agents how to build the project.

Each DESIGN.md file in this collection follows the Stitch DESIGN.md format with sections covering:
- Visual Theme & Atmosphere
- Color Palette & Roles  
- Typography Rules
- Component Stylings
- Layout Principles
- Depth & Elevation
- Do's and Don'ts
- Responsive Behavior
- Agent Prompt Guide

## Usage

When a user wants to generate UI matching a specific design system:
1. Identify the target website/application (e.g., "claude", "vercel", "stripe", "apple")
2. Use the skill to access the corresponding DESIGN.md file
3. Instruct the AI agent to use that DESIGN.md for UI generation

Example: "Build me a landing page that looks like Stripe" would trigger using the Stripe DESIGN.md from this collection.

## Available Design Systems

The collection includes DESIGN.md files for:
- **AI & LLM Platforms**: Claude, Cohere, ElevenLabs, Minimax, Mistral AI, Ollama, OpenCode AI, Replicate, Runway, Together AI, VoltAgent, xAI
- **Developer Tools & IDEs**: Cursor, Expo, Lovable, Raycast, Superhuman, Vercel, Warp
- **Backend, Database & DevOps**: ClickHouse, Composio, HashiCorp, MongoDB, PostHog, Sanity, Sentry, Supabase
- **Productivity & SaaS**: Cal.com, Intercom, Linear, Mintlify, Notion, Resend, Zapier
- **Design & Creative Tools**: Airtable, Clay, Figma, Framer, Miro, Webflow
- **Fintech & Crypto**: Binance, Coinbase, Kraken, Mastercard, Revolut, Stripe, Wise
- **E-commerce & Retail**: Airbnb, Meta, Nike, Shopify, Starbucks
- **Media & Consumer Tech**: Apple, HP, IBM, NVIDIA, Pinterest, PlayStation, SpaceX, Spotify, The Verge, Uber, Vodafone, WIRED
- **Automotive**: BMW, BMW M, Bugatti, Ferrari, Lamborghini, Renault, Tesla
- **Retro Web**: Dell (1996), Nintendo.com (2001)

## Integration

This skill works by providing access to the DESIGN.md files stored in the `.kilo/skills/awesome-design-md/design-md/` directory. Each DESIGN.md is organized by website name in subdirectories.

When invoked with a website name argument (e.g., `awesome-design-md stripe`), the skill will:
1. Locate the corresponding DESIGN.md file
2. Make its contents available to the AI agent for UI generation guidance
3. Provide context on how to apply the design system

## When to Use

Use this skill whenever:
- A user requests UI that should match a specific website or application's look and feel
- You need to generate consistent UI following an established design system
- The user mentions wanting to build something "that looks like [specific website]"
- Working on frontend development where visual consistency with a reference design is important

The skill complements coding skills by focusing specifically on the visual design aspect that AI agents need to generate pixel-perfect, on-brand interfaces.

## Note on File Availability

Due to runtime constraints, the full collection of DESIGN.md files may not be immediately available in this environment. However, the skill structure is in place and can be populated as needed. When a specific DESIGN.md is requested, it can be fetched from the GitHub repository at https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/