import {createElement, Wrapper, Text} from  "./createElement.js";
import {TimeLine, Animation} from "./animation/animation";
import {ease} from "./animation/cubicBezier";

import {enableGesture} from "../gesture/gesture";
import {Panel} from "./panel";
import {TabPanel} from "./TabPanel";
import {ListView} from "./ListView";

import css from "./carousel.css";

class Carousel{
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

        let timeline = new TimeLine;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {

            let nextPosition = (currentPosition + 1) % this.data.length;
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;

            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];

                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                // console.log(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;

            };

            let onPan = e => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = e.clientX - e.startX;

                let currentTransformValue = -500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
            };

            let onPanend = e => {
                
                let direction = 0;
                let dx = e.clientX - e.startX;

                
                if(dx + offset > 250 || dx > 0 && e.isFlick){
                    direction = 1;
                }else if(dx + offset < -250|| dx < 0 && e.isFlick){
                    direction = -1;
                }
                // console.log("direction");
                
                timeline.reset();
                timeline.start();

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, "transform", -500 - 500 * lastPosition + offset + dx, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, "transform", -500*currentPosition+offset+dx, -500*currentPosition+direction*500, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, "transform", 500-500*nextPosition+offset+dx, 500-500*nextPosition+direction*500, 500, 0, ease, v => `translateX(${v}px)`);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;

                nextPicStopHandler = setTimeout(nextPic, 3000);
            };


            let el = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true}/>;
            el.style.transform = "translateX(0px)";
            el.addEventListener("dragstart", e => e.preventDefault());
            return el;
        });

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, "transform", -100*position, -100-100*position, 500, 0, ease, v => `translateX(${v}%)`);
            let nextAnimation = new Animation(next.style, "transform", 100-100*nextPosition, -100*nextPosition, 500, 0, ease, v => `translateX(${v}%)`);

            timeline.add(currentAnimation); 
            timeline.add(nextAnimation);

            
            position = nextPosition;
            nextPicStopHandler = setTimeout(nextPic, 3000);
        }
        nextPicStopHandler = setTimeout(nextPic, 3000);
        
        /* root.addEventListener("mousedown", e => {
            let startX = e.clientX;
            let nextPosition = (position + 1) % this.data.length;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];
            
            current.style.transition = "ease 0s";
            last.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 500 * position}px)`;
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

            let move = e => { 
                current.style.transform = `translateX(${e.clientX - startX - 500 * position}px)`;
                last.style.transform = `translateX(${e.clientX - startX - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${e.clientX - startX + 500 - 500 * nextPosition}px)`;
                // console.log(e.clientX - startX, e.clientY - startY);
            };

            let up = e => {
                let offset = 0;

                if(e.clientX - startX > 250){
                    offset = 1;
                }else if(e.clientX - startX < -250){
                    offset = -1;
                }

                //transition打开
                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        }); */

        return <div class="carousel">{children}</div>;
    }
    
    // addEventListener(){
    //     this.root.addEventListener(...arguments);
    // }

    mountTo(parent){

        this.reander().mountTo(parent);       
    }
}

// let component = <Div id="a" abc="b" style="width:100px;height:100px;background-color:lightgreen;">
//     <div></div>
//     <Div style="width:20px;height:20px;background-color:blue;"></Div>
//     <Div></Div>
// </Div>;

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
]} />;

// component.abc = "c";
component.mountTo(document.body); 

// console.log(component);

