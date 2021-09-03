"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[257],{3905:function(e,a,t){t.d(a,{Zo:function(){return d},kt:function(){return h}});var n=t(67294);function i(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){i(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,i=function(e,a){if(null==e)return{};var t,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(i[t]=e[t]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=n.createContext({}),p=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},d=function(e){var a=p(e.components);return n.createElement(l.Provider,{value:a},e.children)},c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(t),h=i,m=u["".concat(l,".").concat(h)]||u[h]||c[h]||r;return t?n.createElement(m,o(o({ref:a},d),{},{components:t})):n.createElement(m,o({ref:a},d))}));function h(e,a){var t=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=u;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=t[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},58215:function(e,a,t){var n=t(67294);a.Z=function(e){var a=e.children,t=e.hidden,i=e.className;return n.createElement("div",{role:"tabpanel",hidden:t,className:i},a)}},55064:function(e,a,t){t.d(a,{Z:function(){return c}});var n=t(67294),i=t(79443);var r=function(){var e=(0,n.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},o=t(86010),s="tabItem_1uMI",l="tabItemActive_2DSg";var p=37,d=39;var c=function(e){var a=e.lazy,t=e.block,i=e.defaultValue,c=e.values,u=e.groupId,h=e.className,m=r(),k=m.tabGroupChoices,f=m.setTabGroupChoices,v=(0,n.useState)(i),g=v[0],_=v[1],b=n.Children.toArray(e.children),w=[];if(null!=u){var y=k[u];null!=y&&y!==g&&c.some((function(e){return e.value===y}))&&_(y)}var N=function(e){var a=e.currentTarget,t=w.indexOf(a),n=c[t].value;_(n),null!=u&&(f(u,n),setTimeout((function(){var e,t,n,i,r,o,s,p;(e=a.getBoundingClientRect(),t=e.top,n=e.left,i=e.bottom,r=e.right,o=window,s=o.innerHeight,p=o.innerWidth,t>=0&&r<=p&&i<=s&&n>=0)||(a.scrollIntoView({block:"center",behavior:"smooth"}),a.classList.add(l),setTimeout((function(){return a.classList.remove(l)}),2e3))}),150))},T=function(e){var a,t;switch(e.keyCode){case d:var n=w.indexOf(e.target)+1;t=w[n]||w[0];break;case p:var i=w.indexOf(e.target)-1;t=w[i]||w[w.length-1]}null==(a=t)||a.focus()};return n.createElement("div",{className:"tabs-container"},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},h)},c.map((function(e){var a=e.value,t=e.label;return n.createElement("li",{role:"tab",tabIndex:g===a?0:-1,"aria-selected":g===a,className:(0,o.Z)("tabs__item",s,{"tabs__item--active":g===a}),key:a,ref:function(e){return w.push(e)},onKeyDown:T,onFocus:N,onClick:N},t)}))),a?(0,n.cloneElement)(b.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):n.createElement("div",{className:"margin-vert--md"},b.map((function(e,a){return(0,n.cloneElement)(e,{key:a,hidden:e.props.value!==g})}))))}},79443:function(e,a,t){var n=(0,t(67294).createContext)(void 0);a.Z=n},67931:function(e,a,t){t.r(a),t.d(a,{frontMatter:function(){return p},contentTitle:function(){return d},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var n=t(87462),i=t(63366),r=(t(67294),t(3905)),o=t(55064),s=t(58215),l=["components"],p={title:"Spark Guide",sidebar_position:2,toc:!0,last_modified_at:new Date("2019-12-30T19:59:57.000Z")},d=void 0,c={unversionedId:"quick-start-guide",id:"version-0.8.0/quick-start-guide",isDocsHomePage:!1,title:"Spark Guide",description:"This guide provides a quick peek at Hudi's capabilities using spark-shell. Using Spark datasources, we will walk through",source:"@site/versioned_docs/version-0.8.0/quick-start-guide.md",sourceDirName:".",slug:"/quick-start-guide",permalink:"/docs/0.8.0/quick-start-guide",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.8.0/quick-start-guide.md",version:"0.8.0",sidebarPosition:2,frontMatter:{title:"Spark Guide",sidebar_position:2,toc:!0,last_modified_at:"2019-12-30T19:59:57.000Z"},sidebar:"version-0.8.0/docs",previous:{title:"Overview",permalink:"/docs/0.8.0/overview"},next:{title:"Flink Guide",permalink:"/docs/0.8.0/flink-quick-start-guide"}},u=[{value:"Setup",id:"setup",children:[]},{value:"Insert data",id:"insert-data",children:[]},{value:"Query data",id:"query-data",children:[]},{value:"Update data",id:"update-data",children:[]},{value:"Incremental query",id:"incremental-query",children:[]},{value:"Point in time query",id:"point-in-time-query",children:[]},{value:"Delete data",id:"deletes",children:[]},{value:"Insert Overwrite Table",id:"insert-overwrite-table",children:[]},{value:"Insert Overwrite",id:"insert-overwrite",children:[]},{value:"Where to go from here?",id:"where-to-go-from-here",children:[]}],h={toc:u};function m(e){var a=e.components,t=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,n.Z)({},h,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This guide provides a quick peek at Hudi's capabilities using spark-shell. Using Spark datasources, we will walk through\ncode snippets that allows you to insert and update a Hudi table of default table type:\n",(0,r.kt)("a",{parentName:"p",href:"/docs/concepts#copy-on-write-table"},"Copy on Write"),".\nAfter each write operation we will also show how to read the data both snapshot and incrementally."),(0,r.kt)("h2",{id:"setup"},"Setup"),(0,r.kt)("p",null,"Hudi works with Spark-2.4.3+ & Spark 3.x versions. You can follow instructions ",(0,r.kt)("a",{parentName:"p",href:"https://spark.apache.org/downloads"},"here")," for setting up spark.\nFrom the extracted directory run spark-shell with Hudi as:"),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},"// spark-shell for spark 3\nspark-shell \\\n  --packages org.apache.hudi:hudi-spark3-bundle_2.12:0.8.0,org.apache.spark:spark-avro_2.12:3.0.1 \\\n  --conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n  \n// spark-shell for spark 2 with scala 2.12\nspark-shell \\\n  --packages org.apache.hudi:hudi-spark-bundle_2.12:0.8.0,org.apache.spark:spark-avro_2.12:2.4.4 \\\n  --conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n  \n// spark-shell for spark 2 with scala 2.11\nspark-shell \\\n  --packages org.apache.hudi:hudi-spark-bundle_2.11:0.8.0,org.apache.spark:spark-avro_2.11:2.4.4 \\\n  --conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n"))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# pyspark\nexport PYSPARK_PYTHON=$(which python3)\n\n# for spark3\npyspark\n--packages org.apache.hudi:hudi-spark3-bundle_2.12:0.8.0,org.apache.spark:spark-avro_2.12:3.0.1\n--conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n\n# for spark2 with scala 2.12\npyspark\n--packages org.apache.hudi:hudi-spark-bundle_2.12:0.8.0,org.apache.spark:spark-avro_2.12:2.4.4\n--conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n\n# for spark2 with scala 2.11\npyspark\n--packages org.apache.hudi:hudi-spark-bundle_2.11:0.8.0,org.apache.spark:spark-avro_2.11:2.4.4\n--conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer'\n")))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Please note the following")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("ul",null,(0,r.kt)("li",null,"spark-avro module needs to be specified in --packages as it is not included with spark-shell by default"),(0,r.kt)("li",null,"spark-avro and spark versions must match (we have used 3.0.1 for both above)"),(0,r.kt)("li",null,"we have used hudi-spark-bundle built for scala 2.12 since the spark-avro module used also depends on 2.12. If spark-avro_2.11 is used, correspondingly hudi-spark-bundle_2.11 needs to be used. ")))),(0,r.kt)("p",null,"Setup table name, base path and a data generator to generate records for this guide."),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nimport org.apache.hudi.QuickstartUtils._\nimport scala.collection.JavaConversions._\nimport org.apache.spark.sql.SaveMode._\nimport org.apache.hudi.DataSourceReadOptions._\nimport org.apache.hudi.DataSourceWriteOptions._\nimport org.apache.hudi.config.HoodieWriteConfig._\n\nval tableName = "hudi_trips_cow"\nval basePath = "file:///tmp/hudi_trips_cow"\nval dataGen = new DataGenerator\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# pyspark\ntableName = "hudi_trips_cow"\nbasePath = "file:///tmp/hudi_trips_cow"\ndataGen = sc._jvm.org.apache.hudi.QuickstartUtils.DataGenerator()\n')))),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-spark/src/main/java/org/apache/hudi/QuickstartUtils.java#L50"},"DataGenerator"),"\ncan generate sample inserts and updates based on the the sample trip schema ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-spark/src/main/java/org/apache/hudi/QuickstartUtils.java#L57"},"here")))),(0,r.kt)("h2",{id:"insert-data"},"Insert data"),(0,r.kt)("p",null,"Generate some new trips, load them into a DataFrame and write the DataFrame into the Hudi table as below."),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nval inserts = convertToStringList(dataGen.generateInserts(10))\nval df = spark.read.json(spark.sparkContext.parallelize(inserts, 2))\ndf.write.format("hudi").\n  options(getQuickstartWriteConfigs).\n  option(PRECOMBINE_FIELD_OPT_KEY, "ts").\n  option(RECORDKEY_FIELD_OPT_KEY, "uuid").\n  option(PARTITIONPATH_FIELD_OPT_KEY, "partitionpath").\n  option(TABLE_NAME, tableName).\n  mode(Overwrite).\n  save(basePath)\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# pyspark\ninserts = sc._jvm.org.apache.hudi.QuickstartUtils.convertToStringList(dataGen.generateInserts(10))\ndf = spark.read.json(spark.sparkContext.parallelize(inserts, 2))\n\nhudi_options = {\n    'hoodie.table.name': tableName,\n    'hoodie.datasource.write.recordkey.field': 'uuid',\n    'hoodie.datasource.write.partitionpath.field': 'partitionpath',\n    'hoodie.datasource.write.table.name': tableName,\n    'hoodie.datasource.write.operation': 'upsert',\n    'hoodie.datasource.write.precombine.field': 'ts',\n    'hoodie.upsert.shuffle.parallelism': 2,\n    'hoodie.insert.shuffle.parallelism': 2\n}\n\ndf.write.format(\"hudi\").\n    options(**hudi_options).\n    mode(\"overwrite\").\n    save(basePath)\n")))),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("inlineCode",{parentName:"p"},"mode(Overwrite)")," overwrites and recreates the table if it already exists.\nYou can check the data generated under ",(0,r.kt)("inlineCode",{parentName:"p"},"/tmp/hudi_trips_cow/<region>/<country>/<city>/"),". We provided a record key\n(",(0,r.kt)("inlineCode",{parentName:"p"},"uuid")," in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-spark/src/main/java/org/apache/hudi/QuickstartUtils.java#L58"},"schema"),"), partition field (",(0,r.kt)("inlineCode",{parentName:"p"},"region/country/city"),") and combine logic (",(0,r.kt)("inlineCode",{parentName:"p"},"ts")," in\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-spark/src/main/java/org/apache/hudi/QuickstartUtils.java#L58"},"schema"),") to ensure trip records are unique within each partition. For more info, refer to\n",(0,r.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=113709185#FAQ-HowdoImodelthedatastoredinHudi"},"Modeling data stored in Hudi"),"\nand for info on ways to ingest data into Hudi, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/writing_data"},"Writing Hudi Tables"),".\nHere we are using the default write operation : ",(0,r.kt)("inlineCode",{parentName:"p"},"upsert"),". If you have a workload without updates, you can also issue\n",(0,r.kt)("inlineCode",{parentName:"p"},"insert")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"bulk_insert")," operations which could be faster. To know more, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/writing_data#write-operations"},"Write operations")))),(0,r.kt)("h2",{id:"query-data"},"Query data"),(0,r.kt)("p",null,"Load the data files into a DataFrame."),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nval tripsSnapshotDF = spark.\n  read.\n  format("hudi").\n  load(basePath + "/*/*/*/*")\n//load(basePath) use "/partitionKey=partitionValue" folder structure for Spark auto partition discovery\ntripsSnapshotDF.createOrReplaceTempView("hudi_trips_snapshot")\n\nspark.sql("select fare, begin_lon, begin_lat, ts from  hudi_trips_snapshot where fare > 20.0").show()\nspark.sql("select _hoodie_commit_time, _hoodie_record_key, _hoodie_partition_path, rider, driver, fare from  hudi_trips_snapshot").show()\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# pyspark\ntripsSnapshotDF = spark. \\\n  read. \\\n  format("hudi"). \\\n  load(basePath + "/*/*/*/*")\n# load(basePath) use "/partitionKey=partitionValue" folder structure for Spark auto partition discovery\n\ntripsSnapshotDF.createOrReplaceTempView("hudi_trips_snapshot")\n\nspark.sql("select fare, begin_lon, begin_lat, ts from  hudi_trips_snapshot where fare > 20.0").show()\nspark.sql("select _hoodie_commit_time, _hoodie_record_key, _hoodie_partition_path, rider, driver, fare from  hudi_trips_snapshot").show()\n')))),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This query provides snapshot querying of the ingested data. Since our partition path (",(0,r.kt)("inlineCode",{parentName:"p"},"region/country/city"),") is 3 levels nested\nfrom base path we ve used ",(0,r.kt)("inlineCode",{parentName:"p"},'load(basePath + "/*/*/*/*")'),".\nRefer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/concepts#table-types--queries"},"Table types and queries")," for more info on all table types and query types supported."))),(0,r.kt)("h2",{id:"update-data"},"Update data"),(0,r.kt)("p",null,"This is similar to inserting new data. Generate updates to existing trips using the data generator, load into a DataFrame\nand write DataFrame into the hudi table."),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nval updates = convertToStringList(dataGen.generateUpdates(10))\nval df = spark.read.json(spark.sparkContext.parallelize(updates, 2))\ndf.write.format("hudi").\n  options(getQuickstartWriteConfigs).\n  option(PRECOMBINE_FIELD_OPT_KEY, "ts").\n  option(RECORDKEY_FIELD_OPT_KEY, "uuid").\n  option(PARTITIONPATH_FIELD_OPT_KEY, "partitionpath").\n  option(TABLE_NAME, tableName).\n  mode(Append).\n  save(basePath)\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# pyspark\nupdates = sc._jvm.org.apache.hudi.QuickstartUtils.convertToStringList(dataGen.generateUpdates(10))\ndf = spark.read.json(spark.sparkContext.parallelize(updates, 2))\ndf.write.format("hudi"). \\\n  options(**hudi_options). \\\n  mode("append"). \\\n  save(basePath)\n')))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Notice that the save mode is now ",(0,r.kt)("inlineCode",{parentName:"p"},"Append"),". In general, always use append mode unless you are trying to create the table for the first time.\n",(0,r.kt)("a",{parentName:"p",href:"#query-data"},"Querying")," the data again will now show updated trips. Each write operation generates a new ",(0,r.kt)("a",{parentName:"p",href:"/docs/concepts"},"commit"),"\ndenoted by the timestamp. Look for changes in ",(0,r.kt)("inlineCode",{parentName:"p"},"_hoodie_commit_time"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"rider"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"driver")," fields for the same ",(0,r.kt)("inlineCode",{parentName:"p"},"_hoodie_record_key"),"s in previous commit. "))),(0,r.kt)("h2",{id:"incremental-query"},"Incremental query"),(0,r.kt)("p",null,"Hudi also provides capability to obtain a stream of records that changed since given commit timestamp.\nThis can be achieved using Hudi's incremental querying and providing a begin time from which changes need to be streamed.\nWe do not need to specify endTime, if we want all changes after the given commit (as is the common case). "),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\n// reload data\nspark.\n  read.\n  format("hudi").\n  load(basePath + "/*/*/*/*").\n  createOrReplaceTempView("hudi_trips_snapshot")\n\nval commits = spark.sql("select distinct(_hoodie_commit_time) as commitTime from  hudi_trips_snapshot order by commitTime").map(k => k.getString(0)).take(50)\nval beginTime = commits(commits.length - 2) // commit time we are interested in\n\n// incrementally query data\nval tripsIncrementalDF = spark.read.format("hudi").\n  option(QUERY_TYPE_OPT_KEY, QUERY_TYPE_INCREMENTAL_OPT_VAL).\n  option(BEGIN_INSTANTTIME_OPT_KEY, beginTime).\n  load(basePath)\ntripsIncrementalDF.createOrReplaceTempView("hudi_trips_incremental")\n\nspark.sql("select `_hoodie_commit_time`, fare, begin_lon, begin_lat, ts from  hudi_trips_incremental where fare > 20.0").show()\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'# pyspark\n# reload data\nspark. \\\n  read. \\\n  format("hudi"). \\\n  load(basePath + "/*/*/*/*"). \\\n  createOrReplaceTempView("hudi_trips_snapshot")\n\ncommits = list(map(lambda row: row[0], spark.sql("select distinct(_hoodie_commit_time) as commitTime from  hudi_trips_snapshot order by commitTime").limit(50).collect()))\nbeginTime = commits[len(commits) - 2] # commit time we are interested in\n\n# incrementally query data\nincremental_read_options = {\n  \'hoodie.datasource.query.type\': \'incremental\',\n  \'hoodie.datasource.read.begin.instanttime\': beginTime,\n}\n\ntripsIncrementalDF = spark.read.format("hudi"). \\\n  options(**incremental_read_options). \\\n  load(basePath)\ntripsIncrementalDF.createOrReplaceTempView("hudi_trips_incremental")\n\nspark.sql("select `_hoodie_commit_time`, fare, begin_lon, begin_lat, ts from  hudi_trips_incremental where fare > 20.0").show()\n')))),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This will give all changes that happened after the beginTime commit with the filter of fare > 20.0. The unique thing about this\nfeature is that it now lets you author streaming pipelines on batch data."))),(0,r.kt)("h2",{id:"point-in-time-query"},"Point in time query"),(0,r.kt)("p",null,'Lets look at how to query data as of a specific time. The specific time can be represented by pointing endTime to a\nspecific commit time and beginTime to "000" (denoting earliest possible commit time). '),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nval beginTime = "000" // Represents all commits > this time.\nval endTime = commits(commits.length - 2) // commit time we are interested in\n\n//incrementally query data\nval tripsPointInTimeDF = spark.read.format("hudi").\n  option(QUERY_TYPE_OPT_KEY, QUERY_TYPE_INCREMENTAL_OPT_VAL).\n  option(BEGIN_INSTANTTIME_OPT_KEY, beginTime).\n  option(END_INSTANTTIME_OPT_KEY, endTime).\n  load(basePath)\ntripsPointInTimeDF.createOrReplaceTempView("hudi_trips_point_in_time")\nspark.sql("select `_hoodie_commit_time`, fare, begin_lon, begin_lat, ts from hudi_trips_point_in_time where fare > 20.0").show()\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# pyspark\nbeginTime = \"000\" # Represents all commits > this time.\nendTime = commits[len(commits) - 2]\n\n# query point in time data\npoint_in_time_read_options = {\n  'hoodie.datasource.query.type': 'incremental',\n  'hoodie.datasource.read.end.instanttime': endTime,\n  'hoodie.datasource.read.begin.instanttime': beginTime\n}\n\ntripsPointInTimeDF = spark.read.format(\"hudi\"). \\\n  options(**point_in_time_read_options). \\\n  load(basePath)\n\ntripsPointInTimeDF.createOrReplaceTempView(\"hudi_trips_point_in_time\")\nspark.sql(\"select `_hoodie_commit_time`, fare, begin_lon, begin_lat, ts from hudi_trips_point_in_time where fare > 20.0\").show()\n")))),(0,r.kt)("h2",{id:"deletes"},"Delete data"),(0,r.kt)("p",null,"Delete records for the HoodieKeys passed in."),(0,r.kt)(o.Z,{defaultValue:"scala",values:[{label:"Scala",value:"scala"},{label:"Python",value:"python"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"scala",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\n// fetch total records count\nspark.sql("select uuid, partitionpath from hudi_trips_snapshot").count()\n// fetch two records to be deleted\nval ds = spark.sql("select uuid, partitionpath from hudi_trips_snapshot").limit(2)\n\n// issue deletes\nval deletes = dataGen.generateDeletes(ds.collectAsList())\nval df = spark.read.json(spark.sparkContext.parallelize(deletes, 2))\n\ndf.write.format("hudi").\n  options(getQuickstartWriteConfigs).\n  option(OPERATION_OPT_KEY,"delete").\n  option(PRECOMBINE_FIELD_OPT_KEY, "ts").\n  option(RECORDKEY_FIELD_OPT_KEY, "uuid").\n  option(PARTITIONPATH_FIELD_OPT_KEY, "partitionpath").\n  option(TABLE_NAME, tableName).\n  mode(Append).\n  save(basePath)\n\n// run the same read query as above.\nval roAfterDeleteViewDF = spark.\n  read.\n  format("hudi").\n  load(basePath + "/*/*/*/*")\n\nroAfterDeleteViewDF.registerTempTable("hudi_trips_snapshot")\n// fetch should return (total - 2) records\nspark.sql("select uuid, partitionpath from hudi_trips_snapshot").count()\n'))),(0,r.kt)(s.Z,{value:"python",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"# pyspark\n# fetch total records count\nspark.sql(\"select uuid, partitionpath from hudi_trips_snapshot\").count()\n# fetch two records to be deleted\nds = spark.sql(\"select uuid, partitionpath from hudi_trips_snapshot\").limit(2)\n\n# issue deletes\nhudi_delete_options = {\n  'hoodie.table.name': tableName,\n  'hoodie.datasource.write.recordkey.field': 'uuid',\n  'hoodie.datasource.write.partitionpath.field': 'partitionpath',\n  'hoodie.datasource.write.table.name': tableName,\n  'hoodie.datasource.write.operation': 'delete',\n  'hoodie.datasource.write.precombine.field': 'ts',\n  'hoodie.upsert.shuffle.parallelism': 2, \n  'hoodie.insert.shuffle.parallelism': 2\n}\n\nfrom pyspark.sql.functions import lit\ndeletes = list(map(lambda row: (row[0], row[1]), ds.collect()))\ndf = spark.sparkContext.parallelize(deletes).toDF(['uuid', 'partitionpath']).withColumn('ts', lit(0.0))\ndf.write.format(\"hudi\"). \\\n  options(**hudi_delete_options). \\\n  mode(\"append\"). \\\n  save(basePath)\n\n# run the same read query as above.\nroAfterDeleteViewDF = spark. \\\n  read. \\\n  format(\"hudi\"). \\\n  load(basePath + \"/*/*/*/*\") \nroAfterDeleteViewDF.registerTempTable(\"hudi_trips_snapshot\")\n# fetch should return (total - 2) records\nspark.sql(\"select uuid, partitionpath from hudi_trips_snapshot\").count()\n")))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Only ",(0,r.kt)("inlineCode",{parentName:"p"},"Append")," mode is supported for delete operation."))),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"/docs/writing_data#deletes"},"deletion section")," of the writing data page for more details."),(0,r.kt)("h2",{id:"insert-overwrite-table"},"Insert Overwrite Table"),(0,r.kt)("p",null,"Generate some new trips, overwrite the table logically at the Hudi metadata level. The Hudi cleaner will eventually\nclean up the previous table snapshot's file groups. This can be faster than deleting the older table and recreating\nin ",(0,r.kt)("inlineCode",{parentName:"p"},"Overwrite")," mode."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nspark.\n  read.format("hudi").\n  load(basePath + "/*/*/*/*").\n  select("uuid","partitionpath").\n  show(10, false)\n\nval inserts = convertToStringList(dataGen.generateInserts(10))\nval df = spark.read.json(spark.sparkContext.parallelize(inserts, 2))\ndf.write.format("hudi").\n  options(getQuickstartWriteConfigs).\n  option(OPERATION_OPT_KEY,"insert_overwrite_table").\n  option(PRECOMBINE_FIELD_OPT_KEY, "ts").\n  option(RECORDKEY_FIELD_OPT_KEY, "uuid").\n  option(PARTITIONPATH_FIELD_OPT_KEY, "partitionpath").\n  option(TABLE_NAME, tableName).\n  mode(Append).\n  save(basePath)\n\n// Should have different keys now, from query before.\nspark.\n  read.format("hudi").\n  load(basePath + "/*/*/*/*").\n  select("uuid","partitionpath").\n  show(10, false)\n\n')),(0,r.kt)("h2",{id:"insert-overwrite"},"Insert Overwrite"),(0,r.kt)("p",null,"Generate some new trips, overwrite the all the partitions that are present in the input. This operation can be faster\nthan ",(0,r.kt)("inlineCode",{parentName:"p"},"upsert")," for batch ETL jobs, that are recomputing entire target partitions at once (as opposed to incrementally\nupdating the target tables). This is because, we are able to bypass indexing, precombining and other repartitioning\nsteps in the upsert write path completely."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-scala"},'// spark-shell\nspark.\n  read.format("hudi").\n  load(basePath + "/*/*/*/*").\n  select("uuid","partitionpath").\n  sort("partitionpath","uuid").\n  show(100, false)\n\nval inserts = convertToStringList(dataGen.generateInserts(10))\nval df = spark.\n  read.json(spark.sparkContext.parallelize(inserts, 2)).\n  filter("partitionpath = \'americas/united_states/san_francisco\'")\ndf.write.format("hudi").\n  options(getQuickstartWriteConfigs).\n  option(OPERATION_OPT_KEY,"insert_overwrite").\n  option(PRECOMBINE_FIELD_OPT_KEY, "ts").\n  option(RECORDKEY_FIELD_OPT_KEY, "uuid").\n  option(PARTITIONPATH_FIELD_OPT_KEY, "partitionpath").\n  option(TABLE_NAME, tableName).\n  mode(Append).\n  save(basePath)\n\n// Should have different keys now for San Francisco alone, from query before.\nspark.\n  read.format("hudi").\n  load(basePath + "/*/*/*/*").\n  select("uuid","partitionpath").\n  sort("partitionpath","uuid").\n  show(100, false)\n')),(0,r.kt)("h2",{id:"where-to-go-from-here"},"Where to go from here?"),(0,r.kt)("p",null,"You can also do the quickstart by ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi#building-apache-hudi-from-source"},"building hudi yourself"),",\nand using ",(0,r.kt)("inlineCode",{parentName:"p"},"--jars <path to hudi_code>/packaging/hudi-spark-bundle/target/hudi-spark-bundle_2.1?-*.*.*-SNAPSHOT.jar")," in the spark-shell command above\ninstead of ",(0,r.kt)("inlineCode",{parentName:"p"},"--packages org.apache.hudi:hudi-spark3-bundle_2.12:0.8.0"),". Hudi also supports scala 2.12. Refer ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi#build-with-scala-212"},"build with scala 2.12"),"\nfor more info."),(0,r.kt)("p",null,"Also, we used Spark here to show case the capabilities of Hudi. However, Hudi can support multiple table types/query types and\nHudi tables can be queried from query engines like Hive, Spark, Presto and much more. We have put together a\n",(0,r.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=VhNgUsxdrD0"},"demo video")," that show cases all of this on a docker based setup with all\ndependent systems running locally. We recommend you replicate the same setup and run the demo yourself, by following\nsteps ",(0,r.kt)("a",{parentName:"p",href:"/docs/docker_demo"},"here")," to get a taste for it. Also, if you are looking for ways to migrate your existing data\nto Hudi, refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/migration_guide"},"migration guide"),"."))}m.isMDXComponent=!0},86010:function(e,a,t){function n(e){var a,t,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(a=0;a<e.length;a++)e[a]&&(t=n(e[a]))&&(i&&(i+=" "),i+=t);else for(a in e)e[a]&&(i&&(i+=" "),i+=a);return i}function i(){for(var e,a,t=0,i="";t<arguments.length;)(e=arguments[t++])&&(a=n(e))&&(i&&(i+=" "),i+=a);return i}t.d(a,{Z:function(){return i}})}}]);