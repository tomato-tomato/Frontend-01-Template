import {enableGesture} from "../gesture/gesture";

export function createElement(Cls, attributes, ...children){
  let o;
  if(typeof Cls === "string"){
      o = new Wrapper(Cls);
  }else{
      o = new Cls({
          timer: {}
      });
  }

  for(let name in attributes){
      o.setAttr(name, attributes[name]);
  }

  let visit = (children) => {
      for(let child of children){

          if(typeof child === "object" && child instanceof Array){
              visit(child);
              continue;
          }
          if(typeof child === "string")
              child = new Text(child);
          
          o.appendca(child);
      }
  }
  visit(children);

  return o;
}

export class Text{
  constructor(text){
      this.children = [];
      this.root = document.createTextNode(text);
  }

  mountTo(parent){
      parent.appendChild(this.root);
  }
}

export class Wrapper{
  constructor(type){
      this.children = []
      this.root = document.createElement(type);
  }

  setAttr(name, value){ //attribute
        this.root.setAttribute(name, value);

        if(name.match(/^on([\s\S]+)$/)){
            let ename = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());
            this.addEventListener(ename, value);
        }

        if(name === "enableGesture"){
            enableGesture(this.root);      
        }
  }

  appendca(child){
      this.children.push(child);
  }

  addEventListener(){
      this.root.addEventListener(...arguments);
  }
  
  get style(){
      return this.root.style;
  }

  mountTo(parent){
      // console.log("Wrapper",parent);
      parent.appendChild(this.root);
      for(let child of this.children){
          child.mountTo(this.root);
      }
  }
}