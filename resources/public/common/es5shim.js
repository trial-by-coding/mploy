/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.3/LICENSE
 */
(function(t,e){"use strict";if(typeof define==="function"&&define.amd){define(e)}else if(typeof exports==="object"){module.exports=e()}else{t.returnExports=e()}})(this,function(){var t=Array.prototype;var e=Object.prototype;var r=Function.prototype;var n=String.prototype;var i=Number.prototype;var a=t.slice;var o=t.splice;var u=t.push;var l=t.unshift;var f=r.call;var s=e.toString;var c=Array.isArray||function gt(t){return s.call(t)==="[object Array]"};var p=typeof Symbol==="function"&&typeof Symbol.toStringTag==="symbol";var h;var v=Function.prototype.toString,g=function yt(t){try{v.call(t);return true}catch(e){return false}},y="[object Function]",d="[object GeneratorFunction]";h=function dt(t){if(typeof t!=="function"){return false}if(p){return g(t)}var e=s.call(t);return e===y||e===d};var m;var b=RegExp.prototype.exec,w=function mt(t){try{b.call(t);return true}catch(e){return false}},T="[object RegExp]";m=function bt(t){if(typeof t!=="object"){return false}return p?w(t):s.call(t)===T};var x;var O=String.prototype.valueOf,j=function wt(t){try{O.call(t);return true}catch(e){return false}},S="[object String]";x=function Tt(t){if(typeof t==="string"){return true}if(typeof t!=="object"){return false}return p?j(t):s.call(t)===S};var E=function xt(t){var e=s.call(t);var r=e==="[object Arguments]";if(!r){r=!c(t)&&t!==null&&typeof t==="object"&&typeof t.length==="number"&&t.length>=0&&h(t.callee)}return r};var N=function(t){var e=Object.defineProperty&&function(){try{Object.defineProperty({},"x",{});return true}catch(t){return false}}();var r;if(e){r=function(t,e,r,n){if(!n&&e in t){return}Object.defineProperty(t,e,{configurable:true,enumerable:false,writable:true,value:r})}}else{r=function(t,e,r,n){if(!n&&e in t){return}t[e]=r}}return function n(e,i,a){for(var o in i){if(t.call(i,o)){r(e,o,i[o],a)}}}}(e.hasOwnProperty);var I=function Ot(t){var e=typeof t;return t===null||e!=="object"&&e!=="function"};var D={ToInteger:function jt(t){var e=+t;if(e!==e){e=0}else if(e!==0&&e!==1/0&&e!==-(1/0)){e=(e>0||-1)*Math.floor(Math.abs(e))}return e},ToPrimitive:function St(t){var e,r,n;if(I(t)){return t}r=t.valueOf;if(h(r)){e=r.call(t);if(I(e)){return e}}n=t.toString;if(h(n)){e=n.call(t);if(I(e)){return e}}throw new TypeError},ToObject:function(t){if(t==null){throw new TypeError("can't convert "+t+" to object")}return Object(t)},ToUint32:function Et(t){return t>>>0}};var M=function Nt(){};N(r,{bind:function It(t){var e=this;if(!h(e)){throw new TypeError("Function.prototype.bind called on incompatible "+e)}var r=a.call(arguments,1);var n;var i=function(){if(this instanceof n){var i=e.apply(this,r.concat(a.call(arguments)));if(Object(i)===i){return i}return this}else{return e.apply(t,r.concat(a.call(arguments)))}};var o=Math.max(0,e.length-r.length);var u=[];for(var l=0;l<o;l++){u.push("$"+l)}n=Function("binder","return function ("+u.join(",")+"){ return binder.apply(this, arguments); }")(i);if(e.prototype){M.prototype=e.prototype;n.prototype=new M;M.prototype=null}return n}});var F=f.bind(e.hasOwnProperty);var R=function(){var t=[1,2];var e=t.splice();return t.length===2&&c(e)&&e.length===0}();N(t,{splice:function Dt(t,e){if(arguments.length===0){return[]}else{return o.apply(this,arguments)}}},!R);var U=function(){var e={};t.splice.call(e,0,0,1);return e.length===1}();N(t,{splice:function Mt(t,e){if(arguments.length===0){return[]}var r=arguments;this.length=Math.max(D.ToInteger(this.length),0);if(arguments.length>0&&typeof e!=="number"){r=a.call(arguments);if(r.length<2){r.push(this.length-t)}else{r[1]=D.ToInteger(e)}}return o.apply(this,r)}},!U);var k=[].unshift(0)!==1;N(t,{unshift:function(){l.apply(this,arguments);return this.length}},k);N(Array,{isArray:c});var A=Object("a");var C=A[0]!=="a"||!(0 in A);var P=function Ft(t){var e=true;var r=true;if(t){t.call("foo",function(t,r,n){if(typeof n!=="object"){e=false}});t.call([1],function(){"use strict";r=typeof this==="string"},"x")}return!!t&&e&&r};N(t,{forEach:function Rt(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=arguments[1],i=-1,a=r.length>>>0;if(!h(t)){throw new TypeError}while(++i<a){if(i in r){t.call(n,r[i],i,e)}}}},!P(t.forEach));N(t,{map:function Ut(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0,i=Array(n),a=arguments[1];if(!h(t)){throw new TypeError(t+" is not a function")}for(var o=0;o<n;o++){if(o in r){i[o]=t.call(a,r[o],o,e)}}return i}},!P(t.map));N(t,{filter:function kt(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0,i=[],a,o=arguments[1];if(!h(t)){throw new TypeError(t+" is not a function")}for(var u=0;u<n;u++){if(u in r){a=r[u];if(t.call(o,a,u,e)){i.push(a)}}}return i}},!P(t.filter));N(t,{every:function At(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!h(t)){throw new TypeError(t+" is not a function")}for(var a=0;a<n;a++){if(a in r&&!t.call(i,r[a],a,e)){return false}}return true}},!P(t.every));N(t,{some:function Ct(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!h(t)){throw new TypeError(t+" is not a function")}for(var a=0;a<n;a++){if(a in r&&t.call(i,r[a],a,e)){return true}}return false}},!P(t.some));var Z=false;if(t.reduce){Z=typeof t.reduce.call("es5",function(t,e,r,n){return n})==="object"}N(t,{reduce:function Pt(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0;if(!h(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var a;if(arguments.length>=2){a=arguments[1]}else{do{if(i in r){a=r[i++];break}if(++i>=n){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<n;i++){if(i in r){a=t.call(void 0,a,r[i],i,e)}}return a}},!Z);var J=false;if(t.reduceRight){J=typeof t.reduceRight.call("es5",function(t,e,r,n){return n})==="object"}N(t,{reduceRight:function Zt(t){var e=D.ToObject(this),r=C&&x(this)?this.split(""):e,n=r.length>>>0;if(!h(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduceRight of empty array with no initial value")}var i,a=n-1;if(arguments.length>=2){i=arguments[1]}else{do{if(a in r){i=r[a--];break}if(--a<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(a<0){return i}do{if(a in r){i=t.call(void 0,i,r[a],a,e)}}while(a--);return i}},!J);var z=Array.prototype.indexOf&&[0,1].indexOf(1,2)!==-1;N(t,{indexOf:function Jt(t){var e=C&&x(this)?this.split(""):D.ToObject(this),r=e.length>>>0;if(!r){return-1}var n=0;if(arguments.length>1){n=D.ToInteger(arguments[1])}n=n>=0?n:Math.max(0,r+n);for(;n<r;n++){if(n in e&&e[n]===t){return n}}return-1}},z);var $=Array.prototype.lastIndexOf&&[0,1].lastIndexOf(0,-3)!==-1;N(t,{lastIndexOf:function zt(t){var e=C&&x(this)?this.split(""):D.ToObject(this),r=e.length>>>0;if(!r){return-1}var n=r-1;if(arguments.length>1){n=Math.min(n,D.ToInteger(arguments[1]))}n=n>=0?n:r-Math.abs(n);for(;n>=0;n--){if(n in e&&t===e[n]){return n}}return-1}},$);var B=!{toString:null}.propertyIsEnumerable("toString"),G=function(){}.propertyIsEnumerable("prototype"),H=!F("x","0"),L=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],X=L.length;N(Object,{keys:function $t(t){var e=h(t),r=E(t),n=t!==null&&typeof t==="object",i=n&&x(t);if(!n&&!e&&!r){throw new TypeError("Object.keys called on a non-object")}var a=[];var o=G&&e;if(i&&H||r){for(var u=0;u<t.length;++u){a.push(String(u))}}if(!r){for(var l in t){if(!(o&&l==="prototype")&&F(t,l)){a.push(String(l))}}}if(B){var f=t.constructor,s=f&&f.prototype===t;for(var c=0;c<X;c++){var p=L[c];if(!(s&&p==="constructor")&&F(t,p)){a.push(p)}}}return a}});var Y=Object.keys&&function(){return Object.keys(arguments).length===2}(1,2);var q=Object.keys;N(Object,{keys:function Bt(e){if(E(e)){return q(t.slice.call(e))}else{return q(e)}}},!Y);var K=-621987552e5;var Q="-000001";var V=Date.prototype.toISOString&&new Date(K).toISOString().indexOf(Q)===-1;N(Date.prototype,{toISOString:function Gt(){var t,e,r,n,i;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}n=this.getUTCFullYear();i=this.getUTCMonth();n+=Math.floor(i/12);i=(i%12+12)%12;t=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];n=(n<0?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(0<=n&&n<=9999?-4:-6);e=t.length;while(e--){r=t[e];if(r<10){t[e]="0"+r}}return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}},V);var W=function(){try{return Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(K).toJSON().indexOf(Q)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(t){return false}}();if(!W){Date.prototype.toJSON=function Ht(t){var e=Object(this);var r=D.ToPrimitive(e);if(typeof r==="number"&&!isFinite(r)){return null}var n=e.toISOString;if(!h(n)){throw new TypeError("toISOString property is not callable")}return n.call(e)}}var _=Date.parse("+033658-09-27T01:46:40.000Z")===1e15;var tt=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"));var et=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(!Date.parse||et||tt||!_){Date=function(t){var e=function u(r,n,i,a,o,l,f){var s=arguments.length;var c;if(this instanceof t){c=s===1&&String(r)===r?new t(e.parse(r)):s>=7?new t(r,n,i,a,o,l,f):s>=6?new t(r,n,i,a,o,l):s>=5?new t(r,n,i,a,o):s>=4?new t(r,n,i,a):s>=3?new t(r,n,i):s>=2?new t(r,n):s>=1?new t(r):new t}else{c=t.apply(this,arguments)}N(c,{constructor:e},true);return c};var r=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var n=[0,31,59,90,120,151,181,212,243,273,304,334,365];var i=function l(t,e){var r=e>1?1:0;return n[e]+Math.floor((t-1969+r)/4)-Math.floor((t-1901+r)/100)+Math.floor((t-1601+r)/400)+365*(t-1970)};var a=function f(e){return Number(new t(1970,0,1,0,0,0,e))};for(var o in t){if(F(t,o)){e[o]=t[o]}}e.now=t.now;e.UTC=t.UTC;e.prototype=t.prototype;e.prototype.constructor=e;e.parse=function s(e){var n=r.exec(e);if(n){var o=Number(n[1]),u=Number(n[2]||1)-1,l=Number(n[3]||1)-1,f=Number(n[4]||0),s=Number(n[5]||0),c=Number(n[6]||0),p=Math.floor(Number(n[7]||0)*1e3),h=Boolean(n[4]&&!n[8]),v=n[9]==="-"?1:-1,g=Number(n[10]||0),y=Number(n[11]||0),d;if(f<(s>0||c>0||p>0?24:25)&&s<60&&c<60&&p<1e3&&u>-1&&u<12&&g<24&&y<60&&l>-1&&l<i(o,u+1)-i(o,u)){d=((i(o,u)+l)*24+f+g*v)*60;d=((d+s+y*v)*60+c)*1e3+p;if(h){d=a(d)}if(-864e13<=d&&d<=864e13){return d}}return NaN}return t.parse.apply(this,arguments)};return e}(Date)}if(!Date.now){Date.now=function Lt(){return(new Date).getTime()}}var rt=i.toFixed&&(8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)!=="1"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128");var nt={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function Xt(t,e){var r=-1;var n=e;while(++r<nt.size){n+=t*nt.data[r];nt.data[r]=n%nt.base;n=Math.floor(n/nt.base)}},divide:function Yt(t){var e=nt.size,r=0;while(--e>=0){r+=nt.data[e];nt.data[e]=Math.floor(r/t);r=r%t*nt.base}},numToString:function qt(){var t=nt.size;var e="";while(--t>=0){if(e!==""||t===0||nt.data[t]!==0){var r=String(nt.data[t]);if(e===""){e=r}else{e+="0000000".slice(0,7-r.length)+r}}}return e},pow:function Kt(t,e,r){return e===0?r:e%2===1?Kt(t,e-1,r*t):Kt(t*t,e/2,r)},log:function Qt(t){var e=0;var r=t;while(r>=4096){e+=12;r/=4096}while(r>=2){e+=1;r/=2}return e}};N(i,{toFixed:function Vt(t){var e,r,n,i,a,o,u,l;e=Number(t);e=e!==e?0:Math.floor(e);if(e<0||e>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}r=Number(this);if(r!==r){return"NaN"}if(r<=-1e21||r>=1e21){return String(r)}n="";if(r<0){n="-";r=-r}i="0";if(r>1e-21){a=nt.log(r*nt.pow(2,69,1))-69;o=a<0?r*nt.pow(2,-a,1):r/nt.pow(2,a,1);o*=4503599627370496;a=52-a;if(a>0){nt.multiply(0,o);u=e;while(u>=7){nt.multiply(1e7,0);u-=7}nt.multiply(nt.pow(10,u,1),0);u=a-1;while(u>=23){nt.divide(1<<23);u-=23}nt.divide(1<<u);nt.multiply(1,1);nt.divide(2);i=nt.numToString()}else{nt.multiply(0,o);nt.multiply(1<<-a,0);i=nt.numToString()+"0.00000000000000000000".slice(2,2+e)}}if(e>0){l=i.length;if(l<=e){i=n+"0.0000000000000000000".slice(0,e-l+2)+i}else{i=n+i.slice(0,l-e)+"."+i.slice(l-e)}}else{i=n+i}return i}},rt);var it=n.split;if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var t=typeof/()??/.exec("")[1]==="undefined";n.split=function(e,r){var n=this;if(typeof e==="undefined"&&r===0){return[]}if(!m(e)){return it.call(this,e,r)}var i=[];var a=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),o=0,l,f,s,c;var p=new RegExp(e.source,a+"g");n+="";if(!t){l=new RegExp("^"+p.source+"$(?!\\s)",a)}var h=typeof r==="undefined"?-1>>>0:D.ToUint32(r);f=p.exec(n);while(f){s=f.index+f[0].length;if(s>o){i.push(n.slice(o,f.index));if(!t&&f.length>1){f[0].replace(l,function(){for(var t=1;t<arguments.length-2;t++){if(typeof arguments[t]==="undefined"){f[t]=void 0}}})}if(f.length>1&&f.index<n.length){u.apply(i,f.slice(1))}c=f[0].length;o=s;if(i.length>=h){break}}if(p.lastIndex===f.index){p.lastIndex++}f=p.exec(n)}if(o===n.length){if(c||!p.test("")){i.push("")}}else{i.push(n.slice(o))}return i.length>h?i.slice(0,h):i}})()}else if("0".split(void 0,0).length){n.split=function Wt(t,e){if(typeof t==="undefined"&&e===0){return[]}return it.call(this,t,e)}}var at=n.replace;var ot=function(){var t=[];"x".replace(/x(.)?/g,function(e,r){t.push(r)});return t.length===1&&typeof t[0]==="undefined"}();if(!ot){n.replace=function _t(t,e){var r=h(e);var n=m(t)&&/\)[*?]/.test(t.source);if(!r||!n){return at.call(this,t,e)}else{var i=function(r){var n=arguments.length;var i=t.lastIndex;t.lastIndex=0;var a=t.exec(r)||[];t.lastIndex=i;a.push(arguments[n-2],arguments[n-1]);return e.apply(this,a)};return at.call(this,t,i)}}}var ut=n.substr;var lt="".substr&&"0b".substr(-1)!=="b";N(n,{substr:function te(t,e){var r=t;if(t<0){r=Math.max(this.length+t,0)}return ut.call(this,r,e)}},lt);var ft="  \n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";var st="\u200b";var ct="["+ft+"]";var pt=new RegExp("^"+ct+ct+"*");var ht=new RegExp(ct+ct+"*$");var vt=n.trim&&(ft.trim()||!st.trim());N(n,{trim:function ee(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(pt,"").replace(ht,"")}},vt);if(parseInt(ft+"08")!==8||parseInt(ft+"0x16")!==22){parseInt=function(t){var e=/^0[xX]/;return function r(n,i){var a=String(n).trim();var o=Number(i)||(e.test(a)?16:10);return t(a,o)}}(parseInt)}});
//# sourceMappingURL=es5-shim.map
