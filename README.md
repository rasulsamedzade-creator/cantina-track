# CantinaTrack — Winery OS

Winery inventory, client, and invoice management prototype.

## Quick Start with Docker

```bash
docker-compose up --build
```

Then open **http://localhost:5173** in your browser.

## Quick Start without Docker

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## What's Inside

- **Dashboard** — KPIs, alerts, recent activity
- **Batches** — Wine lot tracking with QR codes, ship to clients
- **Transactions** — Full audit trail of all bottle movements
- **Harvest Log** — Track from grape to bottle
- **Clients** — CRM with profiles, EU/export flags, order history
- **Reorder Reminders** — Auto-calculated follow-up alerts
- **Invoices** — Auto-generated on shipment, printable preview
- **Analytics** — Revenue, inventory, client, and geography charts

## Notes

- This is a frontend prototype — data resets on page refresh
- All seed data is included for demo purposes
