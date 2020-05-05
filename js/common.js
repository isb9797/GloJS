'use strict';

function DomElement(possition = 'static', selector, height, width, bg, fontSize, innerTxt){
    this.selector  = selector;
    this.height  = height;
    this.width  = width;
    this.bg  = bg;
    this.fontSize = fontSize;
    this.innerTxt = innerTxt;
    this.possition = possition;

};


DomElement.prototype.addElement = function(){
    if (this.selector[0] === '.'){
       let slicedSelector = this.selector.slice(1, this.selector.length);
       let div = document.createElement('div');
       document.body.append(div);
       div.classList.add(slicedSelector);
       if (this.height){
        div.style.cssText =
          "height: " +
          this.height +
          ";  width: " +
          this.width +
          "; background-color: " +
          this.bg +
          ";  font-size: " +
          this.fontSize +
          "; position: " +
          this.possition +
          ";"; 

        if (this.innerTxt){
            div.innerText = this.innerTxt;
        }
          

       }

        
        
    }else if (this.selector[0] === '#'){
        let slicedSelector = this.selector.slice(1, this.selector.length);
        let p = document.createElement('p');
        document.body.append(p);
        p.setAttribute('id', slicedSelector);
        if (this.height){
            p.style.cssText =
            "height: " +
            this.height +
            ";  width: " +
            this.width +
            "; background-color: " +
            this.bg +
            ";  font-size: " +
            this.fontSize +
            "; display: block;" +
            "position: " +
            this.possition +
            ";"; 

            if (this.innerTxt){
                p.innerText = this.innerTxt;
            }
       
        }
    }
};




window.addEventListener('DOMContentLoaded', () => {
  const domElement = new DomElement('absolute', '.my-id', '100px', '100px', 'blue', '72pt');

 domElement.addElement();
 const square = document.querySelector('p, div');
    square.style.left = 0 + 'px';
    square.style.top = 0 + 'px';
    let countLeft = 10;
    let countTop = 10;
    

 document.body.addEventListener('keydown', event => {
    const target = event.target;
    
    const left = () => {
      left = countLeft;
      countLeft+=10;
      square.style.left = countLeft + 'px';
    }

    const right = () => {
      console.log(square.style);
    
      countLeft-=10;
      square.style.left = countLeft + 'px';
    }

    const top = () => {
      
      countTop-=10;
      square.style.top = countTop + 'px';
    }

    const bottom = () => {
      countTop+=10;
      square.style.top = countTop + 'px';
    }
    //console.log('div: ', square);


    switch(event.keyCode){
      case 39: left();  break;
      case 37: right(); break;
      case 38: top(); break;
      case 40: bottom(); break;
    }
 })

  
  
})  



