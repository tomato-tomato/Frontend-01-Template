//有限状态机处理字符串 寻找abcabx
function match(string){
    let state = start;
    for (const c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c){
    if(c === 'a'){
        return foundA;
    }else{
        return start;
    }
}
function end(c){
    return end;
}


function foundA(c){
    if(c === 'b'){
        return foundB;
    }else{
        return start;
    }
}
function foundB(c){
    if(c === 'c'){
        return foundA1;
    }else{
        return start;
    }
}
function foundA1(c){
    if(c === 'a'){
        return foundB1;
    }else{
        return start;
    }
}
function foundB1(c){
    if(c === 'b'){
        return foundX;
    }else{
        return start;
    }
}
function foundX(c){
    if(c === 'x'){
        return end;
    }else if(c === 'c'){
        return foundB(c);
    }else{
        return start;
    }
}

console.log(match("abcabcxabx"));