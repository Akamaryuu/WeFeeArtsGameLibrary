(function(){
  var q=document.getElementById('q');
  var chips=Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var sortSel=document.getElementById('sort');
  var cardsBox=document.getElementById('cards');
  var count=document.getElementById('count');
  var hours=document.getElementById('hours');
  var empty=document.getElementById('empty');
  var loading=document.getElementById('loading');
  var games=[];
  var filter='all';

  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function render(list){
    cardsBox.innerHTML=list.map(function(g){
      var played=g.playtime_hours>0;
      var badge=played?'<span class="badge">'+g.playtime_hours+'h</span>'
                       :'<span class="badge unplayed">未プレイ</span>';
      var meta=played?('最終プレイ: '+(g.last_played||'—')):'まだ起動していない';
      return '<article class="card">'
        +'<a href="'+esc(g.store)+'" target="_blank" rel="noopener"><img src="'+esc(g.img)+'" alt="" loading="lazy"></a>'
        +'<div class="card-body"><h2 class="card-title"><a href="'+esc(g.store)+'" target="_blank" rel="noopener">'+esc(g.name)+'</a>'+badge+'</h2>'
        +'<p class="card-meta">'+esc(meta)+'</p></div></article>';
    }).join('');
  }

  function apply(){
    var word=(q.value||'').toLowerCase();
    var list=games.filter(function(g){
      if(filter==='played' && !(g.playtime_hours>0)) return false;
      if(filter==='unplayed' && g.playtime_hours>0) return false;
      return !word || g.name.toLowerCase().indexOf(word)>=0;
    });
    var mode=sortSel.value;
    list.sort(function(a,b){
      if(mode==='playtime') return b.playtime_hours-a.playtime_hours;
      if(mode==='recent') return (b.last_played||'')<(a.last_played||'')?-1:((b.last_played||'')>(a.last_played||'')?1:0);
      return a.name.localeCompare(b.name);
    });
    render(list);
    count.textContent=list.length;
    empty.hidden=list.length!==0;
  }

  q.addEventListener('input',apply);
  sortSel.addEventListener('change',apply);
  chips.forEach(function(chip){
    chip.addEventListener('click',function(){
      chips.forEach(function(c){c.classList.remove('is-active')});
      chip.classList.add('is-active');
      filter=chip.getAttribute('data-f');
      apply();
    });
  });

  fetch('data/games.json')
    .then(function(r){ return r.json(); })
    .then(function(data){
      games=data;
      var total=games.reduce(function(s,g){ return s+g.playtime_hours; },0);
      hours.textContent=Math.round(total).toLocaleString();
      loading.hidden=true;
      apply();
    })
    .catch(function(){
      loading.textContent='データバンクへの接続に失敗しました 📡';
    });
})();
