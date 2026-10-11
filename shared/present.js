/* شريط العرض على العميل — مشترك بين كل التصاميم.
   يضيف شريطًا صغيرًا للتنقل بين الشاشات العشر (السابق / التالي / كل الشاشات).
   الأسهم في لوحة المفاتيح: ← التالي، → السابق (اتجاه عربي). مفتاح H يخفي الشريط.
   لا يظهر داخل iframe (صفحة المعاينة). */
window.CLINIC_SCREENS = [
  { f: '01-dashboard.html',     t: 'لوحة التحكم',              g: 'الأخصائية', d: 'desktop' },
  { f: '02-calendar.html',      t: 'المواعيد وطلبات الحجز',    g: 'الأخصائية', d: 'desktop' },
  { f: '03-clients.html',       t: 'قائمة المراجعين',          g: 'الأخصائية', d: 'desktop' },
  { f: '04-client-file.html',   t: 'ملف المراجع',              g: 'الأخصائية', d: 'desktop' },
  { f: '05-session-note.html',  t: 'توثيق جلسة',               g: 'الأخصائية', d: 'desktop' },
  { f: '06-assessments.html',   t: 'التقييمات ومتابعة التطور', g: 'الأخصائية', d: 'desktop' },
  { f: '07-login.html',         t: 'تسجيل الدخول',             g: 'المراجع',   d: 'mobile' },
  { f: '08-home.html',          t: 'الرئيسية',                 g: 'المراجع',   d: 'mobile' },
  { f: '09-booking.html',       t: 'حجز موعد',                 g: 'المراجع',   d: 'mobile' },
  { f: '10-appointments.html',  t: 'مواعيدي',                  g: 'المراجع',   d: 'mobile' }
];

(function () {
  if (window.self !== window.top) {
    // داخل المعاينة المصغّرة: إخفاء شريط التمرير
    const s = document.createElement('style');
    s.textContent = 'html{scrollbar-width:none}html::-webkit-scrollbar{display:none}';
    document.head.appendChild(s);
    return;
  }
  const list = window.CLINIC_SCREENS;
  const file = decodeURIComponent(location.pathname.split('/').pop());
  const idx = list.findIndex(s => s.f === file);
  if (idx < 0) return;
  const prev = list[idx - 1], next = list[idx + 1], cur = list[idx];

  const css = `
  .pbar{position:fixed;z-index:9999;inset-inline-end:16px;bottom:16px;display:flex;align-items:center;gap:4px;
    padding:5px;border-radius:999px;background:rgba(28,30,27,.86);color:#f4f2ec;backdrop-filter:blur(10px);
    font:500 13px/1 "Tajawal","Cairo",system-ui,sans-serif;box-shadow:0 10px 30px -10px rgba(0,0,0,.45);direction:rtl}
  .pbar a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px}
  .pbar a:hover{background:rgba(255,255,255,.12)}
  .pbar a[aria-disabled=true]{opacity:.3;pointer-events:none}
  .pbar .cur{padding:0 10px;white-space:nowrap}
  .pbar .cur b{font-weight:700}
  .pbar .cur span{opacity:.6;margin-inline-start:6px}
  .pbar svg{width:16px;height:16px}
  .pbar.hide{display:none}
  @media (max-width:760px){.pbar{bottom:auto;top:10px;inset-inline-start:50%;transform:translateX(50%)}.pbar .cur span{display:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const bar = document.createElement('nav');
  bar.className = 'pbar'; bar.setAttribute('aria-label', 'التنقل بين الشاشات');
  bar.innerHTML = `
    <a href="index.html" title="كل الشاشات"><svg><use href="#i-grid"/></svg></a>
    <a href="${prev ? prev.f : '#'}" aria-disabled="${!prev}" title="السابق"><svg><use href="#i-chev-r"/></svg></a>
    <div class="cur"><b>${idx + 1}/${list.length}</b> ${cur.t}<span>· ${cur.g}</span></div>
    <a href="${next ? next.f : '#'}" aria-disabled="${!next}" title="التالي"><svg><use href="#i-chev-l"/></svg></a>`;
  const mount = () => document.body.appendChild(bar);
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === 'ArrowLeft' && next) location.href = next.f;
    if (e.key === 'ArrowRight' && prev) location.href = prev.f;
    if (e.key.toLowerCase() === 'h') bar.classList.toggle('hide');
  });
})();
