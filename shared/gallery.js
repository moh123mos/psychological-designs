/* يبني معاينات حية مصغّرة للشاشات العشر داخل #desk و #mob (يعتمد على CLINIC_SCREENS من present.js) */
(function () {
  const W = { desktop: 1440, mobile: 430 }, H = { desktop: 900, mobile: 900 };
  const card = (s, i) => `
    <a class="shot" href="${s.f}">
      <div class="thumb"><iframe src="${s.f}" width="${W[s.d]}" height="${H[s.d]}" tabindex="-1" title="${s.t}"></iframe></div>
      <div class="cap"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${s.t}</b><span>${s.g}</span></div>
    </a>`;
  const build = () => {
    const list = window.CLINIC_SCREENS || [];
    const desk = document.getElementById('desk'), mob = document.getElementById('mob');
    if (desk) desk.innerHTML = list.map((s, i) => s.d === 'desktop' ? card(s, i) : '').join('');
    if (mob) mob.innerHTML = list.map((s, i) => s.d === 'mobile' ? card(s, i) : '').join('');
    fit();
  };
  const fit = () => document.querySelectorAll('.thumb iframe').forEach(f => {
    f.style.transform = `scale(${f.parentElement.clientWidth / f.width})`;
  });
  addEventListener('resize', fit);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
  window.fitThumbs = fit;
})();
