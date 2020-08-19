import {parseHTML} from "../src/parser.js";
let assert = require('assert');

it('parse a single element',  () => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];
    console.log(div);
    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 2);
});
it('parse a single element width text content',  () => {
    let doc = parseHTML("<div>Hello</div>");
    let text = doc.children[0].children[0];
    console.log(text);
    assert.equal(text.type, "text");
    assert.equal(text.content, "Hello");
});

it('tag mismatch',  () => {
    try{
        let doc = parseHTML("<div></dov>");
    }catch(e){
        assert.equal(e.message, "Tag start end doesn't match!");
    }
    
});

it('text with <',  () => {
    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];

    assert.equal(text.type, "text");
    assert.equal(text.content, "a < b"); 
});

it('with property',  () => {
    let doc = parseHTML("<div class=b id=a data=\"abc\" ></div>");
    let div = doc.children[0];

    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === "class"){
            count++;
            assert.equal(attr.value, "b");
        }
        if(attr.name === "id"){
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "data"){
            count++;
            assert.equal(attr.value, "abc");
        }
    }

    assert.ok(count === 3);
});

it("with property2", () => {
    let doc = parseHTML("<div class=b id=a data=\"abc\"></div>");
    let div = doc.children[0];

    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === "class"){
            count++;
            assert.equal(attr.value, "b");
        }
        if(attr.name === "id"){
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "data"){
            count++;
            assert.equal(attr.value, "abc");
        }
    }

    assert.ok(count === 3);
});

it("with property3", () => {
    let doc = parseHTML("<img class='b' id=a  data=\"abc\"/>");
    let div = doc.children[0];

    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === "class"){
            count++;
            assert.equal(attr.value, "b");
        }
        if(attr.name === "id"){
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === "data"){
            count++;
            assert.equal(attr.value, "abc");
        }
    }

    assert.ok(count === 3);
});

it("script", () => {
    let content = `<div>abcd</div>
    <span>x</span>
    <script
    <   
    </   
    </s  
    </sc  
    </scr  
    </scri  
    </scrip  
    </script`;
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];

    assert.equal(text.content, content);
    assert.equal(text.type, "text");
});

it("attribute with no value", () => {
    let doc = parseHTML("<div class />");
});

it("attribute with no value 2", () => {
    let doc = parseHTML("<div class id/>");
});

it("quote with attribute", () => {
    let doc = parseHTML(`<div class='a' id="he"data/>`);
});
it("uppercase tag", () => {
    let doc = parseHTML(`<DIV id='a' class=class><IMG id=id/><img/></DIV>`);
});
