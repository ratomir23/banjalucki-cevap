/* shared header loader */
(function(){
  fetch('/shared-header.html').then(function(r){return r.ok?r.text():''}).then(function(html){var el=document.getElementById('sharedHeader');if(el&&html)el.innerHTML=html;}).catch(function(){});
  if(location.pathname==='/'||location.pathname==='/index.html'){
    var s=document.createElement('script');s.src='/location-pricing-loader.js';s.defer=true;document.head.appendChild(s);
  }
})();