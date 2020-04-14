'use strict';

function DomElement(selector, height, width, bg, fontSize, innerTxt){
    this.selector  = selector;
    this.height  = height;
    this.width  = width;
    this.bg  = bg;
    this.fontSize = fontSize;
    this.innerTxt = innerTxt;
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
            "; display: block;";

            if (this.innerTxt){
                p.innerText = this.innerTxt;
            }
       
        }
    }
};




const domElement = new DomElement('#my-id', '800px', '800px', 'red', '72pt', 'Привет мир!');

domElement.addElement();

