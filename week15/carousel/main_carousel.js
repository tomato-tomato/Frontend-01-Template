import {createElement, Wrapper, Text} from  "./createElement.js";
// import {Carousel} from "./carousel.view";


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
        let children = this.data.map(url => {
            let el = <img src={url} />;
            el.addEventListener("dragstart", e => e.preventDefault());
            return el;
        });
        let root = <div class="carousel">{children}</div>;

        let position = 0;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            //起始位置
            current.style.transform = `translateX(${-100*position}%)`;
            next.style.transform = `translateX(${100-100*nextPosition}%)`;

            setTimeout(() => {
                current.style.transition = "ease 0.5s";
                next.style.transition = "ease 0.5s";

                //中止位置
                current.style.transform = `translateX(${-100-100*position}%)`;
                next.style.transform = `translateX(${-100*nextPosition}%)`;

                position = nextPosition;
            }, 16);
            
            setTimeout(nextPic, 3000);
        }
        setTimeout(nextPic, 3000);
        root.addEventListener("mousedown", e => {
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
        });

        return root;
    }
    
    addEventListener(){
        this.root.addEventListener(...arguments);
    }

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

console.log(component);
