"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[1404],{3905:function(e,t,a){a.d(t,{Zo:function(){return l},kt:function(){return m}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var d=n.createContext({}),u=function(e){var t=n.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},l=function(e){var t=u(e.components);return n.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,d=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),c=u(a),m=i,h=c["".concat(d,".").concat(m)]||c[m]||p[m]||r;return a?n.createElement(h,o(o({ref:t},l),{},{components:a})):n.createElement(h,o({ref:t},l))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=c;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var u=2;u<r;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},5104:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return d},metadata:function(){return u},toc:function(){return l},default:function(){return c}});var n=a(87462),i=a(63366),r=(a(67294),a(3905)),o=["components"],s={version:"0.5.3",title:"Migration Guide",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing dataset into a Hudi dataset",last_modified_at:new Date("2019-12-30T19:59:57.000Z"),language:"cn"},d=void 0,u={unversionedId:"migration_guide",id:"version-0.5.3/migration_guide",isDocsHomePage:!1,title:"Migration Guide",description:"Hudi maintains metadata such as commit timeline and indexes to manage a dataset. The commit timelines helps to understand the actions happening on a dataset as well as the current state of a dataset. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.",source:"@site/i18n/cn/docusaurus-plugin-content-docs/version-0.5.3/migration_guide.md",sourceDirName:".",slug:"/migration_guide",permalink:"/cn/docs/0.5.3/migration_guide",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.5.3/migration_guide.md",version:"0.5.3",frontMatter:{version:"0.5.3",title:"Migration Guide",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing dataset into a Hudi dataset",last_modified_at:"2019-12-30T19:59:57.000Z",language:"cn"}},l=[{value:"Approaches",id:"approaches",children:[{value:"Use Hudi for new partitions alone",id:"use-hudi-for-new-partitions-alone",children:[]},{value:"Convert existing dataset to Hudi",id:"convert-existing-dataset-to-hudi",children:[]}]}],p={toc:l};function c(e){var t=e.components,a=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Hudi maintains metadata such as commit timeline and indexes to manage a dataset. The commit timelines helps to understand the actions happening on a dataset as well as the current state of a dataset. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.\nTo be able to start using Hudi for your existing dataset, you will need to migrate your existing dataset into a Hudi managed dataset. There are a couple of ways to achieve this."),(0,r.kt)("h2",{id:"approaches"},"Approaches"),(0,r.kt)("h3",{id:"use-hudi-for-new-partitions-alone"},"Use Hudi for new partitions alone"),(0,r.kt)("p",null,"Hudi can be used to manage an existing dataset without affecting/altering the historical data already present in the\ndataset. Hudi has been implemented to be compatible with such a mixed dataset with a caveat that either the complete\nHive partition is Hudi managed or not. Thus the lowest granularity at which Hudi manages a dataset is a Hive\npartition. Start using the datasource API or the WriteClient to write to the dataset and make sure you start writing\nto a new partition or convert your last N partitions into Hudi instead of the entire table. Note, since the historical\npartitions are not managed by HUDI, none of the primitives provided by HUDI work on the data in those partitions. More concretely, one cannot perform upserts or incremental pull on such older partitions not managed by the HUDI dataset.\nTake this approach if your dataset is an append only type of dataset and you do not expect to perform any updates to existing (or non Hudi managed) partitions."),(0,r.kt)("h3",{id:"convert-existing-dataset-to-hudi"},"Convert existing dataset to Hudi"),(0,r.kt)("p",null,"Import your existing dataset into a Hudi managed dataset. Since all the data is Hudi managed, none of the limitations\nof Approach 1 apply here. Updates spanning any partitions can be applied to this dataset and Hudi will efficiently\nmake the update available to queries. Note that not only do you get to use all Hudi primitives on this dataset,\nthere are other additional advantages of doing this. Hudi automatically manages file sizes of a Hudi managed dataset\n. You can define the desired file size when converting this dataset and Hudi will ensure it writes out files\nadhering to the config. It will also ensure that smaller files later get corrected by routing some new inserts into\nsmall files rather than writing new small ones thus maintaining the health of your cluster."),(0,r.kt)("p",null,"There are a few options when choosing this approach."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 1"),"\nUse the HDFSParquetImporter tool. As the name suggests, this only works if your existing dataset is in parquet file format.\nThis tool essentially starts a Spark Job to read the existing parquet dataset and converts it into a HUDI managed dataset by re-writing all the data."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 2"),"\nFor huge datasets, this could be as simple as : "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'for partition in [list of partitions in source dataset] {\n        val inputDF = spark.read.format("any_input_format").load("partition_path")\n        inputDF.write.format("org.apache.hudi").option()....save("basePath")\n}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Option 3"),"\nWrite your own custom logic of how to load an existing dataset into a Hudi managed one. Please read about the RDD API\n",(0,r.kt)("a",{parentName:"p",href:"/cn/docs/quick-start-guide"},"here"),". Using the HDFSParquetImporter Tool. Once hudi has been built via ",(0,r.kt)("inlineCode",{parentName:"p"},"mvn clean install -DskipTests"),", the shell can be\nfired by via ",(0,r.kt)("inlineCode",{parentName:"p"},"cd hudi-cli && ./hudi-cli.sh"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"hudi->hdfsparquetimport\n        --upsert false\n        --srcPath /user/parquet/dataset/basepath\n        --targetPath\n        /user/hoodie/dataset/basepath\n        --tableName hoodie_table\n        --tableType COPY_ON_WRITE\n        --rowKeyField _row_key\n        --partitionPathField partitionStr\n        --parallelism 1500\n        --schemaFilePath /user/table/schema\n        --format parquet\n        --sparkMemory 6g\n        --retry 2\n")))}c.isMDXComponent=!0}}]);