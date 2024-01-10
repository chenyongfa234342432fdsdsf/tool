"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[82],{8897:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>f,contentTitle:()=>k,default:()=>x,frontMatter:()=>m,metadata:()=>T,toc:()=>v});var t=n(7161),r=n(4280),l=n(9496),s=n(9613),c=n(6716),i=n(3260),d=n(4997),o=function(e){var a=e.left,n=e.right,t=e.hasFather,r=""+(void 0===e.value?"--":e.value),s=e.hasColor?i.K(r,e.diffTarget):"",o=s?"tag-wrap-"+s:"tag-wrap",g=function(a,n,t){void 0===t&&(t="%");var r="";if(e.hasPrefix&&(r=""+(n>0?"+":"")+r),r=""+r+a,e.hasPostfix&&(r=""+r+t),e.kSign){var l=r.split(".");l.length;var s=l.length>1?"."+l[1]:"";r=l[0].replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")+s}return r},p=function(){var a,n=e.isCheckZero,t=e.defaultEmptyText,l=e.hasPostfix,s=e.digits,i=e.delZero,o=e.isRound,p=e.needPercentCalc;return""===r||"--"===r||void 0===r||n&&"0"===r?t:l?p?(a=d.bl(r).mul(Math.pow(10,2)).toFixed(s,o?c.Z.ROUND_HALF_UP:c.Z.ROUND_DOWN).toString(),i&&(a=u(a)),g(a,r,"%")):(a=d.bl(r).toFixed(s,o?c.Z.ROUND_HALF_UP:c.Z.ROUND_DOWN).toString(),i&&(a=u(a)),g(a,r)):(a=d.bl(r).toFixed(s,o?c.Z.ROUND_HALF_UP:c.Z.ROUND_DOWN).toString(),i&&(a=u(a)),g(a,r,""))};return t?l.createElement("span",{className:""+o},l.createElement("span",{className:"increase-wrap "+s},a&&a,p(),n&&n)):l.createElement("span",{className:"increase-wrap "+s},a&&a,p(),n&&n)};function u(e){return e.replace(/(?:\.0*|(\.\d+?)0+)$/,"$1")}o.defaultProps={hasColor:!0,hasPrefix:!0,hasPostfix:!1,isRound:!0,kSign:!1,needPercentCalc:!1,delZero:!0,digits:10,defaultEmptyText:"--",diffTarget:0};const g=(0,l.memo)(o);var p=["components"],m={},k="IncreaseTag",T={unversionedId:"react/src/increase-tag/README",id:"react/src/increase-tag/README",title:"IncreaseTag",description:"\u6da8\u8dcc\u7ec4\u4ef6",source:"@site/packages/react/src/increase-tag/README.mdx",sourceDirName:"react/src/increase-tag",slug:"/react/src/increase-tag/",permalink:"/docs/react/src/increase-tag/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7ec4\u4ef6\u5e93\u6587\u6863\u6307\u5357",permalink:"/docs/home"},next:{title:"decimalUtils",permalink:"/docs/utils/src/decimal/"}},f={},v=[{value:"\u666e\u901a\u7528\u6cd5",id:"\u666e\u901a\u7528\u6cd5",level:2},{value:"\u663e\u793a\u524d\u7f00\u7b26\u53f7 <code>hasPrefix</code>",id:"\u663e\u793a\u524d\u7f00\u7b26\u53f7-hasprefix",level:2},{value:"\u663e\u793a\u540e\u7f00\u7b26\u53f7\u3001\u5904\u7406\u767e\u5206\u6bd4\u3001\u4ebf\u7b49 <code>needPercentCalc</code>",id:"\u663e\u793a\u540e\u7f00\u7b26\u53f7\u5904\u7406\u767e\u5206\u6bd4\u4ebf\u7b49-needpercentcalc",level:2},{value:"\u5c0f\u6570\u70b9\u4f4d\u6570 <code>digits</code>",id:"\u5c0f\u6570\u70b9\u4f4d\u6570-digits",level:2},{value:"\u56db\u820d\u4e94\u5165 <code>isRound</code>",id:"\u56db\u820d\u4e94\u5165-isround",level:2},{value:"\u5343\u5206\u4f4d <code>kSign</code>",id:"\u5343\u5206\u4f4d-ksign",level:2},{value:"\u9ed8\u8ba4\u7a7a\u503c\u663e\u793a\u6587\u6848 <code>defaultEmptyText</code>",id:"\u9ed8\u8ba4\u7a7a\u503c\u663e\u793a\u6587\u6848-defaultemptytext",level:2},{value:"\u662f\u5426\u663e\u793a\u7ea2\u6da8\u7eff\u8dcc <code>hasColor</code>",id:"\u662f\u5426\u663e\u793a\u7ea2\u6da8\u7eff\u8dcc-hascolor",level:2},{value:"\u7ea2\u6da8\u7eff\u8dcc\u6bd4\u5bf9\u76ee\u6807 <code>diffTarget</code>",id:"\u7ea2\u6da8\u7eff\u8dcc\u6bd4\u5bf9\u76ee\u6807-difftarget",level:2}],N={toc:v},h="wrapper";function x(e){var a=e.components,n=(0,r.Z)(e,p);return(0,s.kt)(h,(0,t.Z)({},N,n,{components:a,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"increasetag"},"IncreaseTag"),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"\u6da8\u8dcc\u7ec4\u4ef6")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"export interface IIncreaseTag {\n  // \u539f\u59cb\u503c\n  value?: string | number\n  // \u663e\u793a'+'|'-'\n  hasPrefix?: boolean\n  // \u663e\u793a'%'|'\u4ebf'\u7b49\u5355\u4f4d\u540e\u7f00\n  hasPostfix?: boolean\n  // % \u5c0f\u6570\u70b9\u4f4d\u6570 eg: 12.xx%\n  digits?: number\n  // \u662f\u5426\u5220\u9664\u5c0f\u6570\u70b9\u672b\u5c3e\u7684 0\n  delZero?: boolean\n  // \u56db\u820d\u4e94\u5165\n  isRound?: boolean\n  // \u5343\u5206\u4f4d\n  kSign?: boolean\n  // \u9ed8\u8ba4\u7a7a\u503c\u663e\u793a\u6587\u6848\n  defaultEmptyText?: string\n  // \u662f\u5426\u663e\u793a\u7ea2\u6da8\u7eff\u8dcc\n  hasColor?: boolean\n  // \u7ea2\u6da8\u7eff\u8dcc\u76f8\u5bf9\u4e8e\u8c01\u6bd4\u8f83\n  diffTarget?: number\n  // \u6821\u9a8c 0 \u8fd4\u56de defaultEmptyText\n  isCheckZero?: boolean\n  // \u9ed8\u8ba4\u662f\u9700\u8981\u767e\u5206\u6bd4\u8ba1\u7b97\n  needPercentCalc?: boolean\n  //\u4f1a\u6dfb\u52a0\u4e2a\u7236\u7ea7 span class \u4e3a tag-wrap-text-buy_up_color | tag-wrap-text-sell_down_color | 'tag-wrap'\n  hasFather?: boolean\n  left?: ReactNode\n  right?: ReactNode\n}\nconst defaultProps = {\n  hasColor: true,\n  hasPrefix: true,\n  hasPostfix: false,\n  isRound: true,\n  kSign: false,\n  needPercentCalc: false,\n  delZero: true,\n  digits: 10,\n  defaultEmptyText: '--',\n  diffTarget: 0,\n}\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import { IncreaseTag } from '@nbit/react'\n")),(0,s.kt)("h2",{id:"\u666e\u901a\u7528\u6cd5"},"\u666e\u901a\u7528\u6cd5"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag value={'0.000000007'} />\n")),(0,s.kt)(g,{value:"0.000000007",mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag value={66666.8888000000000000} />\n")),(0,s.kt)(g,{value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag value={-66666.8888000000000000} />\n")),(0,s.kt)(g,{value:-66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u663e\u793a\u524d\u7f00\u7b26\u53f7-hasprefix"},"\u663e\u793a\u524d\u7f00\u7b26\u53f7 ",(0,s.kt)("inlineCode",{parentName:"h2"},"hasPrefix")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag hasPrefix={true} value={66666.8888} />\n")),(0,s.kt)(g,{hasPrefix:!0,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag hasPrefix={false} value={66666.8888} />\n")),(0,s.kt)(g,{hasPrefix:!1,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u663e\u793a\u540e\u7f00\u7b26\u53f7\u5904\u7406\u767e\u5206\u6bd4\u4ebf\u7b49-needpercentcalc"},"\u663e\u793a\u540e\u7f00\u7b26\u53f7\u3001\u5904\u7406\u767e\u5206\u6bd4\u3001\u4ebf\u7b49 ",(0,s.kt)("inlineCode",{parentName:"h2"},"needPercentCalc")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag needPercentCalc hasPostfix value={66666.8888} />\n")),(0,s.kt)(g,{needPercentCalc:!0,hasPostfix:!0,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag needPercentCalc hasPostfix value={66666.8888} right={'\u4ebf'}/>\n")),(0,s.kt)(g,{value:66666.8888,right:"\u4ebf",mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u5c0f\u6570\u70b9\u4f4d\u6570-digits"},"\u5c0f\u6570\u70b9\u4f4d\u6570 ",(0,s.kt)("inlineCode",{parentName:"h2"},"digits")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag digits={3}  value={66666.8888} />\n")),(0,s.kt)(g,{digits:3,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag digits={2}  value={66666.8888} />\n")),(0,s.kt)(g,{digits:2,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u56db\u820d\u4e94\u5165-isround"},"\u56db\u820d\u4e94\u5165 ",(0,s.kt)("inlineCode",{parentName:"h2"},"isRound")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag digits={2}  isRound={false} value={66666.8888} />\n")),(0,s.kt)(g,{digits:2,isRound:!1,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag digits={2}  isRound={true} value={66666.8888} />\n")),(0,s.kt)(g,{digits:2,isRound:!0,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u5343\u5206\u4f4d-ksign"},"\u5343\u5206\u4f4d ",(0,s.kt)("inlineCode",{parentName:"h2"},"kSign")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag kSign={false} value={66666.8888} />\n")),(0,s.kt)(g,{kSign:!1,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag kSign={true} value={66666.8888} />\n")),(0,s.kt)(g,{kSign:!0,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u9ed8\u8ba4\u7a7a\u503c\u663e\u793a\u6587\u6848-defaultemptytext"},"\u9ed8\u8ba4\u7a7a\u503c\u663e\u793a\u6587\u6848 ",(0,s.kt)("inlineCode",{parentName:"h2"},"defaultEmptyText")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'<IncreaseTag defaultEmptyText="xx" value="--" />\n')),(0,s.kt)(g,{defaultEmptyText:"xx",value:"--",mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'<IncreaseTag value="--" />\n')),(0,s.kt)(g,{value:"--",mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u662f\u5426\u663e\u793a\u7ea2\u6da8\u7eff\u8dcc-hascolor"},"\u662f\u5426\u663e\u793a\u7ea2\u6da8\u7eff\u8dcc ",(0,s.kt)("inlineCode",{parentName:"h2"},"hasColor")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag value={66666.8888} />\n")),(0,s.kt)(g,{value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag hasColor={false} value={66666.8888} />\n")),(0,s.kt)(g,{hasColor:!1,value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("h2",{id:"\u7ea2\u6da8\u7eff\u8dcc\u6bd4\u5bf9\u76ee\u6807-difftarget"},"\u7ea2\u6da8\u7eff\u8dcc\u6bd4\u5bf9\u76ee\u6807 ",(0,s.kt)("inlineCode",{parentName:"h2"},"diffTarget")),(0,s.kt)("p",null,"\u9ed8\u8ba4\u548c 0 \u6bd4\u8f83"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag value={66666.8888} />\n")),(0,s.kt)(g,{value:66666.8888,mdxType:"IncreaseTag"}),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"<IncreaseTag diffTarget={9999999} value={66666.8888} />\n")),(0,s.kt)(g,{diffTarget:9999999,value:66666.8888,mdxType:"IncreaseTag"}))}x.isMDXComponent=!0}}]);