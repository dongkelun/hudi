"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[224],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=u(n),m=i,h=c["".concat(l,".").concat(m)]||c[m]||p[m]||r;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var u=2;u<r;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},25461:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var a=n(87462),i=n(63366),r=(n(67294),n(3905)),o=["components"],s={version:"0.5.2",title:"Migration Guide",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing table into a Hudi table",last_modified_at:new Date("2019-12-30T19:59:57.000Z")},l=void 0,u={unversionedId:"migration_guide",id:"version-0.5.2/migration_guide",isDocsHomePage:!1,title:"Migration Guide",description:"Hudi maintains metadata such as commit timeline and indexes to manage a table. The commit timelines helps to understand the actions happening on a table as well as the current state of a table. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.",source:"@site/versioned_docs/version-0.5.2/migration_guide.md",sourceDirName:".",slug:"/migration_guide",permalink:"/docs/0.5.2/migration_guide",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.5.2/migration_guide.md",version:"0.5.2",frontMatter:{version:"0.5.2",title:"Migration Guide",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing table into a Hudi table",last_modified_at:"2019-12-30T19:59:57.000Z"}},d=[{value:"Approaches",id:"approaches",children:[{value:"Use Hudi for new partitions alone",id:"use-hudi-for-new-partitions-alone",children:[]},{value:"Convert existing table to Hudi",id:"convert-existing-table-to-hudi",children:[]}]}],p={toc:d};function c(e){var t=e.components,n=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Hudi maintains metadata such as commit timeline and indexes to manage a table. The commit timelines helps to understand the actions happening on a table as well as the current state of a table. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.\nTo be able to start using Hudi for your existing table, you will need to migrate your existing table into a Hudi managed table. There are a couple of ways to achieve this."),(0,r.kt)("h2",{id:"approaches"},"Approaches"),(0,r.kt)("h3",{id:"use-hudi-for-new-partitions-alone"},"Use Hudi for new partitions alone"),(0,r.kt)("p",null,"Hudi can be used to manage an existing table without affecting/altering the historical data already present in the\ntable. Hudi has been implemented to be compatible with such a mixed table with a caveat that either the complete\nHive partition is Hudi managed or not. Thus the lowest granularity at which Hudi manages a table is a Hive\npartition. Start using the datasource API or the WriteClient to write to the table and make sure you start writing\nto a new partition or convert your last N partitions into Hudi instead of the entire table. Note, since the historical\npartitions are not managed by HUDI, none of the primitives provided by HUDI work on the data in those partitions. More concretely, one cannot perform upserts or incremental pull on such older partitions not managed by the HUDI table.\nTake this approach if your table is an append only type of table and you do not expect to perform any updates to existing (or non Hudi managed) partitions."),(0,r.kt)("h3",{id:"convert-existing-table-to-hudi"},"Convert existing table to Hudi"),(0,r.kt)("p",null,"Import your existing table into a Hudi managed table. Since all the data is Hudi managed, none of the limitations\nof Approach 1 apply here. Updates spanning any partitions can be applied to this table and Hudi will efficiently\nmake the update available to queries. Note that not only do you get to use all Hudi primitives on this table,\nthere are other additional advantages of doing this. Hudi automatically manages file sizes of a Hudi managed table\n. You can define the desired file size when converting this table and Hudi will ensure it writes out files\nadhering to the config. It will also ensure that smaller files later get corrected by routing some new inserts into\nsmall files rather than writing new small ones thus maintaining the health of your cluster."),(0,r.kt)("p",null,"There are a few options when choosing this approach."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 1"),"\nUse the HDFSParquetImporter tool. As the name suggests, this only works if your existing table is in parquet file format.\nThis tool essentially starts a Spark Job to read the existing parquet table and converts it into a HUDI managed table by re-writing all the data."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 2"),"\nFor huge tables, this could be as simple as : "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'for partition in [list of partitions in source table] {\n        val inputDF = spark.read.format("any_input_format").load("partition_path")\n        inputDF.write.format("org.apache.hudi").option()....save("basePath")\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 3"),"\nWrite your own custom logic of how to load an existing table into a Hudi managed one. Please read about the RDD API\n",(0,r.kt)("a",{parentName:"p",href:"/docs/quick-start-guide"},"here"),". Using the HDFSParquetImporter Tool. Once hudi has been built via ",(0,r.kt)("inlineCode",{parentName:"p"},"mvn clean install -DskipTests"),", the shell can be\nfired by via ",(0,r.kt)("inlineCode",{parentName:"p"},"cd hudi-cli && ./hudi-cli.sh"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"hudi->hdfsparquetimport\n        --upsert false\n        --srcPath /user/parquet/table/basepath\n        --targetPath /user/hoodie/table/basepath\n        --tableName hoodie_table\n        --tableType COPY_ON_WRITE\n        --rowKeyField _row_key\n        --partitionPathField partitionStr\n        --parallelism 1500\n        --schemaFilePath /user/table/schema\n        --format parquet\n        --sparkMemory 6g\n        --retry 2\n")))}c.isMDXComponent=!0}}]);