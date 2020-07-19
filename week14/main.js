function create(Cls, attributes, ...children){
    let o = new Cls;

    for(let name in attributes){
        o.setAttr(name, attributes[name]);
    }

    for(let child of children){
        o.appendc(child);
    }

    return o;
}

class Parent{
    set class(v){
        console.log("Parent::class", v);
    }

    setAttr(name, value){
        console.log(name, value);
    }

    appendc(child){
        console.log(child);
    }
}
class Child{

}

let component = <Parent id="a" class="b">
    <Child></Child>
    <Child></Child>
</Parent>;

component.class = "c";

console.log(component);