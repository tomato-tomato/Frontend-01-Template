import {createElement, Wrapper, Text} from  "./createElement.js";
import {TimeLine, Animation} from "./animation/animation";
import {ease} from "./animation/cubicBezier";

import {enableGesture} from "../gesture/gesture";

export class ListView {
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

    reander(){
        let data = this.getAttr('data');
       return <div class="list-view">
           {
               data.map(this.children[0])
           }
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

let data = [
    {title:"猫1",url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {title:"猫2",url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {title:"猫3",url:"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {title:"猫4",url:"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"}

];

// let list = <ListView data={data}>
//     {rec => <figure>
//         <img src={rec.url} />
//         <figcaption>{rec.title}</figcaption>
//     </figure>}
// </ListView>

// list.mountTo(document.body);

