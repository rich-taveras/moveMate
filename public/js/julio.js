function movement() {
    
    
    for (let i = 0; i < 4; i++) {        
        let numEl = document.getElementById(`num${i}`) ;
        let value = numEl.getAttribute("data-count")
      let iniValue = 0;
      let numSpeed = 20;
      let count = () => {
        iniValue = iniValue + numSpeed;
            
        numEl.innerHTML = iniValue
        if (iniValue < value) {
          setTimeout(() => {
            count();
          }, 30);
        }
      };
      count();
    }
  }

  movement()