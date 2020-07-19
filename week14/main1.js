
function create(Cls, attributes, ...children) {
    let o;

    if(typeof Cls === "string"){
        o = new Wraper(Cls);
    }else{
        o = new Cls({
            timer:{}
        });
    }

    for(let name in attributes){
        o.setAttribute(name, attributes[name]);
    }

    for(let child of children){
        if(typeof child === "string")
            child = new Text(child);
        o.appendChild(child);
    }

    return o;
}
class Text{
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wraper{
    constructor(type) {
        this.children = [];
        this.attributes = new Map();
        this.root = document.createElement(type);
    }

    setAttribute(name, value){ //attribute
        this.attributes.set(name, value);
    }

    
    appendChild(child){
        this.children.push(child);;
    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}

//////////////////
class MyComponent{
    constructor(config) {
        this.children = [];
        this.root = document.createElement("div");
    }

    setAttribute(name, value){ //attribute
        this.root.setAttribute(name, value);
    }

    
    appendChild(child){
        this.children.push(child);
    }

    render(){
        return <article>
            <header>Header</header>
            {this.slot}
            <footer>Header</footer>
        </article>;
    }

    mountTo(parent){
        this.slot = <div></div>;
        for(let child of this.children){
            this.slot.appendChild(child);
        }

        this.render().mountTo(parent);

        
    }

}


/* let component = <Div id="a" class="d" style="width:100px;height:100px;background-color:lightgreen;">
        <div></div>
        <div></div>
        <div></div>
    </Div>; */

let component = <MyComponent>
    <div>text text</div>
    <div></div>
</MyComponent>;

component.mountTo(document.body);

console.log(component);