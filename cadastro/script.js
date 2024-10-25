const menubtn = document.querySelector(".menu-btn");
const navi = document.querySelector(".menu")

menubtn.addEventListener("click",()=>{
    menubtn.classList.toggle("active");
    navi.classList.toggle("active");    
})