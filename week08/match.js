function matchByClassSelector(selector, element){
    return element.className.split(/s+/g).includes(selector.replace(".", ""));
}

function matchByIDSelector(selector, element){
    return element.id.split(/s+/g).includes(selector.replace("#", ""));
}

function matchByTypeSelector(selector, element){
    return element.tagName === selector.toUpperCase();
}


//检查元素是否与简单选择器匹配
function matchBySimpleSelector(selector, element){
    if(!selector || !element){
        return false;
    }else if(selector.startWith(".")){//class
        return matchByClassSelector(selector, element);
    }else if(selector.startWith("#")){//id
        return matchByIDSelector(selector, element);
    }else{//type
        return matchByTypeSelector(selector, element);
    }   
}