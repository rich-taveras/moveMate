let run = 0

const observer = new IntersectionObserver((entries) => {
  // entries.forEach((entry) => {
  //   if (entry.isIntersecting) {
      
  //   }
 // });
if (run === 0) {
  run = 1
  movement()
  
}

});
observer.observe(document.getElementById('custom-number'));

// const test = document.getElementById('custom-number')

// function newFunction(){
  
// if (test.scrollIntoView(true)) {
//   movement()
// }
// }



// window.addEventListener("scroll", function(event){
//   console.log(document.getElementById('custom-number').focus());
//   if (document.getElementById('custom-number').focus()) {
//     movement();
//   }
// })



function movement() {
  for (let i = 0; i < 13; i++) {
    let numEl = document.getElementById(`num${i}`);
    let value = numEl.getAttribute('data-count');
    let iniValue = 0;
    let numSpeed = 10;
    let count = () => {
      iniValue = iniValue + numSpeed;

      numEl.innerHTML = '+' + iniValue;
      if (iniValue < value) {
        setTimeout(() => {
          count();
        }, 30);
      }
    };
    count();
  }
}


