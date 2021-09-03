"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[1535],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),u=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(r),f=n,m=d["".concat(c,".").concat(f)]||d[f]||l[f]||o;return r?a.createElement(m,i(i({ref:t},p),{},{components:r})):a.createElement(m,i({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},29591:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return p},default:function(){return d}});var a=r(87462),n=r(63366),o=(r(67294),r(3905)),i=["components"],s={version:"0.8.0",title:"Structure",keywords:["big data","stream processing","cloud","hdfs","storage","upserts","change capture"],summary:"Hudi brings stream processing to big data, providing fresh data while being an order of magnitude efficient over traditional batch processing.",last_modified_at:new Date("2019-12-30T19:59:57.000Z")},c=void 0,u={unversionedId:"structure",id:"version-0.8.0/structure",isDocsHomePage:!1,title:"Structure",description:"Hudi (pronounced \u201cHoodie\u201d) ingests & manages storage of large analytical tables over DFS (HDFS or cloud stores) and provides three types of queries.",source:"@site/versioned_docs/version-0.8.0/structure.md",sourceDirName:".",slug:"/structure",permalink:"/docs/0.8.0/structure",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.8.0/structure.md",version:"0.8.0",frontMatter:{version:"0.8.0",title:"Structure",keywords:["big data","stream processing","cloud","hdfs","storage","upserts","change capture"],summary:"Hudi brings stream processing to big data, providing fresh data while being an order of magnitude efficient over traditional batch processing.",last_modified_at:"2019-12-30T19:59:57.000Z"}},p=[],l={toc:p};function d(e){var t=e.components,r=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Hudi (pronounced \u201cHoodie\u201d) ingests & manages storage of large analytical tables over DFS (",(0,o.kt)("a",{parentName:"p",href:"http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign"},"HDFS")," or cloud stores) and provides three types of queries."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Read Optimized query")," - Provides excellent query performance on pure columnar storage, much like plain ",(0,o.kt)("a",{parentName:"li",href:"https://parquet.apache.org/"},"Parquet")," tables."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Incremental query")," - Provides a change stream out of the dataset to feed downstream jobs/ETLs."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Snapshot query")," - Provides queries on real-time data, using a combination of columnar & row based storage (e.g Parquet + ",(0,o.kt)("a",{parentName:"li",href:"http://avro.apache.org/docs/current/mr"},"Avro"),")")),(0,o.kt)("figure",null,(0,o.kt)("img",{className:"docimage",src:"/assets/images/hudi_intro_1.png",alt:"hudi_intro_1.png"})),(0,o.kt)("p",null,"By carefully managing how data is laid out in storage & how it\u2019s exposed to queries, Hudi is able to power a rich data ecosystem where external sources can be ingested in near real-time and made available for interactive SQL Engines like ",(0,o.kt)("a",{parentName:"p",href:"https://prestodb.io"},"PrestoDB")," & ",(0,o.kt)("a",{parentName:"p",href:"https://spark.apache.org/sql/"},"Spark"),", while at the same time capable of being consumed incrementally from processing/ETL frameworks like ",(0,o.kt)("a",{parentName:"p",href:"https://hive.apache.org/"},"Hive")," & ",(0,o.kt)("a",{parentName:"p",href:"https://spark.apache.org/docs/latest/"},"Spark")," to build derived (Hudi) tables."),(0,o.kt)("p",null,"Hudi broadly consists of a self contained Spark library to build tables and integrations with existing query engines for data access. See ",(0,o.kt)("a",{parentName:"p",href:"/docs/quick-start-guide"},"quickstart")," for a demo."))}d.isMDXComponent=!0}}]);