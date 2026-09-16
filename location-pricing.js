(function(){
  const LOCATIONS={
    nemanjina:{label:'Nemanjina 5',short:'Nemanjina 5',href:'/nemanjina-5/'},
    original1974:{label:'Banjalučki ćevap 1974',short:'Banjalučki ćevap 1974',href:'/banjalucki-cevap-1974/'}
  };
  let active=localStorage.getItem('bc-location')||'nemanjina';
  if(!LOCATIONS[active]) active='nemanjina';

  function mount(){
    const hunger=document.querySelector('.hunger');
    if(!hunger||document.getElementById('bc-location-switcher')) return;
    const head=hunger.querySelector('.hunger-head');
    const grid=hunger.querySelector('.hunger-grid');
    if(!head||!grid) return;

    const wrap=document.createElement('div');
    wrap.id='bc-location-switcher';
    wrap.className='bc-location-switcher';
    wrap.innerHTML=`<div class="bc-location-label">Cene za: <strong id="bc-active-location"></strong></div><div class="bc-location-tabs" role="group" aria-label="Izaberi lokaciju"><button type="button" data-location="nemanjina">Nemanjina 5</button><button type="button" data-location="original1974">Banjalučki ćevap 1974</button></div><p class="bc-location-help">Svaki lokal ima svoj cenovnik. Izaberi lokaciju da vidiš tačne cene, meni i kontakt.</p>`;
    head.insertAdjacentElement('afterend',wrap);

    grid.querySelectorAll('.hunger-card').forEach(card=>{
      card.style.cursor='pointer';
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      const go=()=>{window.location.href=LOCATIONS[active].href;};
      card.addEventListener('click',go);
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
    });

    wrap.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>setLocation(btn.dataset.location)));
    render();
  }

  function setLocation(key){
    if(!LOCATIONS[key]) return;
    active=key;
    localStorage.setItem('bc-location',active);
    render();
  }

  function render(){
    const wrap=document.getElementById('bc-location-switcher');
    if(!wrap) return;
    wrap.querySelector('#bc-active-location').textContent=LOCATIONS[active].label;
    wrap.querySelectorAll('button').forEach(btn=>{
      const on=btn.dataset.location===active;
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-pressed',String(on));
    });
    const cards=document.querySelectorAll('.hunger-grid .hunger-card');
    cards.forEach(card=>{
      const span=card.querySelector('span');
      if(!span) return;
      if(active==='nemanjina'){
        const strong=(card.querySelector('strong')?.textContent||'').toLowerCase();
        if(strong.includes('8')) span.textContent='200 g · 490 RSD';
        else if(strong.includes('16')) span.textContent='400 g · 980 RSD';
        else if(strong.includes('pljesk')) span.textContent='200 g · 490 RSD';
      } else {
        span.textContent='Pogledaj cenu u lokalu →';
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();