"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[526],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,f=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(f,i(i({ref:t},l),{},{components:r})):n.createElement(f,i({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},35532:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return l},default:function(){return d}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),i=["components"],s={version:"0.6.0",title:"Azure Filesystem",keywords:["hudi","hive","azure","spark","presto"],summary:"In this page, we go over how to configure Hudi with Azure filesystem.",last_modified_at:new Date("2020-05-25T23:00:57.000Z"),language:"cn"},u=void 0,c={unversionedId:"azure_hoodie",id:"version-0.6.0/azure_hoodie",isDocsHomePage:!1,title:"Azure Filesystem",description:"In this page, we explain how to use Hudi on Microsoft Azure.",source:"@site/i18n/cn/docusaurus-plugin-content-docs/version-0.6.0/azure_hoodie.md",sourceDirName:".",slug:"/azure_hoodie",permalink:"/cn/docs/0.6.0/azure_hoodie",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.6.0/azure_hoodie.md",version:"0.6.0",frontMatter:{version:"0.6.0",title:"Azure Filesystem",keywords:["hudi","hive","azure","spark","presto"],summary:"In this page, we go over how to configure Hudi with Azure filesystem.",last_modified_at:"2020-05-25T23:00:57.000Z",language:"cn"},sidebar:"version-0.6.0/docs",previous:{title:"OSS Filesystem",permalink:"/cn/docs/0.6.0/oss_hoodie"},next:{title:"COS Filesystem",permalink:"/cn/docs/0.6.0/cos_hoodie"}},l=[{value:"Disclaimer",id:"disclaimer",children:[]},{value:"Supported Storage System",id:"supported-storage-system",children:[]},{value:"Verified Combination of Spark and storage system",id:"verified-combination-of-spark-and-storage-system",children:[]}],p={toc:l};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In this page, we explain how to use Hudi on Microsoft Azure."),(0,o.kt)("h2",{id:"disclaimer"},"Disclaimer"),(0,o.kt)("p",null,"This page is maintained by the Hudi community.\nIf the information is inaccurate or you have additional information to add.\nPlease feel free to create a JIRA ticket. Contribution is highly appreciated."),(0,o.kt)("h2",{id:"supported-storage-system"},"Supported Storage System"),(0,o.kt)("p",null,"There are two storage systems support Hudi ."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Azure Blob Storage"),(0,o.kt)("li",{parentName:"ul"},"Azure Data Lake Gen 2")),(0,o.kt)("h2",{id:"verified-combination-of-spark-and-storage-system"},"Verified Combination of Spark and storage system"),(0,o.kt)("h4",{id:"hdinsight-spark24-on-azure-data-lake-storage-gen-2"},"HDInsight Spark2.4 on Azure Data Lake Storage Gen 2"),(0,o.kt)("p",null,"This combination works out of the box. No extra config needed."),(0,o.kt)("h4",{id:"databricks-spark24-on-azure-data-lake-storage-gen-2"},"Databricks Spark2.4 on Azure Data Lake Storage Gen 2"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Import Hudi jar to databricks workspace")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Mount the file system to dbutils."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'dbutils.fs.mount(\n  source = "abfss://xxx@xxx.dfs.core.windows.net",\n  mountPoint = "/mountpoint",\n  extraConfigs = configs)\n'))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"When writing Hudi dataset, use abfss URL"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'inputDF.write\n  .format("org.apache.hudi")\n  .options(opts)\n  .mode(SaveMode.Append)\n  .save("abfss://<<storage-account>>.dfs.core.windows.net/hudi-tables/customer")\n'))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"When reading Hudi dataset, use the mounting point"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'spark.read\n  .format("org.apache.hudi")\n  .load("/mountpoint/hudi-tables/customer")\n')))))}d.isMDXComponent=!0}}]);