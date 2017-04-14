/*
* Static Method Of KD Class
* @public
* @param {Number|String}
* @return {Boolean}
*/
export const isNumberic = function(obj){
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};

/*
* Check Data Type
* @public
* @param {Any}
* @return {String}
*/
export const datatype = function(obj){
    return Object.prototype.toString.apply(obj)
        .toLowerCase()
        .replace('[object ', '')
        .replace(']', '');
};
/*
* Static Method Of KD Class
* @public
* @param {Number|String}
* @return {String}
*/
/*export const addZero = function(number){
    if(isNumberic(number) === false) return number;

    number = parseInt(number, 10);
    return (number < 10 ? '0' : '') + number;
};*/
export const addZero = function(num, len) {
    if(isNumberic(num) === false) return num;

    len = len || 2;
    return (Array(len).join('0') + num).slice(-len);
};
/*
* Count Length Of One Object
*/
export const length = function(obj){
    if(datatype(obj) === 'array' || datatype(obj) === 'string'){
        return obj.length;
    }
    if(datatype(obj) !== 'object') return "undefined";

    var len = 0, i;
    for(i in obj){
        if(!obj.hasOwnProperty(i)) continue;

        len += 1;
    }

    return len;
};
/*
* Factorial
* n! = 1 * 2 * 3 * ... * n
*/
var factorial = function(n){
    var i = 1, result = 1;
    if(n < 0) return 0;
    if(n === 0) return 1;
    for(; i <= n; i++){
        result *= i;
    }
    return result;
};
/*
* Arrangement
* A(n, m) = n!/(n-m)!
*/
export const A = function(n, m){
    return n < m ? 0 : factorial(n) / factorial(n - m);
};
/*
* Combination
* C(n, m) = n!/m!(n-m)!
*/
export const C = function(n, m){
    return n < m ? 0 : factorial(n) / (factorial(m) * factorial(n - m));
};
/*
* Simple Copy An Object
*/
export const copyObject = function(obj){
    return JSON.parse(JSON.stringify(obj));
};
/*
* generate random number
* include start, not include end
*/
export const random = function(start, end){
    return parseInt(Math.random() * (end - start) + start, 10);
};

/*---------------------------------------------
* Date Time
*----------------------------------------------*/
/*
* @public
* @param datetime {Number|String}
*    1. datetime: 0000-00-00 00:00:00
*    2. timestamp(ms): 1487846635067
*    3. timestamp(s): 1487846635
* @return Date Object
*/
var extendDateObject = function(d){
    d.months = function(months){
        d = new Date(d.getTime() + months * 30 * 24 * 60 * 60 * 1000);
        return d;
    };
    d.days = function(days){
        d = new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
        return d;
    };
    d.hours = function(hours){
        d = new Date(d.getTime() + hours * 60 * 60 * 1000);
        return d;
    };
    d.minutes = function(minutes){
        d = new Date(d.getTime() + minutes * 60 * 1000);
        return d;
    };
    d.seconds = function(seconds){
        d = new Date(d.getTime() + seconds * 1000);
        return d;
    };
    return d;
};
export const kdDateObject = function(datetime){
    if(!!datetime === false) return extendDateObject(new Date());

    if(datatype(datetime) === 'number'){
        if(datetime.toString().length === 10){
            datetime *= 1000;
        }
        return extendDateObject(new Date(datetime));
    }

    var tmp = datetime.toString().split(/-|:|\s+/),
        i = 0, d = new Date();
    for(; i < tmp.length; i++){
        tmp[i] = parseInt(tmp[i], 10);
    }

    d.setFullYear(tmp[0]);
    d.setMonth(tmp[1] - 1, 1);
    d.setDate(tmp[2]);
    d.setHours(tmp[3]);
    d.setMinutes(tmp[4]);
    d.setSeconds(tmp[5]);
    d.setMilliseconds(0);

    return extendDateObject(d);
};
/*
* Transform to timestamp
*/
export const kdTimestamp = function(datetime, isSeconds){
    var result = kdDateObject(datetime).getTime();

    return isSeconds === true ? Math.floor(result / 1000) : result;
};
/*
* @public
* @param {String|Number}
* @param String
* @return String
*/
export const kdDateTime = function(timestamp, format){
    format = format || "Y-M-D h:i:s";
    var d = null;
    if(datatype(timestamp) === 'date'){
        d = timestamp;
    }else{
        d = kdDateObject(timestamp);
    }
    var o = {
        Y: d.getFullYear(),
        M: addZero(d.getMonth() + 1),
        D: addZero(d.getDate()),
        h: addZero(d.getHours()),
        i: addZero(d.getMinutes()),
        s: addZero(d.getSeconds())
    };
    for(var i in o){
        if(!o.hasOwnProperty(i)) continue;
        format = format.replace(i, o[i]);
    }
    return format;
};
/*
* Time to seconds: 00:00:00 -> integer
*/
export const kdSeconds = function(time){
    if(datatype(time) !== "string") return false;

    time = time.split(':');

    time[0] = parseInt(time[0], 10) * 60 * 60;
    time[1] = parseInt(time[1], 10) * 60;
    time[2] = parseInt(time[2], 10);

    return time[0] + time[1] + time[2];
};
/*
* Check if a time is at a time range
*/
export const kdAtTimeRange = function(startTime, endTime, checkTime){
    startTime = kdSeconds(startTime);
    endTime = kdSeconds(endTime);
    checkTime = checkTime || kdDateTime('', 'h:i:s');
    checkTime = kdSeconds(checkTime);

    var flag = false;

    if(startTime > endTime){
        flag = checkTime >= startTime || checkTime <= endTime;
    }else{
        flag = checkTime >= startTime && checkTime <= endTime;
    }

    return flag;
};
/*
* Simple Extend
*/
export const extend = function(){
    if(arguments.length === 0) return {};

    var result = arguments[0] || {},
        rest = Array.prototype.slice.call(arguments, 1),
        i, key;

    for(i = 0; i < rest.length; i++){
        for(key in rest[i]){
            if(!rest[i].hasOwnProperty(key)) continue;

            result[key] = rest[i][key];
        }
    }

    return result;
};
/*
* Format Seconds
*/
export const formatSeconds = function(seconds, format){
    format = format || '%h:%i:%s';

    var tmp = 0;
    var has = {
        D: /%D/.test(format),
        M: /%M/.test(format),
        Y: /%Y/.test(format)
    };
    var o = {
        s: 0,
        i: 0,
        h: 0,
        D: 0,
        M: 0,
        Y: 0
    };
    // compute seconds
    tmp = seconds % 60;
    o.s = tmp;

    // compute minutes
    tmp = Math.floor(seconds / 60);
    o.i = tmp > 0 ? (tmp % 60) : o.i;

    // compute hours
    tmp = Math.floor(seconds / 60 / 60);
    o.h = tmp > 0 ? (tmp % 24) : o.h;

    // compute days
    tmp = Math.floor(seconds / 60 / 60 / 24);
    o.D = tmp > 0 ? (tmp % 30) : o.D;

    var hgn = 365 * 24 * 60 * 60 + 5 * 60 * 60 + 48 * 60 + 46;
    // compute months
    // using average one month = hgn / 12 = 2629743.833333...
    tmp = Math.floor(seconds / (hgn / 12));
    o.M = tmp > 0 ? (tmp % 12) : o.M;

    // compute years
    // using one year = 46 seconds 48 minutes 5 hours 365 days
    tmp = Math.floor(seconds / hgn);
    o.Y = tmp > 0 ? tmp : o.Y;

    if(has.Y && o.Y){
        format = format.replace('%Y', o.Y);
    }else{
        format = format.replace(/%Y./, '');
        o.M += o.Y * 12;
    }
    if(has.M && o.M){
        format = format.replace('%M', addZero(o.M));
    }else{
        format = format.replace(/%M./, '');
        o.D += o.M * 30;
    }
    if(has.D && o.D){
        format = format.replace('%D', addZero(o.D));
    }else{
        format = format.replace(/%D./, '');
        o.h += o.D * 24;
    }

    format = format.replace('%s', addZero(o.s));
    format = format.replace('%i', addZero(o.i));
    format = format.replace('%h', addZero(o.h));

    return format;
};

/*---------------------------------------------
* kdDom
*----------------------------------------------*/
/*
* trim
*/
const trim = function(str){
    return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/*
* On
*/
export const on = (function(){
    if(document.addEventListener){
        return function(el, event, handler){
            if(!el || !event || !handler) return;

            el.addEventListener(event, handler, false);
        };
    }else{
        return function(){
            if(!el || !event || !handler) return;

            el.attachEvent('on' + event, handler);
        };
    }
}());
/*
* Off
*/
export const off = (function(){
    if(document.removeEventListener){
        return function(el, event, handler){
            if(!el || !event) return;

            el.removeEventListener(event, handler, false);
        };
    }else{
        return function(el, event, handler){
            if(!el || !event) return;

            el.detachEvent('on' + event, handler);
        };
    }
}());
/*
* Once
*/
export const once = function(el, event, handler){
    var fn = function(){
        if(handler){
            handler.apply(this, arguments);
        }

        off(el, event, fn);
    };
    on(el, event, fn);
};
/*
* Has Class
*/
export const hasClass = function(el, className){
    if(!el || !className) return false;
    className = trim(className);

    if(className.indexOf(' ') > -1) return false;

    return (' ' + trim(el.className).replace(/[\s\uFEFF]+/g, ' ') + ' ').indexOf(' ' + className + ' ') > -1;
};
/*
* Add Class
*/
export const addClass = function(el, classNames){
    if(!el) return;
    classNames = trim(classNames);

    var classes = (classNames || '').split(/[\s\uFEFF]+/),
        allClasses = trim(el.className).replace(/[\s\uFEFF]+/g, ' '),
        i = 0;
    for(; i < classes.length; i++){
        if(hasClass(el, classes[i])) continue;

        allClasses += ' ' + classes[i];
    }
    el.className = trim(allClasses);
};
/*
* Remove Class
*/
export const removeClass = function(el, classNames){
    if(!el) return;
    classNames = trim(classNames);

    var classes = (classNames || '').split(/[\s\uFEFF]+/),
        allClasses = ' ' + trim(el.className).replace(/[\s\uFEFF]+/g, ' ') + ' ',
        i = 0;
    for(; i < classes.length; i++){
        if(!hasClass(el, classes[i])) continue;

        allClasses = allClasses.replace(' ' + classes[i] + ' ', ' ');
    }
    el.className = trim(allClasses);
};

const ieVersion = Number(document.documentMode);
const camelCase = function(name){
    return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset){
        return offset ? letter.toUpperCase() : letter;
    }).replace(/^moz([A-Z])/, 'Moz$1');
};
/*
* Get Style
*/
export const getStyle = ieVersion < 9 ? function(el, styleName){
    if(!el || !styleName) return null;
    styleName = camelCase(styleName);
    if(styleName === 'float'){
        styleName = 'styleFloat';
    }
    try {
        if(styleName === 'opacity'){
            try {
                return el.filter.item('alpha').opacity / 100;
            }catch(error){
                return 1.0;
            }
        }else{
            return (el.style[styleName] || (el.currentStyle ? el.currentStyle[styleName] : null));
        }
    }catch(error){
        return el.style[styleName];
    }
} : function(el, styleName){
    if(!el || !styleName) return null;
    styleName = camelCase(styleName);
    if(styleName === 'float'){
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(el, '');
        return (el.style[styleName] || (computed ? computed[styleName] : null));
    }catch(error){
        return el.style[styleName];
    }
};
/*
* Set Style
*/
export const setStyle = function(el, styleName, value){
    if(!el || !styleName) return;

    if(typeof styleName === 'object'){
        for(var prop in styleName){
            if(!style.hasOwnProperty(prop)) continue;

            setStyle(el, prop, styleName[prop]);
        }
    }else{
        styleName = camelCase(styleName);
        if(styleName === 'opacity' && ieVersion < 9){
            el.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        }else{
            el.style[styleName] = value;
        }
    }
};

/*
* Get Name By Code
*/
export const getNameByCode = function(code, names, start){
    code = parseInt(code, 10);
    start = datatype(start) !== 'number' ? 1 : start;
    if(isNaN(code) || code < start || !!names === false) return '';

    return names[code - (start - 1) - 1] || '';
};

/*
* Get the Property of One Object that specified position
*/
export const getItemOfObject = function(obj, index){
    if(index === 'first'){
        index = 0;
    }else if(index === 'last'){
        index = length(obj) - 1;
    }
    let key, counter = -1, item;
    for(key in obj){
        if(!obj.hasOwnProperty(key)) continue;
        counter++;
        if(counter === index){
            item = {
                key: key,
                value: obj[key]
            };
            break;
        }
    }
    return item;
};

export const domOffset = function(el){
    var doc, docElem, rect, win;

    if ( !el ) {
        return;
    }

    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if ( !el.getClientRects().length ) {
        return { top: 0, left: 0 };
    }

    rect = el.getBoundingClientRect();

    doc = el.ownerDocument;
    docElem = doc.documentElement;
    win = doc.defaultView;

    return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
    };
};
/*
* Get Closest Element, like jQuery.closest
*/
export const domClosest = function(el, selector){
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
};