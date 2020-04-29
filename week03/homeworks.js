// 1.String to Number
function converStringToNumber(string, x){
    //  默认十进制转换
    if(arguments.length < 2){
        x = 10;
    }
    var chars = string.split('');
    //整数部分
    var number = 0;
    var eNum = 0;
    var i = 0;
    while(i < chars.length && chars[i] !== '.' && chars[i] !== 'e'){
        number = number * x;
        if(chars[i].codePointAt(0) < '9'.codePointAt(0)){
            //处理2~10进制整数
            number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        }else if(x > 10){
            //处理11~36进制整数
            number += chars[i].toLowerCase().codePointAt(0) - 'a'.codePointAt(0) + 10;
        }
        
        i++;
    }
    

    if(chars[i] === '.'){
        i++;
    }

    if(chars[i] === 'e'){
      i++;
      while(i < chars.length){
        eNum = eNum * x;
        if(chars[i].codePointAt(0) < '9'.codePointAt(0)){
            //处理2~10进制整数
            eNum += chars[i].codePointAt(0) - '0'.codePointAt(0);
        }else if(x > 10){
            //处理11~36进制整数
            eNum += chars[i].toLowerCase().codePointAt(0) - 'a'.codePointAt(0) + 10;
        }
        i++;
      }
      return number * (10 ** eNum);
    }

    //小数部分
    var fraction = 1;
    while(i < chars.length){
        fraction = fraction / x;
        if(chars[i].codePointAt(0) < '9'.codePointAt(0)){
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        }else if(x > 10){
            number += (chars[i].toLowerCase().codePointAt(0) - 'a'.codePointAt(0) + 10) * fraction;
        }
        i++;
    }
    fractoin = fraction / x;


    return number;

}


// 2.Number to String
function converNumberToString(number, x){
    if(arguments.length < 2){
        x = 10;
    }
    var integer = Math.floor(number);
    var fraction = number - integer;

    var string = '';
    while(integer > 0){
        if(integer%x < 10){
            string = '' + integer % x + string;
            
        }else{
             
            string = String.fromCodePoint('a'.codePointAt(0) + (integer % x - 10)) + string;
        }
        integer = Math.floor(integer / x);

        
    }
    if(fraction){string += '.';}
    while(fraction > 0){
        string += ''+ Math.floor(fraction * x);
        fraction = fraction * x - Math.floor(fraction * x);
    }


    return string;
}

