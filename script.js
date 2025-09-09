// 3D Resume interactive JS
(function(){
// set year
document.addEventListener('DOMContentLoaded', ()=>{
const y = new Date().getFullYear(); document.getElementById('year').textContent = y;


// simple particles (small circles) to add depth
const particles = document.getElementById('particles');
for(let i=0;i<30;i++){ const s = document.createElement('div'); s.className='p'; s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%'; s.style.width = 2+Math.random()*6+'px'; s.style.height = s.style.width; s.style.opacity = 0.06+Math.random()*0.2; particles.appendChild(s);}


// tilt effect for profile card
const card = document.getElementById('profileCard');
const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
card.addEventListener('pointermove', (e)=>{
const r = card.getBoundingClientRect();
const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 to 0.5
const py = (e.clientY - r.top) / r.height - 0.5;
const rotateY = clamp(px * 20, -20, 20);
const rotateX = clamp(-py * 18, -18, 18);
card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
});
card.addEventListener('pointerleave', ()=>{ card.style.transform = 'none'; });


// timeline depth parallax on scroll
const track = document.getElementById('timelineTrack');
window.addEventListener('scroll', ()=>{
const top = window.scrollY; track.style.transform = `translateZ(${Math.min(0, -top*0.08)}px)`;
}, {passive:true});


// interactive cube slow down on hover
const cube = document.getElementById('skillCube');
let spinning = true; let angle = 0; let raf;
function loop(){ angle += 0.25; cube.style.transform = `rotateX(10deg) rotateY(${angle}deg)`; raf=requestAnimationFrame(loop);} loop();
cube.addEventListener('pointerenter', ()=>{ cancelAnimationFrame(raf); spinning=false; });
cube.addEventListener('pointerleave', ()=>{ if(!spinning){ spinning=true; raf=requestAnimationFrame(loop);} });


// graceful fallback: if portrait.jpg missing, place SVG
const img = document.querySelector('.avatar img');
img.addEventListener('error', ()=>{
img.style.display='none';
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('viewBox','0 0 200 200'); svg.style.width='150px'; svg.style.height='150px'; svg.innerHTML = '<rect width="200" height="200" rx="20" fill="url(#g)"/><defs><linearGradient id="g"><stop offset="0" stop-color="#6ee7b7"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>';
document.querySelector('.avatar').appendChild(svg);
});


});


})();
