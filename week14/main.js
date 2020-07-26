
//函数名称需要对应 webpack配置中 pragma 的值
function createElement(Cls, attributes, ...children){
    let o;
    if(typeof Cls === "string"){
        o = new Wrapper(Cls);
    }else{
        o = new Cls({
            timer: {}
        });
    }

    for(let name in attributes){
        //调用的方法需要跟构建中的一致
        o.setAttr(name, attributes[name]);
    }

    for(let child of children){
        if(typeof child === "string")
            child = new Text(child);
        o.appendca(child);
    }
    return o;
}

class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        this.children = []
        this.root = document.createElement(type);
    }

    setAttr(name, value){ //attribute
        this.root.setAttribute(name, value);
    }

    appendca(child){
        this.children.push(child);
    }
    
    mountTo(parent){
        // console.log("Wrapper",parent);
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
}

class MyComponent{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.propertyies = new Map();
    }

    setAttr(name, value){ //attribute
        this.attributes.set(name, value);
    }

    appendca(child){
        this.children.push(child);
    }

    set title(value){
        this.propertyies.set("title", value);
    }

    reander(){
        
        return <article>
            <header>Header</header>
            {this.slot}
            <footer>Footer</footer>
        </article>
    }
    
    mountTo(parent){
        // console.log("component", parent);
        this.slot = <div></div>;
        for(let child of this.children){
            this.slot.appendca(child);
        }

        this.reander().mountTo(parent);       
    }
}

// let component = <Div id="a" abc="b" style="width:100px;height:100px;background-color:lightgreen;">
//     <div></div>
//     <Div style="width:20px;height:20px;background-color:blue;"></Div>
//     <Div></Div>
// </Div>;

let component = <MyComponent title="hello">
    <div class="a">text text</div>
</MyComponent>;

// component.abc = "c";
component.mountTo(document.body);

console.log(component);
