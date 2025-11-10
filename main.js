const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add("active");
}

// Change slide every 3 seconds
setInterval(showNextSlide, 3000);






function cart1(){
    document.getElementById("cart").style.cursor="pointer"
    window.location.href="./shoes.html"

}
function cart2(){
    window.location.href="./mens.html"

}
function cart3(){
    window.location.href="./pants.html"

}
function cart4(){
    window.location.href="./mt.html"

}
function cart5(){
    window.location.href="./mw.html"

}
function cart8(){

    window.location.href="./shoes.html"


}
function readmore(){
    window.location.href="./read.html"
}
function cart9(){
    window.location.href='./flip-flops.html'
}
function cart11(){
    window.location.href='./spets.html'
}
function cart13(){
    window.location.href='./ws.html'
}
function cart14(){
    window.location.href='./wt.html'
}
function cart15(){
    window.location.href='./wg.html'
}
function cart16(){
    window.location.href='./ch.html'
}
function cart17(){
    window.location.href='./t.html'
}





