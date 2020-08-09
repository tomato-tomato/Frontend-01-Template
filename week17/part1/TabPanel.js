import {createElement, Wrapper, Text} from  "./createElement.js";
import {TimeLine, Animation} from "./animation/animation";
import {ease} from "./animation/cubicBezier";

import {enableGesture} from "../gesture/gesture";

export class TabPanel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.propertyies = new Map();
        this.state = Object.create(null);
    }

    setAttr(name, value){ //attribute
        this[name] = value;
    }
    getAttr(name){ //attribute
        return this[name];
    }

    appendca(child){
        this.children.push(child);
    }

    select(i){
        for(let view of this.childViews){
            view.style.display = 'none';
        }
        this.childViews[i].style.display = "";
        //this.titleView.innerText = this.children[i].title;
        for(let view of this.titleView){
            view.classList.remove('selected');
        }
        this.titleView[i].classList.add('selected');
    }

    reander(){
        this.childViews = this.children.map(c => <div style="min-height:300px;border: 1px solid blue;width:350px;">{c}</div>);
        this.titleView = this.children.map((c, i) => <span style="border:1px solid black;" onclick={() => this.select(i)}>{c.getAttr("title")}</span>);


        setTimeout(()=> this.select(0), 16);
       return <div class="tab-panel">
           <h1 style="background-color:lightgreen;width:350px;margin:0;cursor:pointer;">{this.titleView}</h1>
           
           <div>
               {this.childViews}
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

// let tabpanel = <TabPanel>
//     <span title="title1">this is content1</span>
//     <span title="title2">this is content2</span>
//     <span title="title3">this is content3</span>
//     <span title="title4">this is content4</span>
//     </TabPanel>;

// tabpanel.mountTo(document.body);

// window.tabpanel = tabpanel;

