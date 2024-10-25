const menubtn = document.querySelector(".menu-btn");
const navi = document.querySelector(".menu")

const bts = document.querySelectorAll(".btn-slides")
const slides = document.querySelectorAll(".video1")
const contents = document.querySelectorAll(".content")

menubtn.addEventListener("click",()=>{
    menubtn.classList.toggle("active");
    navi.classList.toggle("active");    
})

var slidernav = function(manual){
    bts.forEach((btn)=>{
        btn.classList.remove("active")
    })
    slides.forEach((slid)=>{
        slid.classList.remove("active")
    })
    contents.forEach((legenda)=>{
        legenda.classList.remove("active")
    })

    bts[manual].classList.add("active")
    slides[manual].classList.add("active")
    contents[manual].classList.add("active")
}

bts.forEach((btn,i)=>{
    btn.addEventListener("click",() =>{
        slidernav(i)
    })
})