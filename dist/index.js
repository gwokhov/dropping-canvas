!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t=t||self).DroppingCanvas=i()}(this,function(){"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}function e(){return(e=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t}).apply(this,arguments)}var s=function(){function i(n,e,s,a){var h=a.x,o=a.y,r=a.z,l=a.r,u=a.a,c=a.vX,v=a.vY,f=a.vZ,p=a.vR,g=a.vA,d=a.aX,m=a.aY,y=a.aZ,w=a.aR,x=a.aA;t(this,i),this.img=n,this.width=e,this.height=s,this.x=h,this.y=o,this.z=r,this.r=l,this.a=u,this.vX=c,this.vY=v,this.vZ=f,this.vR=p,this.vA=g,this.aX=d,this.aY=m,this.aZ=y,this.aR=w,this.aA=x}return n(i,[{key:"tick",value:function(t){this.x+=this.vX*t,this.y+=this.vY*t,this.z+=this.vZ*t,this.r+=this.vR*t,this.a=Math.min(1,Math.max(0,this.a+this.vA*t)),this.vX+=this.aX*t,this.vY+=this.aY*t,this.vZ+=this.aZ*t,this.vR+=this.aR*t,this.vA+=this.aA*t}}]),i}(),a={dropPerSecond:20,isBoundingSize:!0,z:[.2,.3],r:[0,2*Math.PI],a:[1,1],vX:[-60,60],vY:[200,500],vZ:[0,0],vR:[-1,1],vA:[0,0],aX:[0,0],aY:[80,200],aZ:[-.3,0],aR:[0,0],aA:[-1,-.6]};function h(t,i){var n=[],e=[],s=0,a=0;if("string"==typeof t)n=[t];else if(t instanceof FileList)for(var h=0,o=t.length;h<o;h++)n.push(URL.createObjectURL(t[h]));else n=[].concat(t);function r(){s+a===n.length&&i&&i(0===a?null:"[Dropping Canvas]: ".concat(a," images failed to load.)"),e)}n.forEach(function(t){var i=new Image;i.onload=function(){s++,e.push(i),r()},i.onerror=function(t){a++,r()},i.src=t})}function o(t,i){return t+(i-t)*Math.random()}return function(){function i(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a;if(t(this,i),!n)throw"[Dropping Canvas]: Missing canvas element.";this.imgUrls=e,this.images=[],this.cells=[],this.options={},this.isRunning=!1,this.isStopGenerate=!1,this.isImmediateClean=!1,this.past=null,this.$canvas=n,this.context=n.getContext("2d"),this._assignOptions(s)}return n(i,[{key:"_assignOptions",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t||(this.options=a),this.options=e(i?this.options:a,t)}},{key:"_createCell",value:function(t){var i,n,e=(i=this.images,n=i.length,i[Math.floor(o(0,n))]),a={};for(var h in t)t[h]instanceof Array?a[h]=o(+t[h][0],+t[h][1]):"string"==typeof t[h]?a[h]=+t[h]:a[h]=t[h];return"x"in a&&null!==a.x||(a.x=o(0,this.$canvas.width)),"y"in a&&null!==a.y||(a.y=-a.z*Math.max(e.width,e.height)),new s(e,e.width,e.height,a)}},{key:"_createCells",value:function(t,i){for(var n=function(t){var i,n,e;i=Math.exp(-t),n=0,e=1;do{n+=1,e*=Math.random()}while(e>i);return n-1}(i*+t.dropPerSecond),e=0;e<n;e++)this.cells.push(this._createCell(t))}},{key:"_render",value:function(){var t=this.context,i=this.cells;t.clearRect(0,0,this.$canvas.width,this.$canvas.height);for(var n=0;n<i.length;n++){this.isStopGenerate&&this.isImmediateClean&&(i[n].aA=Math.min(-8,i[n].aA)),t.globalAlpha=i[n].a;var e=void 0,s=void 0;this.options.isBoundingSize?(e=Math.max(0,i[n].z*i[n].width),s=Math.max(0,i[n].z*i[n].height)):(e=i[n].z*i[n].width,s=i[n].z*i[n].height),t.translate(i[n].x,i[n].y),t.rotate(i[n].r),0!==e&&0!==s&&t.drawImage(i[n].img,-Math.floor(e/2),-Math.floor(s/2),e,s),t.setTransform(1,0,0,1,0,0),t.globalAlpha=1}}},{key:"_tickModel",value:function(t){var i=this.cells;if(t<.5){for(var n=0,e=i.length;n<e;n++)i[n].tick(t);this.isStopGenerate||this._createCells(this.options,t)}0===i.length&&this.isStopGenerate&&(this.isRunning=!1,this.isImmediateClean=!1);for(var s=this.$canvas.height,a=0;a<i.length;a++){var h=i[a].width,o=i[a].height,r=i[a].z*Math.max(h,o)/2;i[a].y<s+r||i.splice(a,1)}}},{key:"_startAnimation",value:function(){var t=Date.now(),i=null===this.past?0:t-this.past;this.past=t,this._tickModel(i/1e3),this._render(),this.isRunning&&window.requestAnimationFrame(this._startAnimation.bind(this))}},{key:"start",value:function(){var t=this;this.isRunning&&!this.isStopGenerate||h(this.imgUrls,function(i,n){i&&console.error(i),t.isRunning=!0,t.isStopGenerate=!1,t.images=n,t._startAnimation()})}},{key:"pause",value:function(){this.isRunning=!1}},{key:"stop",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isStopGenerate=!0,this.isImmediateClean=t}},{key:"updateOptions",value:function(t,i){this._assignOptions(t,i)}},{key:"updateImages",value:function(t){var i=this;h(t,function(t,n){t&&console.error(t),i.images=n})}}]),i}()});
