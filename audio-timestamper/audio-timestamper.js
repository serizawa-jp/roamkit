(function () {var j,g={};!function(e,t,n){if(e){for(var r,i={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},o={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},a={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";","\"":"'","<":",",">":".","?":"/","|":"\\"},c={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},s=1;s<20;++s)i[111+s]="f"+s;for(s=0;s<=9;++s)i[s+96]=s.toString();d.prototype.bind=function(e,t,n){return e=e instanceof Array?e:[e],this._bindMultiple.call(this,e,t,n),this},d.prototype.unbind=function(e,t){return this.bind.call(this,e,function(){},t)},d.prototype.trigger=function(e,t){return this._directMap[e+":"+t]&&this._directMap[e+":"+t]({},e),this},d.prototype.reset=function(){return this._callbacks={},this._directMap={},this},d.prototype.stopCallback=function(e,n){if((" "+n.className+" ").indexOf(" mousetrap ")>-1)return!1;if(function e(n,r){return null!==n&&n!==t&&(n===r||e(n.parentNode,r))}(n,this.target))return!1;if("composedPath"in e&&"function"==typeof e.composedPath){var r=e.composedPath()[0];r!==e.target&&(n=r)}return"INPUT"==n.tagName||"SELECT"==n.tagName||"TEXTAREA"==n.tagName||n.isContentEditable},d.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)},d.addKeycodes=function(e){for(var t in e)e.hasOwnProperty(t)&&(i[t]=e[t]);r=null},d.init=function(){var e=d(t);for(var n in e)"_"!==n.charAt(0)&&(d[n]=function(t){return function(){return e[t].apply(e,arguments)}}(n))},d.init(),e.Mousetrap=d,g&&(g=d),"function"==typeof j&&j.amd&&j(function(){return d})}function l(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)}function u(e){if("keypress"==e.type){var t=String.fromCharCode(e.which);return e.shiftKey||(t=t.toLowerCase()),t}return i[e.which]?i[e.which]:o[e.which]?o[e.which]:String.fromCharCode(e.which).toLowerCase()}function f(e){return"shift"==e||"ctrl"==e||"alt"==e||"meta"==e}function p(e,t,n){return n||(n=function(){if(!r)for(var e in r={},i)e>95&&e<112||i.hasOwnProperty(e)&&(r[i[e]]=e);return r}()[e]?"keydown":"keypress"),"keypress"==n&&t.length&&(n="keydown"),n}function h(e,t){var n,r,i,o=[];for(n=function(e){return"+"===e?["+"]:(e=e.replace(/\+{2}/g,"+plus")).split("+")}(e),i=0;i<n.length;++i)r=n[i],c[r]&&(r=c[r]),t&&"keypress"!=t&&a[r]&&(r=a[r],o.push("shift")),f(r)&&o.push(r);return{key:r,modifiers:o,action:t=p(r,o,t)}}function d(e){var n=this;if(e=e||t,!(n instanceof d))return new d(e);n.target=e,n._callbacks={},n._directMap={};var r,i={},o=!1,a=!1,c=!1;function s(e){e=e||{};var t,n=!1;for(t in i)e[t]?n=!0:i[t]=0;n||(c=!1)}function p(e,t,r,o,a,c){var s,l,u,p,h=[],d=r.type;if(!n._callbacks[e])return[];for("keyup"==d&&f(e)&&(t=[e]),s=0;s<n._callbacks[e].length;++s)if(l=n._callbacks[e][s],(o||!l.seq||i[l.seq]==l.level)&&d==l.action&&("keypress"==d&&!r.metaKey&&!r.ctrlKey||(u=t,p=l.modifiers,u.sort().join(",")===p.sort().join(",")))){var y=!o&&l.combo==a,m=o&&l.seq==o&&l.level==c;(y||m)&&n._callbacks[e].splice(s,1),h.push(l)}return h}function y(e,t,r,i){n.stopCallback(t,t.target||t.srcElement,r,i)||!1===e(t,r)&&(function(e){e.preventDefault?e.preventDefault():e.returnValue=!1}(t),function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}(t))}function m(e){"number"!=typeof e.which&&(e.which=e.keyCode);var t=u(e);t&&("keyup"!=e.type||o!==t?n.handleKey(t,function(e){var t=[];return e.shiftKey&&t.push("shift"),e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),t}(e),e):o=!1)}function k(e,t,n,a){function l(t){return function(){c=t,++i[e],clearTimeout(r),r=setTimeout(s,1e3)}}function f(t){y(n,t,e),"keyup"!==a&&(o=u(t)),setTimeout(s,10)}i[e]=0;for(var p=0;p<t.length;++p){var d=p+1===t.length?f:l(a||h(t[p+1]).action);v(t[p],d,a,e,p)}}function v(e,t,r,i,o){n._directMap[e+":"+r]=t;var a,c=(e=e.replace(/\s+/g," ")).split(" ");c.length>1?k(e,c,t,r):(a=h(e,r),n._callbacks[a.key]=n._callbacks[a.key]||[],p(a.key,a.modifiers,{type:a.action},i,e,o),n._callbacks[a.key][i?"unshift":"push"]({callback:t,modifiers:a.modifiers,action:a.action,seq:i,level:o,combo:e}))}n._handleKey=function(e,t,n){var r,i=p(e,t,n),o={},l=0,u=!1;for(r=0;r<i.length;++r)i[r].seq&&(l=Math.max(l,i[r].level));for(r=0;r<i.length;++r)if(i[r].seq){if(i[r].level!=l)continue;u=!0,o[i[r].seq]=1,y(i[r].callback,n,i[r].combo,i[r].seq)}else u||y(i[r].callback,n,i[r].combo);var h="keypress"==n.type&&a;n.type!=c||f(e)||h||s(o),a=u&&"keydown"==n.type},n._bindMultiple=function(e,t,n){for(var r=0;r<e.length;++r)v(e[r],t,n)},l(e,"keypress",m),l(e,"keydown",m),l(e,"keyup",m)}}("undefined"!=typeof window?window:null,"undefined"!=typeof window?document:null);function h(e,r,t,n,a,c,o){try{var u=e[c](o),$=u.value}catch(v){return void t(v)}u.done?r($):Promise.resolve($).then(n,a)}function a(e){return function(){var r=this,t=arguments;return new Promise(function(n,a){var c=e.apply(r,t);function o(e){h(c,n,a,o,u,"next",e)}function u(e){h(c,n,a,o,u,"throw",e)}o(void 0)})}}function m(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=p(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,u=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return o=e.done,e},e:function(e){u=!0,c=e},f:function(){try{o||null==t.return||t.return()}finally{if(u)throw c}}}}function p(e,r){if(e){if("string"==typeof e)return i(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(e,r):void 0}}function i(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function k(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function e(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?k(Object(t),!0).forEach(function(r){n(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):k(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}g.prototype.stopCallback=function(){return!1};var o={debug:!1,enableClickAndPlay:!1,enableKeyShortCuts:!0,increaseSpeedKey:"alt+shift+d",decreaseSpeedKey:"alt+shift+s",rewindKey:"alt+shift+z",advanceKey:"alt+shift+x",resetSpeedKey:"alt+shift+r",preferredSpeedKey:"alt+shift+g",grabTimeKey:"alt+shift+n",increaseSpeed:.5,decreaseSpeed:.5,rewind:10,advance:10,preferredSpeed:1.2},b=e(e({},o),window.audioTimestamperConfig),f=new Set,c=function(e){b.debug&&console.log("[audio-timestamper] ".concat(e))},q=function(){Array.from(document.getElementsByTagName("AUDIO")).forEach(function(e){if(null===e.closest(".rm-zoom-item")){f.add(e);var r=e.closest(".roam-block-container");t(r,e)}})},s=function(e){return e.parentElement.querySelector(".audio-timestamp-control")},t=function(e,r){if(e.children.length<2)return null;Array.from(e.children[1].querySelectorAll(".rm-block__input")).forEach(function(e){var t=v(e),n=s(e),a=null!==n&&t!=n.dataset.timestamp;null===n||null!==t&&!a||n.remove(),null===t||null!==n&&!a||u(e,t,function(){r.currentTime=t,b.enableClickAndPlay&&r.play()})})},u=function(e,r,t){var n=document.createElement("button");n.innerText="\u25BA",n.classList.add("audio-timestamp-control"),n.dataset.timestamp=r,n.style.borderRadius="50%",n.addEventListener("click",t),e.parentElement.insertBefore(n,e)},v=function(e){var r=e.querySelector("span");if(null===r)return null;var t=r.textContent.match(/^((?:\d+:)?\d+:\d\d)\D/);if(!t||t.length<2)return null;var n=t[1].split(":").map(function(e){return parseInt(e)});return 3==n.length?3600*n[0]+60*n[1]+n[2]:2==n.length?60*n[0]+n[1]:null},d=function(){var e=function(e){return e&&e.currentTime>0&&!e.paused&&!e.ended&&e.readyState>2};c(f.size);var r,t=m(f);try{for(t.s();!(r=t.n()).done;){var n=r.value;if(e(n))return n}}catch(a){t.e(a)}finally{t.f()}return null},w=function(e){var r=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,"value").set,t=document.querySelector("textarea.rm-block-input");r.call(t,e);var n=new Event("input",{bubbles:!0});t.dispatchEvent(n)},l=setInterval(function(){if(!b.enableKeyShortCuts)return clearInterval(l),void c("disabled key shourtcuts");c("in mouseTrapReady"),void 0!==g&&(c("found: mouseTrapReady"),g.bind(b.increaseSpeedKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("speed up"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.playbackRate+=b.increaseSpeed,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.decreaseSpeedKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("speed down"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.playbackRate-=b.decreaseSpeed,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.rewindKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("rewind"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.currentTime-=b.rewind,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.advanceKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("advance"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.currentTime+=b.advance,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.resetSpeedKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("reset speed"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.playbackRate=1,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.preferredSpeedKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("preferred speed"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return t.playbackRate=b.preferredSpeed,e.abrupt("return",!1);case 7:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}()),g.bind(b.grabTimeKey,function(){var e=a(regeneratorRuntime.mark(function e(r){var t,n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c("grabTimeKey"),r.preventDefault(),null!==(t=d())){e.next=5;break}return e.abrupt("return",!1);case 5:return n=new Date(1e3*t.currentTime).toISOString().substr(11,8),a=document.querySelector("textarea.rm-block-input").value,w(n+" "+a),e.abrupt("return",!1);case 9:case"end":return e.stop();}},e)}));return function(r){return e.apply(this,arguments)}}(),"keydown"),clearInterval(l),c("clearInterval"))},1e3);setInterval(q,1e3);})();