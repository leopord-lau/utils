// generate random number in a giving range
const randomNumber = (min: number | string, max: number | string): number => {
    min = Number(min);
    max = Number(max);
    // typeError
    if(isNaN(min) || isNaN(max)) {
        return -1;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// thousands separator
const format = (number: number | string, separator: string = ','): string => {
    let numStr: string = number.toString();
    let length: number = numStr.length;
    if(length <= 3) {
        return numStr;
    } else {
        // let temporary: string = "";
        let remain: number = length % 3;
        if(remain > 0) {
            return numStr.slice(0, remain) + separator + numStr.slice(remain, length).match(/\d{3}/g)?.join(separator);
        } else {
            return (<Array<any>>(numStr.slice(0, length).match(/\d{3}/g))).join(separator);
        }
    }
}

// array flatten

const flatten = (arr: Array<any>): Array<any> => {
    let result: Array<any> = [];
    for(let i: number = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    
    return result;
}

// shuffle
const shuffle = (arr: Array<any>): Array<any> => {
    for(let i: number = 0; i < arr.length; i++) {
        const randomIndex: number = Math.round(Math.random() * (arr.length - 1 - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

// random number in an array
const randomInArray = (arr: Array<any>): any => {
    return arr[Math.floor(Math.random() * arr.length)];
}

// generate random string
const genRandomString = (length: number | string): string => {
    length = Number(length);
    if(isNaN(length)) {
        return '';
    }
    const characters: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    const charLengths: number = characters.length;
    let result: string = '';
    for(let i: number = 0; i < length; i ++) {
        result += characters.charAt(Math.floor(Math.random() * charLengths))
    }
    return result;
}

// capitalized
const capitalized = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// is phone number
const isPhoneValid = (number: number | string): boolean => {
    number = number.toString();
    if(number.length !== 11) {
        return false;
    }
    let isPhoneReg: RegExp = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    return isPhoneReg.test(number);
}

// is idcard
const isIDCard = (number: string | number): boolean => {
    number = number.toString();
    let isIDCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return isIDCardReg.test(number);
}

// has chinese characters
const hasCNChars = (str: string): boolean => {
    return /[\u4e00-\u9fa5]/.test(str);
}

// chinese post code
const isCNPostCode = (number: number | string): boolean => {
    return /^[1-9][0-9]{5}$/.test(number.toString());
}

// isIPV6
const isIPv6 = (str: string): boolean => {
    return Boolean(str.match(/:/g) ? 
        (<Array<any>>(str.match(/:/g))).length <= 7 
        :
        false
        &&
        /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str):/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}

// is email address
const isEmail = (str: string): boolean => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}

// hide phone number
const phoneFormat = (number: number | string): string => {
    if(isPhoneValid(number)) {
        number = number.toString();
        return number.substr(0, 3) + "****" + number.substr(7);
    }
    return "-1";
}


// convert camelCase into KebabCase
const convertToKebabCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (item: string) => '-' + item.toLowerCase());
}

// convert KebabCase into camelCase
const convertToCamelCase = (str: string): string => {
    return str.replace(/-[a-z]/g, (i: string, item: string) => item.toUpperCase());
}

// window localStorage
const localStore = {
    set(key: string, value: any): void {
        if(!key) return;
        if(typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        window.localStorage.setItem(key, value);
    },

    get(key: string): string | null {
        if(!key) return null;
        return window.localStorage.getItem(key);
    },

    delete(key: string): void {
        if(!key) return;
        return window.localStorage.removeItem(key);
    }
}

// window sessionStorage
const sessionStore = {
    set(key: string, value: any): void {
        if(!key) return;
        if(typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        window.sessionStorage.setItem(key, value);
    },

    get(key: string): string | null {
        if(!key) return null;
        return window.sessionStorage.getItem(key);
    },

    delete(key: string): void {
        if(!key) return;
        return window.sessionStorage.removeItem(key);
    }
}

// set cookie

const cookie = {
    set(key: string, value: string, expire: number): void {
        let nowTime: Date = new Date();
        nowTime.setDate(nowTime.getDate() + expire);
        document.cookie = `${key}=${value};expires=${nowTime.toUTCString()}`
    },

    get(key: string): string | undefined {
        const cookie: string = unescape(document.cookie);
        const arr: Array<string> = cookie.split('; ');
        let value: string | undefined;
        for(let i: number = 0; i < arr.length; i++) {
            let temp: Array<any> = arr[i].split('=');
            if(temp[0] === key) {
                value = temp[1];
                break;
            }
        }
        return value;
    },

    delete(key: string): void {
        document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
    }
}


// get url params
const getUrlParams = (): {
    [key: string]: any
} => {
    const url: string = location.search;
    const paramsStr: string = /\?(.+)$/.exec(url) ? "" : Array<any>(/\?(.+)$/.exec(url))[1];
    const paramsArr: string[] = paramsStr.split('&');
    let paramsObj: {
        [key: string]: any
    } = {};
    paramsArr.forEach((param: string) => {
        if(/=/.test(param)) {
            let obj: Array<any> = param.split('=');
            const key: any = obj[0];
            let value: number | string = obj[1];
            value = decodeURIComponent(<string>value);
            value = /^\d+$/.test(value) ? parseFloat(value) : value;

            if(paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], <any>value);
            } else {
                paramsObj[key] = value;
            }
        } else {
            paramsObj[param] = true;
        }
    })
    return paramsObj;
}

// is url valid
const isUrlValid = (url: string): boolean => {
    let xmlhttp: XMLHttpRequest = new XMLHttpRequest();
    xmlhttp.open('GET', url, false);

    try {
        xmlhttp.send();
    } finally {
        let result: string = xmlhttp.responseText;
        if(result) {
            if(xmlhttp.status === 200) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

// url param format
const urlParamsFormat = (obj: {[key: string]: any}): string => {
    let params: Array<any> = [];
    for(let key in obj) {
        params.push(`${key}=${obj[key]}`);
    }
    return encodeURIComponent(params.join('&'));
}

// modify url params
const modifyURLParams = (key: string, value: any): string => {
    const url: string = location.href.toString();
    const reg: RegExp = eval('/('+ key +'=)([^&]*)/gi');
    location.href = url.replace(reg, `${key}=${value}`);
    return location.href;
}

// delete url param
const deleteURLParams = (key: string): string => {
    let baseUrl: string = location.host + location.pathname + '?';
    const query: string = location.search.substr(1);
    if(query.indexOf(key) > -1) {
        const obj: { [key: string]: any } = {};
        const arr: Array<any> = query.split('&');
        for(let i: number = 0; i < arr.length; i++) {
            arr[i] = arr[i].split('=');
            obj[arr[i][0]] = arr[1][0]
        }
        delete obj[key];
        return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
    }
    return location.href;
}

// is mobile or pc
const getAgent = (): string => {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        return 'mobile';
    }
    return 'desktop';
}

// is apple mobile
const isAppleMobile = (): boolean => {
    let reg: RegExp = /iphone|ipod|ipad|Macintosh/i;
    return reg.test(navigator.userAgent.toLowerCase());
}

// is android mobile

const isAnroidMobile = (): boolean => {
    return /android/i.test(navigator.userAgent.toLowerCase());
}

// is window or mac
const getOSType = (): string => {
    const agent: string = navigator.userAgent.toLowerCase();
    const isMac: boolean = /macintosh|mac os x/i.test(navigator.userAgent);
    const isWindows: boolean = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if(isMac){
        return "mac";
    }
    return 'none';
}

// is browser in wechat or qq
const inWechatOrQQ = (): boolean | string => {
    const ua: string = navigator.userAgent.toLowerCase();
    const isWechat: boolean = ua.match(/MicroMessenger/i) ? ua.match(/MicroMessenger/i)![0] === "micromessenger" : false;
    const isQQ: boolean = ua.match(/QQ/i) ? ua.match(/QQ/i)![0] === "qq" : false;
    if(isWechat) return 'wechat';
    
    if(isQQ) return 'qq'

    return false;
}

// broswer type and version
const getBroswerInfo = (): {type: string, version: number} => {
    let userAgent: string = navigator.userAgent.toLowerCase();
    return 0 <= userAgent.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(userAgent.match(/msie ([\d]+)/)![1])
    } : !!userAgent.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= userAgent.indexOf("edge") ? {
        type: "Edge",
        version: Number(userAgent.match(/edge\/([\d]+)/)![1])
    } : 0 <= userAgent.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(userAgent.match(/firefox\/([\d]+)/)![1])
    } : 0 <= userAgent.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(userAgent.match(/chrome\/([\d]+)/)![1])
    } : 0 <= userAgent.indexOf("opera") ? {
        type: "Opera",
        version: Number(userAgent.match(/opera.([\d]+)/)![1])
    } : 0 <= userAgent.indexOf("Safari") ? {
        type: "Safari",
        version: Number(userAgent.match(/version\/([\d]+)/)![1])
    } : {
        type: userAgent,
        version: -1
    }
}


// scroll to top
const scrollToTop = (): void => {
    const height: number = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, height - height / 8);
    }
}

// scroll to bottom
const scrollToBottom = (): void => {
    window.scrollTo(0, document.documentElement.clientHeight);  
}

// scroll to element
const scrollToElement = <K extends keyof HTMLElementTagNameMap, T extends keyof SVGElementTagNameMap>(element: K | T | string): void => {
    document.querySelector(element)?.scrollIntoView({
        behavior: 'smooth'
    })
}

// get viewport
const getViewport = (): { width: number, height: number} => {
    let clientHeight: number = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    let clientWidth: number = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
    return {
        width: clientWidth,
        height: clientHeight,
    }
}

// fullscreen
const enterFullScreen = (): void => {
    let element: HTMLElement | any = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element?.mozRequestFullScreen()
    } else if (element?.msRequestFullscreen) {
      element?.msRequestFullscreen()
    } else if (element?.webkitRequestFullscreen) {
      element?.webkitRequestFullScreen()
    }
}

const exitFullscreen = (): void => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((<any>document).msExitFullscreen) {
        (<any>document).msExitFullscreen()
    } else if ((<any>document).mozCancelFullScreen) {
        (<any>document).mozCancelFullScreen()
    } else if ((<any>document).webkitExitFullscreen) {
        (<any>document).webkitExitFullscreen()
    }
}

// 年月日::
const nowTime = (): string => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth();
    const date: number | string = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
    const hour: number | string = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
    const miu: number | string = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
    const sec: number | string = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
    return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}

// to ten digit
const toTenDigit = (number: number): string => {
    if(number >= 10) {
        return number.toString();
    } else {
        return '0' + number;
    }
}

// time format
const timeFormat = (format: string, time?: number): string => {
    const date: Date = time ? new Date(time) : new Date(),
          y: string = date.getFullYear().toString(),
          M: number = date.getMonth() + 1,
          D: number = date.getDate(),
          h: number = date.getHours(),
          m: number = date.getMinutes(),
          s: number = date.getSeconds();
    
    return format.replace(/YYYY|yyyy/g, y)
        .replace(/YY|yy/g, y.substr(2, 2))
        .replace(/MM/g, toTenDigit(M))
        .replace(/DD/g, toTenDigit(D))
        .replace(/HH|hh/g, toTenDigit(h))
        .replace(/mm/g, toTenDigit(m))
        .replace(/ss/g, toTenDigit(s))
}


// stop propagation
const stopPropagation = (e: Event): void => { 
    e = e || window.event; 
    if(e.stopPropagation) {
        e.stopPropagation(); 
    } else { 
        e.cancelBubble = true;
    } 
}

// debounce
const debounce = (fn: Function, wait: number): Function => {
    let timer: number | null = null;
  
    return function() {
        let context: any = this,
            args = arguments;
  
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
  
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}

// throttle
const throttle = (fn: Function, delay: number): Function => {
    let curTime = Date.now();

    return function() {
        let context: any = this,
            args = arguments,
            nowTime = Date.now();

        if (nowTime - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(context, args);
        }
    };
}

// data type
const getDataType = (data: any): string => {
    if(!data) {
        return 'null';
    }
    if(typeof data === 'object') {
        let dataProtoType: string = Object.prototype.toString.call(data),
            type: string[] = dataProtoType.split(' ')[1].split('');
        type.pop();
        return type.join('').toLowerCase();
    } else {
        return typeof data;
    }
}

// deep copy
const deepCopy = (obj: any, hash: WeakMap<object, any> = new WeakMap()): any => {
    if(obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof RegExp){
        return new RegExp(obj);     
    }

    if (hash.has(obj)){
        return hash.get(obj);
    }

    let allDesc: {
        [x: string]: TypedPropertyDescriptor<any>;
    } & {
        [x: string]: PropertyDescriptor;
    } = Object.getOwnPropertyDescriptors(obj);
    let cloneObj: any = Object.create(Object.getPrototypeOf(obj), allDesc)
  
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) { 
        if(typeof obj[key] === 'object' && obj[key] !== null){
            cloneObj[key] = deepCopy(obj[key], hash);
        } else {
            cloneObj[key] = obj[key];
        }
    }
    return cloneObj
}

// Determine if a value is an Array
const isArray = (val: object): boolean => {
    return Object.prototype.toString.call(val) === '[object Array]';
}

// Iterate over an Array or an Object invoking a function for each item.
const forEach = (obj: {(key: string): string} | Array<any>, fn: Function): void => {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    if (typeof obj !== 'object') {
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = (<Array<any>>obj).length; i < l; i++) {
          fn.call(null, (<Array<any>>obj)[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
    }
}