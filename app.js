let controller;
let slideScene;
let pageScene;
let mouse = document.querySelector(".cursor")
let mouseText = mouse.querySelector('span')
const burger = document.querySelector(".burger");

function animateSlide(){
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //loop over each Slide
    sliders.forEach((slide,index,slides) =>{
      const revealImg = slide.querySelector('.reveal-img');
      const img = slide.querySelector('img');
      const revealText = slide.querySelector('.reveal-text');  
      //GSAP PLAYING
      const slideTl = gsap.timeline({
        defaults:{
            duration:1,
            ease:'power2.inOut'
        }
      });
      //first object where to animate from
      //and second object where to go
      slideTl.fromTo(revealImg,{x:'0%'},{x:'100%'});
      //-=1 it will animate one scond sooner 
      //animate at the same time the div imagereveal start animate
      slideTl.fromTo(img , {scale:2},{scale:1},'-=1')
      slideTl.fromTo(revealText,{x:'0%'},{x:'100%'},'-=0.5')
      slideTl.fromTo(nav,{y:'-100%'},{y:'0%'},'-=0.5')
      
      //create scene
      slideScene = new ScrollMagic.Scene({
        triggerElement:slide,
        triggerHook:0.25,  
        reverse:false 
      })
      .setTween(
        slideTl
      )
      .addTo(controller)
        
      const pageTl = gsap.timeline();
      let nextSlide = sliders.length - 1 === index ? 'end': sliders[index+1]
      pageTl.fromTo(nextSlide,{y:"0%"},{y:"50%"})
      pageTl.fromTo(slide,{opacity:1 , scale:1},{opacity:0 , scale:0.5})
      pageTl.fromTo(nextSlide,{y:"50%"},{y:"0%"},"-=0.5")  
      //create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement:slide,
            duration:"100%",
            triggerHook:0
        })
        .setPin(slide, { pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller)
    })
}

function cursor(e){
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function hoverCursor(e){
  let item = e.target
  if(item.id === 'logo' || item.classList.contains('burger')){
    mouse.classList.add('nav-active')
  }else{
    mouse.classList.remove('nav-active')
  }
  if(item.classList.contains('explore')){
    mouse.classList.add('explore-active')
    mouseText.innerText = 'Tap'
    }else{
        mouse.classList.remove('explore-active')
        mouseText.innerText = ''  

    }
}

function navToggler(e){
    if(!e.target.classList.contains("active")){
        e.target.classList.add('active')
        gsap.to(".line1",0.5,{rotate:"45",y:5,background:"black"})
        gsap.to(".line2",0.5,{rotate:"-45",y:-5,background:"black"})
        gsap.to("#logo",1,{color:"black"})
        gsap.to(".nav-bar",1,{ clipPath: "circle(2500px at 100% -10%)" })
        document.body.classList.add("hide")
    }else {
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
      }
}


window.addEventListener('mousemove' ,cursor)
window.addEventListener('mouseover',hoverCursor)
burger.addEventListener('click',navToggler)
animateSlide()
