import {createElement, Wrapper, Text} from  "./createElement.js";
import {TimeLine, Animation} from "./animation/animation";
import {ease} from "./animation/cubicBezier";

import {enableGesture} from "../gesture/gesture";

export class Panel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.propertyies = new Map();
    }

    setAttr(name, value){ //attribute
        this[name] = value;
    }

    appendca(child){
        this.children.push(child);
    }


    reander(){
       return <div class="panel">
           <h1 style="background-color:lightgreen;width:300px;margin:0;">{this.title}</h1>
           <div style="border: 1px solid blue;min-height:300px;width:300px;">
               {this.children}
            </div>
        </div>;
    }
    

    mountTo(parent){

        this.reander().mountTo(parent);       
    }
}

// let component = <Carousel data={[
//     "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//     "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//     "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//     "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
// ]} />;

// let panel = <Panel title="this is my panel"><span>this is content</span></Panel>;
// panel.mountTo(document.body);

