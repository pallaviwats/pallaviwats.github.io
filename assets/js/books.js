


(() => {
  const books=JSON.parse(document.getElementById('pw-white-book-data').textContent);
  document.querySelectorAll('#pw-white-bookcase .pw-refined-library').forEach(root=>{
  const byId=new Map(books.map(b=>[b.id,b]));
  const groups=[
    ['days-at-the-morisaki-bookshop','more-days-at-the-morisaki-bookshop'],
    ['harry-potter-philosophers-stone','harry-potter-chamber-of-secrets','harry-potter-prisoner-of-azkaban','harry-potter-goblet-of-fire','harry-potter-order-of-the-phoenix','harry-potter-half-blood-prince','harry-potter-deathly-hallows'],
    ['twilight','new-moon','eclipse','breaking-dawn'],
    ['vampire-academy','frostbite','shadow-kiss','blood-promise','spirit-bound','last-sacrifice'],
    ['bloodlines','the-golden-lily','the-indigo-spell','the-fiery-heart','silver-shadows','the-ruby-circle']
  ];
  const groupNames=['Morisaki Bookshop','Harry Potter','Twilight','Vampire Academy','Bloodlines'];
  const series=new Map();groups.forEach((ids,i)=>ids.forEach((id,n)=>series.set(id,{name:groupNames[i],number:n+1,total:ids.length})));
  const state={height:206,selected:null};
  const shelves=root.querySelector('.sl-shelves');
  const authorMeasure=document.createElement('canvas').getContext('2d');authorMeasure.font='7px Arial';
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};

  function shortTitle(b){return b.title;}
  function boundaries(){
    const forbidden=new Set();
    for(let i=1;i<19;i++)forbidden.add(i);
    for(const ids of groups)for(let n=1;n<ids.length;n++)forbidden.add(books.findIndex(b=>b.id===ids[n]));
    return Array.from({length:books.length+1},(_,i)=>i).filter(i=>!forbidden.has(i));
  }
  function splitRows(count){
    const legal=boundaries(),cuts=[0];
    count=Math.min(count,legal.length-1);
    for(let r=1;r<count;r++){
      const ideal=r===1?Math.max(19,Math.round(books.length/count)):cuts[1]+Math.round((books.length-cuts[1])*(r-1)/(count-1));
      const remainingCuts=count-r-1;
      const candidates=legal.filter(n=>n>cuts[cuts.length-1]&&n<books.length);
      const options=candidates.slice(0,candidates.length-remainingCuts);
      options.sort((a,b)=>Math.abs(a-ideal)-Math.abs(b-ideal));
      cuts.push(options[0]);
    }
    cuts.push(books.length);
    return cuts.slice(0,-1).map((start,i)=>books.slice(start,cuts[i+1]));
  }
  function weight(b){let hash=0;for(const c of b.id)hash=(hash+c.charCodeAt(0))%17;if(b.id==='war-and-peace'||b.id==='a-little-life')return 1.46;if(b.title.length>65)return 1.55;if(b.title.length>35)return 1.3;if(b.id.startsWith('harry-potter'))return 1.25;if(series.has(b.id))return 1.05;return .78+hash*.034;}
  function bookButton(b,width,mirror=false){const i=books.indexOf(b),g=series.get(b.id),button=make(mirror?'span':'button','sl-book cursor-interaction');if(!mirror)button.type='button';else button.setAttribute('aria-hidden','true');button.dataset.bookId=b.id;button.classList.toggle('sl-title-only',b.title.length>20||width<22||authorMeasure.measureText(b.author).width>64||width-8<10);button.classList.toggle('sl-hindi',/[\u0900-\u097f]/.test(b.title));button.setAttribute('aria-label',b.title+' by '+b.author+(g?', '+g.name+' Book '+g.number:'')+' — open details');button.setAttribute('aria-expanded',String(state.selected===b.id));button.setAttribute('data-tooltip',b.title+' — '+b.author);button.style.setProperty('--bw',width+'px');button.style.setProperty('--bh',(state.height*(.92+(i*7%9)/100))+'px');button.style.setProperty('--tone',b.tone);button.style.setProperty('--cover-ratio',b.ratio);button.style.setProperty('--ink',b.ink);button.style.setProperty('--lean',((i*13%23-11)*.07)+'deg');button.style.setProperty('--offset',((i*7%5-2)*.2)+'px');button.style.setProperty('--book-font',i%4===0?'Georgia,serif':'Arial,sans-serif');button.style.setProperty('--ts','8px');const object=make('span','sl-object');object.setAttribute('aria-hidden','true');const skin=make('span','sl-skin');if(b.image){const img=make('img','sl-texture');img.src=b.image;img.alt='';img.draggable=false;skin.append(img,make('span','sl-tint'));}const title=make('span','sl-title');title.append(make('span','sl-title-text',shortTitle(b)));skin.append(make('span','sl-rule sl-rule-top'),title,make('span','sl-author',b.author),make('span','sl-rule sl-rule-bottom'));if(g)skin.append(make('span','sl-volume',String(g.number)));skin.append(make('span','sl-grain'));const front=make('span','sl-cover-plane');if(b.image){const image=make('img');image.src=b.cover_url;image.loading='lazy';image.decoding='async';image.alt='';image.draggable=false;front.append(image);}object.append(skin,front,make('span','sl-page-top'));button.append(object);button.addEventListener('click',()=>{state.selected=state.selected===b.id?null:b.id;updateDetails();const panel=shelves.querySelector('.sl-detail');if(panel)panel.scrollIntoView({block:'nearest',behavior:'auto'});});return button;}
  function detail(b){const box=make('div','sl-detail');box.setAttribute('role','region');box.setAttribute('aria-live','polite');box.setAttribute('aria-label',b.title+' details');const close=make('button','sl-close cursor-interaction','×');close.type='button';close.setAttribute('aria-label','Close details');close.addEventListener('click',()=>{const previous=state.selected;state.selected=null;updateDetails();shelves.querySelector('[data-book-id="'+previous+'"]')?.focus();});box.append(close);if(b.image){const cover=make('a','sl-cover-link cursor-interaction');cover.href=b.cover_url;cover.target='_blank';cover.rel='noopener noreferrer';cover.setAttribute('aria-label','Open full-size cover of '+b.title);const img=make('img');img.src=b.cover_url;img.decoding='async';img.alt=b.title+' front cover';cover.append(img);box.append(cover);}const info=make('div');const heading=make('h2');const titleLink=make('a','sl-title-link cursor-interaction',b.title);titleLink.href=b.metadata_url;titleLink.target='_blank';titleLink.rel='noopener noreferrer';titleLink.setAttribute('aria-label','More about '+b.title);heading.append(titleLink);info.append(heading,make('p',null,b.author));if(b.id==='a-little-life')info.append(make('p','reading-status','Currently reading'));const g=series.get(b.id);if(g)info.append(make('p','sl-meta',g.name+' · Book '+g.number+' of '+g.total));if(b.translator)info.append(make('p','sl-meta','Translated by '+b.translator));box.append(info);return box;}
  function updateDetails(){syncMotion();shelves.querySelectorAll('.sl-detail').forEach(e=>e.remove());shelves.querySelectorAll('[data-book-id]').forEach(e=>e.setAttribute('aria-expanded',String(state.selected===e.dataset.bookId)));if(state.selected){const button=shelves.querySelector('[data-book-id="'+state.selected+'"]');button?.closest('.sl-row').append(detail(byId.get(state.selected)));}fitSpineLabels();}
  function fitSpineLabels(){
    shelves.querySelectorAll('.sl-book').forEach(button=>{
      const title=button.querySelector('.sl-title');
      const text=button.querySelector('.sl-title-text');
      const preferred=parseFloat(button.style.getPropertyValue('--ts'))||10.2;
      let size=preferred;
      const applySize=()=>{title.style.fontSize=size+'px';};
      const fits=()=>text.scrollHeight<=title.clientHeight+.5&&text.scrollWidth<=title.clientWidth+.5;
      const shrinkTo=minimum=>{
        while(!fits()&&size>minimum){
          size=Math.max(minimum,size-.2);
          applySize();
        }
      };
      applySize();
      if(!button.classList.contains('sl-title-only')){
        shrinkTo(8.5);
        if(!fits()){
          button.classList.add('sl-title-only');
          size=preferred;
          applySize();
        }
      }
      shrinkTo(5);
    });
  }

  function syncMotion(){root.classList.toggle('sl-still',Boolean(state.selected));}
  let lastWidth=0;
  function innerWidth(){const css=getComputedStyle(shelves);return shelves.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight);}
  function render(){
    const width=innerWidth();if(width<150)return;lastWidth=width;
    root.style.setProperty('--sl-height',state.height+'px');
    const count=width>=660?Math.max(3,Math.ceil(books.length*21/(width-10))):Math.ceil(books.length/Math.max(4,Math.floor((width-10)/34)));
    const rows=splitRows(count);shelves.replaceChildren();
    rows.forEach((row,i)=>{
      const section=make('section','sl-row'),line=make('div','sl-line'),track=make('div','sl-track');
      section.append(line,make('div','sl-shelf'));shelves.append(section);
      track.style.setProperty('--duration',(145+i*11)+'s');track.style.setProperty('--phase',(-i*19)+'s');
      const cycleWidth=Math.max(line.clientWidth,root.clientWidth<660?row.length*34+10:0);track.style.width=(cycleWidth*2)+'px';const available=cycleWidth-10,total=row.reduce((sum,b)=>sum+weight(b),0);
      for(let copy=0;copy<2;copy++){
        const cycle=make('div','sl-cycle');cycle.style.flexBasis=cycleWidth+'px';cycle.style.width=cycleWidth+'px';if(copy)cycle.setAttribute('aria-hidden','true');
        for(const b of row)cycle.append(bookButton(b,available*weight(b)/total,copy===1));
        track.append(cycle);
      }
      line.append(track);
    });
    updateDetails();
  }
  render();document.fonts?.ready.then(()=>fitSpineLabels());new ResizeObserver(()=>{if(Math.abs(innerWidth()-lastWidth)>2)render();}).observe(shelves);
  });
})();


