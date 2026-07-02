/* ═══════════════════════════════════════════════════════════════
   P&L Calculator PRO AI Edition — Calculation Engine (ROAS Model)
   ═══════════════════════════════════════════════════════════════ */

// ── P&L Structure Template (ROAS Updated) ──
const PL_STRUCTURE = [
  {
    section: '💵 INGRESOS Y CRECIMIENTO',
    type: 'income',
    items: [
      { key: 'ordenPromedio', label: '<span class="floating-icon">🎫</span> Orden Promedio', inputType: 'value', commentPF: 'Ticket promedio por pedido', commentRappi: 'Ticket promedio por pedido' },
      { key: 'ordenesBase', labelPF: '<span class="floating-icon">📦</span> Órdenes Totales', labelRappi: '<span class="floating-icon">📦</span> Órdenes Base (Orgánicas)', inputType: 'value-int', commentPF: 'Total de ventas', commentRappi: 'Ventas sin Ads' },
      { key: 'presupuestoAds', label: '<span class="floating-icon">📢</span> Presupuesto Ads (Inversión)', inputType: 'value', excludeFromPF: true, commentPF: '', commentRappi: 'Presupuesto Ads Rappi' },
      { key: 'roas', label: '<span class="floating-icon">🎯</span> ROAS Estimado (x)', inputType: 'value-roas', excludeFromPF: true, commentPF: '', commentRappi: 'Retorno esperado de Ads (ej. 4x)' },
      { key: 'ventasAds', label: '<span class="floating-icon">🚀</span> Ventas Generadas por Ads', inputType: 'calculated', excludeFromPF: true, commentPF: '', commentRappi: '= Presupuesto × ROAS' },
      { key: 'ventas', label: '<span class="floating-icon">💰</span> Ventas Brutas Totales', inputType: 'calculated', commentPF: 'Ventas Totales', commentRappi: 'Orgánico + Ads' },
    ],
    subtotal: { key: 'totalIngresos', label: 'Total Ingresos Brutos', class: 'income' }
  },
  {
    section: '🔥 COSTOS VARIABLES',
    type: 'variable',
    items: [
      { key: 'comision', label: '<span class="floating-icon">🛵</span> Comisión + IVA (Delivery)', inputType: 'pct', commentPF: 'Calculado sobre Ventas Totales', commentRappi: '21% + IVA(19%) + 2%' },
      { key: 'foodCost', label: '<span class="floating-icon">🍔</span> Food Cost', inputType: 'pct', commentPF: 'Media Nacional con IPC', commentRappi: 'Media Nacional con IPC' },
      { key: 'empaques', label: '<span class="floating-icon">🥡</span> Empaques (Packaging)', inputType: 'pct', commentPF: 'Media industrial', commentRappi: 'Media industrial' },
      { key: 'campana', label: '<span class="floating-icon">🏷️</span> Campaña Comercial (Descuentos)', inputType: 'pct', commentPF: 'Campañas de retención', commentRappi: 'Campaña comercial Rappi' },
      { key: 'adsGasto', label: '<span class="floating-icon">💸</span> Gasto Ejecutado en Ads', inputType: 'calculated-linked', excludeFromPF: true, commentPF: '', commentRappi: 'Inversión de arriba' },
    ],
    subtotal: { key: 'totalCostosVariables', label: 'Total Costos Variables', class: 'variable' }
  },
  {
    section: 'CONTRIBUCIÓN MARGINAL',
    type: 'margin',
    items: [],
    subtotal: { key: 'contribucionMarginal', label: '<span class="floating-icon">📈</span> Contribución Marginal', isHighlight: true }
  },
  {
    section: '🏢 COSTOS FIJOS OPERATIVOS',
    type: 'fixed',
    items: [
      { key: 'arriendo', label: '<span class="floating-icon">🏠</span> Arriendo', inputType: 'pct', commentPF: 'Renta del local', commentRappi: 'No aplica' },
      { key: 'personalDirecto', label: '<span class="floating-icon">👨‍🍳</span> Nómina - Personal Directo', inputType: 'pct', commentPF: 'Personal en establecimiento', commentRappi: 'No aplica' },
      { key: 'personalIndirecto', label: '<span class="floating-icon">💼</span> Nómina - Personal Indirecto', inputType: 'pct', commentPF: 'Contadores, admin, publicidad', commentRappi: 'No aplica' },
      { key: 'servicios', label: '<span class="floating-icon">⚡</span> Servicios (Utilities)', inputType: 'pct', commentPF: 'Servicios públicos', commentRappi: 'Servicios' },
      { key: 'otros', label: '<span class="floating-icon">🧩</span> Otros Gastos Fijos', inputType: 'pct', commentPF: 'Gastos menores', commentRappi: 'Otros gastos' },
    ],
    subtotal: { key: 'totalCostosFijosOp', label: 'Total Costos Fijos Operativos', class: 'fixed' }
  },
  {
    section: 'EBITDA',
    type: 'ebitda',
    items: [],
    subtotal: { key: 'ebitda', label: '<span class="floating-icon">📊</span> EBITDA Operativo', isHighlight: true, class: 'ebitda' }
  },
  {
    section: '🏛️ IMPUESTOS',
    type: 'tax',
    items: [
      { key: 'inc', label: '<span class="floating-icon">🧾</span> INC / Ipoconsumo', inputType: 'pct', commentPF: 'Impuesto al consumo (8%)', commentRappi: 'Impuesto al consumo (8%)' },
    ],
    subtotal: { key: 'totalImpuestos', label: 'Total Impuestos', class: 'fixed' }
  },
  {
    section: 'RESULTADO NETO',
    type: 'result',
    items: [
      { key: 'cmn', label: '<span class="floating-icon">💎</span> Contribución Marginal Neta', inputType: 'result' },
      { key: 'margenNeto', label: '<span class="floating-icon">🎯</span> Margen Neto sobre Venta', inputType: 'result-pct' },
      { key: 'alAnio', label: '<span class="floating-icon">📅</span> Proyección Anual (COP)', inputType: 'result' },
      { key: 'enUsd', label: '<span class="floating-icon">🌍</span> Proyección Anual (USD)', inputType: 'result-usd' },
    ]
  }
];

// ── Default Values ──
const DEFAULTS = {
  pf: {
    ordenPromedio: 23000, ordenesBase: 3478, presupuestoAds: 0, roas: 0,
    comisionPct: 0, foodCostPct: 35, empaquesPct: 0, campanaPct: 0,
    arriendoPct: 19, personalDirectoPct: 10, personalIndirectoPct: 3, serviciosPct: 5, otrosPct: 0,
    incPct: 8
  },
  rappi: {
    ordenPromedio: 23000, ordenesBase: 521, presupuestoAds: 1000000, roas: 4,
    comisionPct: 26, foodCostPct: 35, empaquesPct: 5, campanaPct: 0,
    arriendoPct: 0, personalDirectoPct: 0, personalIndirectoPct: 0, serviciosPct: 0, otrosPct: 0,
    incPct: 8
  }
};

let state = {
  trm: 4200, activeTab: 'pf',
  pf: { ...DEFAULTS.pf }, rappi: { ...DEFAULTS.rappi },
  computed: { pf: {}, rappi: {}, combined: {} }
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderTable('pf');
  renderTable('rappi');
  calculateAll();
  renderCombinedTable();
  updateAllUI();
  bindGlobalEvents();
  initAICursorAndParallax();
});

// ── Calculation Engine ──
function calculateModule(mod) {
  const d = state[mod];
  const c = {};

  // 1. Ingresos & ROAS
  if (mod === 'pf') {
    c.ventasOrganicas = d.ordenPromedio * d.ordenesBase;
    c.ventasAds = 0;
    c.ventas = c.ventasOrganicas;
    c.totalIngresos = c.ventas;
    c.ordenesTotales = d.ordenesBase;
  } else {
    c.ventasOrganicas = d.ordenPromedio * d.ordenesBase;
    c.ventasAds = d.presupuestoAds * d.roas;
    c.ventas = c.ventasOrganicas + c.ventasAds;
    c.totalIngresos = c.ventas;
    c.ordenesTotales = c.ventas > 0 ? (c.ventas / d.ordenPromedio) : 0;
  }

  // 2. Costos Variables
  c.comisionVal = c.ventas * d.comisionPct / 100;
  c.foodCostVal = c.ventas * d.foodCostPct / 100;
  c.empaquesVal = c.ventas * d.empaquesPct / 100;
  c.campanaVal = c.ventas * d.campanaPct / 100;
  c.adsGastoVal = mod === 'pf' ? 0 : d.presupuestoAds;
  
  c.totalCostosVariables = c.comisionVal + c.foodCostVal + c.empaquesVal + c.campanaVal + c.adsGastoVal;
  c.totalCostosVariablesPct = c.ventas > 0 ? (c.totalCostosVariables / c.ventas * 100) : 0;
  c.adsGastoPct = c.ventas > 0 ? (c.adsGastoVal / c.ventas * 100) : 0;

  // 3. Contribución Marginal
  c.contribucionMarginal = c.totalIngresos - c.totalCostosVariables;
  c.contribucionMarginalPct = c.ventas > 0 ? (c.contribucionMarginal / c.ventas * 100) : 0;

  // 4. Costos Fijos
  c.arriendoVal = c.ventas * d.arriendoPct / 100;
  c.personalDirectoVal = c.ventas * d.personalDirectoPct / 100;
  c.personalIndirectoVal = c.ventas * d.personalIndirectoPct / 100;
  c.serviciosVal = c.ventas * d.serviciosPct / 100;
  c.otrosVal = c.ventas * d.otrosPct / 100;
  c.totalCostosFijosOp = c.arriendoVal + c.personalDirectoVal + c.personalIndirectoVal + c.serviciosVal + c.otrosVal;
  c.totalCostosFijosOpPct = d.arriendoPct + d.personalDirectoPct + d.personalIndirectoPct + d.serviciosPct + d.otrosPct;

  // 5. EBITDA
  c.ebitda = c.contribucionMarginal - c.totalCostosFijosOp;
  c.ebitdaPct = c.ventas > 0 ? (c.ebitda / c.ventas * 100) : 0;

  // 6. Impuestos
  c.incVal = c.ventas * d.incPct / 100;
  c.totalImpuestos = c.incVal;
  c.totalImpuestosPct = d.incPct;

  // 7. Resultado Neto
  c.cmn = c.ebitda - c.totalImpuestos;
  c.cmnPct = c.ventas > 0 ? (c.cmn / c.ventas * 100) : 0;

  // Projections
  c.margenNeto = c.cmnPct;
  c.alAnio = c.cmn * 12;
  c.enUsd = state.trm > 0 ? (c.alAnio / state.trm) : 0;

  // Per Order
  const orders = c.ordenesTotales || 1;
  c.porOrden = {};
  for(let key in c) {
    if(key.endsWith('Val') || key === 'totalCostosVariables' || key === 'contribucionMarginal' || 
       key === 'totalCostosFijosOp' || key === 'ebitda' || key === 'totalImpuestos' || key === 'cmn' || key === 'ventas') {
      c.porOrden[key] = c[key] / orders;
    }
  }
  c.porOrden.ventasAds = c.ventasAds / orders;

  state.computed[mod] = c;
}

function calculateCombined() {
  const pf = state.computed.pf;
  const rp = state.computed.rappi;
  const cb = {};

  const keys = [
    'ventasOrganicas', 'ventasAds', 'ventas', 'totalIngresos',
    'comisionVal', 'foodCostVal', 'empaquesVal', 'campanaVal', 'adsGastoVal', 'totalCostosVariables',
    'contribucionMarginal',
    'arriendoVal', 'personalDirectoVal', 'personalIndirectoVal', 'serviciosVal', 'otrosVal', 'totalCostosFijosOp',
    'ebitda',
    'incVal', 'totalImpuestos',
    'cmn', 'alAnio'
  ];

  keys.forEach(k => cb[k] = (pf[k] || 0) + (rp[k] || 0));
  cb.ordenesTotales = (pf.ordenesTotales||0) + (rp.ordenesTotales||0);

  const tV = cb.ventas || 1;
  cb.totalCostosVariablesPct = cb.totalCostosVariables / tV * 100;
  cb.contribucionMarginalPct = cb.contribucionMarginal / tV * 100;
  cb.totalCostosFijosOpPct = cb.totalCostosFijosOp / tV * 100;
  cb.ebitdaPct = cb.ebitda / tV * 100;
  cb.totalImpuestosPct = cb.totalImpuestos / tV * 100;
  cb.cmnPct = cb.cmn / tV * 100;
  cb.margenNeto = cb.cmnPct;
  cb.enUsd = state.trm > 0 ? (cb.alAnio / state.trm) : 0;
  cb.adsGastoPct = cb.adsGastoVal / tV * 100;

  const pctKeys = ['comision', 'foodCost', 'empaques', 'campana', 'arriendo', 'personalDirecto', 'personalIndirecto', 'servicios', 'otros', 'inc'];
  pctKeys.forEach(k => cb[k+'Pct'] = (cb[k+'Val'] / tV) * 100);

  state.computed.combined = cb;
}

function calculateAll() { calculateModule('pf'); calculateModule('rappi'); calculateCombined(); }

// ── Formatting Utilities ──
function formatCOP(v) { return (v < 0 ? '-$' : '$') + Math.round(Math.abs(v||0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function formatUSD(v) { return (v < 0 ? '-USD ' : 'USD ') + Math.abs(v||0).toLocaleString('en-US', { maximumFractionDigits: 0 }); }
function formatPct(v) { return (v||0).toFixed(1).replace('.0', '') + '%'; }
function formatNum(v) { return Math.round(v||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

// ── Table Rendering ──
function renderTable(mod) {
  const table = document.getElementById(`table-${mod}`);
  const isRappi = mod === 'rappi';
  let html = `<thead><tr><th>Concepto Financiero</th><th>Total</th><th>Por Orden (Avg)</th><th>Valor % / Ind</th><th>Comentario</th></tr></thead><tbody>`;

  PL_STRUCTURE.forEach(sec => {
    let secHasItems = false;
    let secHtml = `<tr class="section-header-row ${sec.type}"><td colspan="5">${sec.section}</td></tr>`;
    
    sec.items.forEach(item => {
      if (mod === 'pf' && item.excludeFromPF) return;
      secHasItems = true;
      const cmt = isRappi ? (item.commentRappi || '') : (item.commentPF || '');
      const lbl = isRappi ? (item.labelRappi || item.label) : (item.labelPF || item.label);
      secHtml += renderItemRow(mod, item, sec.type, cmt, lbl);
    });
    
    if (secHasItems || sec.type === 'margin' || sec.type === 'ebitda') {
      html += secHtml;
      if (sec.subtotal) {
        const cls = sec.subtotal.isHighlight ? `result-row ${sec.subtotal.class || ''}` : `subtotal-row ${sec.subtotal.class || ''}`;
        html += `<tr class="${cls}">
          <td>${sec.subtotal.label}</td>
          <td><span class="calc-value" id="${mod}-${sec.subtotal.key}-val">$0</span></td>
          <td><span class="calc-value" id="${mod}-${sec.subtotal.key}-po">$0</span></td>
          <td><span class="calc-value" id="${mod}-${sec.subtotal.key}-pct">0%</span></td><td></td>
        </tr>`;
      }
      if (sec.type !== 'result') html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;
    }
  });
  html += '</tbody>';
  table.innerHTML = html;
  bindModuleEvents(mod);
}

function renderItemRow(mod, it, type, cmt, lbl) {
  const d = state[mod];
  if (it.inputType === 'value') return `<tr><td>${lbl}</td><td><div class="val-input-wrap"><span class="val-prefix">$</span><input type="number" class="val-input" id="${mod}-${it.key}" value="${d[it.key]||0}" min="0" step="1000" data-mod="${mod}" data-key="${it.key}"></div></td><td>—</td><td>—</td><td>${cmt}</td></tr>`;
  if (it.inputType === 'value-int') return `<tr><td>${lbl}</td><td><div class="val-input-wrap"><input type="number" class="val-input" id="${mod}-${it.key}" value="${d[it.key]||0}" min="0" step="1" data-mod="${mod}" data-key="${it.key}"></div></td><td>—</td><td>—</td><td>${cmt}</td></tr>`;
  if (it.inputType === 'value-roas') return `<tr><td>${lbl}</td><td><div class="val-input-wrap"><span class="val-prefix">x</span><input type="number" class="val-input" id="${mod}-${it.key}" value="${d[it.key]||0}" min="0" step="0.1" data-mod="${mod}" data-key="${it.key}"></div></td><td>—</td><td>—</td><td>${cmt}</td></tr>`;
  if (it.inputType === 'calculated') return `<tr><td>${lbl}</td><td><span class="calc-value fw-800" id="${mod}-${it.key}-val">$0</span></td><td><span class="calc-value text-muted" id="${mod}-${it.key}-po">$0</span></td><td>—</td><td>${cmt||''}</td></tr>`;
  if (it.inputType === 'calculated-linked') return `<tr><td>${lbl}</td><td><span class="calc-value text-red fw-800" id="${mod}-${it.key}-val">$0</span></td><td><span class="calc-value text-muted" id="${mod}-${it.key}-po">$0</span></td><td><span class="calc-value text-amber" id="${mod}-${it.key}-pct">0%</span></td><td>${cmt||''}</td></tr>`;
  if (it.inputType === 'pct') {
    const k = it.key+'Pct'; const barClass = type==='variable' ? 'var-cost' : 'fixed-cost';
    return `<tr><td>${lbl}</td><td><span class="calc-value" id="${mod}-${it.key}-val">$0</span></td><td><span class="calc-value text-muted" id="${mod}-${it.key}-po">$0</span></td><td class="pct-bar-cell"><div class="pct-input-wrap"><input type="number" class="pct-input" id="${mod}-${it.key}-pct" value="${d[k]||0}" min="0" max="100" step="0.5" data-mod="${mod}" data-key="${k}"><span class="pct-suffix">%</span></div><div class="pct-bar ${barClass}" id="${mod}-${it.key}-bar"></div></td><td>${cmt}</td></tr>`;
  }
  if (it.inputType === 'result') return `<tr class="final-result-row"><td>${lbl}</td><td><span class="calc-value text-green" id="${mod}-${it.key}-val">$0</span></td><td><span class="calc-value text-muted" id="${mod}-${it.key}-po">$0</span></td><td><span class="calc-value text-green" id="${mod}-${it.key}-pct"></span></td><td></td></tr>`;
  if (it.inputType === 'result-pct') return `<tr class="final-result-row"><td>${lbl}</td><td><span class="calc-value fw-800" id="${mod}-${it.key}-val">0%</span></td><td colspan="3"></td></tr>`;
  if (it.inputType === 'result-usd') return `<tr class="final-result-row"><td>${lbl}</td><td><span class="calc-value" id="${mod}-${it.key}-val">USD 0</span></td><td colspan="3"></td></tr>`;
  return '';
}

// ── Combined Render ──
function renderCombinedTable() {
  const table = document.getElementById('table-combined');
  const cb = state.computed.combined; const pf = state.computed.pf; const rp = state.computed.rappi;
  
  const r = (lbl, p, r, t, pct, isNeg=false) => `<tr><td>${lbl}</td><td class="${isNeg?'text-red':''}">${formatCOP(p)}</td><td class="${isNeg?'text-red':''}">${formatCOP(r)}</td><td class="fw-800 ${isNeg?'text-red':''}">${formatCOP(t)}</td><td class="text-amber">${formatPct(pct)}</td></tr>`;
  const sub = (lbl, p, r, t, pct, cls) => `<tr class="subtotal-row ${cls}"><td>${lbl}</td><td>${formatCOP(p)}</td><td>${formatCOP(r)}</td><td class="fw-800">${formatCOP(t)}</td><td>${pct}</td></tr>`;
  const res = (lbl, p, r, t, pct, cls) => `<tr class="result-row ${cls}"><td>${lbl}</td><td>${formatCOP(p)}</td><td>${formatCOP(r)}</td><td class="fw-800">${formatCOP(t)}</td><td>${pct}</td></tr>`;

  let html = `<thead><tr><th>Concepto</th><th>🏪 Punto Físico</th><th>🛵 Rappi</th><th>📈 Total Combinado</th><th>% Real</th></tr></thead><tbody>`;
  
  // INGRESOS
  html += `<tr class="section-header-row income"><td colspan="5">💵 INGRESOS Y CRECIMIENTO</td></tr>`;
  html += `<tr><td>Orden Promedio (Avg)</td><td>${formatCOP(state.pf.ordenPromedio)}</td><td>${formatCOP(state.rappi.ordenPromedio)}</td><td class="fw-800">—</td><td>—</td></tr>`;
  html += `<tr><td>Órdenes Totales (Orgánico + Ads)</td><td>${formatNum(pf.ordenesTotales)}</td><td>${formatNum(rp.ordenesTotales)}</td><td class="fw-800">${formatNum(cb.ordenesTotales)}</td><td>—</td></tr>`;
  html += r('Ventas Orgánicas', pf.ventasOrganicas, rp.ventasOrganicas, cb.ventasOrganicas, (cb.ventasOrganicas/cb.ventas*100));
  html += r('Ventas Generadas por Ads', pf.ventasAds, rp.ventasAds, cb.ventasAds, (cb.ventasAds/cb.ventas*100));
  html += sub('Ventas Brutas Totales', pf.ventas, rp.ventas, cb.ventas, '100%', 'income');
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // VARIABLES
  html += `<tr class="section-header-row variable"><td colspan="5">🔥 COSTOS VARIABLES</td></tr>`;
  ['comision', 'foodCost', 'empaques', 'campana'].forEach(k => html += r(k, pf[k+'Val'], rp[k+'Val'], cb[k+'Val'], cb[k+'Pct'], true));
  html += r('Gasto en Ads (Inversión ejecutada)', pf.adsGastoVal, rp.adsGastoVal, cb.adsGastoVal, cb.adsGastoPct, true);
  html += sub('Total Costos Variables', -pf.totalCostosVariables, -rp.totalCostosVariables, -cb.totalCostosVariables, formatPct(cb.totalCostosVariablesPct), 'variable');
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // CM
  html += res('📈 Contribución Marginal', pf.contribucionMarginal, rp.contribucionMarginal, cb.contribucionMarginal, formatPct(cb.contribucionMarginalPct), '');
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // FIJOS
  html += `<tr class="section-header-row fixed"><td colspan="5">🏢 COSTOS FIJOS OPERATIVOS</td></tr>`;
  ['arriendo', 'personalDirecto', 'personalIndirecto', 'servicios', 'otros'].forEach(k => html += r(k, pf[k+'Val'], rp[k+'Val'], cb[k+'Val'], cb[k+'Pct'], true));
  html += sub('Total Costos Fijos Op', -pf.totalCostosFijosOp, -rp.totalCostosFijosOp, -cb.totalCostosFijosOp, formatPct(cb.totalCostosFijosOpPct), 'fixed');
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // EBITDA
  html += res('📊 EBITDA', pf.ebitda, rp.ebitda, cb.ebitda, formatPct(cb.ebitdaPct), 'ebitda');
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // IMPUESTOS
  html += `<tr class="section-header-row fixed"><td colspan="5">🏛️ IMPUESTOS</td></tr>`;
  html += r('INC / Ipoconsumo', pf.incVal, rp.incVal, cb.incVal, cb.incPct, true);
  html += `<tr class="spacer-row"><td colspan="5"></td></tr>`;

  // RESULTADOS
  html += `<tr class="section-header-row"><td colspan="5">💎 RESULTADO NETO</td></tr>`;
  html += `<tr class="final-result-row"><td>Contribución Marginal Neta</td><td class="text-green">${formatCOP(pf.cmn)}</td><td class="text-green">${formatCOP(rp.cmn)}</td><td class="text-green fw-800">${formatCOP(cb.cmn)}</td><td>${formatPct(cb.cmnPct)}</td></tr>`;
  html += `<tr class="final-result-row"><td>Margen Neto sobre Venta</td><td>${formatPct(pf.margenNeto)}</td><td>${formatPct(rp.margenNeto)}</td><td class="fw-800">${formatPct(cb.margenNeto)}</td><td></td></tr>`;
  html += `<tr class="final-result-row"><td>Proyección Anual (COP)</td><td>${formatCOP(pf.alAnio)}</td><td>${formatCOP(rp.alAnio)}</td><td class="fw-800">${formatCOP(cb.alAnio)}</td><td></td></tr>`;
  html += `<tr class="final-result-row"><td>Proyección Anual (USD)</td><td>${formatUSD(pf.enUsd)}</td><td>${formatUSD(rp.enUsd)}</td><td class="fw-800">${formatUSD(cb.enUsd)}</td><td></td></tr>`;

  html += '</tbody>'; table.innerHTML = html;
}

// ── UI Update ──
function updateModuleUI(mod) {
  const c = state.computed[mod]; const d = state[mod];
  const setV = (id, v) => { const el=document.getElementById(`${mod}-${id}`); if(el){ el.textContent=v; el.classList.remove('animating'); void el.offsetWidth; el.classList.add('animating'); } };
  const s = (k) => { setV(`${k}-val`, formatCOP(c[k+'Val'])); setV(`${k}-po`, formatCOP(c.porOrden[k+'Val'])); if(d[k+'Pct']!==undefined) { const bar = document.getElementById(`${mod}-${k}-bar`); if(bar) bar.style.width = Math.min(d[k+'Pct'],100)+'%'; } };

  if (mod !== 'pf') {
    setV('ventasAds-val', formatCOP(c.ventasAds)); setV('ventasAds-po', formatCOP(c.porOrden.ventasAds));
    setV('adsGasto-val', formatCOP(-c.adsGastoVal)); setV('adsGasto-po', formatCOP(-c.porOrden.adsGastoVal)); setV('adsGasto-pct', formatPct(c.adsGastoPct));
  }
  
  setV('ventas-val', formatCOP(c.ventas)); setV('ventas-po', formatCOP(c.porOrden.ventas));
  setV('totalIngresos-val', formatCOP(c.totalIngresos)); setV('totalIngresos-po', formatCOP(c.porOrden.ventas)); setV('totalIngresos-pct', '100%');
  
  ['comision','foodCost','empaques','campana'].forEach(s);
  
  setV('totalCostosVariables-val', formatCOP(-c.totalCostosVariables)); setV('totalCostosVariables-po', formatCOP(-c.porOrden.totalCostosVariables)); setV('totalCostosVariables-pct', formatPct(c.totalCostosVariablesPct));
  
  setV('contribucionMarginal-val', formatCOP(c.contribucionMarginal)); setV('contribucionMarginal-po', formatCOP(c.porOrden.contribucionMarginal)); setV('contribucionMarginal-pct', formatPct(c.contribucionMarginalPct));
  
  ['arriendo','personalDirecto','personalIndirecto','servicios','otros'].forEach(s);
  setV('totalCostosFijosOp-val', formatCOP(-c.totalCostosFijosOp)); setV('totalCostosFijosOp-po', formatCOP(-c.porOrden.totalCostosFijosOp)); setV('totalCostosFijosOp-pct', formatPct(c.totalCostosFijosOpPct));

  setV('ebitda-val', formatCOP(c.ebitda)); setV('ebitda-po', formatCOP(c.porOrden.ebitda)); setV('ebitda-pct', formatPct(c.ebitdaPct));
  
  s('inc'); setV('totalImpuestos-val', formatCOP(-c.totalImpuestos)); setV('totalImpuestos-po', formatCOP(-c.porOrden.totalImpuestos)); setV('totalImpuestos-pct', formatPct(c.totalImpuestosPct));

  setV('cmn-val', formatCOP(c.cmn)); setV('cmn-po', formatCOP(c.porOrden.cmn)); setV('cmn-pct', formatPct(c.cmnPct));
  setV('margenNeto-val', formatPct(c.margenNeto));
  setV('alAnio-val', formatCOP(c.alAnio)); setV('enUsd-val', formatUSD(c.enUsd));
}

function updateKPIs() {
  const c = state.computed[state.activeTab];
  const set = (id, v, isPct=false) => { document.getElementById(id).textContent = isPct ? formatPct(v) : formatCOP(v); };
  set('kpi-ventas', c.ventas); set('kpi-cm', c.contribucionMarginal); set('kpi-ebitda', c.ebitda);
  set('kpi-margen', state.activeTab==='combined' ? c.cmnPct : c.margenNeto, true);
}

function updateAllUI() { updateModuleUI('pf'); updateModuleUI('rappi'); renderCombinedTable(); updateKPIs(); }

// ── Event Binding ──
function bindModuleEvents(mod) {
  document.querySelectorAll(`#table-${mod} input`).forEach(inp => {
    inp.addEventListener('input', e => {
      let v = parseFloat(e.target.value) || 0;
      if(e.target.classList.contains('pct-input')) v = Math.min(Math.max(v,0),100);
      state[mod][e.target.dataset.key] = v;
      calculateAll(); updateAllUI(); saveState();
    });
  });
}

function bindGlobalEvents() {
  document.getElementById('trm-input').addEventListener('input', e => { state.trm = parseFloat(e.target.value)||1; calculateAll(); updateAllUI(); saveState(); });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); document.getElementById(`content-${state.activeTab}`).classList.add('active');
      updateKPIs(); saveState();
    });
  });
  
  document.getElementById('btn-export').addEventListener('click', exportToExcel);
}

// ── AI Cursor & Parallax Logic ──
function initAICursorAndParallax() {
  const cursor = document.getElementById('cursor-glow');
  const bg = document.getElementById('ai-background');

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX; const y = e.clientY;
    
    // Move Glow
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    // Parallax background subtly
    const moveX = (x - window.innerWidth / 2) * -0.02;
    const moveY = (y - window.innerHeight / 2) * -0.02;
    bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  // Grow cursor on click
  document.addEventListener('mousedown', () => { cursor.style.transform = `translate(-50%, -50%) scale(1.5)`; });
  document.addEventListener('mouseup', () => { cursor.style.transform = `translate(-50%, -50%) scale(1)`; });
}

// ── Persistence ──
function saveState() { localStorage.setItem('pl-calc-pro-ai', JSON.stringify({ trm: state.trm, activeTab: state.activeTab, pf: state.pf, rappi: state.rappi })); }
function loadState() {
  const s = localStorage.getItem('pl-calc-pro-ai');
  if(s) { const p = JSON.parse(s); state.trm = p.trm||4200; state.activeTab = p.activeTab||'pf'; state.pf = {...DEFAULTS.pf, ...p.pf}; state.rappi = {...DEFAULTS.rappi, ...p.rappi}; }
  document.getElementById('trm-input').value = state.trm;
  document.getElementById(`tab-btn-${state.activeTab}`).click();
}

// ── Excel Export (ROAS Model) ──
function exportToExcel() {
  if (typeof XLSX === 'undefined') { alert('Cargando librería Excel...'); return; }
  const wb = XLSX.utils.book_new();

  const createSheetData = (modName) => {
    const c = state.computed[modName]; const d = state[modName];
    const rows = [
      ['P&L Calculator AI PRO - ' + modName.toUpperCase()], [],
      ['INGRESOS Y CRECIMIENTO', 'Total Mensual (COP)'],
      [modName === 'pf' ? 'Órdenes Totales' : 'Órdenes Base (Orgánicas)', d.ordenesBase],
      ['Orden Promedio', d.ordenPromedio]
    ];

    if (modName !== 'pf') {
      rows.push(
        ['Presupuesto Ads (Inversión)', d.presupuestoAds],
        ['ROAS Estimado', d.roas],
        ['Ventas Orgánicas', c.ventasOrganicas],
        ['Ventas por Ads', c.ventasAds]
      );
    }

    rows.push(
      ['Ventas Brutas Totales', c.ventas],
      [], ['COSTOS VARIABLES'],
      ['Comisión Delivery', c.comisionVal, d.comisionPct],
      ['Food Cost', c.foodCostVal, d.foodCostPct],
      ['Empaques', c.empaquesVal, d.empaquesPct],
      ['Campaña Comercial', c.campanaVal, d.campanaPct]
    );

    if (modName !== 'pf') {
      rows.push(['Gasto Ejecutado Ads', c.adsGastoVal]);
    }

    rows.push(
      ['Total Costos Variables', c.totalCostosVariables, c.totalCostosVariablesPct],
      [], ['CONTRIBUCIÓN MARGINAL', c.contribucionMarginal, c.contribucionMarginalPct],
      [], ['COSTOS FIJOS OPERATIVOS'],
      ['Arriendo', c.arriendoVal, d.arriendoPct],
      ['Nómina - Directa', c.personalDirectoVal, d.personalDirectoPct],
      ['Nómina - Indirecta', c.personalIndirectoVal, d.personalIndirectoPct],
      ['Servicios', c.serviciosVal, d.serviciosPct],
      ['Otros Gastos Fijos', c.otrosVal, d.otrosPct],
      ['Total Costos Fijos', c.totalCostosFijosOp, c.totalCostosFijosOpPct],
      [], ['EBITDA', c.ebitda, c.ebitdaPct],
      [], ['IMPUESTOS'],
      ['INC / Ipoconsumo', c.incVal, d.incPct],
      [], ['CONTRIBUCIÓN MARGINAL NETA', c.cmn, c.cmnPct]
    );

    return XLSX.utils.aoa_to_sheet(rows);
  };

  const createCombinedSheet = () => {
    const cb = state.computed.combined; const pf = state.computed.pf; const rp = state.computed.rappi;
    return XLSX.utils.aoa_to_sheet([
      ['P&L Calculator AI PRO - COMBINADO'], [],
      ['Concepto', 'Punto Físico (COP)', 'Rappi (COP)', 'Total Combinado (COP)'],
      ['Órdenes Totales (Orgánicas + Ads)', pf.ordenesTotales, rp.ordenesTotales, cb.ordenesTotales],
      ['Ventas Orgánicas', pf.ventasOrganicas, rp.ventasOrganicas, cb.ventasOrganicas],
      ['Ventas por Ads (Rappi)', pf.ventasAds, rp.ventasAds, cb.ventasAds],
      ['Ventas Brutas Totales', pf.ventas, rp.ventas, cb.ventas],
      [], ['COSTOS VARIABLES'],
      ['Total Costos Variables', pf.totalCostosVariables, rp.totalCostosVariables, cb.totalCostosVariables],
      [], ['CONTRIBUCIÓN MARGINAL', pf.contribucionMarginal, rp.contribucionMarginal, cb.contribucionMarginal],
      [], ['Total Costos Fijos', pf.totalCostosFijosOp, rp.totalCostosFijosOp, cb.totalCostosFijosOp],
      [], ['EBITDA', pf.ebitda, rp.ebitda, cb.ebitda],
      [], ['Total Impuestos', pf.totalImpuestos, rp.totalImpuestos, cb.totalImpuestos],
      [], ['CONTRIBUCIÓN MARGINAL NETA', pf.cmn, rp.cmn, cb.cmn]
    ]);
  };

  XLSX.utils.book_append_sheet(wb, createSheetData('pf'), "Punto Físico");
  XLSX.utils.book_append_sheet(wb, createSheetData('rappi'), "Rappi");
  XLSX.utils.book_append_sheet(wb, createCombinedSheet(), "Consolidado");
  XLSX.writeFile(wb, "Analisis_Financiero_ROAS.xlsx");
}
