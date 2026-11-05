# chrono-ui - Project Guidelines

## Package Manager Policy

- **Strict Requirement**: ALWAYS use `pnpm` exclusively.
- **Strictly Prohibited**: NEVER use `npm`, `npx`, or `yarn`.
- **Workspace Architecture**: This repository is a pnpm monorepo.
  - UI Library: `packages/ui` (`@chronosoft/ui`)
  - Design Tokens: `packages/tokens` (`@chronosoft/tokens`)
  - MCP Server: `packages/mcp` (`@chronosoft/mcp`)
  - Documentation & Showcase: `apps/docs`

