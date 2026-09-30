function goPage(page){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById('page-'+page).classList.add('active');
document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
document.querySelectorAll('.nav-btn[data-page="'+page+'"]').forEach(b=>b.classList.add('active'));
window.scrollTo({top:0,behavior:'smooth'});
}
function toggleMobileMenu(){document.getElementById('mobile-menu').classList.toggle('open');}
let h2Index=0,h2Timer=null;
function h2GoSlide(i){
const slides=document.querySelectorAll('#h2-slider .h2-slide');
const dots=document.querySelectorAll('#h2-slider .h2-dot');
if(!slides.length)return;
slides.forEach(s=>s.classList.remove('active'));
dots.forEach(d=>d.classList.remove('active'));
slides[i].classList.add('active');
dots[i].classList.add('active');
h2Index=i;
}
function h2Next(){
const slides=document.querySelectorAll('#h2-slider .h2-slide');
if(!slides.length)return;
h2GoSlide((h2Index+1)%slides.length);
}
function h2StartSlider(){
if(h2Timer)clearInterval(h2Timer);
h2Timer=setInterval(h2Next,4500);
}
h2StartSlider();

/* Achievers ticker: JS-driven scroll so arrows can control it smoothly */
let tickerPos=0,tickerPaused=false,tickerHalfWidth=0;
function tickerInit(){
const track=document.querySelector('.achievers-ticker-track');
if(!track)return;
tickerHalfWidth=track.scrollWidth/2;
function tickerFrame(){
if(!tickerPaused&&tickerHalfWidth>0){
tickerPos+=0.5;
if(tickerPos>=tickerHalfWidth)tickerPos-=tickerHalfWidth;
track.style.transform='translateX(-'+tickerPos+'px)';
}
requestAnimationFrame(tickerFrame);
}
requestAnimationFrame(tickerFrame);
}
tickerInit();
function tickerNav(direction){
const track=document.querySelector('.achievers-ticker-track');
if(!track||tickerHalfWidth<=0)return;
tickerPos+=direction*320;
if(tickerPos<0)tickerPos+=tickerHalfWidth;
if(tickerPos>=tickerHalfWidth)tickerPos-=tickerHalfWidth;
track.style.transition='transform .45s ease';
track.style.transform='translateX(-'+tickerPos+'px)';
setTimeout(function(){track.style.transition='';},450);
}
function openEnquiry(){document.getElementById('enquiry-modal').classList.add('active');document.body.style.overflow='hidden';}
function closeEnquiry(){document.getElementById('enquiry-modal').classList.remove('active');document.body.style.overflow='';document.getElementById('modal-form-body').style.display='block';document.getElementById('success-msg').classList.remove('active');document.getElementById('enquiry-form').reset();}
function handleEnquirySubmit(e){
const btn=document.getElementById('enquiry-submit-btn');
const errorBox=document.getElementById('enquiry-error');
btn.disabled=true;
btn.textContent='Sending...';
errorBox.style.display='none';
const frame=document.querySelector('iframe[name="enquiry-hidden-frame"]');
let done=false;
const finish=function(){
if(done)return;
done=true;
btn.disabled=false;
btn.textContent='Submit enquiry \u2192';
document.getElementById('modal-form-body').style.display='none';
document.getElementById('success-msg').classList.add('active');
};
frame.addEventListener('load',finish,{once:true});
setTimeout(finish,4000);
}
function handleContactSubmit(e){e.preventDefault();alert('Thank you! Your message has been sent. We will contact you shortly.');e.target.reset();}
function switchTab(e,panelId){e.target.parentElement.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));document.getElementById(panelId).classList.add('active');}
if(!sessionStorage.getItem('enquiryShown')){setTimeout(()=>{openEnquiry();sessionStorage.setItem('enquiryShown','1');},2000);}
