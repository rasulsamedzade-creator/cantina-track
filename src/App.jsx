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

const SEED_BULK = [
  { id:"BULK-2023-SAN-01", wine:"Sangiovese IGT", vintage:2023, type:"Red", grapes:"Sangiovese 100%", plot:"East Hill", liters:18000, vessel:"Flexitank", pricePerLiter:2.80, status:"Available", added:"2023-11-01", notes:"High tannin, good structure. Suitable for blending." },
  { id:"BULK-2023-TREB-01", wine:"Trebbiano Bianco", vintage:2023, type:"White", grapes:"Trebbiano 100%", plot:"North Block", liters:9500, vessel:"IBC Tank", pricePerLiter:1.90, status:"Available", added:"2023-10-15", notes:"Fresh and neutral. Ideal for private label producers." },
  { id:"BULK-2022-MER-01", wine:"Merlot Riserva", vintage:2022, type:"Red", grapes:"Merlot 95%", plot:"West Ridge", liters:4200, vessel:"Barrique x18", pricePerLiter:4.50, status:"Reserved", added:"2023-08-20", notes:"Premium bulk. Already reserved by Negociant Dupont." },
  { id:"BULK-2024-ROS-01", wine:"Rosato Massa", vintage:2024, type:"Rosé", grapes:"Grenache 80% / Cinsault 20%", plot:"South Slope", liters:22000, vessel:"Tanker", pricePerLiter:1.60, status:"Available", added:"2024-02-01", notes:"Light, fresh. High volume — suited for supermarket private label." },
];

const SEED_BULK_TRANSACTIONS = [
  { id:1, bulkId:"BULK-2023-SAN-01", wine:"Sangiovese IGT", liters:-6000, clientId:"CLI-002", clientName:"Wine Direct GmbH", date:"2024-01-20", note:"Q1 bulk shipment", pricePerLiter:2.80, vessel:"Flexitank" },
  { id:2, bulkId:"BULK-2022-MER-01", wine:"Merlot Riserva", liters:-4200, clientId:"CLI-006", clientName:"Vino Americano LLC", date:"2024-01-28", note:"Full lot — export USA", pricePerLiter:4.50, vessel:"Barrique x18" },
  { id:3, bulkId:"BULK-2023-TREB-01", wine:"Trebbiano Bianco", liters:-3000, clientId:"CLI-003", clientName:"The Cellar London", date:"2024-02-05", note:"Private label order", pricePerLiter:1.90, vessel:"IBC Tank" },
];

const SEED_AGENTS = [
  { id:"AGT-001", name:"Marco Ferretti", company:"Ferretti Vini", region:"Tuscany", country:"Italy", type:"Regional Broker", contact:"marco.ferretti@ferrettivini.it", phone:"+39 055 987 654", commissionPct:8, status:"Active", since:"2021-03-01", notes:"Our strongest domestic agent. Covers Tuscany and Umbria." },
  { id:"AGT-002", name:"Claire Beaumont", company:"Beaumont Wine Group", region:"Île-de-France", country:"France", type:"Import Broker", contact:"c.beaumont@beaumontwines.fr", phone:"+33 1 44 00 12 34", commissionPct:10, status:"Active", since:"2022-01-15", notes:"Covers Paris and northern France. Strong Michelin connections." },
  { id:"AGT-003", name:"Heinrich Braun", company:"Braun & Partner GmbH", region:"Bavaria", country:"Germany", type:"Distributor Agent", contact:"h.braun@braunpartner.de", phone:"+49 89 456 789", commissionPct:7, status:"Active", since:"2020-06-10", notes:"Handles German wholesale. Quarterly bulk orders." },
  { id:"AGT-004", name:"Sofia Papadopoulos", company:"Hellas Fine Wines", region:"Attica", country:"Greece", type:"Import Broker", contact:"sofia@hellasfinewines.gr", phone:"+30 210 123 456", commissionPct:9, status:"Active", since:"2023-02-01", notes:"New agent, growing fast. Athens hotel and restaurant scene." },
  { id:"AGT-005", name:"James Whitmore", company:"Whitmore & Sons", region:"London", country:"United Kingdom", type:"Export Agent", contact:"j.whitmore@whitmorewines.co.uk", phone:"+44 20 7890 1234", commissionPct:11, status:"Inactive", since:"2019-09-01", notes:"On hold since Brexit paperwork complications." },
];

const SEED_AGENT_DEALS = [
  { id:"DEAL-001", agentId:"AGT-001", agentName:"Marco Ferretti", batchId:"LOT-2022-RES-01", wine:"Riserva Sangiovese", type:"Bottles", qty:480, unitPrice:22, clientName:"Osteria Centrale", clientCountry:"Italy", date:"2024-01-15", status:"Completed", commission:8 },
  { id:"DEAL-002", agentId:"AGT-001", agentName:"Marco Ferretti", batchId:"LOT-2023-CHARD-01", wine:"Chardonnay Classico", type:"Bottles", qty:240, unitPrice:14, clientName:"Hotel Brunelleschi", clientCountry:"Italy", date:"2024-02-01", status:"Completed", commission:8 },
  { id:"DEAL-003", agentId:"AGT-002", agentName:"Claire Beaumont", batchId:"LOT-2023-ROSE-01", wine:"Rosé Provençal", type:"Bottles", qty:600, unitPrice:12, clientName:"Le Grand Véfour", clientCountry:"France", date:"2024-01-22", status:"Completed", commission:10 },
  { id:"DEAL-004", agentId:"AGT-003", agentName:"Heinrich Braun", batchId:"LOT-2022-BRUT-01", wine:"Brut Nature", type:"Bulk", qty:8000, unitPrice:2.80, clientName:"Rewe Group", clientCountry:"Germany", date:"2024-01-28", status:"Completed", commission:7 },
  { id:"DEAL-005", agentId:"AGT-002", agentName:"Claire Beaumont", batchId:"LOT-2022-RES-01", wine:"Riserva Sangiovese", type:"Bottles", qty:360, unitPrice:22, clientName:"Cave Augé", clientCountry:"France", date:"2024-02-10", status:"In Progress", commission:10 },
  { id:"DEAL-006", agentId:"AGT-004", agentName:"Sofia Papadopoulos", batchId:"LOT-2023-ROSE-01", wine:"Rosé Provençal", type:"Bottles", qty:180, unitPrice:12, clientName:"Hotel Grande Bretagne", clientCountry:"Greece", date:"2024-02-14", status:"In Progress", commission:9 },
  { id:"DEAL-007", agentId:"AGT-001", agentName:"Marco Ferretti", batchId:"LOT-2023-ROSE-01", wine:"Rosé Provençal", type:"Bottles", qty:120, unitPrice:12, clientName:"Enoteca Pitti Gola", clientCountry:"Italy", date:"2024-02-18", status:"Pending", commission:8 },
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
const bulkStatusColor = s => ({Available:"badge-ok",Reserved:"badge-pending","Low":"badge-low"})[s]||"badge-white";
const dealStatusColor = s => ({Completed:"badge-paid","In Progress":"badge-pending",Pending:"badge-aging"})[s]||"badge-white";
const stageIndex = s => ({Harvest:0,Fermenting:1,Aging:2,Bottled:3})[s]??-1;
function qrCells(str){let h=0;for(let i=0;i<str.length;i++)h=((h<<5)-h+str.charCodeAt(i))|0;return Array.from({length:16},(_,i)=>((h>>i)&1)===0);}
function QRBox({id}){const c=qrCells(id);return <div className="qr-box">{c.map((w,i)=><div key={i} className={`qr-cell${w?" w":""}`}/>)}</div>;}

// ── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    // Sidebar nav
    dashboard: "Dashboard", batches: "Batches", transactions: "Transactions",
    harvestLog: "Harvest Log", allClients: "All Clients", reminders: "Reminders",
    invoices: "Invoices", analytics: "Analytics",
    // Sidebar nav sections
    inventory: "INVENTORY", clientsSection: "CLIENTS", finance: "FINANCE",
    // Workspace
    workspace: "Workspace", demo: "Demo", myWinery: "My Winery", reset: "RESET",
    // Dashboard
    cantinaOverview: "Cantina Overview", dashboardSub: "DASHBOARD",
    totalBottles: "Total Bottles", activeClients: "Active Clients",
    pendingRevenue: "Pending Revenue", alerts: "Alerts",
    activeLots: "active lots", totalAccounts: "total accounts",
    openInvoices: "open invoices", stockClient: "stock + client",
    recentTransactions: "Recent Transactions", recentInvoices: "Recent Invoices",
    reorderReminders: "Reorder Reminders", harvestActivity: "Harvest Activity",
    viewAll: "View All", noHarvests: "No harvests yet. Log your first harvest from Harvest Log.",
    noTransactions: "No transactions yet",
    // Inventory
    batchInventory: "Batch Inventory", allLotsSub: "ALL LOTS — BOTTLE STOCK BY BATCH",
    newBatch: "+ New Batch", searchBatches: "Search batches…", allTypes: "All Types",
    lotId: "Lot ID", wine: "Wine", type: "Type", vintage: "Vintage",
    location: "Location", bottles: "Bottles", status: "Status", qr: "QR",
    ship: "Ship", noBatches: "No batches found",
    // Transactions
    transactionLog: "Transaction Log", auditTrail: "FULL AUDIT TRAIL",
    // Invoices
    billingSub: "BILLING — REVENUE TRACKING", paidRevenue: "Paid Revenue",
    outstanding: "Outstanding", totalInvoiced: "Total Invoiced",
    pending: "pending", allTime: "all time",
    searchInvoices: "Search by client or invoice number…",
    invoiceNum: "Invoice #", client: "Client", qty: "Qty", amount: "Amount",
    date: "Date", due: "Due", view: "View", markPaid: "Mark Paid",
    noInvoices: "No invoices found",
    // Invoice modal
    from: "From", to: "To", description: "Description", quantity: "Quantity",
    unitPrice: "Unit Price", total: "Total", subtotal: "Subtotal",
    vat: "VAT", seeNote: "See note", totalDue: "Total Due",
    paymentTerms: "Payment terms: 30 days",
    close: "Close",
    // Reminders
    reorderRemindersFull: "Reorder Reminders", followUpSub: "CLIENT FOLLOW-UP TRACKER",
    overdue: "Overdue", dueSoon: "Due Soon", onTrack: "On Track",
    needsFollowUp: "needs immediate follow-up", approachingWindow: "approaching reorder window",
    noActionNeeded: "no action needed",
    overdueContactNow: "⚠ Overdue — Contact Now",
    // Harvest
    harvestProduction: "Harvest & Production", wineLogSub: "WINEMAKING LOGBOOK",
    newHarvest: "+ New Harvest", activeProductions: "Active Productions",
    totalKgHarvested: "Total Kg Harvested", expectedBottles: "Expected Bottles",
    totalRecords: "total records", thisLogbook: "this logbook", inPipeline: "in pipeline",
    harvestData: "Harvest Data", productionTimeline: "Production Timeline",
    kgHarvested: "Kg Harvested", brix: "Brix °", ph: "pH",
    fermentationEnd: "Fermentation End", agingStart: "Aging Start",
    agingVessel: "Aging Vessel", expectedBottling: "Expected Bottling",
    noHarvestsYet: "No harvests logged yet",
    back: "← Back",
    // Clients
    clients: "Clients", allAccountsSub: "ALL ACCOUNTS",
    newClient: "+ New Client", searchClients: "Search clients…",
    totalAccountsStat: "Total Accounts", totalBottlesShipped: "Total Bottles Shipped",
    overdueReorders: "Overdue Reorders", active: "active", lifetime: "lifetime",
    needFollowUp: "need follow-up", shipped: "Shipped", orders: "Orders", lastOrder: "Last Order",
    noClients: "No clients found",
    // Client profile
    contactDetails: "Contact Details", orderHistory: "Order History",
    daysSinceOrder: "Days Since Order", pricingTier: "Pricing Tier",
    lifetimeShipped: "lifetime shipped", last: "last",
    email: "Email", phone: "Phone", country: "Country", city: "City",
    reorderInterval: "Reorder Interval", notes: "Notes",
    // Modals
    newBatchTitle: "New Batch / Lot", wineName: "Wine Name",
    vintageYear: "Vintage Year", grapeVarieties: "Grape Varieties",
    vineyardPlot: "Vineyard Plot", bottlesFilled: "Bottles Filled",
    storageLocation: "Storage Location", cancel: "Cancel", createBatch: "Create Batch",
    newClientTitle: "New Client", clientName: "Client Name",
    contactPerson: "Contact Person", reorderIntervalDays: "Reorder Interval (days)",
    saveClient: "Save Client",
    logNewHarvest: "Log New Harvest", grapeVariety: "Grape Variety",
    harvestDate: "Harvest Date", fermentationStart: "Fermentation Start",
    currentStage: "Current Stage", observations: "Observations, quality notes…",
    logHarvest: "Log Harvest",
    logTransaction: "Log Transaction", transactionType: "Transaction Type",
    clientRequired: "Client (required for shipments)", selectClient: "— Select a client —",
    quantityBottles: "Quantity (bottles)", note: "Note", staffName: "Staff Name",
    logAndGenerate: "Log & Generate Invoice", btlAvailable: "btl available",
    inbound: "Inbound (add stock)", outbound: "Outbound (shipment)",
    writeOff: "Write-off (breakage/tasting)", internalMove: "Internal Move",
    invoiceAutoGenerated: "An invoice will be auto-generated on save.",
    orderValue: "Order value",
    // Analytics
    analyticsReports: "Analytics & Reports", biSub: "BUSINESS INTELLIGENCE — 2024 DATA",
    revenue: "Revenue", inventoryTab: "Inventory", clientsTab: "Clients", geography: "Geography",
    totalRevenueStat: "Total Revenue", pendingRevenueStat: "Pending Revenue",
    bottlesShipped: "Bottles Shipped", avgOrderValue: "Avg Order Value",
    activeClientsStat: "Active Clients", totalStock: "Total Stock",
    monthlyRevenue: "Monthly Revenue (Paid)", revenueTrend: "Revenue Trend",
    revenueByClient: "Revenue by Client", invoiceStatus: "Invoice Status",
    bottlesShippedMonth: "Bottles Shipped by Month", stockByWineType: "Stock by Wine Type",
    currentStockLevels: "Current Stock Levels", inventoryHealth: "Inventory Health",
    topClientsByVolume: "Top Clients by Volume", clientTypeMix: "Client Type Mix",
    clientStatusOverview: "Client Status Overview", euExportSplit: "EU vs Export Split (Bottles)",
    bottlesShippedCountry: "Bottles Shipped by Country", countryDistribution: "Country Distribution",
    revenueByCountry: "Revenue by Country", pricingTierBreakdown: "Pricing Tier Breakdown",
    ready: "Ready", lowStock: "Low Stock", aging: "Aging",
    paid: "Paid", draft: "Draft", activeOverdueReorder: "Overdue for reorder", inactive: "Inactive",
    euClients: "EU clients", exportClients: "Export clients",
    writeOffs: "Write-offs", inStock: "in stock", totalActive: "total active",
    bottlesInLots: "bottles in lots",
    harvestLabel: "Harvest", inProgress: "In progress", backToHarvestLog: "← Back to Harvest Log", backToClients: "← Back to Clients",
    contact: "Contact", vatRegime: "VAT Regime", issued: "Issued", ref: "Ref",
    batchBelowMin: "below minimum stock", clientOverdueReorder: "overdue for reorder",
    overdueFollowUp: "Last order was {0} days ago — this client is overdue for follow-up.", dueIn: "Due in",
    all: "All",
    bulkWine: "Bulk Wine", bulkWineSub: "VINO SFUSO — LIQUID SALES BY LITRE",
    totalHectolitres: "Total Hectolitres", availableHL: "Available (hL)", shippedHL: "Shipped (hL)",
    estStockValue: "Est. Stock Value", liters: "Litres", hl: "hL", pricePerLiter: "Price / L",
    pricePerHL: "Price / hL", vessel: "Vessel", shipmentHistory: "Shipment history", hideHistory: "Hide history",
    addBulkLot: "+ Add bulk lot", noBulkLots: "No bulk lots yet", litersShort: "L",
    shipBulk: "Ship bulk", quantityLiters: "Quantity (litres)", logBulkShipment: "Log shipment",
    newBulkLot: "New bulk lot", bulkNotesPlaceholder: "Quality notes, blending suitability…",
    reserved: "Reserved", available: "Available",
    salesByType: "Sales by Type", salesByTypeSub: "REVENUE BY CUSTOMER SEGMENT",
    combinedRevenue: "Combined revenue", bulkLitres: "Bulk litres", rankByRevenue: "All clients by revenue",
    backToOverview: "← Back to overview", backToType: "← Back to segment", clientsInSegment: "Clients in segment",
    bottleOrders: "Bottle orders", bulkPurchases: "Bulk purchases", invoiceList: "Invoices",
    agents: "Agents", agentsSub: "SALES BROKERS & COMMISSION",
    activeAgents: "Active agents", revenueViaAgents: "Revenue via agents", commissionOwed: "Commission owed",
    activeDealsCount: "Active deals", deals: "deals", region: "Region", since: "Since",
    dealHistory: "Deal history", commissionBreakdown: "Commission breakdown", addAgent: "+ Add agent",
    newAgent: "New agent", agentTypeRegional: "Regional Broker", agentTypeImport: "Import Broker",
    agentTypeExport: "Export Agent", agentTypeDistributor: "Distributor Agent", dealStatusCompleted: "Completed",
    dealStatusProgress: "In Progress", dealStatusPending: "Pending", bottlesDeal: "Bottles", bulkDeal: "Bulk",
    agentNameLabel: "Name", company: "Company", commissionPct: "Commission %", saveAgent: "Save agent", saveBulkLot: "Save bulk lot",
  },
  it: {
    dashboard: "Pannello", batches: "Lotti", transactions: "Movimenti",
    harvestLog: "Registro Vendemmia", allClients: "Tutti i Clienti", reminders: "Promemoria",
    invoices: "Fatture", analytics: "Statistiche",
    inventory: "INVENTARIO", clientsSection: "CLIENTI", finance: "FINANZA",
    workspace: "Area di Lavoro", demo: "Demo", myWinery: "La Mia Cantina", reset: "RESET",
    cantinaOverview: "Panoramica Cantina", dashboardSub: "PANNELLO",
    totalBottles: "Bottiglie Totali", activeClients: "Clienti Attivi",
    pendingRevenue: "Entrate in Sospeso", alerts: "Avvisi",
    activeLots: "lotti attivi", totalAccounts: "conti totali",
    openInvoices: "fatture aperte", stockClient: "scorte + clienti",
    recentTransactions: "Movimenti Recenti", recentInvoices: "Fatture Recenti",
    reorderReminders: "Promemoria Riordini", harvestActivity: "Attività Vendemmia",
    viewAll: "Vedi Tutto", noHarvests: "Nessuna vendemmia. Registra la tua prima vendemmia dal Registro Vendemmia.",
    noTransactions: "Nessun movimento ancora",
    batchInventory: "Inventario Lotti", allLotsSub: "TUTTI I LOTTI — SCORTE PER LOTTO",
    newBatch: "+ Nuovo Lotto", searchBatches: "Cerca lotti…", allTypes: "Tutti i Tipi",
    lotId: "ID Lotto", wine: "Vino", type: "Tipo", vintage: "Annata",
    location: "Posizione", bottles: "Bottiglie", status: "Stato", qr: "QR",
    ship: "Spedisci", noBatches: "Nessun lotto trovato",
    transactionLog: "Registro Movimenti", auditTrail: "TRACCIA COMPLETA",
    billingSub: "FATTURAZIONE — MONITORAGGIO ENTRATE", paidRevenue: "Entrate Pagate",
    outstanding: "In Sospeso", totalInvoiced: "Totale Fatturato",
    pending: "in sospeso", allTime: "totale",
    searchInvoices: "Cerca per cliente o numero fattura…",
    invoiceNum: "N° Fattura", client: "Cliente", qty: "Qtà", amount: "Importo",
    date: "Data", due: "Scadenza", view: "Vedi", markPaid: "Segna Pagata",
    noInvoices: "Nessuna fattura trovata",
    from: "Da", to: "A", description: "Descrizione", quantity: "Quantità",
    unitPrice: "Prezzo Unitario", total: "Totale", subtotal: "Subtotale",
    vat: "IVA", seeNote: "Vedi nota", totalDue: "Totale Dovuto",
    paymentTerms: "Termini di pagamento: 30 giorni",
    close: "Chiudi",
    reorderRemindersFull: "Promemoria Riordini", followUpSub: "MONITORAGGIO FOLLOW-UP CLIENTI",
    overdue: "In Ritardo", dueSoon: "In Scadenza", onTrack: "In Regola",
    needsFollowUp: "necessita follow-up immediato", approachingWindow: "prossimo alla finestra di riordino",
    noActionNeeded: "nessuna azione necessaria",
    overdueContactNow: "⚠ In Ritardo — Contattare Ora",
    harvestProduction: "Vendemmia e Produzione", wineLogSub: "REGISTRO DI VINIFICAZIONE",
    newHarvest: "+ Nuova Vendemmia", activeProductions: "Produzioni Attive",
    totalKgHarvested: "Kg Totali Raccolti", expectedBottles: "Bottiglie Previste",
    totalRecords: "registri totali", thisLogbook: "questo registro", inPipeline: "in lavorazione",
    harvestData: "Dati Vendemmia", productionTimeline: "Cronologia Produzione",
    kgHarvested: "Kg Raccolti", brix: "Brix °", ph: "pH",
    fermentationEnd: "Fine Fermentazione", agingStart: "Inizio Invecchiamento",
    agingVessel: "Recipiente Invecchiamento", expectedBottling: "Imbottigliamento Previsto",
    noHarvestsYet: "Nessuna vendemmia registrata",
    back: "← Indietro",
    clients: "Clienti", allAccountsSub: "TUTTI I CONTI",
    newClient: "+ Nuovo Cliente", searchClients: "Cerca clienti…",
    totalAccountsStat: "Conti Totali", totalBottlesShipped: "Bottiglie Totali Spedite",
    overdueReorders: "Riordini in Ritardo", active: "attivi", lifetime: "totale",
    needFollowUp: "necessitano follow-up", shipped: "Spedite", orders: "Ordini", lastOrder: "Ultimo Ordine",
    noClients: "Nessun cliente trovato",
    contactDetails: "Dettagli Contatto", orderHistory: "Storico Ordini",
    daysSinceOrder: "Giorni dall'Ultimo Ordine", pricingTier: "Fascia di Prezzo",
    lifetimeShipped: "spedite totali", last: "ultimo",
    email: "Email", phone: "Telefono", country: "Paese", city: "Città",
    reorderInterval: "Intervallo Riordino", notes: "Note",
    newBatchTitle: "Nuovo Lotto", wineName: "Nome Vino",
    vintageYear: "Anno di Annata", grapeVarieties: "Varietà di Uva",
    vineyardPlot: "Parcella Vigneto", bottlesFilled: "Bottiglie Riempite",
    storageLocation: "Posizione di Stoccaggio", cancel: "Annulla", createBatch: "Crea Lotto",
    newClientTitle: "Nuovo Cliente", clientName: "Nome Cliente",
    contactPerson: "Persona di Contatto", reorderIntervalDays: "Intervallo Riordino (giorni)",
    saveClient: "Salva Cliente",
    logNewHarvest: "Registra Nuova Vendemmia", grapeVariety: "Varietà di Uva",
    harvestDate: "Data Vendemmia", fermentationStart: "Inizio Fermentazione",
    currentStage: "Fase Attuale", observations: "Osservazioni, note qualitative…",
    logHarvest: "Registra Vendemmia",
    logTransaction: "Registra Movimento", transactionType: "Tipo Movimento",
    clientRequired: "Cliente (obbligatorio per spedizioni)", selectClient: "— Seleziona un cliente —",
    quantityBottles: "Quantità (bottiglie)", note: "Nota", staffName: "Nome Operatore",
    logAndGenerate: "Registra e Genera Fattura", btlAvailable: "btl disponibili",
    inbound: "Entrata (aggiunta scorte)", outbound: "Uscita (spedizione)",
    writeOff: "Scarico (rottura/degustazione)", internalMove: "Movimento Interno",
    invoiceAutoGenerated: "Una fattura verrà generata automaticamente al salvataggio.",
    orderValue: "Valore ordine",
    analyticsReports: "Statistiche e Report", biSub: "BUSINESS INTELLIGENCE — DATI 2024",
    revenue: "Entrate", inventoryTab: "Inventario", clientsTab: "Clienti", geography: "Geografia",
    totalRevenueStat: "Entrate Totali", pendingRevenueStat: "Entrate in Sospeso",
    bottlesShipped: "Bottiglie Spedite", avgOrderValue: "Valore Medio Ordine",
    activeClientsStat: "Clienti Attivi", totalStock: "Scorte Totali",
    monthlyRevenue: "Entrate Mensili (Pagate)", revenueTrend: "Trend Entrate",
    revenueByClient: "Entrate per Cliente", invoiceStatus: "Stato Fatture",
    bottlesShippedMonth: "Bottiglie Spedite per Mese", stockByWineType: "Scorte per Tipo di Vino",
    currentStockLevels: "Livelli Scorte Attuali", inventoryHealth: "Salute Inventario",
    topClientsByVolume: "Migliori Clienti per Volume", clientTypeMix: "Mix Tipo Clienti",
    clientStatusOverview: "Panoramica Stato Clienti", euExportSplit: "Divisione UE vs Export (Bottiglie)",
    bottlesShippedCountry: "Bottiglie Spedite per Paese", countryDistribution: "Distribuzione per Paese",
    revenueByCountry: "Entrate per Paese", pricingTierBreakdown: "Ripartizione Fasce di Prezzo",
    ready: "Pronto", lowStock: "Scorte Basse", aging: "Invecchiamento",
    paid: "Pagata", draft: "Bozza", activeOverdueReorder: "Riordino in ritardo", inactive: "Inattivo",
    euClients: "Clienti UE", exportClients: "Clienti Export",
    writeOffs: "Scarichi", inStock: "in magazzino", totalActive: "totali attivi",
    bottlesInLots: "bottiglie nei lotti",
    harvestLabel: "Vendemmia", inProgress: "In corso", backToHarvestLog: "← Indietro al Registro Vendemmia", backToClients: "← Indietro ai Clienti",
    contact: "Contatto", vatRegime: "Regime IVA", issued: "Emessa", ref: "Rif.",
    batchBelowMin: "sotto scorta minima", clientOverdueReorder: "in ritardo per riordino",
    overdueFollowUp: "Ultimo ordine {0} giorni fa — questo cliente è in ritardo per il follow-up.", dueIn: "Scadenza tra",
    all: "Tutti",
    bulkWine: "Vino Sfuso", bulkWineSub: "VINO SFUSO — VENDITA ALLA LITRO",
    totalHectolitres: "Ettolitri Totali", availableHL: "Disponibili (hL)", shippedHL: "Spediti (hL)",
    estStockValue: "Valore Stima Scorte", liters: "Litri", hl: "hL", pricePerLiter: "Prezzo / L",
    pricePerHL: "Prezzo / hL", vessel: "Recipiente", shipmentHistory: "Storico spedizioni", hideHistory: "Nascondi storico",
    addBulkLot: "+ Nuovo lotto sfuso", noBulkLots: "Nessun lotto sfuso", litersShort: "L",
    shipBulk: "Spedisci sfuso", quantityLiters: "Quantità (litri)", logBulkShipment: "Registra spedizione",
    newBulkLot: "Nuovo lotto sfuso", bulkNotesPlaceholder: "Note qualitative, idoneità al blending…",
    reserved: "Riservato", available: "Disponibile",
    salesByType: "Vendite per Tipo", salesByTypeSub: "RICAVI PER SEGMENTO CLIENTI",
    combinedRevenue: "Ricavi combinati", bulkLitres: "Litri sfusi", rankByRevenue: "Tutti i clienti per ricavo",
    backToOverview: "← Indietro alla panoramica", backToType: "← Indietro al segmento", clientsInSegment: "Clienti nel segmento",
    bottleOrders: "Ordini bottiglie", bulkPurchases: "Acquisti sfuso", invoiceList: "Fatture",
    agents: "Agenti", agentsSub: "INTERMEDIARI E PROVVIGIONI",
    activeAgents: "Agenti attivi", revenueViaAgents: "Ricavi tramite agenti", commissionOwed: "Provvigioni dovute",
    activeDealsCount: "Trattative attive", deals: "trattative", region: "Regione", since: "Dal",
    dealHistory: "Storico trattative", commissionBreakdown: "Ripartizione provvigioni", addAgent: "+ Nuovo agente",
    newAgent: "Nuovo agente", agentTypeRegional: "Broker Regionale", agentTypeImport: "Broker Import",
    agentTypeExport: "Agente Export", agentTypeDistributor: "Agente Distributore", dealStatusCompleted: "Completata",
    dealStatusProgress: "In corso", dealStatusPending: "In attesa", bottlesDeal: "Bottiglie", bulkDeal: "Sfuso",
    agentNameLabel: "Nome", company: "Azienda", commissionPct: "Provvigione %", saveAgent: "Salva agente", saveBulkLot: "Salva lotto sfuso",
  }
};

function computeReminders(clients, t) {
  const _t = t || (k => k);
  return clients.map(c => {
    const days = daysSince(c.lastOrder);
    const overdueDays = days - c.reorderIntervalDays;
    const pct = Math.min(days / c.reorderIntervalDays, 2);
    let urgency = "green", label = _t("onTrack");
    if (overdueDays > 14) { urgency = "red"; label = `${overdueDays}d ${_t("overdue")}`; }
    else if (overdueDays > 0) { urgency = "gold"; label = `${overdueDays}d ${_t("overdue")}`; }
    else if (pct > 0.8) { urgency = "gold"; label = `${_t("dueIn")} ${c.reorderIntervalDays - days}d`; }
    return { ...c, daysSince: days, overdueDays, urgency, label, pct };
  }).sort((a,b)=>b.overdueDays-a.overdueDays);
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ batches, transactions, clients, invoices, harvests, onNav, t }) {
  const totalBottles = batches.reduce((s,b)=>s+b.qty,0);
  const lowStock = batches.filter(b=>b.qty<300).length;
  const overdueClients = clients.filter(c=>c.status==="Overdue").length;
  const recentOut = transactions.filter(tx=>tx.type==="out").reduce((s,tx)=>s+Math.abs(tx.qty),0);
  const pendingInvoicesAmt = invoices.filter(i=>i.status==="Pending").reduce((s,i)=>s+i.qty*i.unitPrice,0);

  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("cantinaOverview")}</h2><p>{t("dashboardSub")} — {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}).toUpperCase()}</p></div></div>
      {(lowStock>0||overdueClients>0) && <div className="alert">{lowStock>0&&`⚠ ${lowStock} batch${lowStock>1?"es":""} ${t("batchBelowMin")}.`}{lowStock>0&&overdueClients>0&&"  ·  "}{overdueClients>0&&`⚠ ${overdueClients} client${overdueClients>1?"s":""} ${t("clientOverdueReorder")}.`}</div>}
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">{t("totalBottles")}</div><div className="stat-value">{totalBottles.toLocaleString()}</div><div className="stat-sub">{batches.length} {t("activeLots")}</div></div>
        <div className="stat-card green"><div className="stat-label">{t("activeClients")}</div><div className="stat-value">{clients.filter(c=>c.status!=="Inactive").length}</div><div className="stat-sub">{clients.length} {t("totalAccounts")}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("pendingRevenue")}</div><div className="stat-value" style={{fontSize:"1.4rem",marginTop:4}}>{fmtMoney(pendingInvoicesAmt)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Pending").length} {t("openInvoices")}</div></div>
        <div className="stat-card danger"><div className="stat-label">{t("alerts")}</div><div className="stat-value">{lowStock+overdueClients}</div><div className="stat-sub">{t("stockClient")}</div></div>
      </div>
      <div className="two-col">
        <div>
          <div className="section-title">{t("recentTransactions")}</div>
          <div className="table-wrap">
            {transactions.slice(0,5).map(tx=>{
              const {cls,icon}=txIcon(tx.type);
              return <div className="tx-item" key={tx.id}><div className={`tx-icon ${cls}`}>{icon}</div><div className="tx-info"><div className="tx-title">{tx.wine}{tx.clientName&&<span className="text-muted"> → {tx.clientName}</span>}</div><div className="tx-meta">{tx.batch} · {tx.date}</div></div>{tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty>0?"+":""}{tx.qty}</div>}</div>;
            })}
          </div>
          <div className="section-title">{t("recentInvoices")} <button className="btn btn-ghost btn-sm" onClick={()=>onNav("invoices")}>{t("viewAll")}</button></div>
          <div className="table-wrap">
            {invoices.slice(0,4).map(inv=>(
              <div className="tx-item" key={inv.id}>
                <div className="tx-info"><div className="tx-title">{inv.clientName} <span className="text-muted">— {inv.wine}</span></div><div className="tx-meta">{inv.id} · {inv.qty} btl · {t("due")} {inv.dueDate}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:10}}><span className={`badge ${invoiceStatusColor(inv.status)}`}>{inv.status}</span><span style={{fontFamily:"var(--font-mono)",fontSize:".82rem"}}>{fmtMoney(inv.qty*inv.unitPrice)}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">{t("reorderReminders")} <button className="btn btn-ghost btn-sm" onClick={()=>onNav("reminders")}>{t("viewAll")}</button></div>
          {computeReminders(clients, t).slice(0,4).map(c=>(
            <div className={`reminder-card ${c.urgency==="red"?"urgent":c.urgency==="gold"?"warning":""}`} key={c.id}>
              <div className={`reminder-urgency urgency-${c.urgency}`}/>
              <div className="reminder-info"><div className="reminder-client">{c.name}</div><div className="reminder-detail">{c.label} · {c.daysSince}d {t("daysSinceOrder").toLowerCase()} · {c.type}</div></div>
              <div className="reminder-days" style={{color:c.urgency==="red"?"#e08080":c.urgency==="gold"?"var(--gold)":"#7ec494"}}>{c.daysSince}d</div>
            </div>
          ))}
          <div className="section-title" style={{marginTop:8}}>{t("harvestActivity")} <button className="btn btn-ghost btn-sm" onClick={()=>onNav("harvest")}>{t("viewAll")}</button></div>
          <div className="table-wrap">
            {harvests.length === 0 ? (
              <div className="empty" style={{padding:20}}>{t("noHarvests")}</div>
            ) : harvests.slice(0,3).map(h=>(
              <div className="tx-item" key={h.id}>
                <div className="tx-info"><div className="tx-title">{h.grape} <span className="text-muted">— {h.plot}</span></div><div className="tx-meta">{h.vintage} · {t("harvestLabel")} {h.harvestDate} · {h.kgHarvested.toLocaleString()}kg</div></div>
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
function Inventory({ batches, onAdd, onTransaction, t }) {
  const [search,setSearch]=useState(""); const [ft,setFt]=useState("All");
  const filtered=batches.filter(b=>(ft==="All"||b.type===ft)&&(b.wine.toLowerCase().includes(search.toLowerCase())||b.id.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("batchInventory")}</h2><p>{t("allLotsSub")}</p></div></div>
      <div className="search-bar">
        <input placeholder={t("searchBatches")} value={search} onChange={e=>setSearch(e.target.value)}/>
        <select style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6,padding:"9px 13px",color:"var(--cream)",fontFamily:"var(--font-serif)",fontSize:".92rem",outline:"none"}} value={ft} onChange={e=>setFt(e.target.value)}>
          {["All","Red","White","Rosé","Sparkling"].map(typ=><option key={typ} value={typ}>{typ==="All"?t("all"):typ}</option>)}
        </select>
        <button className="btn btn-gold" onClick={onAdd}>{t("newBatch")}</button>
      </div>
      <div className="table-wrap">
        <table><thead><tr><th>{t("lotId")}</th><th>{t("wine")}</th><th>{t("type")}</th><th>{t("vintage")}</th><th>{t("location")}</th><th>{t("bottles")}</th><th>{t("status")}</th><th>{t("qr")}</th><th></th></tr></thead>
          <tbody>{filtered.length===0?<tr><td colSpan={9}><div className="empty">{t("noBatches")}</div></td></tr>:filtered.map(b=>(
            <tr key={b.id}>
              <td><span style={{fontFamily:"var(--font-mono)",fontSize:".72rem",color:"var(--muted)"}}>{b.id}</span></td>
              <td><div>{b.wine}</div><div style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",marginTop:2}}>{b.grapes}</div></td>
              <td><span className={`badge ${typeColor(b.type)}`}>{b.type}</span></td>
              <td style={{fontFamily:"var(--font-mono)"}}>{b.vintage}</td>
              <td style={{fontSize:".85rem",color:"var(--muted)"}}>{b.location}</td>
              <td style={{fontFamily:"var(--font-mono)",fontSize:"1rem"}}>{b.qty.toLocaleString()}</td>
              <td><span className={`badge ${statusColor(b.status)}`}>{b.status}</span></td>
              <td><QRBox id={b.id}/></td>
              <td><button className="btn btn-ghost btn-sm" onClick={()=>onTransaction(b)}>{t("ship")}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// ── Transactions ──────────────────────────────────────────────────────────────
function Transactions({ transactions, t }) {
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("transactionLog")}</h2><p>{t("auditTrail")}</p></div></div>
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
function Invoices({ invoices, clients, onMarkPaid, onView, t }) {
  const [search,setSearch]=useState("");
  const filtered=invoices.filter(i=>i.clientName.toLowerCase().includes(search.toLowerCase())||i.id.toLowerCase().includes(search.toLowerCase()));
  const totalRevenue=invoices.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.qty*i.unitPrice,0);
  const pendingAmt=invoices.filter(i=>i.status==="Pending").reduce((s,i)=>s+i.qty*i.unitPrice,0);
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("invoices")}</h2><p>{t("billingSub")}</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">{t("paidRevenue")}</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(totalRevenue)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Paid").length} {t("invoices").toLowerCase()}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("outstanding")}</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(pendingAmt)}</div><div className="stat-sub">{invoices.filter(i=>i.status==="Pending").length} {t("pending")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("totalInvoiced")}</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{fmtMoney(totalRevenue+pendingAmt)}</div><div className="stat-sub">{t("allTime")}</div></div>
      </div>
      <div className="search-bar"><input placeholder={t("searchInvoices")} value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>{t("invoiceNum")}</th><th>{t("client")}</th><th>{t("wine")}</th><th>{t("qty")}</th><th>{t("amount")}</th><th>{t("date")}</th><th>{t("due")}</th><th>{t("status")}</th><th></th></tr></thead>
          <tbody>{filtered.length===0?<tr><td colSpan={9}><div className="empty">{t("noInvoices")}</div></td></tr>:filtered.map(inv=>(
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
                <button className="btn btn-ghost btn-sm" onClick={()=>onView(inv)}>{t("view")}</button>
                {inv.status==="Pending"&&<button className="btn btn-green btn-sm" onClick={()=>onMarkPaid(inv.id)}>{t("markPaid")}</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

// ── Invoice Preview Modal ─────────────────────────────────────────────────────
function InvoiceModal({ invoice, onClose, t }) {
  const subtotal=invoice.qty*invoice.unitPrice;
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-wide">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{margin:0}}>{invoice.id}</h3>
          <div style={{display:"flex",gap:8}}><button className="btn btn-ghost btn-sm" onClick={onClose}>{t("close")}</button></div>
        </div>
        <div className="invoice-preview">
          <div className="inv-header">
            <div><div className="inv-winery-name">CANTINA TRACK</div><div className="inv-winery-sub">Via della Vigna 14 · Siena, Italy · VAT IT12345678</div></div>
            <div className="inv-number"><div className="num">{invoice.id}</div><div className="dt">{t("issued")}: {invoice.date}</div><div className="dt">{t("due")}: {invoice.dueDate}</div></div>
          </div>
          <div className="inv-parties">
            <div><div className="inv-party-label">{t("from")}</div><div className="inv-party-name">Cantina Track SRL</div><div className="inv-party-detail">Via della Vigna 14<br/>53100 Siena, Italy<br/>VAT: IT12345678</div></div>
            <div><div className="inv-party-label">{t("to")}</div><div className="inv-party-name">{invoice.clientName}</div><div className="inv-party-detail">{invoice.vatNote}</div></div>
          </div>
          <table className="inv-table">
            <thead><tr><th>{t("description")}</th><th>{t("quantity")}</th><th>{t("unitPrice")}</th><th>{t("total")}</th></tr></thead>
            <tbody>
              <tr><td>{invoice.wine} — 750ml {t("bottles").toLowerCase()}</td><td>{invoice.qty} btl</td><td>{fmtMoney(invoice.unitPrice)}</td><td>{fmtMoney(invoice.qty*invoice.unitPrice)}</td></tr>
            </tbody>
          </table>
          <div className="inv-total-row">
            <div><div className="inv-total-label">{t("subtotal")}</div><div style={{fontFamily:"monospace",textAlign:"right"}}>{fmtMoney(subtotal)}</div></div>
            <div><div className="inv-total-label">{t("vat")}</div><div style={{fontFamily:"monospace",textAlign:"right",color:"#666"}}>{t("seeNote")}</div></div>
            <div><div className="inv-total-label">{t("totalDue")}</div><div className="inv-total-value">{fmtMoney(subtotal)}</div></div>
          </div>
          <div className="inv-vat-note">{invoice.vatNote}</div>
          <div className="inv-footer">{t("paymentTerms")} · Bank: IBAN IT00 0000 0000 0000 0000 0000 · BIC: ITASITMM · {t("ref")}: {invoice.id}</div>
        </div>
      </div>
    </div>
  );
}

// ── Reorder Reminders ─────────────────────────────────────────────────────────
function Reminders({ clients, t }) {
  const reminders = computeReminders(clients, t);
  const overdue = reminders.filter(c=>c.urgency==="red");
  const warning = reminders.filter(c=>c.urgency==="gold");
  const ok = reminders.filter(c=>c.urgency==="green");

  const RCard = ({c}) => (
    <div className={`reminder-card ${c.urgency==="red"?"urgent":c.urgency==="gold"?"warning":""}`}>
      <div className={`reminder-urgency urgency-${c.urgency}`}/>
      <div className="reminder-info">
        <div className="reminder-client">{c.name} <span className={`badge ${clientTypeColor(c.type)}`} style={{fontSize:".52rem"}}>{c.type}</span></div>
        <div className="reminder-detail">{c.city}, {c.country} · {t("lastOrder")}: {c.lastOrder} · {t("reorderInterval")}: every {c.reorderIntervalDays}d</div>
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
      <div className="page-header"><div className="page-header-left"><h2>{t("reorderRemindersFull")}</h2><p>{t("followUpSub")}</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card danger"><div className="stat-label">{t("overdue")}</div><div className="stat-value">{overdue.length}</div><div className="stat-sub">{t("needsFollowUp")}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("dueSoon")}</div><div className="stat-value">{warning.length}</div><div className="stat-sub">{t("approachingWindow")}</div></div>
        <div className="stat-card green"><div className="stat-label">{t("onTrack")}</div><div className="stat-value">{ok.length}</div><div className="stat-sub">{t("noActionNeeded")}</div></div>
      </div>
      {overdue.length>0&&<><div className="section-title" style={{color:"#e08080"}}>{t("overdueContactNow")}</div>{overdue.map(c=><RCard key={c.id} c={c}/>)}<div className="divider"/></>}
      {warning.length>0&&<><div className="section-title" style={{color:"var(--gold)"}}>{t("dueSoon")}</div>{warning.map(c=><RCard key={c.id} c={c}/>)}<div className="divider"/></>}
      {ok.length>0&&<><div className="section-title">{t("onTrack")}</div>{ok.map(c=><RCard key={c.id} c={c}/>)}</>}
    </>
  );
}

// ── Harvest Tracking ──────────────────────────────────────────────────────────
function Harvest({ harvests, onAdd, t }) {
  const [selected,setSelected]=useState(null);
  if(selected) return <HarvestDetail harvest={selected} onBack={()=>setSelected(null)} t={t}/>;
  const totalKg=harvests.reduce((s,h)=>s+h.kgHarvested,0);
  const activeCount=harvests.filter(h=>h.stage!=="Bottled").length;
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("harvestProduction")}</h2><p>{t("wineLogSub")}</p></div><button className="btn btn-gold" onClick={onAdd}>{t("newHarvest")}</button></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">{t("activeProductions")}</div><div className="stat-value">{activeCount}</div><div className="stat-sub">{harvests.length} {t("totalRecords")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("totalKgHarvested")}</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{totalKg.toLocaleString()}</div><div className="stat-sub">{t("thisLogbook")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("expectedBottles")}</div><div className="stat-value" style={{fontSize:"1.5rem",marginTop:4}}>{harvests.filter(h=>h.stage!=="Bottled").reduce((s,h)=>s+h.expectedBottles,0).toLocaleString()}</div><div className="stat-sub">{t("inPipeline")}</div></div>
      </div>
      <div className="harvest-grid">
        {harvests.length===0?<div className="empty" style={{gridColumn:"1/-1"}}>{t("noHarvestsYet")}</div>:harvests.map(h=>{
          const si=stageIndex(h.stage);
          return (
            <div className="harvest-card" key={h.id} onClick={()=>setSelected(h)}>
              <h4>{h.grape} <span style={{fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--muted)"}}>{h.vintage}</span></h4>
              <div className="hc-sub">{h.plot} · {t("harvestLabel")} {h.harvestDate}</div>
              <div className="hc-stages">
                {["Harvest","Ferment","Aging","Bottled"].map((s,i)=>(
                  <div key={s} className={`hc-stage ${i<si?"done":i===si?"active":""}`}/>
                ))}
              </div>
              <span className={`badge ${harvestStageColor(h.stage)}`} style={{marginBottom:10,display:"inline-block"}}>{h.stage}</span>
              <div className="hc-row"><span>{t("kgHarvested")}</span><span>{h.kgHarvested.toLocaleString()}</span></div>
              <div className="hc-row"><span>{t("brix")}</span><span>{h.brixAtHarvest}°</span></div>
              <div className="hc-row"><span>{t("ph")}</span><span>{h.ph}</span></div>
              <div className="hc-row"><span>{t("expectedBottles")}</span><span>{h.expectedBottles.toLocaleString()}</span></div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function HarvestDetail({ harvest:h, onBack, t }) {
  const si=stageIndex(h.stage);
  const stages=["Harvest","Fermenting","Aging","Bottled"];
  return (
    <>
      <button className="profile-back" onClick={onBack}>{t("backToHarvestLog")}</button>
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
          <div className="section-title">{t("harvestData")}</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[[t("grapeVariety"),h.grape],[t("vineyardPlot"),h.plot],[t("vintage"),h.vintage],[t("harvestDate"),h.harvestDate],[t("kgHarvested"),h.kgHarvested.toLocaleString()+" kg"],[t("brix"),h.brixAtHarvest+"°"],[t("ph"),h.ph]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>{k}</span>
                <span style={{fontSize:".9rem"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">{t("productionTimeline")}</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[[t("fermentationStart"),h.fermentStart||"—"],[t("fermentationEnd"),h.fermentEnd||t("inProgress")],[t("agingStart"),h.agingStart||"—"],[t("agingVessel"),h.agingVessel],[t("expectedBottling"),h.expectedBottling],[t("expectedBottles"),h.expectedBottles.toLocaleString()]].map(([k,v])=>(
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
function Clients({ clients, transactions, onAdd, onSelect, t }) {
  const [search,setSearch]=useState(""); const [ft,setFt]=useState("All");
  const filtered=clients.filter(c=>(ft==="All"||c.type===ft)&&(c.name.toLowerCase().includes(search.toLowerCase())||c.country.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("clients")}</h2><p>{t("allAccountsSub")}</p></div></div>
      <div className="stats-grid-3">
        <div className="stat-card green"><div className="stat-label">{t("totalAccountsStat")}</div><div className="stat-value">{clients.length}</div><div className="stat-sub">{clients.filter(c=>c.status==="Active").length} {t("active")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("totalBottlesShipped")}</div><div className="stat-value">{clients.reduce((s,c)=>s+c.totalBottles,0).toLocaleString()}</div><div className="stat-sub">{t("lifetime")}</div></div>
        <div className="stat-card danger"><div className="stat-label">{t("overdueReorders")}</div><div className="stat-value">{clients.filter(c=>c.status==="Overdue").length}</div><div className="stat-sub">{t("needFollowUp")}</div></div>
      </div>
      <div className="search-bar">
        <input placeholder={t("searchClients")} value={search} onChange={e=>setSearch(e.target.value)}/>
        <select style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:6,padding:"9px 13px",color:"var(--cream)",fontFamily:"var(--font-serif)",fontSize:".92rem",outline:"none"}} value={ft} onChange={e=>setFt(e.target.value)}>
          {["All","Restaurant","Distributor","Retailer","Private"].map(typ=><option key={typ} value={typ}>{typ==="All"?t("all"):typ}</option>)}
        </select>
        <button className="btn btn-gold" onClick={onAdd}>{t("newClient")}</button>
      </div>
      <div className="clients-grid">
        {filtered.length===0?<div className="empty" style={{gridColumn:"1/-1"}}>{t("noClients")}</div>:filtered.map(c=>{
          const clientTx=transactions.filter(tx=>tx.clientId===c.id);
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
                <div className="client-stat"><div className="client-stat-label">{t("shipped")}</div><div className="client-stat-value">{c.totalBottles.toLocaleString()}</div></div>
                <div className="client-stat"><div className="client-stat-label">{t("orders")}</div><div className="client-stat-value">{clientTx.length}</div></div>
                <div className="client-stat"><div className="client-stat-label">{t("lastOrder")}</div><div className="client-stat-value" style={{fontSize:".7rem"}}>{c.lastOrder}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ClientProfile({ client:c, transactions, onBack, t }) {
  const clientTx=transactions.filter(tx=>tx.clientId===c.id);
  const ds=daysSince(c.lastOrder);
  return (
    <>
      <button className="profile-back" onClick={onBack}>{t("backToClients")}</button>
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
      {c.status==="Overdue"&&<div className="alert"><span className="reorder-dot"/>{t("overdueFollowUp").replace("{0}", ds)}</div>}
      <div className="stats-grid">
        <div className="stat-card green"><div className="stat-label">{t("totalBottles")}</div><div className="stat-value">{c.totalBottles.toLocaleString()}</div><div className="stat-sub">{t("lifetimeShipped")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("orders")}</div><div className="stat-value">{clientTx.length}</div><div className="stat-sub">{t("transactions").toLowerCase()}</div></div>
        <div className="stat-card"><div className="stat-label">{t("daysSinceOrder")}</div><div className="stat-value">{ds}</div><div className="stat-sub">{t("last")}: {c.lastOrder}</div></div>
        <div className="stat-card"><div className="stat-label">{t("pricingTier")}</div><div className="stat-value" style={{fontSize:"1.1rem",marginTop:6}}>{c.pricingTier}</div><div className="stat-sub">{fmtMoney(PRICE_TIERS[c.pricingTier]||0)}/btl</div></div>
      </div>
      <div className="two-col">
        <div>
          <div className="section-title">{t("contactDetails")}</div>
          <div className="table-wrap" style={{padding:"16px 20px"}}>
            {[[t("contact"),c.contact],[t("email"),c.email],[t("phone"),c.phone],[t("city"),c.city],[t("country"),c.country],[t("vatRegime"),isEU(c.country)?"EU Intra-community":"Export / Third country"],[t("reorderInterval"),`Every ${c.reorderIntervalDays} days`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>{k}</span>
                <span style={{fontSize:".9rem"}}>{v}</span>
              </div>
            ))}
            {c.notes&&<div style={{marginTop:14,fontFamily:"var(--font-mono)",fontSize:".65rem",color:"var(--muted)",lineHeight:1.6}}>📝 {c.notes}</div>}
          </div>
        </div>
        <div>
          <div className="section-title">{t("orderHistory")}</div>
          <div className="table-wrap">
            {clientTx.length===0?<div className="empty">{t("noTransactions")}</div>:clientTx.map(tx=>{const {cls,icon}=txIcon(tx.type);return(
              <div className="tx-item" key={tx.id}><div className={`tx-icon ${cls}`}>{icon}</div><div className="tx-info"><div className="tx-title">{tx.wine}</div><div className="tx-meta">{tx.batch} · {tx.note} · {tx.date}{tx.invoiceId&&<span style={{color:"var(--gold)"}}> · {tx.invoiceId}</span>}</div></div>{tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty>0?"+":""}{tx.qty}</div>}</div>
            );})}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Modals ────────────────────────────────────────────────────────────────────
function AddBatchModal({ onClose, onSave, t }) {
  const [form,setForm]=useState({wine:"",vintage:new Date().getFullYear(),type:"Red",grapes:"",plot:"",qty:"",location:"Main Cellar"});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.wine||!form.qty)return;const abbr=form.type==="Sparkling"?"BRUT":form.wine.split(" ").pop().toUpperCase().slice(0,5);const id=`LOT-${form.vintage}-${abbr}-${String(Math.floor(Math.random()*90+10)).padStart(2,"0")}`;onSave({...form,id,qty:parseInt(form.qty),vintage:parseInt(form.vintage),status:"Aging",bottled:new Date().toISOString().slice(0,10)});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>{t("newBatchTitle")}</h3><div className="form-group"><label>{t("wineName")}</label><input placeholder="e.g. Riserva Sangiovese" value={form.wine} onChange={e=>set("wine",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>{t("vintageYear")}</label><input type="number" value={form.vintage} onChange={e=>set("vintage",e.target.value)}/></div><div className="form-group"><label>{t("type")}</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{["Red","White","Rosé","Sparkling"].map(typ=><option key={typ}>{typ}</option>)}</select></div></div><div className="form-group"><label>{t("grapeVarieties")}</label><input placeholder="e.g. Sangiovese 80%" value={form.grapes} onChange={e=>set("grapes",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>{t("vineyardPlot")}</label><input placeholder="e.g. East Hill" value={form.plot} onChange={e=>set("plot",e.target.value)}/></div><div className="form-group"><label>{t("bottlesFilled")}</label><input type="number" placeholder="e.g. 2400" value={form.qty} onChange={e=>set("qty",e.target.value)}/></div></div><div className="form-group"><label>{t("storageLocation")}</label><select value={form.location} onChange={e=>set("location",e.target.value)}>{LOCATIONS.map(l=><option key={l.name}>{l.name}</option>)}</select></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={handleSave}>{t("createBatch")}</button></div></div></div>;
}

function AddClientModal({ onClose, onSave, t }) {
  const [form,setForm]=useState({name:"",country:"",city:"",type:"Restaurant",contact:"",email:"",phone:"",pricingTier:"Standard",reorderIntervalDays:60,notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.name||!form.country)return;onSave({...form,id:`CLI-${String(Date.now()).slice(-4)}`,status:"Active",totalBottles:0,lastOrder:"—",reorderIntervalDays:parseInt(form.reorderIntervalDays)});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>{t("newClientTitle")}</h3><div className="form-row"><div className="form-group"><label>{t("clientName")}</label><input placeholder="e.g. Maison Dubois" value={form.name} onChange={e=>set("name",e.target.value)}/></div><div className="form-group"><label>{t("type")}</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{["Restaurant","Distributor","Retailer","Private"].map(typ=><option key={typ}>{typ}</option>)}</select></div></div><div className="form-row"><div className="form-group"><label>{t("country")}</label><input placeholder="e.g. France" value={form.country} onChange={e=>set("country",e.target.value)}/></div><div className="form-group"><label>{t("city")}</label><input placeholder="e.g. Lyon" value={form.city} onChange={e=>set("city",e.target.value)}/></div></div><div className="form-group"><label>{t("contactPerson")}</label><input value={form.contact} onChange={e=>set("contact",e.target.value)}/></div><div className="form-row"><div className="form-group"><label>{t("email")}</label><input value={form.email} onChange={e=>set("email",e.target.value)}/></div><div className="form-group"><label>{t("phone")}</label><input value={form.phone} onChange={e=>set("phone",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>{t("pricingTier")}</label><select value={form.pricingTier} onChange={e=>set("pricingTier",e.target.value)}>{["Standard","Premium","Wholesale","Export"].map(typ=><option key={typ}>{typ}</option>)}</select></div><div className="form-group"><label>{t("reorderIntervalDays")}</label><input type="number" value={form.reorderIntervalDays} onChange={e=>set("reorderIntervalDays",e.target.value)}/></div></div><div className="form-group"><label>{t("notes")}</label><input value={form.notes} onChange={e=>set("notes",e.target.value)}/></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={handleSave}>{t("saveClient")}</button></div></div></div>;
}

function AddHarvestModal({ onClose, onSave, t }) {
  const [form,setForm]=useState({grape:"",plot:"",vintage:new Date().getFullYear(),harvestDate:"",kgHarvested:"",brixAtHarvest:"",ph:"",fermentStart:"",agingVessel:"French Oak",expectedBottling:"",expectedBottles:"",stage:"Harvest",notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const handleSave=()=>{if(!form.grape||!form.harvestDate)return;onSave({...form,id:`HARV-${form.vintage}-${form.grape.toUpperCase().slice(0,4)}`,kgHarvested:parseInt(form.kgHarvested)||0,brixAtHarvest:parseFloat(form.brixAtHarvest)||0,ph:parseFloat(form.ph)||0,expectedBottles:parseInt(form.expectedBottles)||0,vintage:parseInt(form.vintage),fermentEnd:null,agingStart:null});onClose();};
  return <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><h3>{t("logNewHarvest")}</h3><div className="form-row"><div className="form-group"><label>{t("grapeVariety")}</label><input placeholder="e.g. Sangiovese" value={form.grape} onChange={e=>set("grape",e.target.value)}/></div><div className="form-group"><label>{t("vintage")}</label><input type="number" value={form.vintage} onChange={e=>set("vintage",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>{t("vineyardPlot")}</label><input placeholder="e.g. East Hill" value={form.plot} onChange={e=>set("plot",e.target.value)}/></div><div className="form-group"><label>{t("harvestDate")}</label><input type="date" value={form.harvestDate} onChange={e=>set("harvestDate",e.target.value)}/></div></div><div className="form-row-3"><div className="form-group"><label>{t("kgHarvested")}</label><input type="number" placeholder="12400" value={form.kgHarvested} onChange={e=>set("kgHarvested",e.target.value)}/></div><div className="form-group"><label>{t("brix")}</label><input type="number" step=".1" placeholder="24.2" value={form.brixAtHarvest} onChange={e=>set("brixAtHarvest",e.target.value)}/></div><div className="form-group"><label>{t("ph")}</label><input type="number" step=".01" placeholder="3.41" value={form.ph} onChange={e=>set("ph",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>{t("fermentationStart")}</label><input type="date" value={form.fermentStart} onChange={e=>set("fermentStart",e.target.value)}/></div><div className="form-group"><label>{t("agingVessel")}</label><input placeholder="e.g. French Oak 225L x12" value={form.agingVessel} onChange={e=>set("agingVessel",e.target.value)}/></div></div><div className="form-row"><div className="form-group"><label>{t("expectedBottling")}</label><input type="date" value={form.expectedBottling} onChange={e=>set("expectedBottling",e.target.value)}/></div><div className="form-group"><label>{t("expectedBottles")}</label><input type="number" placeholder="16500" value={form.expectedBottles} onChange={e=>set("expectedBottles",e.target.value)}/></div></div><div className="form-group"><label>{t("currentStage")}</label><select value={form.stage} onChange={e=>set("stage",e.target.value)}>{["Harvest","Fermenting","Aging","Bottled"].map(s=><option key={s}>{s}</option>)}</select></div><div className="form-group"><label>{t("notes")}</label><textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder={t("observations")}/></div><div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={handleSave}>{t("logHarvest")}</button></div></div></div>;
}

function LogTransactionModal({ batch, clients, onClose, onSave, t }) {
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
  const typeLabels={in:t("inbound"),out:t("outbound"),write:t("writeOff"),move:t("internalMove")};
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <h3>{t("logTransaction")}</h3>
        <div className="info-box">{batch.id} — {batch.wine} — <span>{batch.qty.toLocaleString()} {t("btlAvailable")}</span></div>
        <div className="form-group"><label>{t("transactionType")}</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{Object.entries(typeLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></div>
        {form.type==="out"&&<div className="form-group"><label>{t("clientRequired")}</label><select value={form.clientId} onChange={e=>set("clientId",e.target.value)}><option value="">{t("selectClient")}</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name} ({c.country})</option>)}</select></div>}
        {sc&&<div className="info-box">{sc.city}, {sc.country} · {sc.type} · {sc.pricingTier} ({fmtMoney(PRICE_TIERS[sc.pricingTier]||12)}/btl){isEU(sc.country)?<span className="eu-flag">EU</span>:<span className="export-flag">Export</span>}<br/><span style={{marginTop:4,display:"block"}}>{t("invoiceAutoGenerated")}</span></div>}
        {form.type!=="move"&&<div className="form-group"><label>{t("quantityBottles")}</label><input type="number" placeholder="e.g. 200" value={form.qty} onChange={e=>set("qty",e.target.value)}/></div>}
        {sc&&form.qty&&<div className="info-box">{t("orderValue")}: <span>{fmtMoney(parseInt(form.qty)*(PRICE_TIERS[sc.pricingTier]||12))}</span></div>}
        <div className="form-group"><label>{t("note")}</label><input placeholder="e.g. Q1 allocation…" value={form.note} onChange={e=>set("note",e.target.value)}/></div>
        <div className="form-group"><label>{t("staffName")}</label><input placeholder="Your name" value={form.user} onChange={e=>set("user",e.target.value)}/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={handleSave}>{t("logAndGenerate")}</button></div>
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

function DonutChart({ segments, t }) {
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
  const bottlesLabel = t ? t("bottles").toUpperCase() : "BOTTLES";
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
        <text x={cx} y={cy + 8} textAnchor="middle" fill="var(--muted)" fontSize="5.5" fontFamily="var(--font-mono)">{bottlesLabel}</text>
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
function Analytics({ batches, transactions, clients, invoices, t }) {
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
    value: Math.abs(transactions.filter(tx => tx.type === "out" && new Date(tx.date).getMonth() === i)
      .reduce((s, tx) => s + tx.qty, 0))
  }));
  const totalShipped = Math.abs(transactions.filter(tx => tx.type === "out").reduce((s, tx) => s + tx.qty, 0));
  const totalWriteOff = Math.abs(transactions.filter(tx => tx.type === "write").reduce((s, tx) => s + tx.qty, 0));

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
  transactions.filter(tx => tx.type === "out" && tx.clientId).forEach(tx => {
    const client = clients.find(c => c.id === tx.clientId);
    if (client) { byCountry[client.country] = (byCountry[client.country] || 0) + Math.abs(tx.qty); }
  });
  const countryData = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([k, v]) => ({ label: k, value: v }));
  const maxCountry = countryData[0]?.value || 1;

  const countryColors = ["#c9a84c","#7b9c7b","#7b6c9c","#9c7b7b","#7b8c9c","#9c907b"];

  const tabs = [
    { id: "revenue", label: t("revenue") },
    { id: "inventory", label: t("inventoryTab") },
    { id: "clients", label: t("clientsTab") },
    { id: "geography", label: t("geography") },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t("analyticsReports")}</h2>
          <p>{t("biSub")}</p>
        </div>
      </div>

      {/* KPI row — always visible */}
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-label">{t("totalRevenueStat")}</div><div className="kpi-value">{fmtMoney(totalRevenue)}</div><div className="kpi-change kpi-up">↑ {t("paid").toLowerCase()} invoices</div></div>
        <div className="kpi-card"><div className="kpi-label">{t("pendingRevenueStat")}</div><div className="kpi-value">{fmtMoney(pendingRevenue)}</div><div className="kpi-change" style={{color:"var(--gold)"}}>→ awaiting payment</div></div>
        <div className="kpi-card"><div className="kpi-label">{t("bottlesShipped")}</div><div className="kpi-value">{totalShipped.toLocaleString()}</div><div className="kpi-change kpi-down">↓ {totalWriteOff} {t("writeOffs").toLowerCase()}</div></div>
        <div className="kpi-card"><div className="kpi-label">{t("avgOrderValue")}</div><div className="kpi-value">{fmtMoney(Math.round(avgOrderValue))}</div><div className="kpi-change" style={{color:"var(--muted)"}}>across {invoices.length} {t("invoices").toLowerCase()}</div></div>
        <div className="kpi-card"><div className="kpi-label">{t("activeClientsStat")}</div><div className="kpi-value">{clients.filter(c=>c.status==="Active").length}</div><div className="kpi-change kpi-down" style={{color:"#e08080"}}>{clients.filter(c=>c.status==="Overdue").length} {t("overdue").toLowerCase()}</div></div>
        <div className="kpi-card"><div className="kpi-label">{t("totalStock")}</div><div className="kpi-value">{batches.reduce((s,b)=>s+b.qty,0).toLocaleString()}</div><div className="kpi-change" style={{color:"var(--muted)"}}>{batches.length} {t("activeLots")}</div></div>
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
              <h4>{t("monthlyRevenue")}</h4>
              <BarChart data={revenueByMonth} color="#c9a84c" valuePrefix="€" />
            </div>
            <div className="chart-card">
              <h4>{t("revenueByClient")}</h4>
              <HBar items={revenueByClient} max={maxRevClient} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>{t("revenueTrend")}</h4>
              <LineChart data={revenueByMonth.filter(m => m.value > 0).length > 1 ? revenueByMonth : revenueByMonth.map((m, i) => ({ ...m, value: Math.round(Math.random() * 8000 + 2000) }))} color="#c9a84c" />
            </div>
            <div className="chart-card">
              <h4>{t("invoiceStatus")}</h4>
              <DonutChart t={t} segments={[
                { label: t("paid"), value: invoices.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.qty*i.unitPrice,0), color: "#3a6b4a" },
                { label: t("pending"), value: pendingRevenue, color: "#c9a84c" },
                { label: t("draft"), value: invoices.filter(i=>i.status==="Draft").reduce((s,i)=>s+i.qty*i.unitPrice,0), color: "#4a4030" },
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
              <h4>{t("bottlesShippedMonth")}</h4>
              <BarChart data={shipsByMonth} color="#7b9c8b" />
            </div>
            <div className="chart-card">
              <h4>{t("stockByWineType")}</h4>
              <DonutChart t={t} segments={byType} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>{t("currentStockLevels")}</h4>
              <HBar
                items={[...batches].sort((a,b)=>b.qty-a.qty).map(b=>({ label: b.wine, value: b.qty }))}
                max={Math.max(...batches.map(b=>b.qty),1)}
                colorFn={i => ["#7b2d3e","#c9a84c","#c06878","#a0b8d0","#7b9c7b","#9c7b9c"][i%6]}
              />
            </div>
            <div className="chart-card">
              <h4>{t("inventoryHealth")}</h4>
              {[
                { label: t("ready"), value: batches.filter(b=>b.status==="Ready").reduce((s,b)=>s+b.qty,0), color: "#3a6b4a" },
                { label: t("aging"), value: batches.filter(b=>b.status==="Aging").reduce((s,b)=>s+b.qty,0), color: "#c9a84c" },
                { label: t("lowStock"), value: batches.filter(b=>b.status==="Low Stock").reduce((s,b)=>s+b.qty,0), color: "#8b3a3a" },
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
              <h4>{t("topClientsByVolume")}</h4>
              <HBar items={topClients} max={maxClient} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
            <div className="chart-card">
              <h4>{t("clientTypeMix")}</h4>
              <DonutChart t={t} segments={[
                { label: "Restaurant", value: clients.filter(c=>c.type==="Restaurant").length, color: "#a090d0" },
                { label: "Distributor", value: clients.filter(c=>c.type==="Distributor").length, color: "#80b0d4" },
                { label: "Retailer", value: clients.filter(c=>c.type==="Retailer").length, color: "#c4a060" },
                { label: "Private", value: clients.filter(c=>c.type==="Private").length, color: "#a0c480" },
              ].filter(s=>s.value>0)} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>{t("clientStatusOverview")}</h4>
              {[
                { label: t("active"), value: clients.filter(c=>c.status==="Active").length, color: "#3a6b4a" },
                { label: t("activeOverdueReorder"), value: clients.filter(c=>c.status==="Overdue").length, color: "#8b3a3a" },
                { label: t("inactive"), value: clients.filter(c=>c.status==="Inactive").length, color: "#4a4030" },
              ].map((row, i) => (
                <div className="hbar-row" key={i}>
                  <div className="hbar-name">{row.label}</div>
                  <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(row.value / clients.length) * 100}%`, background: row.color }} /></div>
                  <div className="hbar-val">{row.value}</div>
                </div>
              ))}
            </div>
            <div className="chart-card">
              <h4>{t("euExportSplit")}</h4>
              <DonutChart t={t} segments={[
                { label: t("euClients"), value: clients.filter(c=>isEU(c.country)).reduce((s,c)=>s+c.totalBottles,0), color: "#8898e0" },
                { label: t("exportClients"), value: clients.filter(c=>!isEU(c.country)).reduce((s,c)=>s+c.totalBottles,0), color: "#c4a060" },
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
              <h4>{t("bottlesShippedCountry")}</h4>
              <HBar items={countryData} max={maxCountry} colorFn={i => countryColors[i % countryColors.length]} />
            </div>
            <div className="chart-card">
              <h4>{t("countryDistribution")}</h4>
              <DonutChart t={t} segments={countryData.map((c, i) => ({ ...c, color: countryColors[i % countryColors.length] }))} />
            </div>
          </div>
          <div>
            <div className="chart-card">
              <h4>{t("revenueByCountry")}</h4>
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
              <h4>{t("pricingTierBreakdown")}</h4>
              <DonutChart t={t} segments={["Standard","Premium","Wholesale","Export"].map((tier,i)=>({
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

// ── Bulk Wine (Vino Sfuso) ────────────────────────────────────────────────────
function ShipBulkModal({ lot, clients, onClose, onSave, t }) {
  const [clientId,setClientId]=useState("");
  const [liters,setLiters]=useState("");
  const [note,setNote]=useState("");
  const sc=clients.find(c=>c.id===clientId);
  const L=parseFloat(liters)||0;
  const orderVal=L*(lot.pricePerLiter||0);
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <h3>{t("shipBulk")}</h3>
        <div className="info-box">{lot.id} — {lot.wine} — <span>{lot.liters.toLocaleString()} {t("litersShort")} {t("available").toLowerCase()}</span></div>
        <div className="form-group"><label>{t("client")}</label><select value={clientId} onChange={e=>setClientId(e.target.value)}><option value="">{t("selectClient")}</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name} ({c.country})</option>)}</select></div>
        {sc&&<div className="info-box">{sc.city}, {sc.country} · {sc.type}{isEU(sc.country)?<span className="eu-flag"> EU</span>:<span className="export-flag"> Export</span>}</div>}
        <div className="form-group"><label>{t("quantityLiters")}</label><input type="number" min="1" max={lot.liters} value={liters} onChange={e=>setLiters(e.target.value)} placeholder="e.g. 1000"/></div>
        {sc&&L>0&&<div className="info-box">{t("orderValue")}: <span>{fmtMoney(orderVal)}</span></div>}
        <div className="form-group"><label>{t("note")}</label><input value={note} onChange={e=>setNote(e.target.value)}/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={()=>{if(!sc||L<=0||L>lot.liters)return;onSave(lot,sc,L,note);onClose();}}>{t("logBulkShipment")}</button></div>
      </div>
    </div>
  );
}

function AddBulkModal({ onClose, onSave, t }) {
  const [form,setForm]=useState({wine:"",type:"Red",vintage:new Date().getFullYear(),plot:"",grapes:"",liters:"",pricePerLiter:"",vessel:"Flexitank",notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const save=()=>{if(!form.wine||!form.liters)return;const ab=form.wine.split(" ").pop().toUpperCase().slice(0,4);const id=`BULK-${form.vintage}-${ab}-${String(Math.floor(Math.random()*90+10)).padStart(2,"0")}`;onSave({id,wine:form.wine,type:form.type,vintage:parseInt(form.vintage),plot:form.plot,grapes:form.grapes,liters:parseFloat(form.liters)||0,vessel:form.vessel,pricePerLiter:parseFloat(form.pricePerLiter)||0,status:"Available",added:new Date().toISOString().slice(0,10),notes:form.notes});onClose();};
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-wide">
        <h3>{t("newBulkLot")}</h3>
        <div className="form-row"><div className="form-group"><label>{t("wineName")}</label><input value={form.wine} onChange={e=>set("wine",e.target.value)}/></div><div className="form-group"><label>{t("type")}</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{["Red","White","Rosé","Sparkling"].map(x=><option key={x}>{x}</option>)}</select></div></div>
        <div className="form-row"><div className="form-group"><label>{t("vintageYear")}</label><input type="number" value={form.vintage} onChange={e=>set("vintage",e.target.value)}/></div><div className="form-group"><label>{t("vineyardPlot")}</label><input value={form.plot} onChange={e=>set("plot",e.target.value)}/></div></div>
        <div className="form-group"><label>{t("grapeVarieties")}</label><input value={form.grapes} onChange={e=>set("grapes",e.target.value)}/></div>
        <div className="form-row"><div className="form-group"><label>{t("liters")}</label><input type="number" value={form.liters} onChange={e=>set("liters",e.target.value)}/></div><div className="form-group"><label>{t("pricePerLiter")}</label><input type="number" step="0.01" value={form.pricePerLiter} onChange={e=>set("pricePerLiter",e.target.value)}/></div></div>
        <div className="form-group"><label>{t("vessel")}</label><input value={form.vessel} onChange={e=>set("vessel",e.target.value)}/></div>
        <div className="form-group"><label>{t("notes")}</label><textarea value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder={t("bulkNotesPlaceholder")}/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={save}>{t("saveBulkLot")}</button></div>
      </div>
    </div>
  );
}

function BulkWine({ bulkStock, bulkTransactions, clients, t, onAdd, onShip, showHistory, setShowHistory }) {
  const totalL=bulkStock.reduce((s,b)=>s+b.liters,0);
  const availL=bulkStock.filter(b=>b.status==="Available").reduce((s,b)=>s+b.liters,0);
  const shippedL=Math.abs(bulkTransactions.reduce((s,tx)=>s+(tx.liters<0?tx.liters:0),0));
  const estVal=bulkStock.filter(b=>b.status==="Available").reduce((s,b)=>s+b.liters*b.pricePerLiter,0);
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("bulkWine")}</h2><p>{t("bulkWineSub")}</p></div><button className="btn btn-gold" onClick={onAdd}>{t("addBulkLot")}</button></div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">{t("totalHectolitres")}</div><div className="stat-value">{(totalL/100).toFixed(1)}</div><div className="stat-sub">{totalL.toLocaleString()} {t("litersShort")}</div></div>
        <div className="stat-card green"><div className="stat-label">{t("availableHL")}</div><div className="stat-value">{(availL/100).toFixed(1)}</div><div className="stat-sub">{availL.toLocaleString()} {t("litersShort")}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("shippedHL")}</div><div className="stat-value">{(shippedL/100).toFixed(1)}</div><div className="stat-sub">{shippedL.toLocaleString()} {t("litersShort")}</div></div>
        <div className="stat-card"><div className="stat-label">{t("estStockValue")}</div><div className="stat-value" style={{fontSize:"1.35rem"}}>{fmtMoney(estVal)}</div><div className="stat-sub">{t("available")}</div></div>
      </div>
      <div style={{marginBottom:14}}><button className="btn btn-ghost btn-sm" onClick={()=>setShowHistory(!showHistory)}>{showHistory?t("hideHistory"):t("shipmentHistory")}</button></div>
      {showHistory&&<div className="table-wrap" style={{marginBottom:24}}>{bulkTransactions.length===0?<div className="empty">{t("noTransactions")}</div>:bulkTransactions.map(tx=>(
        <div className="tx-item" key={tx.id}><div className="tx-icon tx-out">↑</div><div className="tx-info"><div className="tx-title">{tx.wine} → {tx.clientName}</div><div className="tx-meta">{tx.bulkId} · {Math.abs(tx.liters).toLocaleString()} {t("litersShort")} · {tx.date}</div></div><div className="tx-qty neg">{tx.liters}</div></div>
      ))}</div>}
      <div className="harvest-grid">
        {bulkStock.length===0?<div className="empty" style={{gridColumn:"1/-1"}}>{t("noBulkLots")}</div>:bulkStock.map(b=>{
          const hl=b.liters/100; const phl=b.pricePerLiter*100;
          return (
            <div className="harvest-card" key={b.id}>
              <h4>{b.wine} <span style={{fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--muted)"}}>{b.vintage}</span></h4>
              <div className="hc-sub">{b.plot} · {b.grapes}</div>
              <span className={`badge ${bulkStatusColor(b.status)}`} style={{marginBottom:10,display:"inline-block"}}>{b.status}</span>
              <div className="hc-row"><span>{t("liters")}</span><span>{b.liters.toLocaleString()}</span></div>
              <div className="hc-row"><span>{t("hl")}</span><span>{hl.toFixed(2)}</span></div>
              <div className="hc-row"><span>{t("pricePerLiter")}</span><span>{fmtMoney(b.pricePerLiter)}</span></div>
              <div className="hc-row"><span>{t("pricePerHL")}</span><span>{fmtMoney(phl)}</span></div>
              <div className="hc-row"><span>{t("vessel")}</span><span>{b.vessel}</span></div>
              <button className="btn btn-gold btn-sm" style={{marginTop:12,width:"100%"}} disabled={b.liters<=0||b.status!=="Available"} onClick={()=>onShip(b)}>{t("ship")}</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Sales by Customer Type ───────────────────────────────────────────────────
const TYPES = ["Restaurant","Distributor","Retailer","Private"];
function clientInvoiceTotal(cId, invoices){return invoices.filter(i=>i.clientId===cId).reduce((s,i)=>s+i.qty*i.unitPrice,0);}
function clientBulkTotal(cId, bulkTx){return bulkTx.filter(x=>x.clientId===cId).reduce((s,x)=>s+Math.abs(x.liters)*x.pricePerLiter,0);}

function SalesByType({ clients, transactions, invoices, bulkTransactions, t }) {
  const [view,setView]=useState("top"); const [seg,setSeg]=useState(null); const [selClient,setSelClient]=useState(null); const [clientFrom,setClientFrom]=useState(null);
  const clientRows=clients.map(c=>({c,btl:c.totalBottles,inv:clientInvoiceTotal(c.id,invoices),bulkL:Math.abs(bulkTransactions.filter(x=>x.clientId===c.id).reduce((s,x)=>s+x.liters,0)),rev:clientInvoiceTotal(c.id,invoices)+clientBulkTotal(c.id,bulkTransactions)})).sort((a,b)=>b.rev-a.rev);
  const typeData=TYPES.map(ty=>{
    const cs=clients.filter(c=>c.type===ty);
    const rev=cs.reduce((s,c)=>s+clientInvoiceTotal(c.id,invoices)+clientBulkTotal(c.id,bulkTransactions),0);
    const btl=cs.reduce((s,c)=>s+c.totalBottles,0);
    const bl=cs.reduce((s,c)=>s+Math.abs(bulkTransactions.filter(x=>x.clientId===c.id).reduce((a,x)=>a+x.liters,0)),0);
    return {ty,rev,btl,bl,cs};
  });
  const totalRev=typeData.reduce((s,x)=>s+x.rev,1)||1;
  if(view==="client"&&selClient){
    const c=selClient; const btx=transactions.filter(x=>x.clientId===c.id&&x.type==="out"); const bul=bulkTransactions.filter(x=>x.clientId===c.id); const invs=invoices.filter(i=>i.clientId===c.id);
    return (
      <>
        <button className="profile-back" onClick={()=>{if(clientFrom==="top"){setView("top");}else{setView("type");}setSelClient(null);setClientFrom(null);}}>{clientFrom==="top"?t("backToOverview"):t("backToType")}</button>
        <div className="page-header"><div className="page-header-left"><h2>{c.name}</h2><p>{c.city}, {c.country}</p></div></div>
        <div className="section-title">{t("contactDetails")}</div>
        <div className="table-wrap" style={{padding:16,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--border)"}}><span className="stat-label">{t("email")}</span><span>{c.email}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span className="stat-label">{t("phone")}</span><span>{c.phone}</span></div>
        </div>
        <div className="section-title">{t("bottleOrders")}</div>
        <div className="table-wrap">{btx.length===0?<div className="empty">{t("noTransactions")}</div>:btx.map(tx=>{const {cls,icon}=txIcon(tx.type);return(
          <div className="tx-item" key={tx.id}><div className={`tx-icon ${cls}`}>{icon}</div><div className="tx-info"><div className="tx-title">{tx.wine}</div><div className="tx-meta">{tx.batch} · {tx.date}</div></div>{tx.qty!==0&&<div className={`tx-qty ${tx.qty>0?"pos":"neg"}`}>{tx.qty}</div>}</div>
        );})}</div>
        <div className="section-title">{t("bulkPurchases")}</div>
        <div className="table-wrap">{bul.length===0?<div className="empty">{t("noTransactions")}</div>:bul.map(tx=>(
          <div className="tx-item" key={tx.id}><div className="tx-icon tx-out">↑</div><div className="tx-info"><div className="tx-title">{tx.wine}</div><div className="tx-meta">{Math.abs(tx.liters).toLocaleString()} {t("litersShort")} · {fmtMoney(Math.abs(tx.liters)*tx.pricePerLiter)} · {tx.date}</div></div></div>
        ))}</div>
        <div className="section-title">{t("invoiceList")}</div>
        <div className="table-wrap">{invs.length===0?<div className="empty">{t("noInvoices")}</div>:invs.map(i=>(
          <div className="tx-item" key={i.id}><div className="tx-info"><div className="tx-title">{i.id}</div><div className="tx-meta">{fmtMoney(i.qty*i.unitPrice)} · {i.status}</div></div></div>
        ))}</div>
      </>
    );
  }
  if(view==="type"&&seg){
    const td=typeData.find(x=>x.ty===seg); const ranked=[...td.cs].sort((a,b)=>b.totalBottles-a.totalBottles);
    return (
      <>
        <button className="profile-back" onClick={()=>{setView("top");setSeg(null);}}>{t("backToOverview")}</button>
        <div className="page-header"><div className="page-header-left"><h2>{seg}</h2><p>{t("clientsInSegment")}</p></div></div>
        <div className="stats-grid-3">
          <div className="stat-card"><div className="stat-label">{t("combinedRevenue")}</div><div className="stat-value" style={{fontSize:"1.4rem"}}>{fmtMoney(td.rev)}</div></div>
          <div className="stat-card green"><div className="stat-label">{t("totalBottlesShipped")}</div><div className="stat-value">{td.btl.toLocaleString()}</div></div>
          <div className="stat-card gold"><div className="stat-label">{t("bulkLitres")}</div><div className="stat-value">{td.bl.toLocaleString()}</div></div>
        </div>
        <div className="table-wrap">
          <table><thead><tr><th>{t("client")}</th><th>{t("country")}</th><th>{t("shipped")}</th><th>{t("revenue")}</th></tr></thead>
            <tbody>{ranked.map(c=>{
              const r=clientInvoiceTotal(c.id,invoices)+clientBulkTotal(c.id,bulkTransactions);
              return <tr key={c.id} className="clickable" onClick={()=>{setSelClient(c);setView("client");setClientFrom("segment");}}><td>{c.name}</td><td>{c.country}</td><td>{c.totalBottles.toLocaleString()}</td><td>{fmtMoney(r)}</td></tr>;
            })}</tbody></table>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("salesByType")}</h2><p>{t("salesByTypeSub")}</p></div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
        {typeData.map(d=>(
          <div key={d.ty} className="stat-card" style={{cursor:"pointer"}} onClick={()=>{setSeg(d.ty);setView("type");}}>
            <div className="stat-label">{d.ty}</div>
            <div className="stat-value" style={{fontSize:"1.25rem"}}>{fmtMoney(d.rev)}</div>
            <div className="stat-sub">{d.btl.toLocaleString()} {t("bottles").toLowerCase()} · {d.bl.toLocaleString()} {t("litersShort")}</div>
            <div style={{marginTop:10,height:6,background:"var(--border)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${(d.rev/totalRev)*100}%`,background:"var(--gold)",minWidth:4}}/></div>
          </div>
        ))}
      </div>
      <div className="section-title">{t("rankByRevenue")}</div>
      <div className="table-wrap">
        <table><thead><tr><th>#</th><th>{t("client")}</th><th>{t("type")}</th><th>{t("revenue")}</th></tr></thead>
          <tbody>{clientRows.map((row,i)=>(
            <tr key={row.c.id} className="clickable" onClick={()=>{setSelClient(row.c);setView("client");setClientFrom("top");}}><td>{i+1}</td><td>{row.c.name}</td><td><span className={`badge ${clientTypeColor(row.c.type)}`}>{row.c.type}</span></td><td>{fmtMoney(row.rev)}</td></tr>
          ))}</tbody></table>
      </div>
    </>
  );
}

// ── Agents ─────────────────────────────────────────────────────────────────────
function AddAgentModal({ onClose, onSave, t }) {
  const [form,setForm]=useState({name:"",company:"",region:"",country:"",type:"Regional Broker",commissionPct:8,contact:"",phone:"",notes:""});
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const types=[[t("agentTypeRegional"),"Regional Broker"],[t("agentTypeImport"),"Import Broker"],[t("agentTypeExport"),"Export Agent"],[t("agentTypeDistributor"),"Distributor Agent"]];
  const save=()=>{if(!form.name)return;onSave({...form,id:`AGT-${String(Date.now()).slice(-6)}`,status:"Active",since:new Date().toISOString().slice(0,10),commissionPct:parseFloat(form.commissionPct)||0});onClose();};
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <h3>{t("newAgent")}</h3>
        <div className="form-row"><div className="form-group"><label>{t("agentNameLabel")}</label><input value={form.name} onChange={e=>set("name",e.target.value)}/></div><div className="form-group"><label>{t("company")}</label><input value={form.company} onChange={e=>set("company",e.target.value)}/></div></div>
        <div className="form-row"><div className="form-group"><label>{t("region")}</label><input value={form.region} onChange={e=>set("region",e.target.value)}/></div><div className="form-group"><label>{t("country")}</label><input value={form.country} onChange={e=>set("country",e.target.value)}/></div></div>
        <div className="form-group"><label>{t("type")}</label><select value={form.type} onChange={e=>set("type",e.target.value)}>{types.map(([lab,val])=><option key={val} value={val}>{lab}</option>)}</select></div>
        <div className="form-row"><div className="form-group"><label>{t("commissionPct")}</label><input type="number" value={form.commissionPct} onChange={e=>set("commissionPct",e.target.value)}/></div><div className="form-group"><label>{t("email")}</label><input value={form.contact} onChange={e=>set("contact",e.target.value)}/></div></div>
        <div className="form-group"><label>{t("phone")}</label><input value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
        <div className="form-group"><label>{t("notes")}</label><textarea value={form.notes} onChange={e=>set("notes",e.target.value)}/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>{t("cancel")}</button><button className="btn btn-gold" onClick={save}>{t("saveAgent")}</button></div>
      </div>
    </div>
  );
}

function AgentProfile({ agent, deals, onBack, t }) {
  const agentDeals=deals.filter(d=>d.agentId===agent.id);
  const rev=agentDeals.reduce((s,d)=>s+d.qty*d.unitPrice,0);
  const comm=agentDeals.reduce((s,d)=>s+d.qty*d.unitPrice*(d.commission/100),0);
  return (
    <>
      <button className="profile-back" onClick={onBack}>{t("back")}</button>
      <div className="page-header"><div className="page-header-left"><h2>{agent.name}</h2><p>{agent.company} · {agent.region}, {agent.country}</p></div><span className={`badge ${agent.status==="Active"?"badge-active":"badge-inactive"}`}>{agent.status}</span></div>
      <div className="stats-grid-2">
        <div className="stat-card"><div className="stat-label">{t("revenue")}</div><div className="stat-value" style={{fontSize:"1.4rem"}}>{fmtMoney(rev)}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("commissionBreakdown")}</div><div className="stat-value" style={{fontSize:"1.4rem"}}>{fmtMoney(comm)}</div></div>
      </div>
      <div className="section-title">{t("contactDetails")}</div>
      <div className="table-wrap" style={{padding:16,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--border)"}}><span>{t("email")}</span><span>{agent.contact}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span>{t("phone")}</span><span>{agent.phone}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span>{t("since")}</span><span>{agent.since}</span></div>
      </div>
      {agent.notes&&<div className="info-box" style={{marginBottom:20}}>{agent.notes}</div>}
      <div className="section-title">{t("dealHistory")}</div>
      <div className="table-wrap">
        <table><thead><tr><th>ID</th><th>{t("wine")}</th><th>{t("type")}</th><th>{t("qty")}</th><th>{t("revenue")}</th><th>{t("status")}</th></tr></thead>
          <tbody>{agentDeals.map(d=>{
            const st=d.status==="Completed"?t("dealStatusCompleted"):d.status==="In Progress"?t("dealStatusProgress"):t("dealStatusPending");
            return <tr key={d.id}><td style={{fontFamily:"var(--font-mono)",fontSize:".7rem"}}>{d.id}</td><td>{d.wine}</td><td>{d.type==="Bottles"?t("bottlesDeal"):t("bulkDeal")}</td><td>{d.qty.toLocaleString()}</td><td>{fmtMoney(d.qty*d.unitPrice)}</td><td><span className={`badge ${dealStatusColor(d.status)}`}>{st}</span></td></tr>;
          })}</tbody></table>
      </div>
    </>
  );
}

function Agents({ agents, agentDeals, t, onAdd, selected, setSelected }) {
  const active=agents.filter(a=>a.status==="Active").length;
  const rev=agentDeals.reduce((s,d)=>s+d.qty*d.unitPrice,0);
  const comm=agentDeals.reduce((s,d)=>s+d.qty*d.unitPrice*(d.commission/100),0);
  const actDeals=agentDeals.filter(d=>d.status==="In Progress"||d.status==="Pending").length;
  if(selected) return <AgentProfile agent={selected} deals={agentDeals} onBack={()=>setSelected(null)} t={t}/>;
  return (
    <>
      <div className="page-header"><div className="page-header-left"><h2>{t("agents")}</h2><p>{t("agentsSub")}</p></div><button className="btn btn-gold" onClick={onAdd}>{t("addAgent")}</button></div>
      <div className="stats-grid">
        <div className="stat-card green"><div className="stat-label">{t("activeAgents")}</div><div className="stat-value">{active}</div><div className="stat-sub">{agents.length} {t("totalAccountsStat").toLowerCase()}</div></div>
        <div className="stat-card"><div className="stat-label">{t("revenueViaAgents")}</div><div className="stat-value" style={{fontSize:"1.35rem"}}>{fmtMoney(rev)}</div></div>
        <div className="stat-card gold"><div className="stat-label">{t("commissionOwed")}</div><div className="stat-value" style={{fontSize:"1.35rem"}}>{fmtMoney(comm)}</div></div>
        <div className="stat-card"><div className="stat-label">{t("activeDealsCount")}</div><div className="stat-value">{actDeals}</div></div>
      </div>
      <div className="clients-grid">
        {agents.map(a=>{
          const ds=agentDeals.filter(d=>d.agentId===a.id); const ar=ds.reduce((s,d)=>s+d.qty*d.unitPrice,0);
          return (
            <div className="client-card" key={a.id} onClick={()=>setSelected(a)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div className="client-name">{a.name}</div><div className="client-country">{a.company}</div></div>
                <span className={`badge ${a.status==="Active"?"badge-active":"badge-inactive"}`}>{a.status}</span>
              </div>
              <div style={{marginTop:8,fontSize:".85rem",color:"var(--muted)"}}>{a.region}, {a.country}</div>
              <div style={{marginTop:8}}><span className="badge badge-restaurant">{a.type}</span> <span style={{fontFamily:"var(--font-mono)",fontSize:".75rem"}}>{a.commissionPct}%</span></div>
              <div className="client-stats">
                <div className="client-stat"><div className="client-stat-label">{t("revenue")}</div><div className="client-stat-value">{fmtMoney(ar)}</div></div>
                <div className="client-stat"><div className="client-stat-label">{t("deals")}</div><div className="client-stat-value">{ds.length}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEYS = {
  demo: "cantina-track-demo",
  blank: "cantina-track-blank",
  mode: "cantina-track-mode",
  lang: "cantina-track-lang"
};

const EMPTY_DATA = { batches: [], transactions: [], clients: [], invoices: [], harvests: [], bulkStock: [], bulkTransactions: [], agents: [], agentDeals: [] };

function loadMode() {
  try { return localStorage.getItem(STORAGE_KEYS.mode) || "demo"; }
  catch(e) { return "demo"; }
}

function saveMode(mode) {
  try { localStorage.setItem(STORAGE_KEYS.mode, mode); }
  catch(e) {}
}

function loadLang() {
  try { return localStorage.getItem(STORAGE_KEYS.lang) || "en"; }
  catch(e) { return "en"; }
}

function saveLang(lang) {
  try { localStorage.setItem(STORAGE_KEYS.lang, lang); }
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
  return {
    batches: SEED_BATCHES, transactions: SEED_TRANSACTIONS, clients: SEED_CLIENTS, invoices: SEED_INVOICES, harvests: SEED_HARVESTS,
    bulkStock: SEED_BULK, bulkTransactions: SEED_BULK_TRANSACTIONS, agents: SEED_AGENTS, agentDeals: SEED_AGENT_DEALS,
  };
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(loadMode);
  const [lang, setLang] = useState(loadLang);
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  const [page,setPage]=useState("dashboard");
  const [batches,setBatches]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.batches || d.batches; });
  const [transactions,setTransactions]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.transactions || d.transactions; });
  const [clients,setClients]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.clients || d.clients; });
  const [invoices,setInvoices]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.invoices || d.invoices; });
  const [harvests,setHarvests]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.harvests || d.harvests; });
  const [bulkStock,setBulkStock]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.bulkStock ?? d.bulkStock; });
  const [bulkTransactions,setBulkTransactions]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.bulkTransactions ?? d.bulkTransactions; });
  const [agents,setAgents]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.agents ?? d.agents; });
  const [agentDeals,setAgentDeals]=useState(()=>{ const s=loadData(mode); const d=getDefaults(mode); return s?.agentDeals ?? d.agentDeals; });
  const [showAddBatch,setShowAddBatch]=useState(false);
  const [showAddClient,setShowAddClient]=useState(false);
  const [showAddHarvest,setShowAddHarvest]=useState(false);
  const [showAddBulk,setShowAddBulk]=useState(false);
  const [shipBulkLot,setShipBulkLot]=useState(null);
  const [showAddAgent,setShowAddAgent]=useState(false);
  const [showBulkHistory,setShowBulkHistory]=useState(false);
  const [selectedAgent,setSelectedAgent]=useState(null);
  const [txBatch,setTxBatch]=useState(null);
  const [selectedClient,setSelectedClient]=useState(null);
  const [viewInvoice,setViewInvoice]=useState(null);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData(mode, { batches, transactions, clients, invoices, harvests, bulkStock, bulkTransactions, agents, agentDeals });
  }, [batches, transactions, clients, invoices, harvests, bulkStock, bulkTransactions, agents, agentDeals, mode]);

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    // Save current data before switching
    saveData(mode, { batches, transactions, clients, invoices, harvests, bulkStock, bulkTransactions, agents, agentDeals });
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
    setBulkStock(saved?.bulkStock ?? defaults.bulkStock);
    setBulkTransactions(saved?.bulkTransactions ?? defaults.bulkTransactions);
    setAgents(saved?.agents ?? defaults.agents);
    setAgentDeals(saved?.agentDeals ?? defaults.agentDeals);
    setPage("dashboard");
    setSelectedClient(null);
    setSelectedAgent(null);
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
      setBulkStock(defaults.bulkStock);
      setBulkTransactions(defaults.bulkTransactions);
      setAgents(defaults.agents);
      setAgentDeals(defaults.agentDeals);
    }
  };

  const goTo=(p)=>{setPage(p);setSelectedClient(null);setSelectedAgent(null);};

  const handleShipBulk=(lot,client,liters,note)=>{
    setBulkStock(prev=>prev.map(b=>b.id===lot.id?{...b,liters:b.liters-liters,status:b.liters-liters<=0&&b.status==="Available"?"Available":b.status}:b));
    setBulkTransactions(prev=>[{id:Date.now(),bulkId:lot.id,wine:lot.wine,liters:-Math.abs(liters),clientId:client.id,clientName:client.name,date:new Date().toISOString().slice(0,10),note:note||"",pricePerLiter:lot.pricePerLiter,vessel:lot.vessel},...prev]);
  };

  const addTransaction=(tx,clientId,qty,invoice)=>{
    setTransactions(p=>[tx,...p]);
    if(tx.qty!==0){setBatches(p=>p.map(b=>{if(b.id!==tx.batch)return b;const nq=b.qty+tx.qty;return{...b,qty:nq,status:nq<300?"Low Stock":b.status==="Low Stock"?"Ready":b.status};}));}
    if(clientId&&qty){setClients(p=>p.map(c=>c.id!==clientId?c:{...c,totalBottles:c.totalBottles+qty,lastOrder:tx.date,status:"Active"}));}
    if(invoice){setInvoices(p=>[invoice,...p]);}
  };

  const overdueReminders=computeReminders(clients).filter(c=>c.urgency==="red").length;

  const nav=[
    {section:null,id:"dashboard",icon:"◈",label:t("dashboard")},
    {section:t("inventory"),id:"inventory",icon:"⊟",label:t("batches")},
    {section:null,id:"bulkWine",icon:"🛢",label:t("bulkWine")},
    {section:null,id:"transactions",icon:"⇄",label:t("transactions")},
    {section:null,id:"harvest",icon:"🍇",label:t("harvestLog")},
    {section:t("clientsSection"),id:"clients",icon:"◉",label:t("allClients")},
    {section:null,id:"agents",icon:"🤝",label:t("agents")},
    {section:null,id:"salesByType",icon:"◑",label:t("salesByType")},
    {section:null,id:"reminders",icon:"⏰",label:t("reminders"),badge:overdueReminders>0?overdueReminders:null},
    {section:t("finance"),id:"invoices",icon:"◻",label:t("invoices")},
    {section:null,id:"analytics",icon:"◫",label:t("analytics")},
  ];

  const toggleLang = () => {
    const newLang = lang === "en" ? "it" : "en";
    setLang(newLang);
    saveLang(newLang);
  };

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
          <div className="mode-label">{t("workspace")}</div>
          <div className="mode-toggle">
            <button className={`mode-btn${mode==="demo"?" active":""}`} onClick={()=>switchMode("demo")}>{t("demo")}</button>
            <button className={`mode-btn${mode==="blank"?" active":""}`} onClick={()=>switchMode("blank")}>{t("myWinery")}</button>
          </div>
          <div className="mode-label" style={{marginTop:8}}>Lingua / Language</div>
          <div className="mode-toggle">
            <button className={`mode-btn${lang==="en"?" active":""}`} onClick={()=>{setLang("en");saveLang("en");}}>EN</button>
            <button className={`mode-btn${lang==="it"?" active":""}`} onClick={()=>{setLang("it");saveLang("it");}}>IT</button>
          </div>
          <div className="sidebar-footer">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>v0.7.0 · {mode==="demo"?"DEMO":t("myWinery").toUpperCase()}</span>
              <button onClick={resetCurrentMode} style={{background:"none",border:"1px solid var(--border)",borderRadius:4,color:"var(--muted)",fontFamily:"var(--font-mono)",fontSize:".55rem",padding:"3px 8px",cursor:"pointer",letterSpacing:".08em"}}>{t("reset")}</button>
            </div>
          </div>
        </nav>
        <main className="main">
          {page==="dashboard"&&<Dashboard batches={batches} transactions={transactions} clients={clients} invoices={invoices} harvests={harvests} onNav={goTo} t={t}/>}
          {page==="inventory"&&<Inventory batches={batches} onAdd={()=>setShowAddBatch(true)} onTransaction={setTxBatch} t={t}/>}
          {page==="transactions"&&<Transactions transactions={transactions} t={t}/>}
          {page==="harvest"&&<Harvest harvests={harvests} onAdd={()=>setShowAddHarvest(true)} t={t}/>}
          {page==="bulkWine"&&<BulkWine bulkStock={bulkStock} bulkTransactions={bulkTransactions} clients={clients} t={t} onAdd={()=>setShowAddBulk(true)} onShip={setShipBulkLot} showHistory={showBulkHistory} setShowHistory={setShowBulkHistory}/>}
          {page==="clients"&&!selectedClient&&<Clients clients={clients} transactions={transactions} onAdd={()=>setShowAddClient(true)} onSelect={setSelectedClient} t={t}/>}
          {page==="clients"&&selectedClient&&<ClientProfile client={selectedClient} transactions={transactions} onBack={()=>setSelectedClient(null)} t={t}/>}
          {page==="agents"&&<Agents agents={agents} agentDeals={agentDeals} t={t} onAdd={()=>setShowAddAgent(true)} selected={selectedAgent} setSelected={setSelectedAgent}/>}
          {page==="salesByType"&&<SalesByType clients={clients} transactions={transactions} invoices={invoices} bulkTransactions={bulkTransactions} t={t}/>}
          {page==="reminders"&&<Reminders clients={clients} t={t}/>}
          {page==="invoices"&&<Invoices invoices={invoices} clients={clients} onMarkPaid={id=>setInvoices(p=>p.map(i=>i.id===id?{...i,status:"Paid"}:i))} onView={setViewInvoice} t={t}/>}
          {page==="analytics"&&<Analytics batches={batches} transactions={transactions} clients={clients} invoices={invoices} t={t}/>}
        </main>
      </div>
      {showAddBatch&&<AddBatchModal onClose={()=>setShowAddBatch(false)} onSave={b=>{setBatches(p=>[b,...p]);}} t={t}/>}
      {showAddClient&&<AddClientModal onClose={()=>setShowAddClient(false)} onSave={c=>{setClients(p=>[c,...p]);}} t={t}/>}
      {showAddHarvest&&<AddHarvestModal onClose={()=>setShowAddHarvest(false)} onSave={h=>{setHarvests(p=>[h,...p]);}} t={t}/>}
      {txBatch&&<LogTransactionModal batch={txBatch} clients={clients} onClose={()=>setTxBatch(null)} onSave={addTransaction} t={t}/>}
      {viewInvoice&&<InvoiceModal invoice={viewInvoice} onClose={()=>setViewInvoice(null)} t={t}/>}
      {showAddBulk&&<AddBulkModal onClose={()=>setShowAddBulk(false)} onSave={b=>setBulkStock(p=>[b,...p])} t={t}/>}
      {shipBulkLot&&<ShipBulkModal lot={shipBulkLot} clients={clients} onClose={()=>setShipBulkLot(null)} onSave={handleShipBulk} t={t}/>}
      {showAddAgent&&<AddAgentModal onClose={()=>setShowAddAgent(false)} onSave={a=>setAgents(p=>[a,...p])} t={t}/>}
    </>
  );
}
