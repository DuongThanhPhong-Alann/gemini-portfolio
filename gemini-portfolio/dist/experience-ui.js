import { projects } from './projects.js';
const $ = (s) => document.querySelector(s);
const chapters = [...document.querySelectorAll('.chapter')];
const names = ['ORIGIN','DUALITY','TOOLKIT','DEVDES','LOOPIX','SENSE & SCENE','JOURNEY','CONNECT'];
const media = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = media.matches, starts = [], total = 1, scene = null, active = -1;
try { const saved = localStorage.getItem('phong-reduced-motion'); if (saved !== null) reduced = saved === 'true'; } catch {}
function motionUI() {
  document.body.classList.toggle('reduced-motion', reduced);
  $('#motion-toggle').setAttribute('aria-pressed', String(reduced));
  $('#motion-toggle').setAttribute('aria-label', reduced ? 'Bật chuyển động 3D' : 'Giảm chuyển động');
  $('#motion-symbol').textContent = reduced ? '▷' : 'Ⅱ';
  $('#motion-label').textContent = reduced ? 'Đã giảm chuyển động' : 'Chuyển động';
}
motionUI();
$('#motion-toggle').addEventListener('click', () => { reduced = !reduced; motionUI(); try { localStorage.setItem('phong-reduced-motion', String(reduced)); } catch {} scene?.wake(); });
media.addEventListener('change', e => { reduced = e.matches; motionUI(); scene?.wake(); });
function measure() { starts = chapters.map(e=>e.offsetTop); total = Math.max(1,document.documentElement.scrollHeight-innerHeight); }
const smooth = (a,b,v) => { const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t); };
function journey() {
  const y=scrollY; let index=0;
  for(let i=1;i<starts.length;i++) if(y>=starts[i]-2)index=i;
  const phase=(y-starts[index])/((starts[index+1]??(starts[index]+innerHeight))-starts[index]);
  const blend=index===7?0:smooth(.26,.97,phase);
  if(index!==active){
    active=index;
    chapters.forEach((e,i)=>{e.classList.toggle('current',i===index);if(scene){e.querySelector('.chapter-content').inert=i!==index;}});
    document.querySelectorAll('.chapter-nav a').forEach((e,i)=>{e.classList.toggle('active',i===index);if(i===index)e.setAttribute('aria-current','location');else e.removeAttribute('aria-current');});
    document.querySelectorAll('#main-nav a').forEach(e=>e.classList.toggle('active',e.hash==='#'+chapters[index].id||(index>=3&&index<=5&&e.hash==='#projects')));
    $('#chapter-count').textContent=String(index+1).padStart(2,'0');$('#chapter-name').textContent=names[index];
    $('#scroll-prompt').href='#'+chapters[(index+1)%8].id;
  }
  if(scene){const panel=chapters[index].querySelector('.chapter-content');const opacity=index===7?1:1-smooth(.46,.87,phase);panel.style.opacity=String(opacity);panel.style.transform=reduced?'none':`translateY(${-smooth(.4,1,phase)*35}px)`;panel.style.pointerEvents=opacity>.15?'auto':'none';}
  $('.scroll-progress').style.transform=`scaleX(${Math.min(1,y/total)})`;
  return {index,blend,reduced,mobile:innerWidth<=700};
}
measure();journey();
window.addEventListener('resize',()=>{measure();journey();},{passive:true});
window.addEventListener('scroll',()=>{journey();scene?.wake();},{passive:true});
new ResizeObserver(measure).observe($('#main'));
document.fonts.ready.then(measure);
const menu=$('#menu-toggle'),nav=$('#main-nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Mở menu');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
const dialog=$('#project-dialog');let selected=0,trigger=null;
function renderProject(i){
  selected=(i+projects.length)%projects.length;const p=projects[selected];const n=String(selected+1).padStart(2,'0');
  $('#dialog-label').textContent=`${n} / ${p.category}`;$('#dialog-count').textContent=`${n} / 03`;
  $('#dialog-content').innerHTML=`<div class="dialog-hero"><h2 id="dialog-title">${p.name}</h2><span aria-hidden="true">✧</span></div><img class="dialog-cover" src="/assets/${p.image}" width="1440" height="1000" alt="Giao diện ${p.name}"><p class="dialog-summary">${p.summary}</p><div class="tag-list">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div><section class="dialog-section"><h3>Bài toán & mục tiêu</h3><p>${p.purpose}</p></section><section class="dialog-section"><h3>Những điểm nổi bật</h3><ul>${p.features.map(s=>`<li>${s}</li>`).join('')}</ul></section><section class="dialog-section"><h3>Phía sau trải nghiệm</h3><p>${p.technical}</p></section><section class="dialog-section"><h3>Giá trị kỹ thuật</h3><p>${p.takeaway}</p></section>${p.note?`<p class="dialog-note">${p.note}</p>`:''}<a class="button primary dialog-link" href="${p.url}" target="_blank" rel="noopener noreferrer">Trải nghiệm website <span>✦</span></a>`;
  dialog.scrollTop=0;
}
function openProject(id,button){const i=projects.findIndex(p=>p.id===id);if(i<0)return;trigger=button;renderProject(i);document.body.classList.add('dialog-open');dialog.showModal();$('#dialog-close').focus({preventScroll:true});}
document.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b)openProject(b.dataset.project,b);});
$('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');trigger?.focus({preventScroll:true});});
$('#next-project').addEventListener('click',()=>renderProject(selected+1));$('#previous-project').addEventListener('click',()=>renderProject(selected-1));
let toastTimer;function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('duongthanhphong1618@gmail.com');toast('Đã sao chép email. Hẹn gặp bạn trong hộp thư!');}catch{const range=document.createRange();range.selectNodeContents($('.contact-email'));getSelection().removeAllRanges();getSelection().addRange(range);toast('Email đã được chọn. Nhấn Ctrl/Cmd + C để sao chép.');}});
function fallback(error){console.warn('3D view unavailable:',error?.message??error);document.body.classList.add('no-webgl');document.body.classList.remove('has-scene');chapters.forEach(c=>{const p=c.querySelector('.chapter-content');p.inert=false;p.style.opacity='1';p.style.transform='none';p.style.pointerEvents='auto';});$('#scene-status').textContent='Thiết bị đang dùng chế độ hiển thị nhẹ.';measure();}
try{const {startSpace}=await import('./space.js');scene=await startSpace({journey,onFailure:fallback});document.body.classList.add('has-scene');active=-1;journey();$('#scene-status').classList.add('ready');}catch(error){fallback(error);}
