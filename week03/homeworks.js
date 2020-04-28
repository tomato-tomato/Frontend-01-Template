// String to Number
function converStringToNumber(string, x){
    //  默认十进制转换
    if(arguments.length < 2){
        x = 10;
    }
    var chars = string.split('');
    //整数部分
    var number = 0;
    var i = 0;
    while(i < chars.length && chars[i] != '.'){
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }
    if(chars[i] == '.'){
        i++;
    }
    //小数部分
    var fraction = 1;
    while(i < chars.length){
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
    }
    fractoin = fraction / x;

    return number;

}


// Number to String
function converNumberToString(number, x){
    var integer = Math.floor(number);
    var fraction = number - integer;

    var string = '';
    while(integer > 0){
        string = '' + integer % x + string;
        integer = Math.floor(integer / x);
    }


    return string;
}

converNumberToString(100, 10);

