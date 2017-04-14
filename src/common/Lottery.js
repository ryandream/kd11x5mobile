/*
* check large or small
* large 大数
* small 小数
* @param Number|Numberic
* @param Number|Numberic
* @return String|Boolean large|small|middle
*/
export const largeOrSmall = function(number, demarcation, middle){
    number = parseInt(number, 10);
    demarcation = demarcation || 31;
    if(isNaN(number)) return false;
    middle = middle || 30;

    if(number === middle) return 'middle';

    return number >= demarcation ? 'large' : 'small';
};
export const largeOrSmallOfAndValue = function(andValue, demarcation){
    let ls = largeOrSmall(andValue, demarcation);
    if(ls === 'large') return {
        name: '大',
        class: 'bg_zyell'
    };
    if(ls === 'small') return {
        name: '小',
        class: 'bg_purple'
    };
    if(ls === 'middle') return {
        name: '和',
        class: 'numcolor'
    };
    return false;
};
/*
* check prime Or composite
* prime 质数
* composite 合数
* @param number
* @return String|Boolean prime|composite|false
*/
export const primeOrComposite = function(number){
    number = parseInt(number, 10);
    if(isNaN(number)) return false;

    var factor = 2,
        len = 0,
        mark = "+";
    if(number < 0){
        mark = "-";
        number = Math.abs(number);
    }
    if(number < 1) return "misc";
    for(; factor < number; factor++){
        if( number % factor != 0 ){
            continue;
        }else{
            len++;
        }
    }
    return len == 0 ? "prime" : "composite";
};
/*
* check odd or even
* odd 奇数
* even 偶数
* @param Number|Numberic
* @return String|Boolean even|odd|middle|false
*/
export const oddOrEven = function(number, middle){
    number = parseInt(number, 10);
    if(isNaN(number)) return false;
    middle = middle || 30;

    if(number === middle) return 'middle';

    return number % 2 == 0 ? "even" : "odd";
};
export const oddOrEvenOfAndValue = function(andValue){
    let oe = oddOrEven(andValue);
    if(oe === 'odd') return {
        name: '单',
        class: 'bg_green'
    };
    if(oe === 'even') return {
        name: '双',
        class: 'bg_blue'
    };
    if(oe === 'middle') return {
        name: '和',
        class: 'numcolor'
    };
    return false;
};