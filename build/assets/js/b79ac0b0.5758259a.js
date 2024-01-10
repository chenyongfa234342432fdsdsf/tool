"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[702],{9613:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(9496);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=s(r),f=a,g=u["".concat(l,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(g,c(c({ref:t},p),{},{components:r})):n.createElement(g,c({ref:t},p))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,c[1]=i;for(var s=2;s<o;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9924:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>g,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var n=r(7161),a=r(4280),o=(r(9496),r(9613)),c=["components"],i={},l="marketUtils",s={unversionedId:"utils/src/market/README",id:"utils/src/market/README",title:"marketUtils",description:"\u5e02\u573a\u884c\u60c5\u76f8\u5173\u5de5\u5177\u7c7b",source:"@site/packages/utils/src/market/README.md",sourceDirName:"utils/src/market",slug:"/utils/src/market/",permalink:"/docs/utils/src/market/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"decimalUtils",permalink:"/docs/utils/src/decimal/"},next:{title:"ytt",permalink:"/docs/ytt/"}},p={},u=[{value:"getColorClassByPrice",id:"getcolorclassbyprice",level:2}],m={toc:u},f="wrapper";function g(e){var t=e.components,r=(0,a.Z)(e,c);return(0,o.kt)(f,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"marketutils"},"marketUtils"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u5e02\u573a\u884c\u60c5\u76f8\u5173\u5de5\u5177\u7c7b")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { marketUtils } from 'nbit-utils'\n\n")),(0,o.kt)("h2",{id:"getcolorclassbyprice"},"getColorClassByPrice"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="\u8ba1\u7b97\u4e24\u4e2a\u503c\u76f8\u5bf9\u6da8\u8dcc"',title:'"\u8ba1\u7b97\u4e24\u4e2a\u503c\u76f8\u5bf9\u6da8\u8dcc"'},"/**\n * \u8ba1\u7b97\u4e24\u4e2a\u503c\u76f8\u5bf9\u6da8\u8dcc\n * @param price \u5f53\u524d\u4ef7\u683c\n * @param target \u76ee\u6807\u4ef7\u683c\uff0c\u53ef\u7a7a\uff0c\u5982\u679c\u4e0d\u4f20\u5c31\u662f\u548c 0 \u8fdb\u884c\u6bd4\u8f83\n * @returns 'text-buy_up_color' | 'text-sell_down_color' | ''\n */\nexport function getColorClassByPrice(price?: number | string, target: number | string = 0): string {\n  if (!price || price === '--' || (!target && target !== 0) || target === '--') {\n    return ''\n  }\n  const _price = getSafeDecimal(price)\n  const _targetPrice = getSafeDecimal(target)\n  if (_price.gt(_targetPrice)) {\n    return up_color_class\n  } else if (_price.eq(_targetPrice)) {\n    return ''\n  } else {\n    return down_color_class\n  }\n}\n\n")))}g.isMDXComponent=!0}}]);