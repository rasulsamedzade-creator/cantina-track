# CantinaTrack — Project Context

## What this is
A winery management SaaS prototype called CantinaTrack. Frontend-only React app (single file: src/App.jsx) deployed on Vercel with localStorage persistence.

## Tech stack
- React 18 + Vite
- No external UI libraries — all custom CSS in a GlobalStyle component
- Deployed via Vercel, connected to GitHub for auto-deploy
- Docker setup available for local dev

## Architecture
Everything lives in src/App.jsx (~1300 lines). Components:
- Dashboard, Inventory, Transactions, Harvest, Clients, ClientProfile, Reminders, Invoices, Analytics
- Modal components: AddBatchModal, AddClientModal, AddHarvestModal, LogTransactionModal, InvoiceModal
- Chart components: BarChart, LineChart, DonutChart, HBar
- Helper functions at the top for formatting, color mapping, etc.

## Data model
All state is in the App component and passed down as props:
- batches: wine lots with id, wine name, vintage, type, qty, location, status
- clients: CRM records with contact info, pricing tier, reorder interval
- transactions: audit trail of all bottle movements (in/out/write-off/move)
- invoices: auto-generated when shipping to a client
- harvests: grape-to-bottle production tracking

## Two modes
- "Demo" mode: preloaded with seed data for demonstrations
- "My Winery" mode: blank workspace for real use
Each has separate localStorage. Toggle is in the sidebar.

## Key business logic
- Shipping bottles: decreases batch qty, creates transaction, auto-generates invoice, updates client stats
- Invoices: priced by client tier (Standard €12, Premium €22, Wholesale €8, Export €10)
- Reorder reminders: auto-calculated from days since last order vs client's reorder interval
- EU vs Export: auto-detected from client country, affects VAT notes on invoices

## What's next
- Eventually needs a real backend (Node.js + PostgreSQL) for shared multi-user data
- Potential features: order portal, email notifications, staff permissions, demand forecasting
