// Small JS for interactivity and animations (vanilla)
document.addEventListener('DOMContentLoaded',function(){
// year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// reveal on scroll
const obs = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting) entry.target.classList.add('show');
});
},{threshold:0.12});
document.querySelectorAll('.reveal-up').forEach(el=>obs.observe(el));


// fill skill bars
document.querySelectorAll('.bar').forEach(b=>{
const pct = b.dataset.value||70;
setTimeout(()=>{ b.querySelector(':scope::after'); b.style.setProperty('--pct', pct+'%'); b.querySelector('::after'); b.classList.add('activated'); b.style.setProperty('--w', pct+'%'); b.querySelector('::after');
// work-around: set the pseudo-element width by toggling inline style on after via animation
b.style.setProperty('position','relative');
const inner = document.createElement('span');
inner.style.position='absolute';inner.style.left=0;inner.style.top=0;inner.style.bottom=0;inner.style.width='0%';inner.style.borderRadius='999px';inner.style.background='linear-gradient(90deg, var(--accent1), var(--accent2))';inner.style.transition='width 1000ms cubic-bezier(.2,.9,.2,1)';
b.appendChild(inner);
requestAnimationFrame(()=>inner.style.width = pct+'%');
},150);
});


// smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', (e)=>{
e.preventDefault();
const id = a.getAttribute('href').slice(1);
if(!id) return; const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
});
});


// contact form (local validation + friendly fake send)
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
e.preventDefault();
const btn = form.querySelector('button');
const orig = btn.textContent;
btn.textContent = 'Sending...'; btn.disabled = true;
setTimeout(()=>{
btn.textContent = 'Message Sent ✓';
form.reset();
setTimeout(()=>{btn.textContent = orig;btn.disabled=false},1800);
},1100);
});


// tiny parallax for bg based on mouse
document.addEventListener('mousemove', (e)=>{
const x = (e.clientX/window.innerWidth - 0.5)*20;
const y = (e.clientY/window.innerHeight - 0.5)*20;
document.querySelectorAll('.bg-layer').forEach((el,i)=>{
el.style.transform = `translate(${x*(i+1)}px, ${y*(i+1)}px) scale(${1 + i*0.02})`;
});
});
});


/*
* USAGE
* - Replace avatar svg with your photo (same size) or put an "assets/portrait.jpg" and update index.html
* - Drop the uploaded PDF (Abhishek_Panchgalle_Resume.pdf) in the same folder as the HTML so the "Download PDF" button works.
* - To use on GitHub Pages: push these three files (index.html, styles.css, script.js) and the PDF into a repo and enable Pages on main branch (or gh-pages branch).
*/
