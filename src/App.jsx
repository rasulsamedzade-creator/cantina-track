import { useState, useEffect } from "react";

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0e0c09; --surface: #181410; --card: #1f1a14; --border: #2e2820;
      --gold: #c9a84c; --gold-dim: #7a6230; --cream: #e8dfc8; --muted: #6b5f4a;
      --red-wine: #7b2d3e; --green: #3a6b4a; --danger: #8b3a3a;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-mono: 'DM Mono', monospace;
    }
    body { background: var(--bg); color: var(--cream); font-family: var(--font-serif); min-height: 100vh; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }
    .app { display: flex; min-height: 100vh; }

    /* Sidebar */
    .sidebar { width: 230px; min-width: 230px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 28px 0 20px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
    .sidebar-logo { padding: 0 22px 28px; border-bottom: 1px solid var(--border); }
    .sidebar-logo h1 { font-size: 1.45rem; font-weight: 300; letter-spacing: .08em; color: var(--gold); line-height: 1.2; }
    .sidebar-logo span { font-size: .65rem; font-family: var(--font-mono); color: var(--muted); letter-spacing: .2em; text-transform: uppercase; }
    .nav { padding: 20px 10px; display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .nav-section { font-family: var(--font-mono); font-size: .52rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); padding: 12px 12px 4px; opacity: .5; }
    .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; cursor: pointer; font-size: .92rem; font-weight: 300; color: var(--muted); transition: all .15s; border: none; background: none; width: 100%; text-align: left; font-family: var(--font-serif); }
    .nav-item:hover { color: var(--cream); background: var(--card); }
    .nav-item.active { color: var(--gold); background: rgba(201,168,76,.08); }
    .nav-item .icon { font-size: .95rem; width: 18px; text-align: center; }
    .nav-badge { margin-left: auto; background: var(--danger); color: #fff; font-family: var(--font-mono); font-size: .55rem; border-radius: 10px; padding: 2px 6px; }
    .sidebar-footer { padding: 14px 22px; border-top: 1px solid var(--border); font-family: var(--font-mono); font-size: .6rem; color: var(--muted); letter-spacing: .1em; }

    /* Mode toggle */
    .mode-toggle { margin: 0 14px 8px; background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 4px; display: flex; gap: 0; }
    .mode-btn { flex: 1; padding: 7px 6px; border: none; background: none; color: var(--muted); font-family: var(--font-mono); font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; border-radius: 5px; transition: all .15s; text-align: center; }
    .mode-btn:hover { color: var(--cream); }
    .mode-btn.active { background: var(--gold); color: var(--bg); font-weight: 400; }
    .mode-label { font-family: var(--font-mono); font-size: .5rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); text-align: center; margin: 0 14px 6px; opacity: .5; }

    /* Main */
    .main { flex: 1; padding: 36px 44px; overflow-y: auto; max-width: calc(100vw - 230px); }
    .page-header { margin-bottom: 32px; display: flex; align-items: flex-end; justify-content: space-between; }
    .page-header-left h2 { font-size: 2rem; font-weight: 300; letter-spacing: .04em; color: var(--cream); line-height: 1; }
    .page-header-left p { font-size: .8rem; font-family: var(--font-mono); color: var(--muted); margin-top: 5px; letter-spacing: .08em; }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 36px; }
    .stats-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 36px; }
    .stats-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 36px; }
    .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 18px 22px; position: relative; overflow: hidden; }
    .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--gold); opacity: .35; }
    .stat-card.red::before { background: var(--red-wine); opacity: .8; }
    .stat-card.green::before { background: var(--green); opacity: .8; }
    .stat-card.danger::before { background: var(--danger); opacity: .8; }
    .stat-card.gold::before { background: var(--gold); opacity: .9; }
    .stat-label { font-family: var(--font-mono); font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .stat-value { font-size: 1.9rem; font-weight: 300; color: var(--cream); line-height: 1; }
    .stat-sub { font-family: var(--font-mono); font-size: .6rem; color: var(--muted); margin-top: 5px; }

    /* Section title */
    .section-title { font-size: 1.05rem; font-weight: 400; letter-spacing: .06em; color: var(--gold); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }

    /* Table */
    .table-wrap { background: var(--card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { border-bottom: 1px solid var(--border); background: var(--surface); }
    th { padding: 11px 18px; text-align: left; font-family: var(--font-mono); font-size: .6rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); font-weight: 400; }
    td { padding: 13px 18px; font-size: .92rem; font-weight: 300; color: var(--cream); border-bottom: 1px solid var(--border); }
    tr:last-child td { border-bottom: none; }
    tbody tr:hover { background: rgba(255,255,255,.02); }
    tbody tr.clickable { cursor: pointer; }

    /* Badges */
    .badge { display: inline-block; padding: 3px 9px; border-radius: 20px; font-family: var(--font-mono); font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; }
    .badge-red { background: rgba(123,45,62,.3); color: #d4788a; border: 1px solid rgba(123,45,62,.5); }
    .badge-white { background: rgba(200,185,150,.15); color: #d4c89a; border: 1px solid rgba(200,185,150,.3); }
    .badge-rose { background: rgba(180,100,120,.2); color: #e0a0b0; border: 1px solid rgba(180,100,120,.4); }
    .badge-sparkling { background: rgba(201,168,76,.15); color: var(--gold); border: 1px solid rgba(201,168,76,.3); }
    .badge-ok { background: rgba(58,107,74,.25); color: #7ec494; border: 1px solid rgba(58,107,74,.4); }
    .badge-low { background: rgba(139,58,58,.25); color: #e08080; border: 1px solid rgba(139,58,58,.4); }
    .badge-aging { background: rgba(201,168,76,.15); color: var(--gold); border: 1px solid rgba(201,168,76,.3); }
    .badge-restaurant { background: rgba(80,60,130,.25); color: #a090d0; border: 1px solid rgba(80,60,130,.4); }
    .badge-distributor { background: rgba(60,100,140,.25); color: #80b0d4; border: 1px solid rgba(60,100,140,.4); }
    .badge-retailer { background: rgba(100,80,40,.25); color: #c4a060; border: 1px solid rgba(100,80,40,.4); }
    .badge-private { background: rgba(80,100,60,.25); color: #a0c480; border: 1px solid rgba(80,100,60,.4); }
    .badge-active { background: rgba(58,107,74,.25); color: #7ec494; border: 1px solid rgba(58,107,74,.4); }
    .badge-inactive { background: rgba(80,70,60,.2); color: var(--muted); border: 1px solid var(--border); }
    .badge-overdue { background: rgba(139,58,58,.25); color: #e08080; border: 1px solid rgba(139,58,58,.4); }
    .badge-paid { background: rgba(58,107,74,.25); color: #7ec494; border: 1px solid rgba(58,107,74,.4); }
    .badge-pending { background: rgba(201,168,76,.15); color: var(--gold); border: 1px solid rgba(201,168,76,.3); }
    .badge-draft { background: rgba(80,70,60,.2); color: var(--muted); border: 1px solid var(--border); }
    .badge-harvest { background: rgba(80,120,60,.2); color: #a0c480; border: 1px solid rgba(80,120,60,.35); }
    .badge-ferment { background: rgba(120,80,40,.2); color: #c4a060; border: 1px solid rgba(120,80,40,.35); }
    .badge-aging-h { background: rgba(60,80,120,.2); color: #80a0d0; border: 1px solid rgba(60,80,120,.35); }
    .badge-bottled { background: rgba(58,107,74,.25); color: #7ec494; border: 1px solid rgba(58,107,74,.4); }

    /* Buttons */
    .btn { padding: 8px 18px; border-radius: 6px; font-family: var(--font-mono); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: all .15s; border: none; }
    .btn-gold { background: var(--gold); color: var(--bg); font-weight: 400; }
    .btn-gold:hover { background: #d4b060; }
    .btn-outline { background: transparent; color: var(--gold); border: 1px solid var(--gold-dim); }
    .btn-outline:hover { border-color: var(--gold); background: rgba(201,168,76,.07); }
    .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
    .btn-ghost:hover { color: var(--cream); border-color: var(--muted); }
    .btn-green { background: rgba(58,107,74,.4); color: #7ec494; border: 1px solid rgba(58,107,74,.5); }
    .btn-green:hover { background: rgba(58,107,74,.6); }
    .btn-sm { padding: 5px 11px; font-size: .58rem; }

    /* Modal */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.8); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
    .modal { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 30px; width: 540px; max-width: 95vw; max-height: 90vh; overflow-y: auto; }
    .modal-wide { width: 680px; }
    .modal h3 { font-size: 1.35rem; font-weight: 300; letter-spacing: .06em; color: var(--gold); margin-bottom: 22px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-family: var(--font-mono); font-size: .6rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 7px; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 9px 13px; color: var(--cream); font-family: var(--font-serif); font-size: .92rem; outline: none; transition: border-color .15s; }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--gold-dim); }
    .form-group select option { background: var(--surface); }
    .form-group textarea { resize: vertical; min-height: 70px; line-height: 1.5; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
    .form-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 13px; }
    .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border); }

    /* TX items */
    .tx-item { display: flex; align-items: center; gap: 13px; padding: 11px 18px; border-bottom: 1px solid var(--border); }
    .tx-item:last-child { border-bottom: none; }
    .tx-icon { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .85rem; flex-shrink: 0; }
    .tx-in { background: rgba(58,107,74,.25); } .tx-out { background: rgba(139,58,58,.2); }
    .tx-write { background: rgba(100,80,30,.25); } .tx-move { background: rgba(60,80,120,.25); }
    .tx-info { flex: 1; }
    .tx-title { font-size: .88rem; font-weight: 300; }
    .tx-meta { font-family: var(--font-mono); font-size: .58rem; color: var(--muted); margin-top: 3px; letter-spacing: .05em; }
    .tx-qty { font-family: var(--font-mono); font-size: .82rem; text-align: right; white-space: nowrap; }
    .tx-qty.pos { color: #7ec494; } .tx-qty.neg { color: #e08080; }

    /* Client cards */
    .clients-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
    .client-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 18px; cursor: pointer; transition: border-color .15s; }
    .client-card:hover { border-color: var(--gold-dim); }
    .client-avatar { width: 38px; height: 38px; border-radius: 7px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--gold); font-family: var(--font-serif); flex-shrink: 0; }
    .client-name { font-size: .98rem; font-weight: 400; margin-bottom: 2px; }
    .client-country { font-family: var(--font-mono); font-size: .6rem; color: var(--muted); }
    .client-stats { display: flex; gap: 14px; margin-top: 13px; padding-top: 13px; border-top: 1px solid var(--border); }
    .client-stat-label { font-family: var(--font-mono); font-size: .52rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
    .client-stat-value { font-family: var(--font-mono); font-size: .85rem; color: var(--cream); }

    /* Profile */
    .profile-back { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); cursor: pointer; margin-bottom: 24px; background: none; border: none; transition: color .15s; }
    .profile-back:hover { color: var(--gold); }
    .profile-avatar { width: 60px; height: 60px; border-radius: 11px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--gold); font-family: var(--font-serif); flex-shrink: 0; }

    /* Locations */
    .loc-bar-wrap { background: var(--surface); border-radius: 3px; height: 5px; margin-bottom: 7px; overflow: hidden; }
    .loc-bar { height: 100%; background: linear-gradient(90deg, var(--gold-dim), var(--gold)); border-radius: 3px; }
    .loc-counts { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: .58rem; color: var(--muted); }

    /* Search */
    .search-bar { display: flex; gap: 11px; margin-bottom: 18px; }
    .search-bar input { flex: 1; background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 9px 15px; color: var(--cream); font-family: var(--font-serif); font-size: .92rem; outline: none; }
    .search-bar input:focus { border-color: var(--gold-dim); }
    .search-bar input::placeholder { color: var(--muted); }

    /* Alert */
    .alert { background: rgba(139,58,58,.15); border: 1px solid rgba(139,58,58,.4); border-radius: 6px; padding: 11px 15px; margin-bottom: 18px; font-family: var(--font-mono); font-size: .68rem; color: #e08080; letter-spacing: .05em; }
    .alert-gold { background: rgba(201,168,76,.08); border: 1px solid rgba(201,168,76,.25); color: var(--gold); }

    /* Info box */
    .info-box { background: var(--surface); border-radius: 6px; padding: 11px 15px; margin-bottom: 18px; font-family: var(--font-mono); font-size: .68rem; color: var(--muted); letter-spacing: .06em; }
    .info-box span { color: var(--cream); }

    /* Flags */
    .eu-flag { display: inline-block; background: rgba(60,80,160,.25); border: 1px solid rgba(60,80,160,.4); border-radius: 3px; padding: 2px 7px; font-family: var(--font-mono); font-size: .55rem; color: #8898e0; letter-spacing: .08em; margin-left: 7px; }
    .export-flag { display: inline-block; background: rgba(160,120,40,.2); border: 1px solid rgba(160,120,40,.4); border-radius: 3px; padding: 2px 7px; font-family: var(--font-mono); font-size: .55rem; color: #c4a060; letter-spacing: .08em; margin-left: 7px; }

    /* Misc */
    .empty { text-align: center; padding: 44px 24px; color: var(--muted); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .1em; }
    .text-muted { color: var(--muted); font-family: var(--font-mono); font-size: .78rem; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
    .divider { height: 1px; background: var(--border); margin: 24px 0; }
    .reorder-dot { width: 7px; height: 7px; border-radius: 50%; background: #e08080; display: inline-block; margin-right: 6px; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.35} }

    /* QR */
    .qr-box { width: 50px; height: 50px; background: white; border-radius: 3px; display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; padding: 4px; flex-shrink: 0; }
    .qr-cell { background: #000; border-radius: 1px; }
    .qr-cell.w { background: #fff; }

    /* ── ANALYTICS ── */
    .chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 22px 24px; margin-bottom: 24px; }
    .chart-card h4 { font-family: var(--font-mono); font-size: .62rem; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
    .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
    .bar-fill { width: 100%; border-radius: 3px 3px 0 0; transition: height .4s; min-height: 2px; }
    .bar-label { font-family: var(--font-mono); font-size: .55rem; color: var(--muted); text-align: center; white-space: nowrap; }
    .bar-val { font-family: var(--font-mono); font-size: .6rem; color: var(--cream); }
    .line-chart { position: relative; height: 140px; }
    .line-svg { width: 100%; height: 100%; overflow: visible; }
    .donut-wrap { display: flex; align-items: center; gap: 28px; }
    .donut-svg { flex-shrink: 0; }
    .donut-legend { display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .legend-item { display: flex; align-items: center; gap: 10px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .legend-label { font-family: var(--font-mono); font-size: .62rem; color: var(--muted); flex: 1; }
    .legend-val { font-family: var(--font-mono); font-size: .68rem; color: var(--cream); }
    .hbar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
    .hbar-name { font-size: .88rem; width: 160px; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .hbar-track { flex: 1; height: 6px; background: var(--surface); border-radius: 3px; overflow: hidden; }
    .hbar-fill { height: 100%; border-radius: 3px; }
    .hbar-val { font-family: var(--font-mono); font-size: .62rem; color: var(--muted); width: 60px; text-align: right; flex-shrink: 0; }
    .kpi-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 24px; }
    .kpi-card { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 14px 18px; }
    .kpi-label { font-family: var(--font-mono); font-size: .55rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
    .kpi-value { font-size: 1.5rem; font-weight: 300; color: var(--cream); line-height: 1; }
    .kpi-change { font-family: var(--font-mono); font-size: .58rem; margin-top: 4px; }
    .kpi-up { color: #7ec494; } .kpi-down { color: #e08080; }
    .analytics-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1px solid var(--border); }
    .atab { padding: 9px 18px; font-family: var(--font-mono); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; background: none; border-top: none; border-left: none; border-right: none; transition: all .15s; }
    .atab:hover { color: var(--cream); }
    .atab.active { color: var(--gold); border-bottom-color: var(--gold); }

    /* ── INVOICE MODAL ── */
    .invoice-preview { background: #fff; color: #1a1a1a; border-radius: 8px; padding: 36px; font-family: Georgia, serif; }
    .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #1a1a1a; }
    .inv-winery-name { font-size: 1.5rem; font-weight: 700; letter-spacing: .04em; color: #1a1a1a; }
    .inv-winery-sub { font-size: .75rem; color: #666; margin-top: 3px; font-family: monospace; }
    .inv-number { text-align: right; }
    .inv-number .num { font-size: 1.1rem; font-weight: 700; color: #1a1a1a; font-family: monospace; }
    .inv-number .dt { font-size: .72rem; color: #666; font-family: monospace; margin-top: 3px; }
    .inv-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .inv-party-label { font-size: .65rem; font-family: monospace; letter-spacing: .12em; text-transform: uppercase; color: #999; margin-bottom: 6px; }
    .inv-party-name { font-size: 1rem; font-weight: 700; margin-bottom: 3px; }
    .inv-party-detail { font-size: .82rem; color: #444; line-height: 1.6; font-family: monospace; }
    .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .inv-table th { padding: 8px 12px; text-align: left; font-size: .65rem; font-family: monospace; letter-spacing: .1em; text-transform: uppercase; background: #f4f4f4; border-bottom: 1px solid #ddd; color: #666; }
    .inv-table td { padding: 10px 12px; font-size: .85rem; border-bottom: 1px solid #eee; }
    .inv-total-row { display: flex; justify-content: flex-end; gap: 32px; margin-top: 16px; padding-top: 16px; border-top: 2px solid #1a1a1a; }
    .inv-total-label { font-size: .8rem; color: #666; font-family: monospace; }
    .inv-total-value { font-size: 1.1rem; font-weight: 700; text-align: right; }
    .inv-vat-note { font-size: .7rem; font-family: monospace; color: #999; margin-top: 10px; text-align: right; }
    .inv-footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: .7rem; color: #999; font-family: monospace; }

    /* ── HARVEST ── */
    .harvest-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 28px; }
    .harvest-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 18px; cursor: pointer; transition: border-color .15s; }
    .harvest-card:hover { border-color: var(--gold-dim); }
    .harvest-card h4 { font-size: 1rem; font-weight: 400; margin-bottom: 4px; }
    .harvest-card .hc-sub { font-family: var(--font-mono); font-size: .6rem; color: var(--muted); margin-bottom: 12px; }
    .hc-stages { display: flex; gap: 4px; margin-bottom: 12px; }
    .hc-stage { flex: 1; height: 4px; border-radius: 2px; background: var(--surface); }
    .hc-stage.done { background: var(--gold); }
    .hc-stage.active { background: var(--gold); opacity: .5; animation: pulse 2s infinite; }
    .hc-row { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: .6rem; color: var(--muted); padding: 4px 0; border-bottom: 1px solid var(--border); }
    .hc-row:last-child { border-bottom: none; }
    .hc-row span:last-child { color: var(--cream); }

    /* Reorder page */
    .reminder-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 18px 20px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px; }
    .reminder-card.urgent { border-color: rgba(139,58,58,.5); background: rgba(139,58,58,.05); }
    .reminder-card.warning { border-color: rgba(201,168,76,.3); background: rgba(201,168,76,.03); }
    .reminder-urgency { width: 8px; min-width: 8px; height: 8px; border-radius: 50%; }
    .urgency-red { background: #e08080; animation: pulse 1.5s infinite; }
    .urgency-gold { background: var(--gold); }
    .urgency-green { background: #7ec494; }
    .reminder-info { flex: 1; }
    .reminder-client { font-size: 1rem; font-weight: 400; margin-bottom: 3px; }
    .reminder-detail { font-family: var(--font-mono); font-size: .6rem; color: var(--muted); letter-spacing: .05em; }
    .reminder-days { font-family: var(--font-mono); font-size: 1.1rem; text-align: right; white-space: nowrap; }
  `}</style>
);

// ── Constants & Seed Data ─────────────────────────────────────────────────────
const EU_COUNTRIES = ["France","Italy","Germany","Spain","Portugal","Belgium","Netherlands","Austria","Greece","Czech Republic","Poland","Sweden","Denmark"];
const LOCATIONS = [
  { name: "Main Cellar", capacity: 8000, used: 3200, temp: "14°C", humidity: "72%" },
  { name: "Cold Room", capacity: 3000, used: 1850, temp: "10°C", humidity: "68%" },
  { name: "Warehouse A", capacity: 10000, used: 3700, temp: "17°C", humidity: "65%" },
];
const PRICE_TIERS = { Standard: 12, Premium: 22, Wholesale: 8, Export: 10 };

const SEED_CLIENTS = [
  { id:"CLI-001", name:"Maison Dubois", country:"France", city:"Lyon", type:"Restaurant", contact:"Pierre Dubois", email:"pierre@maisondubois.fr", phone:"+33 4 72 00 11 22", status:"Active", totalBottles:960, lastOrder:"2024-02-02", pricingTier:"Premium", reorderIntervalDays:42, notes:"Prefers aged reds. Orders every 6 weeks." },
  { id:"CLI-002", name:"Wine Direct GmbH", country:"Germany", city:"Munich", type:"Distributor", contact:"Klaus Weber", email:"k.weber@winedirect.de", phone:"+49 89 123 456", status:"Active", totalBottles:2400, lastOrder:"2024-01-22", pricingTier:"Wholesale", reorderIntervalDays:90, notes:"Largest EU account. Quarterly bulk orders." },
  { id:"CLI-003", name:"The Cellar London", country:"United Kingdom", city:"London", type:"Retailer", contact:"James Hartley", email:"james@thecellar.co.uk", phone:"+44 20 7123 4567", status:"Active", totalBottles:480, lastOrder:"2024-01-15", pricingTier:"Standard", reorderIntervalDays:60, notes:"Specialty retail. Focuses on limited editions." },
  { id:"CLI-004", name:"Osteria del Vino", country:"Italy", city:"Florence", type:"Restaurant", contact:"Giulia Ricci", email:"giulia@osteriavino.it", phone:"+39 055 123 456", status:"Overdue", totalBottles:240, lastOrder:"2023-11-20", pricingTier:"Standard", reorderIntervalDays:45, notes:"Overdue — last contact 3 months ago." },
  { id:"CLI-005", name:"Dr. Hoffmann", country:"Austria", city:"Vienna", type:"Private", contact:"Dr. Hans Hoffmann", email:"h.hoffmann@gmail.com", phone:"+43 1 234 5678", status:"Active", totalBottles:120, lastOrder:"2024-01-30", pricingTier:"Premium", reorderIntervalDays:120, notes:"Private collector. Buys single cases of best vintages." },
  { id:"CLI-006", name:"Vino Americano LLC", country:"United States", city:"New York", type:"Distributor", contact:"Sarah Mitchell", email:"smitchell@vinoam.com", phone:"+1 212 555 0199", status:"Active", totalBottles:1200, lastOrder:"2024-01-28", pricingTier:"Export", reorderIntervalDays:90, notes:"US importer. Requires TTB compliance docs." },
];

const SEED_BATCHES = [
  { id:"LOT-2022-RES-01", wine:"Riserva Sangiovese", vintage:2022, type:"Red", grapes:"Sangiovese 100%", plot:"East Hill", qty:2400, location:"Main Cellar", status:"Aging", bottled:"2023-03-15" },
  { id:"LOT-2023-CHARD-01", wine:"Chardonnay Classico", vintage:2023, type:"White", grapes:"Chardonnay 100%", plot:"North Block", qty:1850, location:"Cold Room", status:"Ready", bottled:"2023-11-20" },
  { id:"LOT-2022-BRUT-01", wine:"Brut Nature", vintage:2022, type:"Sparkling", grapes:"Pinot Noir / Chardonnay", plot:"Valley Floor", qty:620, location:"Main Cellar", status:"Low Stock", bottled:"2023-06-01" },
  { id:"LOT-2023-ROSE-01", wine:"Rosé Provençal", vintage:2023, type:"Rosé", grapes:"Grenache 80% / Cinsault 20%", plot:"South Slope", qty:3100, location:"Warehouse A", status:"Ready", bottled:"2024-01-10" },
  { id:"LOT-2021-CAB-01", wine:"Cabernet Reserve", vintage:2021, type:"Red", grapes:"Cabernet Sauvignon 95%", plot:"West Ridge", qty:180, location:"Main Cellar", status:"Low Stock", bottled:"2022-09-05" },
];

const SEED_TRANSACTIONS = [
  { id:1, type:"in", batch:"LOT-2023-ROSE-01", wine:"Rosé Provençal", qty:3100, date:"2024-01-10", note:"Initial bottling", clientId:null, clientName:null, user:"Marco R.", invoiceId:null },
  { id:2, type:"out", batch:"LOT-2023-CHARD-01", wine:"Chardonnay Classico", qty:-240, date:"2024-01-18", note:"Regular order", clientId:"CLI-001", clientName:"Maison Dubois", user:"Sofia B.", invoiceId:"INV-2024-001" },
  { id:3, type:"out", batch:"LOT-2022-BRUT-01", wine:"Brut Nature", qty:-120, date:"2024-01-22", note:"Quarterly bulk", clientId:"CLI-002", clientName:"Wine Direct GmbH", user:"Marco R.", invoiceId:"INV-2024-002" },
  { id:4, type:"write", batch:"LOT-2021-CAB-01", wine:"Cabernet Reserve", qty:-18, date:"2024-01-25", note:"Breakage + tasting", clientId:null, clientName:null, user:"Elena K.", invoiceId:null },
  { id:5, type:"move", batch:"LOT-2022-RES-01", wine:"Riserva Sangiovese", qty:0, date:"2024-01-28", note:"Moved 400 cases → Warehouse A", clientId:null, clientName:null, user:"Marco R.", invoiceId:null },
  { id:6, type:"out", batch:"LOT-2023-ROSE-01", wine:"Rosé Provençal", qty:-600, date:"2024-02-02", note:"UK spring allocation", clientId:"CLI-003", clientName:"The Cellar London", user:"Sofia B.", invoiceId:"INV-2024-003" },
];

const SEED_INVOICES = [
  { id:"INV-2024-001", txId:2, clientId:"CLI-001", clientName:"Maison Dubois", wine:"Chardonnay Classico", qty:240, unitPrice:22, date:"2024-01-18", dueDate:"2024-02-18", status:"Paid", vatNote:"EU Intra-community — VAT reverse charge applies" },
  { id:"INV-2024-002", txId:3, clientId:"CLI-002", clientName:"Wine Direct GmbH", wine:"Brut Nature", qty:120, unitPrice:8, date:"2024-01-22", dueDate:"2024-02-22", status:"Paid", vatNote:"EU Intra-community — VAT reverse charge applies" },
  { id:"INV-2024-003", txId:6, clientId:"CLI-003", clientName:"The Cellar London", wine:"Rosé Provençal", qty:600, unitPrice:12, date:"2024-02-02", dueDate:"2024-03-02", status:"Pending", vatNote:"Export — standard VAT, verify UK trade agreement" },
];

const SEED_HARVESTS = [
  { id:"HARV-2023-SAN", grape:"Sangiovese", plot:"East Hill", vintage:2023, harvestDate:"2023-09-28", kgHarvested:12400, brixAtHarvest:24.2, ph:3.41, fermentStart:"2023-10-02", fermentEnd:"2023-10-18", agingStart:"2023-10-22", agingVessel:"French Oak 225L x12", expectedBottling:"2024-09-01", expectedBottles:16500, stage:"Aging", notes:"Excellent vintage. Low yield but very concentrated." },
  { id:"HARV-2023-CHARD", grape:"Chardonnay", plot:"North Block", vintage:2023, harvestDate:"2023-08-20", kgHarvested:8200, brixAtHarvest:22.8, ph:3.28, fermentStart:"2023-08-22", fermentEnd:"2023-09-05", agingStart:"2023-09-08", agingVessel:"Stainless Steel Tank", expectedBottling:"2023-11-15", expectedBottles:10900, stage:"Bottled", notes:"Clean and crisp. Early harvest for freshness." },
  { id:"HARV-2024-CAB", grape:"Cabernet Sauvignon", plot:"West Ridge", vintage:2024, harvestDate:"2024-10-10", kgHarvested:9800, brixAtHarvest:25.1, ph:3.55, fermentStart:"2024-10-14", fermentEnd:null, agingStart:null, agingVessel:"French Oak 500L x8", expectedBottling:"2026-04-01", expectedBottles:13000, stage:"Fermenting", notes:"Very promising. High tannin structure expected." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const isEU = c => EU_COUNTRIES.includes(c);
const initials = n => n.split(" ").map(w=>w[0]).slice(0,2).join("");
const daysSince = d => Math.floor((new Date()-new Date(d))/86400000);
const fmtMoney = v => `€${v.toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const typeColor = t => ({Red:"badge-red",White:"badge-white","Rosé":"badge-rose",Sparkling:"badge-sparkling"})[t]||"badge-white";
const statusColor = s => ({Ready:"badge-ok","Low Stock":"badge-low",Aging:"badge-aging"})[s]||"badge-white";
const clientTypeColor = t => ({Restaurant:"badge-restaurant",Distributor:"badge-distributor",Retailer:"badge-retailer",Private:"badge-private"})[t]||"badge-white";
const clientStatusColor = s => ({Active:"badge-active",Inactive:"badge-inactive",Overdue:"badge-overdue"})[s]||"badge-white";
const txIcon = t => ({in:{cls:"tx-in",icon:"↓"},out:{cls:"tx-out",icon:"↑"},write:{cls:"tx-write",icon:"✕"},move:{cls:"tx-move",icon:"⇄"}})[t]||{cls:"tx-move",icon:"⇄"};
const invoiceStatusColor = s => ({Paid:"badge-paid",Pending:"badge-pending",Draft:"badge-draft"})[s]||"badge-draft";
const harvestStageColor = s => ({Harvest:"badge-harvest",Fermenting:"badge-ferment",Aging:"badge-aging-h",Bottled:"badge-bottled"})[s]||"badge-white";
const stageIndex = s => ({Harvest:0,Fermenting:1,Aging:2,Bottled:3})[s]??-1;
function qrCells(str){let h=0;for(let i=0;i<str.length;i++)h=((h<<5)-h+str.charCodeAt(i))|0;return Array.from({length:16},(_,i)=>((h>>i)&1)===0);}
function QRBox({id}){const c=qrCells(id);return <div className="qr-box">{c.map((w,i)=><div key={i} className={`qr-cell${w?" w":""}`}/>)}</div>;}

function computeReminders(clients) {
  return clients.map(c => {
    const days = daysSince(c.lastOrder);
    const overdueDays = days - c.reorderIntervalDays;
    const pct = Math.min(days / c.reorderIntervalDays, 2);
    let urgency = "green", label = "On track";
    if (overdueDays > 14) { urgency = "red"; label = `${overdueDays}d overdue`; }
    else if (overdueDays > 0) { urgency = "gold"; label = `${overdueDays}d overdue`; }
    else if (pct > 0.8) { urgency = "gold"; label = `Due in ${c.reorderIntervalDays - days}d`; }
    return { ...c, daysSince: days, overdueDays, urgency, label, pct };
  }).sort((a,b)=>b.overdueDays-a.overdueDays);
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ batches, transactions, clients, invoices, harvests, onNav }) {
  const totalBottles = batches.reduce((s,b)=>s+b.qty,0);
  const lowStock = batches.filter(b=>b.qty<300).length;
  const overdueClients = clients.filter(c=>c.status==="Overdue").length;
  const recentOut = transactions.filter(t=>t.type==="out").reduce((s,t)=>s+Math.abs(t.qty),0);
  const pendingInvoicesAmt = invoices.filter(i=>i.status==="Pending").reduce((s,i)=>s+i.qty*i.unitPrice,0);

  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Cantina Overview</h2><p>DASHBOARD — {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}).toUpperCase()}</p></div></div>
      {(lowStock>0||overdueClients>0) && <div className="alert">{lowStock>0&&`⚠ ${lowStock} batch${lowStock>1?"es":""} below minimum stock.`}{lowStock>0&&overdueClients>0&&"  ·  "}{overdueClients>0&&`⚠ ${overdueClients} client${overdueClients>1?"s":""} overdue for reorder.`}</div>}
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total Bottles</div><div className="stat-value">{totalBottles.toLocaleString()}</div><div className="stat-sub">{batches.length} active lots</div></div>
        <div className="stat-card green"><div className="stat-label">Active Clients</div><div className="stat-value">{clients.filter(c=>c.status!=="Inactive").length}</div><div className="stat-sub">{clients.length} total accounts</div></div>
        <div className="stat-card gold"><div className="stat-label">Pending Revenue</div><div className="stat-value" style={{fontSize:"1.4rem",marginTop:4}}>{fmtMoney(pendingInvoicesAmt)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Pending").length} open invoices</div></div>
        <div className="stat-card danger"><div className="stat-label">Alerts</div><div className="stat-value">{lowStock+overdueClients}</div><div className="stat-sub">stock + client</div></div>
      </div>
      <div className="two-col">
        <div>
          <div className="section-title">Recent Transactions</div>
          <div className="table-wrap">
            {transactions.slice(0,5).map(tx=>{
              const {cls,icon}=txIcon(tx.type);
              return <div className="tx-item" key={tx.id}><div className={`tx-icon ${cls}`}>{icon}</div><div className="tx-info"><div className="tx-title">{tx.wine}{tx.clientName&&<span className="text-muted"> → {tx.clientName}</span>}</div><div className="tx-meta">{tx.batch} · {tx.date}</div></div>{tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty>0?"+":""}{tx.qty}</div>}</div>;
            })}
          </div>
          <div className="section-title">Recent Invoices <button className="btn btn-ghost btn-sm" onClick={()=>onNav("invoices")}>View All</button></div>
          <div className="table-wrap">
            {invoices.slice(0,4).map(inv=>(
              <div className="tx-item" key={inv.id}>
                <div className="tx-info"><div className="tx-title">{inv.clientName} <span className="text-muted">— {inv.wine}</span></div><div className="tx-meta">{inv.id} · {inv.qty} btl · Due {inv.dueDate}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><span className={`badge ${invoiceStatusColor(inv.status)}`}>{inv.status}</span><span style={{fontFamily:"var(--font-mono)",fontSize:".82rem"}}>{fmtMoney(inv.qty*inv.unitPrice)}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">Reorder Reminders <button className="btn btn-ghost btn-sm" onClick={()=>onNav("reminders")}>View All</button></div>
          {computeReminders(clients).slice(0,4).map(c=>(
            <div className={`reminder-card ${c.urgency==="red"?"urgent":c.urgency==="gold"?"warning":""}`} key={c.id}>
              <div className={`reminder-urgency urgency-${c.urgency}`}/>
              <div className="reminder-info"><div className="reminder-client">{c.name}</div><div className="reminder-detail">{c.label} · {c.daysSince}d since last order · {c.type}</div></div>
              <div className="reminder-days" style={{color:c.urgency==="red"?"#e08080":c.urgency==="gold"?"var(--gold)":"#7ec494"}}>{c.daysSince}d</div>
            </div>
          ))}
          <div className="section-title" style={{marginTop:8}}>Harvest Activity <button className="btn btn-ghost btn-sm" onClick={()=>onNav("harvest")}>View All</button></div>
          <div className="table-wrap">
            {harvests.length === 0 ? (
              <div className="empty" style={{padding:20}}>No harvests yet. Log your first harvest from Harvest Log.</div>
            ) : harvests.slice(0,3).map(h=>(
              <div className="tx-item" key={h.id}>
                <div className="tx-info"><div className="tx-title">{h.grape} <span className="text-muted">— {h.plot}</span></div><div className="tx-meta">{h.vintage} · Harvest {h.harvestDate} · {h.kgHarvested.toLocaleString()}kg</div></div>
                <span className={`badge ${harvestStageColor(h.stage)}`}>{h.stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Inventory ─────────────────────────────────────────────────────────────────
function Inventory({ batches, onAdd, onTransaction }) {
  const [search,setSearch]=useState(""); const [ft,setFt]=useState("All");
  const filtered=batches.filter(b=>(ft==="All"||b.type===ft)&&(b.wine.toLowerCase().includes(search.toLowerCase())||b.id.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Batch Inventory</h2><p>ALL LOTS — BOTTLE STOCK BY BATCH</p></div></div>
      <div className="search-bar">
        <input placeholder="Search by wine or lot ID…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <select style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6,padding:"9px 13px",color:"var(--cream)",fontFamily:"var(--font-serif)",fontSize:".92rem",outline:"none"}} value={ft} onChange={e=>setFt(e.target.value)}>
          {["All","Red","White","Rosé","Sparkling"].map(t=><option key={t}>{t}</option>)}
        </select>
        <button className="btn btn-gold" onClick={onAdd}>+ New Batch</button>
      </div>
      <div className="table-wrap">
        <table><thead><tr><th>Lot ID</th><th>Wine</th><th>Type</th><th>Vintage</th><th>Location</th><th>Bottles</th><th>Status</th><th>QR</th><th></th></tr></thead>
          <tbody>{filtered.length===0?<tr><td colSpan={9}><div className="empty">No batches found</div></td></tr>:filtered.map(b=>(
            <tr key={b.id}>
              <td><span style={{fontFamily:"var(--font-mono)",fontSize:".72rem",color:"var(--muted)"}}>{b.id}</span></td>
              <td><div>{b.wine}</div><div style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",marginTop:2}}>{b.grapes}</div></td>
              <td><span className={`badge ${typeColor(b.type)}`}>{b.type}</span></td>
              <td style={{fontFamily:"var(--font-mono)"}}>{b.vintage}</td>
              <td style={{fontSize:".85rem",color:"var(--muted)"}}>{b.location}</td>
              <td style={{fontFamily:"var(--font-mono)",fontSize:"1rem"}}>{b.qty.toLocaleString()}</td>
              <td><span className={`badge ${statusColor(b.status)}`}>{b.status}</span></td>
              <td><QRBox id={b.id}/></td>
              <td><button className="btn btn-ghost btn-sm" onClick={()=>onTransaction(b)}>Ship</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// ── Transactions ──────────────────────────────────────────────────────────────
function Transactions({ transactions }) {
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Transaction Log</h2><p>FULL AUDIT TRAIL</p></div></div>
      <div className="table-wrap">
        {transactions.map(tx=>{const {cls,icon}=txIcon(tx.type);return(
          <div className="tx-item" key={tx.id}>
            <div className={`tx-icon ${cls}`}>{icon}</div>
            <div className="tx-info"><div className="tx-title">{tx.wine}{tx.clientName&&<span style={{fontFamily:"var(--font-mono)",fontSize:".68rem",color:"var(--gold)"}}> → {tx.clientName}</span>}</div><div className="tx-meta">{tx.batch} · {tx.note} · {tx.user} · {tx.date}{tx.invoiceId&&<span style={{color:"var(--gold)"}}> · {tx.invoiceId}</span>}</div></div>
            {tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty>0?"+":""}{tx.qty}</div>}
          </div>
        );})}
      </div>
    </>
  );
}

// ── Invoices Page ─────────────────────────────────────────────────────────────
function Invoices({ invoices, clients, onMarkPaid, onView }) {
  const [search,setSearch]=useState("");
  const filtered=invoices.filter(i=>i.clientName.toLowerCase().includes(search.toLowerCase())||i.id.toLowerCase().includes(search.toLowerCase()));
  const totalRevenue=invoices.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.qty*i.unitPrice,0);
  const pendingAmt=invoices.filter(i=>i.status==="Pending").reduce((s,i)=>s+i.qty*i.unitPrice,0);
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Invoices</h2><p>BILLING — REVENUE TRACKING</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">Paid Revenue</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(totalRevenue)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Paid").length} invoices</div></div>
        <div className="stat-card gold"><div className="stat-label">Outstanding</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(pendingAmt)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Pending").length} pending</div></div>
        <div className="stat-card"><div className="stat-label">Total Invoiced</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(totalRevenue+pendingAmt)}</div><div className="stat-sub">all time</div></div>
      </div>
      <div className="search-bar"><input placeholder="Search by client or invoice number…" value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Invoice #</th><th>Client</th><th>Wine</th><th>Qty</th><th>Amount</th><th>Date</th><th>Due</th><th>Status</th><th></th></tr></thead>
          <tbody>{filtered.length===0?<tr><td colSpan={9}><div className="empty">No invoices found</div></td></tr>:filtered.map(inv=>(
            <tr key={inv.id}>
              <td><span style={{fontFamily:"var(--font-mono)",fontSize:".72rem",color:"var(--muted)"}}>{inv.id}</span></td>
              <td>{inv.clientName}</td>
              <td style={{fontSize:".85rem",color:"var(--muted)"}}>{inv.wine}</td>
              <td style={{fontFamily:"var(--font-mono)"}}>{inv.qty}</td>
              <td style={{fontFamily:"var(--font-mono)",color:"var(--cream)"}}>{fmtMoney(inv.qty*inv.unitPrice)}</td>
              <td style={{fontFamily:"var(--font-mono)",fontSize:".75rem",color:"var(--muted)"}}>{inv.date}</td>
              <td style={{fontFamily:"var(--font-mono)",fontSize:".75rem",color:inv.status==="Pending"&&daysSince(inv.dueDate)>0?"#e08080":"var(--muted)"}}>{inv.dueDate}</td>
              <td><span className={`badge ${invoiceStatusColor(inv.status)}`}>{inv.status}</span></td>
              <td style={{display:"flex",gap:6}}>
                <button className="btn btn-ghost btn-sm" onClick={()=>onView(inv)}>View</button>
                {inv.status==="Pending"&&<button className="btn btn-green btn-sm" onClick={()=>onMarkPaid(inv.id)}>Mark Paid</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// ── Invoice Preview Modal ─────────────────────────────────────────────────────
function InvoiceModal({ invoice, onClose }) {
  const subtotal=invoice.qty*invoice.unitPrice;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-wide">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{margin:0}}>{invoice.id}</h3>
          <div style={{display:"flex",gap:8}}><button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button></div>
        </div>
        <div className="invoice-preview">
          <div className="inv-header">
            <div><div className="inv-winery-name">CANTINA TRACK</div><div className="inv-winery-sub">Via della Vigna 14 · Siena, Italy · VAT IT12345678</div></div>
            <div className="inv-number"><div className="num">{invoice.id}</div><div className="dt">Issued: {invoice.date}</div><div className="dt">Due: {invoice.dueDate}</div></div>
          </div>
          <div className="inv-parties">
            <div><div className="inv-party-label">From</div><div className="inv-party-name">Cantina Track SRL</div><div className="inv-party-detail">Via della Vigna 14<br/>53100 Siena, Italy<br/>VAT: IT12345678</div></div>
            <div><div className="inv-party-label">To</div><div className="inv-party-name">{invoice.clientName}</div><div className="inv-party-detail">{invoice.vatNote}</div></div>
          </div>
          <table className="inv-table">
            <thead><tr><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr></thead>
            <tbody>
              <tr><td>{invoice.wine} — 750ml bottles</td><td>{invoice.qty} btl</td><td>{fmtMoney(invoice.unitPrice)}</td><td>{fmtMoney(invoice.qty*invoice.unitPrice)}</td></tr>
            </tbody>
          </table>
          <div className="inv-total-row">
            <div><div className="inv-total-label">Subtotal</div><div style={{fontFamily:"monospace",textAlign:"right"}}>{fmtMoney(subtotal)}</div></div>
            <div><div className="inv-total-label">VAT</div><div style={{fontFamily:"monospace",textAlign:"right",color:"#666"}}>See note</div></div>
            <div><div className="inv-total-label">Total Due</div><div className="inv-total-value">{fmtMoney(subtotal)}</div></div>
          </div>
          <div className="inv-vat-note">{invoice.vatNote}</div>
          <div className="inv-footer">Payment terms: 30 days · Bank: IBAN IT00 0000 0000 0000 0000 0000 · BIC: ITASITMM · Ref: {invoice.id}</div>
        </div>
      </div>
    </div>
  );
}

// ── Reorder Reminders ─────────────────────────────────────────────────────────
function Reminders({ clients }) {
  const reminders = computeReminders(clients);
  const overdue = reminders.filter(c=>c.urgency==="red");
  const warning = reminders.filter(c=>c.urgency==="gold");
  const ok = reminders.filter(c=>c.urgency==="green");

  const RCard = ({c}) => (
    <div className={`reminder-card ${c.urgency==="red"?"urgent":c.urgency==="gold"?"warning":""}`}>
      <div className={`reminder-urgency urgency-${c.urgency}`}/>
      <div className="reminder-info">
        <div className="reminder-client">{c.name} <span className={`badge ${clientTypeColor(c.type)}`} style={{fontSize:".52rem"}}>{c.type}</span></div>
        <div className="reminder-detail">{c.city}, {c.country} · Last order: {c.lastOrder} · Interval: every {c.reorderIntervalDays}d</div>
        <div className="reminder-detail" style={{marginTop:4,color:"var(--cream)"}}>{c.notes}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div className="reminder-days" style={{color:c.urgency==="red"?"#e08080":c.urgency==="gold"?"var(--gold)":"#7ec494"}}>{c.daysSince}d</div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:".6rem",color:"var(--muted)",marginTop:2}}>{c.label}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Reorder Reminders</h2><p>CLIENT FOLLOW-UP TRACKER</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card danger"><div className="stat-label">Overdue</div><div className="stat-value">{overdue.length}</div><div className="stat-sub">needs immediate follow-up</div></div>
        <div className="stat-card gold"><div className="stat-label">Due Soon</div><div className="stat-value">{warning.length}</div><div className="stat-sub">approaching reorder window</div></div>
        <div className="stat-card green"><div className="stat-label">On Track</div><div className="stat-value">{ok.length}</div><div className="stat-sub">no action needed</div></div>
      </div>
      {overdue.length>0&&<><div className="section-title" style={{color:"#e08080"}}>⚠ Overdue — Contact Now</div>{overdue.map(c=><RCard key={c.id} c={c}/>)}<div className="divider"/></>}
      {warning.length>0&&<><div className="section-title" style={{color:"var(--gold)"}}>Due Soon</div>{warning.map(c=><RCard key={c.id} c={c}/>)}<div className="divider"/></>}
      {ok.length>0&&<><div className="section-title">On Track</div>{ok.map(c=><RCard key={c.id} c={c}/>)}</>}
    </>
  );
}

// ── Harvest Tracking ──────────────────────────────────────────────────────────
function Harvest({ harvests, onAdd }) {
  const [selected,setSelected]=useState(null);
  if(selected) return <HarvestDetail harvest={selected} onBack={()=>setSelected(null)}/>;
  const totalKg=harvests.reduce((s,h)=>s+h.kgHarvested,0);
  const activeCount=harvests.filter(h=>h.stage!=="Bottled").length;
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Harvest & Production</h2><p>WINEMAKING LOGBOOK</p></div><button className="btn btn-gold" onClick={onAdd}>+ New Harvest</button></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">Active Productions</div><div className="stat-value">{activeCount}</div><div className="stat-sub">{harvests.length} total records</div></div>
        <div className="stat-card"><div className="stat-label">Total Kg Harvested</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{totalKg.toLocaleString()}</div><div className="stat-sub">this logbook</div></div>
        <div className="stat-card"><div className="stat-label">Expected Bottles</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{harvests.filter(h=>h.stage!=="Bottled").reduce((s,h)=>s+h.expectedBottles,0).toLocaleString()}</div><div className="stat-sub">in pipeline</div></div>
      </div>
      <div className="harvest-grid">
        {harvests.map(h=>{
          const si=stageIndex(h.stage);
          return (
            <div className="harvest-card" key={h.id} onClick={()=>setSelected(h)}>
              <h4>{h.grape} <span style={{fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--muted)"}}>{h.vintage}</span></h4>
              <div className="hc-sub">{h.plot} · Harvested {h.harvestDate}</div>
              <div className="hc-stages">
                {["Harvest","Ferment","Aging","Bottled"].map((s,i)=>(
                  <div key={s} className={`hc-stage ${i<si?"done":i===si?"active":""}`}/>
                ))}
              </div>
              <span className={`badge ${harvestStageColor(h.stage)}`} style={{marginBottom:10,display:"inline-block"}}>{h.stage}</span>
              <div className="hc-row"><span>Kg Harvested</span><span>{h.kgHarvested.toLocaleString()}</span></div>
              <div className="hc-row"><span>Brix at Harvest</span><span>{h.brixAtHarvest}°</span></div>
              <div className="hc-row"><span>pH</span><span>{h.ph}</span></div>
              <div className="hc-row"><span>Expected Bottles</span><span>{h.expectedBottles.toLocaleString()}</span></div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function HarvestDetail({ harvest:h, onBack }) {
  const si=stageIndex(h.stage);
  const stages=["Harvest","Fermenting","Aging","Bottled"];
  return (
    <>
      <button className="profile-back" onClick={onBack}>← Back to Harvest Log</button>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
        <div className="profile-avatar">🍇</div>
        <div>
          <h2 style={{fontSize:"1.8rem",fontWeight:300}}>{h.grape} {h.vintage}</h2>
          <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
            <span className={`badge ${harvestStageColor(h.stage)}`}>{h.stage}</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:".65rem",color:"var(--muted)",alignSelf:"center"}}>{h.plot}</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:28}}>
        {stages.map((s,i)=>(
          <div key={s} style={{flex:1,textAlign:"center"}}>
            <div style={{height:4,borderRadius:2,background:i<=si?"var(--gold)":"var(--border)",marginBottom:6,opacity:i===si?0.6:1}}/>
            <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:i===si?"var(--gold)":i<si?"var(--cream)":"var(--muted)",letterSpacing:".08em",textTransform:"uppercase"}}>{s}</span>
          </div>
        ))}
      </div>
      <div className="two-col">
        <div>
          <div className="section-title">Harvest Data</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[["Grape Variety",h.grape],["Vineyard Plot",h.plot],["Vintage",h.vintage],["Harvest Date",h.harvestDate],["Kg Harvested",h.kgHarvested.toLocaleString()+" kg"],["Brix at Harvest",h.brixAtHarvest+"°"],["pH",h.ph]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>{k}</span>
                <span style={{fontSize:".9rem"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">Production Timeline</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[["Fermentation Start",h.fermentStart||"—"],["Fermentation End",h.fermentEnd||"In progress"],["Aging Start",h.agingStart||"—"],["Aging Vessel",h.agingVessel],["Expected Bottling",h.expectedBottling],["Expected Bottles",h.expectedBottles.toLocaleString()]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>{k}</span>
                <span style={{fontSize:".9rem"}}>{v}</span>
              </div>
            ))}
          </div>
          {h.notes&&<div className="info-box" style={{marginTop:0}}>📝 <span>{h.notes}</span></div>}
        </div>
      </div>
    </>
  );
}

// ── Clients ───────────────────────────────────────────────────────────────────
function Clients({ clients, transactions, onAdd, onSelect }) {
  const [search,setSearch]=useState(""); const [ft,setFt]=useState("All");
  const filtered=clients.filter(c=>(ft==="All"||c.type===ft)&&(c.name.toLowerCase().includes(search.toLowerCase())||c.country.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>Clients</h2><p>ALL ACCOUNTS</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">Total Accounts</div><div className="stat-value">{clients.length}</div><div className="stat-sub">{clients.filter(c=>c.status==="Active").length} active</div></div>
        <div className="stat-card"><div className="stat-label">Total Bottles Shipped</div><div className="stat-value">{clients.reduce((s,c)=>s+c.totalBottles,0).toLocaleString()}</div><div className="stat-sub">lifetime</div></div>
        <div className="stat-card danger"><div className="stat-label">Overdue Reorders</div><div className="stat-value">{clients.filter(c=>c.status==="Overdue").length}</div><div className="stat-sub">need follow-up</div></div>
      </div>
      <div className="search-bar">
        <input placeholder="Search by name or country…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <select style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6,padding:"9px 13px",color:"var(--cream)",fontFamily:"var(--font-serif)",fontSize:".92rem",outline:"none"}} value={ft} onChange={e=>setFt(e.target.value)}>
          {["All","Restaurant","Distributor","Retailer","Private"].map(t=><option key={t}>{t}</option>)}
        </select>
        <button className="btn btn-gold" onClick={onAdd}>+ New Client</button>
      </div>
      <div className="clients-grid">
        {filtered.length===0?<div className="empty" style={{gridColumn:"1/-1"}}>No clients found</div>:filtered.map(c=>{
          const clientTx=transactions.filter(t=>t.clientId===c.id);
          return (
            <div className="client-card" key={c.id} onClick={()=>onSelect(c)}>
              <div style={{display:"flex",gap:11,alignItems:"flex-start",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
                  <div className="client-avatar">{initials(c.name)}</div>
                  <div><div className="client-name">{c.name}</div><div className="client-country">{c.city}, {c.country}{isEU(c.country)?<span className="eu-flag">EU</span>:<span className="export-flag">EXP</span>}</div></div>
                </div>
                <span className={`badge ${clientStatusColor(c.status)}`}>{c.status}</span>
              </div>
              <div style={{marginTop:10,display:"flex",gap:7}}><span className={`badge ${clientTypeColor(c.type)}`}>{c.type}</span><span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",alignSelf:"center"}}>{c.pricingTier}</span></div>
              <div className="client-stats">
                <div className="client-stat"><div className="client-stat-label">Shipped</div><div className="client-stat-value">{c.totalBottles.toLocaleString()}</div></div>
                <div className="client-stat"><div className="client-stat-label">Orders</div><div className="client-stat-value">{clientTx.length}</div></div>
                <div className="client-stat"><div className="client-stat-label">Last Order</div><div className="client-stat-value" style={{fontSize:".7rem"}}>{c.lastOrder}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ClientProfile({ client:c, transactions, onBack }) {
  const clientTx=transactions.filter(t=>t.clientId===c.id);
  const ds=daysSince(c.lastOrder);
  return (
    <>
      <button className="profile-back" onClick={onBack}>← Back to Clients</button>
      <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:28}}>
        <div className="profile-avatar">{initials(c.name)}</div>
        <div>
          <h2 style={{fontSize:"1.8rem",fontWeight:300}}>{c.name}</h2>
          <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap",alignItems:"center"}}>
            <span className={`badge ${clientTypeColor(c.type)}`}>{c.type}</span>
            <span className={`badge ${clientStatusColor(c.status)}`}>{c.status}</span>
            {isEU(c.country)?<span className="eu-flag">EU — Intra-community VAT</span>:<span className="export-flag">Export — Customs docs needed</span>}
          </div>
        </div>
      </div>
      {c.status==="Overdue"&&<div className="alert"><span className="reorder-dot"/>Last order was {ds} days ago — this client is overdue for follow-up.</div>}
      <div className="stats-grid">
        <div className="stat-card green"><div className="stat-label">Total Bottles</div><div className="stat-value">{c.totalBottles.toLocaleString()}</div><div className="stat-sub">lifetime shipped</div></div>
        <div className="stat-card"><div className="stat-label">Orders</div><div className="stat-value">{clientTx.length}</div><div className="stat-sub">transactions</div></div>
        <div className="stat-card"><div className="stat-label">Days Since Order</div><div className="stat-value">{ds}</div><div className="stat-sub">last: {c.lastOrder}</div></div>
        <div className="stat-card"><div className="stat-label">Pricing Tier</div><div className="stat-value" style={{fontSize:"1.1rem",marginTop:6}}>{c.pricingTier}</div><div className="stat-sub">{fmtMoney(PRICE_TIERS[c.pricingTier]||0)}/btl</div></div>
      </div>
      <div className="two-col">
        <div>
          <div className="section-title">Contact Details</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[["Contact",c.contact],["Email",c.email],["Phone",c.phone],["City",c.city],["Country",c.country],["VAT Regime",isEU(c.country)?"EU Intra-community":"Export / Third country"],["Reorder Interval",`Every ${c.reorderIntervalDays} days`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>{k}</span>
                <span style={{fontSize:".9rem"}}>{v}</span>
              </div>
            ))}
            {c.notes&&<div style={{marginTop:14,fontFamily:"var(--font-mono)",fontSize:".65rem",color:"var(--muted)",lineHeight:1.6}}>📝 {c.notes}</div>}
          </div>
        </div>
        <div>
          <div className="section-title">Order History</div>
          <div className="table-wrap">
            {clientTx.length===0?<div className="empty">No transactions yet</div>:clientTx.map(tx=>{const {cls,icon}=txIcon(tx.type);return(
              <div className="tx-item" key={tx.id}><div className={`tx-icon ${cls}`}>{icon}</div><div className="tx-info"><div className="tx-title">{tx.wine}</div><div className="tx-meta">{tx.batch} · {tx.note} · {tx.date}{tx.invoiceId&&<span style={{color:"var(--gold)"}}> · {tx.invoiceId}</span>}</div></div>{tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty>0?"+":""}{tx.qty}</div>}</div>
            );})}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Modals ────────────────────────────────────────────────────────────────────
function AddBatchModal({ onClose, onSave }) {
  const [form,setForm]=useState({wine:"",vintage:new Date().getFullYear(),type:"Red",grapes:"",plot:"",qty:"",location:"Main Cellar"});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.wine||!form.qty)return;const abbr=form.type==="Sparkling"?"BRUT":form.wine.split(" ").pop().toUpperCase().slice(0,5);const id=`LOT-${form.vintage}-${abbr}-${String(Math.floor(Math.random()*90+10)).padStart(2,"0")}`;onSave({...form,id,qty:parseInt(form.qty),vintage:parseInt(form.vintage),status:"Aging",bottled:new Date().toISOString().slice(0,10)});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>New Batch / Lot</h3><div className="form-group"><label>Wine Name</label><input placeholder="e.g. Riserva Sangiovese" value={form.wine} onChange={e=>set("wine",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>Vintage Year</label><input type="number" value={form.vintage} onChange={e=>set("vintage",e.target.value)}/></div><div className="form-group"><label>Type</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{["Red","White","Rosé","Sparkling"].map(t=><option key={t}>{t}</option>)}</select></div></div><div className="form-group"><label>Grape Varieties</label><input placeholder="e.g. Sangiovese 80%" value={form.grapes} onChange={e=>set("grapes",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>Vineyard Plot</label><input placeholder="e.g. East Hill" value={form.plot} onChange={e=>set("plot",e.target.value)}/></div><div className="form-group"><label>Bottles Filled</label><input type="number" placeholder="e.g. 2400" value={form.qty} onChange={e=>set("qty",e.target.value)}/></div></div><div className="form-group"><label>Storage Location</label><select value={form.location} onChange={e=>set("location",e.target.value)}>{LOCATIONS.map(l=><option key={l.name}>{l.name}</option>)}</select></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-gold" onClick={handleSave}>Create Batch</button></div></div></div>;
}

function AddClientModal({ onClose, onSave }) {
  const [form,setForm]=useState({name:"",country:"",city:"",type:"Restaurant",contact:"",email:"",phone:"",pricingTier:"Standard",reorderIntervalDays:60,notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.name||!form.country)return;onSave({...form,id:`CLI-${String(Date.now()).slice(-4)}`,status:"Active",totalBottles:0,lastOrder:"—",reorderIntervalDays:parseInt(form.reorderIntervalDays)});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>New Client</h3><div className="form-row"><div className="form-group"><label>Client Name</label><input placeholder="e.g. Maison Dubois" value={form.name} onChange={e=>set("name",e.target.value)}/></div><div className="form-group"><label>Type</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{["Restaurant","Distributor","Retailer","Private"].map(t=><option key={t}>{t}</option>)}</select></div></div><div className="form-row"><div className="form-group"><label>Country</label><input placeholder="e.g. France" value={form.country} onChange={e=>set("country",e.target.value)}/></div><div className="form-group"><label>City</label><input placeholder="e.g. Lyon" value={form.city} onChange={e=>set("city",e.target.value)}/></div></div><div className="form-group"><label>Contact Person</label><input value={form.contact} onChange={e=>set("contact",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>Email</label><input value={form.email} onChange={e=>set("email",e.target.value)}/></div><div className="form-group"><label>Phone</label><input value={form.phone} onChange={e=>set("phone",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>Pricing Tier</label><select value={form.pricingTier} onChange={e=>set("pricingTier",e.target.value)}>{["Standard","Premium","Wholesale","Export"].map(t=><option key={t}>{t}</option>)}</select></div><div className="form-group"><label>Reorder Interval (days)</label><input type="number" value={form.reorderIntervalDays} onChange={e=>set("reorderIntervalDays",e.target.value)}/></div></div><div className="form-group"><label>Notes</label><input value={form.notes} onChange={e=>set("notes",e.target.value)}/></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-gold" onClick={handleSave}>Save Client</button></div></div></div>;
}

function AddHarvestModal({ onClose, onSave }) {
  const [form,setForm]=useState({grape:"",plot:"",vintage:new Date().getFullYear(),harvestDate:"",kgHarvested:"",brixAtHarvest:"",ph:"",fermentStart:"",agingVessel:"French Oak",expectedBottling:"",expectedBottles:"",stage:"Harvest",notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.grape||!form.harvestDate)return;onSave({...form,id:`HARV-${form.vintage}-${form.grape.toUpperCase().slice(0,4)}`,kgHarvested:parseInt(form.kgHarvested)||0,brixAtHarvest:parseFloat(form.brixAtHarvest)||0,ph:parseFloat(form.ph)||0,expectedBottles:parseInt(form.expectedBottles)||0,vintage:parseInt(form.vintage),fermentEnd:null,agingStart:null});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>Log New Harvest</h3><div className="form-row"><div className="form-group"><label>Grape Variety</label><input placeholder="e.g. Sangiovese" value={form.grape} onChange={e=>set("grape",e.target.value)}/></div><div className="form-group"><label>Vintage</label><input type="number" value={form.vintage} onChange={e=>set("vintage",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>Vineyard Plot</label><input placeholder="e.g. East Hill" value={form.plot} onChange={e=>set("plot",e.target.value)}/></div><div className="form-group"><label>Harvest Date</label><input type="date" value={form.harvestDate} onChange={e=>set("harvestDate",e.target.value)}/></div></div><div className="form-row-3"><div className="form-group"><label>Kg Harvested</label><input type="number" placeholder="12400" value={form.kgHarvested} onChange={e=>set("kgHarvested",e.target.value)}/></div><div className="form-group"><label>Brix °</label><input type="number" step=".1" placeholder="24.2" value={form.brixAtHarvest} onChange={e=>set("brixAtHarvest",e.target.value)}/></div><div className="form-group"><label>pH</label><input type="number" step=".01" placeholder="3.41" value={form.ph} onChange={e=>set("ph",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>Fermentation Start</label><input type="date" value={form.fermentStart} onChange={e=>set("fermentStart",e.target.value)}/></div><div className="form-group"><label>Aging Vessel</label><input placeholder="e.g. French Oak 225L x12" value={form.agingVessel} onChange={e=>set("agingVessel",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>Expected Bottling</label><input type="date" value={form.expectedBottling} onChange={e=>set("expectedBottling",e.target.value)}/></div><div className="form-group"><label>Expected Bottles</label><input type="number" placeholder="16500" value={form.expectedBottles} onChange={e=>set("expectedBottles",e.target.value)}/></div></div><div className="form-group"><label>Current Stage</label><select value={form.stage} onChange={e=>set("stage",e.target.value)}>{["Harvest","Fermenting","Aging","Bottled"].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="Observations, quality notes…"/></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-gold" onClick={handleSave}>Log Harvest</button></div></div></div>;
}

function LogTransactionModal({ batch, clients, onClose, onSave }) {
  const [form,setForm]=useState({type:"out",qty:"",clientId:"",note:"",user:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const sc=clients.find(c=>c.id===form.clientId);
  const handleSave=()=>{
    if((form.type!=="move"&&!form.qty)||!form.user)return;
    const qty=form.type==="in"?Math.abs(parseInt(form.qty)):-Math.abs(parseInt(form.qty));
    const absQty=Math.abs(parseInt(form.qty)||0);
    const unitPrice=sc?PRICE_TIERS[sc.pricingTier]||12:12;
    const invId=form.type==="out"&&sc?`INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`:null;
    onSave({id:Date.now(),type:form.type,batch:batch.id,wine:batch.wine,qty:form.type==="move"?0:qty,clientId:form.clientId||null,clientName:sc?sc.name:null,date:new Date().toISOString().slice(0,10),note:form.note||(sc?`Shipped to ${sc.name}`:""),user:form.user,invoiceId:invId},
      form.clientId, absQty,
      sc&&form.type==="out"?{id:invId,txId:Date.now(),clientId:sc.id,clientName:sc.name,wine:batch.wine,qty:absQty,unitPrice,date:new Date().toISOString().slice(0,10),dueDate:new Date(Date.now()+30*86400000).toISOString().slice(0,10),status:"Pending",vatNote:isEU(sc.country)?"EU Intra-community — VAT reverse charge applies":`Export to ${sc.country} — standard VAT, verify trade agreement`}:null
    );
    onClose();
  };
  const typeLabels={in:"Inbound (add stock)",out:"Outbound (shipment)",write:"Write-off (breakage/tasting)",move:"Internal Move"};
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <h3>Log Transaction</h3>
        <div className="info-box">{batch.id} — {batch.wine} — <span>{batch.qty.toLocaleString()} btl available</span></div>
        <div className="form-group"><label>Transaction Type</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{Object.entries(typeLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></div>
        {form.type==="out"&&<div className="form-group"><label>Client (required for shipments)</label><select value={form.clientId} onChange={e=>set("clientId",e.target.value)}><option value="">— Select a client —</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name} ({c.country})</option>)}</select></div>}
        {sc&&<div className="info-box">{sc.city}, {sc.country} · {sc.type} · {sc.pricingTier} ({fmtMoney(PRICE_TIERS[sc.pricingTier]||12)}/btl){isEU(sc.country)?<span className="eu-flag">EU</span>:<span className="export-flag">Export</span>}<br/><span style={{marginTop:4,display:"block"}}>An invoice will be auto-generated on save.</span></div>}
        {form.type!=="move"&&<div className="form-group"><label>Quantity (bottles)</label><input type="number" placeholder="e.g. 200" value={form.qty} onChange={e=>set("qty",e.target.value)}/></div>}
        {sc&&form.qty&&<div className="info-box">Order value: <span>{fmtMoney(parseInt(form.qty)*(PRICE_TIERS[sc.pricingTier]||12))}</span></div>}
        <div className="form-group"><label>Note</label><input placeholder="e.g. Q1 allocation…" value={form.note} onChange={e=>set("note",e.target.value)}/></div>
        <div className="form-group"><label>Staff Name</label><input placeholder="Your name" value={form.user} onChange={e=>set("user",e.target.value)}/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-gold" onClick={handleSave}>Log & Generate Invoice</button></div>
      </div>
    </div>
  );
}

// ── Analytics Helpers ─────────────────────────────────────────────────────────
function BarChart({ data, color = "#c9a84c", valuePrefix = "" }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div className="bar-col" key={i}>
          <div className="bar-val">{valuePrefix}{d.value.toLocaleString()}</div>
          <div className="bar-fill" style={{ height: `${(d.value / max) * 100}%`, background: color, opacity: 0.7 + (i / data.length) * 0.3 }} />
          <div className="bar-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, color = "#c9a84c" }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const min = Math.min(...data.map(d => d.value), 0);
  const range = max - min || 1;
  const w = 100, h = 100;
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((d.value - min) / range) * (h - 10) - 5,
  }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x},${h} L0,${h} Z`;
  return (
    <div className="line-chart">
      <svg className="line-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lg)" />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} />)}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {data.map((d, i) => <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: ".52rem", color: "var(--muted)" }}>{d.label}</span>)}
      </div>
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  let offset = 0;
  const r = 40, cx = 50, cy = 50, stroke = 24;
  const circ = 2 * Math.PI * r;
  const arcs = segments.map(s => {
    const pct = s.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const arc = { dash, gap, offset: offset * circ, ...s };
    offset += pct;
    return arc;
  });
  return (
    <div className="donut-wrap">
      <svg className="donut-svg" width="100" height="100" viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={stroke}
            strokeDasharray={`${a.dash} ${a.gap}`} strokeDashoffset={-a.offset + circ / 4}
            style={{ transition: "stroke-dasharray .5s" }} />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--cream)" fontSize="10" fontFamily="var(--font-mono)">{total.toLocaleString()}</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="var(--muted)" fontSize="5.5" fontFamily="var(--font-mono)">BOTTLES</text>
      </svg>
      <div className="donut-legend">
        {segments.map((s, i) => (
          <div className="legend-item" key={i}>
            <div className="legend-dot" style={{ background: s.color }} />
            <span className="legend-label">{s.label}</span>
            <span className="legend-val">{s.value.toLocaleString()} ({Math.round(s.value / total * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HBar({ items, max, colorFn }) {
  return (
    <div>
      {items.map((item, i) => (
        <div className="hbar-row" key={i}>
          <div className="hbar-name">{item.label}</div>
          <div className="hbar-track">
            <div className="hbar-fill" style={{ width: `${(item.value / max) * 100}%`, background: colorFn ? colorFn(i) : "var(--gold)" }} />
          </div>
          <div className="hbar-val">{item.suffix || ""}{item.value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

// ── Analytics Page ────────────────────────────────────────────────────────────
function Analytics({ batches, transactions, clients, invoices }) {
  const [tab, setTab] = useState("revenue");

  // ── Revenue data ──
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const revenueByMonth = monthNames.map((m, i) => ({
    label: m,
    value: invoices.filter(inv => new Date(inv.date).getMonth() === i && inv.status === "Paid")
      .reduce((s, inv) => s + inv.qty * inv.unitPrice, 0)
  }));
  const totalRevenue = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const pendingRevenue = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const avgOrderValue = invoices.length ? (totalRevenue + pendingRevenue) / invoices.length : 0;

  // ── Bottles shipped by month ──
  const shipsByMonth = monthNames.map((m, i) => ({
    label: m,
    value: Math.abs(transactions.filter(t => t.type === "out" && new Date(t.date).getMonth() === i)
      .reduce((s, t) => s + t.qty, 0))
  }));
  const totalShipped = Math.abs(transactions.filter(t => t.type === "out").reduce((s, t) => s + t.qty, 0));
  const totalWriteOff = Math.abs(transactions.filter(t => t.type === "write").reduce((s, t) => s + t.qty, 0));

  // ── Top clients by bottles ──
  const topClients = [...clients]
    .sort((a, b) => b.totalBottles - a.totalBottles)
    .slice(0, 6)
    .map(c => ({ label: c.name, value: c.totalBottles }));
  const maxClient = topClients[0]?.value || 1;

  // ── Revenue by client ──
  const revenueByClient = clients.map(c => ({
    label: c.name,
    value: invoices.filter(i => i.clientId === c.id).reduce((s, i) => s + i.qty * i.unitPrice, 0),
    suffix: "€"
  })).filter(c => c.value > 0).sort((a, b) => b.value - a.value).slice(0, 6);
  const maxRevClient = revenueByClient[0]?.value || 1;

  // ── Stock by wine type donut ──
  const typeColors = { Red: "#7b2d3e", White: "#c9a84c", "Rosé": "#c06878", Sparkling: "#a0b8d0" };
  const byType = Object.entries(
    batches.reduce((acc, b) => { acc[b.type] = (acc[b.type] || 0) + b.qty; return acc; }, {})
  ).map(([k, v]) => ({ label: k, value: v, color: typeColors[k] || "#888" }));

  // ── Shipments by country ──
  const byCountry = {};
  transactions.filter(t => t.type === "out" && t.clientId).forEach(t => {
    const client = clients.find(c => c.id === t.clientId);
    if (client) { byCountry[client.country] = (byCountry[client.country] || 0) + Math.abs(t.qty); }
  });
  const countryData = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([k, v]) => ({ label: k, value: v }));
  const maxCountry = countryData[0]?.value || 1;

  const countryColors = ["#c9a84c","#7b9c7b","#7b6c9c","#9c7b7b","#7b8c9c","#9c907b"];

  const tabs = [
    { id: "revenue", label: "Revenue" },
    { id: "inventory", label: "Inventory" },
    { id: "clients", label: "Clients" },
    { id: "geography", label: "Geography" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Analytics & Reports</h2>
          <p>BUSINESS INTELLIGENCE — 2024 DATA</p>
        </div>
      </div>

      {/* KPI row — always visible */}
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-label">Total Revenue</div><div className="kpi-value">{fmtMoney(totalRevenue)}</div><div className="kpi-change kpi-up">↑ paid invoices</div></div>
        <div className="kpi-card"><div className="kpi-label">Pending Revenue</div><div className="kpi-value">{fmtMoney(pendingRevenue)}</div><div className="kpi-change" style={{color:"var(--gold)"}}>→ awaiting payment</div></div>
        <div className="kpi-card"><div className="kpi-label">Bottles Shipped</div><div className="kpi-value">{totalShipped.toLocaleString()}</div><div className="kpi-change kpi-down">↓ {totalWriteOff} written off</div></div>
        <div className="kpi-card"><div className="kpi-label">Avg Order Value</div><div className="kpi-value">{fmtMoney(Math.round(avgOrderValue))}</div><div className="kpi-change" style={{color:"var(--muted)"}}>across {invoices.length} invoices</div></div>
        <div className="kpi-card"><div className="kpi-label">Active Clients</div><div className="kpi-value">{clients.filter(c=>c.status==="Active").length}</div><div className="kpi-change kpi-down" style={{color:"#e08080"}}>{clients.filter(c=>c.status==="Overdue").length} overdue</div></div>
        <div className="kpi-card"><div className="kpi-label">Total Stock</div><div className="kpi-value">{batches.reduce((s,b)=>s+b.qty,0).toLocaleString()}</div><div className="kpi-change" style={{color:"var(--muted)"}}>{batches.length} active lots</div></div>
      </div>

      {/* Tabs */}
      <div className="analytics-tabs">
        {tabs.map(t => <button key={t.id} className={`atab${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>

      {/* ── Revenue Tab ── */}
      {tab === "revenue" && (
        <div className="two-col">
          <div>
            <div className="chart-card">
              <h4>Monthly Revenue (Paid Invoices)</h4>
              <BarChart data={revenueByMonth} color="#c9a84c" valuePrefix="€" />
            </div>
            <div className="chart-card">
              <h4>Revenue by Client</h4>
              <HBar items={revenueByClient} max={maxRevClient} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>Revenue Trend</h4>
              <LineChart data={revenueByMonth.filter(m => m.value > 0).length > 1 ? revenueByMonth : revenueByMonth.map((m, i) => ({ ...m, value: Math.round(Math.random() * 8000 + 2000) }))} color="#c9a84c" />
            </div>
            <div className="chart-card">
              <h4>Invoice Status Breakdown</h4>
              <DonutChart segments={[
                { label: "Paid", value: invoices.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.qty*i.unitPrice,0), color: "#3a6b4a" },
                { label: "Pending", value: pendingRevenue, color: "#c9a84c" },
                { label: "Draft", value: invoices.filter(i=>i.status==="Draft").reduce((s,i)=>s+i.qty*i.unitPrice,0), color: "#4a4030" },
              ].filter(s=>s.value>0)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Inventory Tab ── */}
      {tab === "inventory" && (
        <div className="two-col">
          <div>
            <div className="chart-card">
              <h4>Bottles Shipped by Month</h4>
              <BarChart data={shipsByMonth} color="#7b9c8b" />
            </div>
            <div className="chart-card">
              <h4>Stock by Wine Type</h4>
              <DonutChart segments={byType} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>Current Stock by Batch</h4>
              <HBar
                items={[...batches].sort((a,b)=>b.qty-a.qty).map(b=>({ label: b.wine, value: b.qty }))}
                max={Math.max(...batches.map(b=>b.qty),1)}
                colorFn={i => ["#7b2d3e","#c9a84c","#c06878","#a0b8d0","#7b9c7b","#9c7b9c"][i%6]}
              />
            </div>
            <div className="chart-card">
              <h4>Inventory Health</h4>
              {[
                { label: "Ready to ship", value: batches.filter(b=>b.status==="Ready").reduce((s,b)=>s+b.qty,0), color: "#3a6b4a" },
                { label: "Aging / not ready", value: batches.filter(b=>b.status==="Aging").reduce((s,b)=>s+b.qty,0), color: "#c9a84c" },
                { label: "Low stock", value: batches.filter(b=>b.status==="Low Stock").reduce((s,b)=>s+b.qty,0), color: "#8b3a3a" },
              ].map((row, i) => (
                <div className="hbar-row" key={i}>
                  <div className="hbar-name">{row.label}</div>
                  <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(row.value / batches.reduce((s,b)=>s+b.qty,1)) * 100}%`, background: row.color }} /></div>
                  <div className="hbar-val">{row.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Clients Tab ── */}
      {tab === "clients" && (
        <div className="two-col">
          <div>
            <div className="chart-card">
              <h4>Top Clients by Bottles Shipped</h4>
              <HBar items={topClients} max={maxClient} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
            <div className="chart-card">
              <h4>Clients by Type</h4>
              <DonutChart segments={[
                { label: "Restaurant", value: clients.filter(c=>c.type==="Restaurant").length, color: "#a090d0" },
                { label: "Distributor", value: clients.filter(c=>c.type==="Distributor").length, color: "#80b0d4" },
                { label: "Retailer", value: clients.filter(c=>c.type==="Retailer").length, color: "#c4a060" },
                { label: "Private", value: clients.filter(c=>c.type==="Private").length, color: "#a0c480" },
              ].filter(s=>s.value>0)} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>Client Status Overview</h4>
              {[
                { label: "Active", value: clients.filter(c=>c.status==="Active").length, color: "#3a6b4a" },
                { label: "Overdue for reorder", value: clients.filter(c=>c.status==="Overdue").length, color: "#8b3a3a" },
                { label: "Inactive", value: clients.filter(c=>c.status==="Inactive").length, color: "#4a4030" },
              ].map((row, i) => (
                <div className="hbar-row" key={i}>
                  <div className="hbar-name">{row.label}</div>
                  <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(row.value / clients.length) * 100}%`, background: row.color }} /></div>
                  <div className="hbar-val">{row.value}</div>
                </div>
              ))}
            </div>
            <div className="chart-card">
              <h4>EU vs Export Split (Bottles)</h4>
              <DonutChart segments={[
                { label: "EU clients", value: clients.filter(c=>isEU(c.country)).reduce((s,c)=>s+c.totalBottles,0), color: "#8898e0" },
                { label: "Export clients", value: clients.filter(c=>!isEU(c.country)).reduce((s,c)=>s+c.totalBottles,0), color: "#c4a060" },
              ].filter(s=>s.value>0)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Geography Tab ── */}
      {tab === "geography" && (
        <div className="two-col">
          <div>
            <div className="chart-card">
              <h4>Bottles Shipped by Country</h4>
              <HBar items={countryData} max={maxCountry} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
            <div className="chart-card">
              <h4>Country Distribution</h4>
              <DonutChart segments={countryData.map((c, i) => ({ ...c, color: countryColors[i % countryColors.length] }))} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>Revenue by Country</h4>
              <HBar
                items={Object.entries(
                  invoices.reduce((acc, inv) => {
                    const c = clients.find(cl => cl.id === inv.clientId);
                    if (c) { acc[c.country] = (acc[c.country] || 0) + inv.qty * inv.unitPrice; }
                    return acc;
                  }, {})
                ).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,v])=>({ label: k, value: Math.round(v), suffix:"€" }))}
                max={Math.max(...Object.values(invoices.reduce((acc,inv)=>{const c=clients.find(cl=>cl.id===inv.clientId);if(c){acc[c.country]=(acc[c.country]||0)+inv.qty*inv.unitPrice;}return acc;},{})),1)}
                colorFn={i => countryColors[i % countryColors.length]}
              />
            </div>
            <div className="chart-card">
              <h4>Pricing Tier Breakdown</h4>
              <DonutChart segments={["Standard","Premium","Wholesale","Export"].map((tier,i)=>({
                label: tier,
                value: clients.filter(c=>c.pricingTier===tier).length,
                color: countryColors[i]
              })).filter(s=>s.value>0)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEYS = {
  demo: "cantina-track-demo",
  blank: "cantina-track-blank",
  mode: "cantina-track-mode"
};

const EMPTY_DATA = { batches: [], transactions: [], clients: [], invoices: [], harvests: [] };

function loadMode() {
  try { return localStorage.getItem(STORAGE_KEYS.mode) || "demo"; }
  catch(e) { return "demo"; }
}

function saveMode(mode) {
  try { localStorage.setItem(STORAGE_KEYS.mode, mode); }
  catch(e) {}
}

function loadData(mode) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[mode]);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load saved data:", e);
  }
  return null;
}

function saveData(mode, data) {
  try {
    localStorage.setItem(STORAGE_KEYS[mode], JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save data:", e);
  }
}

function getDefaults(mode) {
  if (mode === "blank") return EMPTY_DATA;
  return { batches: SEED_BATCHES, transactions: SEED_TRANSACTIONS, clients: SEED_CLIENTS, invoices: SEED_INVOICES, harvests: SEED_HARVESTS };
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(loadMode);
  const [page,setPage]=useState("dashboard");
  const [batches,setBatches]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.batches || d.batches; });
  const [transactions,setTransactions]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.transactions || d.transactions; });
  const [clients,setClients]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.clients || d.clients; });
  const [invoices,setInvoices]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.invoices || d.invoices; });
  const [harvests,setHarvests]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.harvests || d.harvests; });
  const [showAddBatch,setShowAddBatch]=useState(false);
  const [showAddClient,setShowAddClient]=useState(false);
  const [showAddHarvest,setShowAddHarvest]=useState(false);
  const [txBatch,setTxBatch]=useState(null);
  const [selectedClient,setSelectedClient]=useState(null);
  const [viewInvoice,setViewInvoice]=useState(null);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData(mode, { batches, transactions, clients, invoices, harvests });
  }, [batches, transactions, clients, invoices, harvests, mode]);

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    // Save current data before switching
    saveData(mode, { batches, transactions, clients, invoices, harvests });
    // Switch
    saveMode(newMode);
    setMode(newMode);
    const saved = loadData(newMode);
    const defaults = getDefaults(newMode);
    setBatches(saved?.batches || defaults.batches);
    setTransactions(saved?.transactions || defaults.transactions);
    setClients(saved?.clients || defaults.clients);
    setInvoices(saved?.invoices || defaults.invoices);
    setHarvests(saved?.harvests || defaults.harvests);
    setPage("dashboard");
    setSelectedClient(null);
  };

  const resetCurrentMode = () => {
    const label = mode === "demo" ? "demo data" : "blank workspace";
    if (window.confirm(`Reset ${label} to defaults? This cannot be undone.`)) {
      localStorage.removeItem(STORAGE_KEYS[mode]);
      const defaults = getDefaults(mode);
      setBatches(defaults.batches);
      setTransactions(defaults.transactions);
      setClients(defaults.clients);
      setInvoices(defaults.invoices);
      setHarvests(defaults.harvests);
    }
  };

  const goTo=(p)=>{setPage(p);setSelectedClient(null);};

  const addTransaction=(tx,clientId,qty,invoice)=>{
    setTransactions(p=>[tx,...p]);
    if(tx.qty!==0){setBatches(p=>p.map(b=>{if(b.id!==tx.batch)return b;const nq=b.qty+tx.qty;return{...b,qty:nq,status:nq<300?"Low Stock":b.status==="Low Stock"?"Ready":b.status};}));}
    if(clientId&&qty){setClients(p=>p.map(c=>c.id!==clientId?c:{...c,totalBottles:c.totalBottles+qty,lastOrder:tx.date,status:"Active"}));}
    if(invoice){setInvoices(p=>[invoice,...p]);}
  };

  const overdueReminders=computeReminders(clients).filter(c=>c.urgency==="red").length;

  const nav=[
    {section:null,id:"dashboard",icon:"◈",label:"Dashboard"},
    {section:"INVENTORY",id:"inventory",icon:"⊟",label:"Batches"},
    {section:null,id:"transactions",icon:"⇄",label:"Transactions"},
    {section:null,id:"harvest",icon:"🍇",label:"Harvest Log"},
    {section:"CLIENTS",id:"clients",icon:"◉",label:"All Clients"},
    {section:null,id:"reminders",icon:"⏰",label:"Reminders",badge:overdueReminders>0?overdueReminders:null},
    {section:"FINANCE",id:"invoices",icon:"◻",label:"Invoices"},
    {section:null,id:"analytics",icon:"◫",label:"Analytics"},
  ];

  return (
    <>
      <GlobalStyle/>
      <div className="app">
        <nav className="sidebar">
          <div className="sidebar-logo"><h1>Cantina<br/>Track</h1><span>Winery OS</span></div>
          <div className="nav">
            {nav.map(n=>(
              <div key={n.id}>
                {n.section&&<div className="nav-section">{n.section}</div>}
                <button className={`nav-item${page===n.id?" active":""}`} onClick={()=>goTo(n.id)}>
                  <span className="icon">{n.icon}</span>{n.label}
                  {n.badge&&<span className="nav-badge">{n.badge}</span>}
                </button>
              </div>
            ))}
          </div>
          <div className="mode-label">Workspace</div>
          <div className="mode-toggle">
            <button className={`mode-btn${mode==="demo"?" active":""}`} onClick={()=>switchMode("demo")}>Demo</button>
            <button className={`mode-btn${mode==="blank"?" active":""}`} onClick={()=>switchMode("blank")}>My Winery</button>
          </div>
          <div className="sidebar-footer">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>v0.5.0 · {mode==="demo"?"DEMO":"MY WINERY"}</span>
              <button onClick={resetCurrentMode} style={{background:"none",border:"1px solid var(--border)",borderRadius:4,color:"var(--muted)",fontFamily:"var(--font-mono)",fontSize:".55rem",padding:"3px 8px",cursor:"pointer",letterSpacing:".08em"}}>RESET</button>
            </div>
          </div>
        </nav>
        <main className="main">
          {page==="dashboard"&&<Dashboard batches={batches} transactions={transactions} clients={clients} invoices={invoices} harvests={harvests} onNav={goTo}/>}
          {page==="inventory"&&<Inventory batches={batches} onAdd={()=>setShowAddBatch(true)} onTransaction={setTxBatch}/>}
          {page==="transactions"&&<Transactions transactions={transactions}/>}
          {page==="harvest"&&<Harvest harvests={harvests} onAdd={()=>setShowAddHarvest(true)}/>}
          {page==="clients"&&!selectedClient&&<Clients clients={clients} transactions={transactions} onAdd={()=>setShowAddClient(true)} onSelect={setSelectedClient}/>}
          {page==="clients"&&selectedClient&&<ClientProfile client={selectedClient} transactions={transactions} onBack={()=>setSelectedClient(null)}/>}
          {page==="reminders"&&<Reminders clients={clients}/>}
          {page==="invoices"&&<Invoices invoices={invoices} clients={clients} onMarkPaid={id=>setInvoices(p=>p.map(i=>i.id===id?{...i,status:"Paid"}:i))} onView={setViewInvoice}/>}
          {page==="analytics"&&<Analytics batches={batches} transactions={transactions} clients={clients} invoices={invoices}/>}
        </main>
      </div>
      {showAddBatch&&<AddBatchModal onClose={()=>setShowAddBatch(false)} onSave={b=>{setBatches(p=>[b,...p]);}}/>}
      {showAddClient&&<AddClientModal onClose={()=>setShowAddClient(false)} onSave={c=>{setClients(p=>[c,...p]);}}/>}
      {showAddHarvest&&<AddHarvestModal onClose={()=>setShowAddHarvest(false)} onSave={h=>{setHarvests(p=>[h,...p]);}}/>}
      {txBatch&&<LogTransactionModal batch={txBatch} clients={clients} onClose={()=>setTxBatch(null)} onSave={addTransaction}/>}
      {viewInvoice&&<InvoiceModal invoice={viewInvoice} onClose={()=>setViewInvoice(null)}/>}
    </>
  );
}
