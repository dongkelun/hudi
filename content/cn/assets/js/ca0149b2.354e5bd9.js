"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[8450],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,g=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?o.createElement(g,i(i({ref:t},l),{},{components:n})):o.createElement(g,i({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},72989:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return l},default:function(){return m}});var o=n(87462),r=n(63366),a=(n(67294),n(3905)),i=["components"],c={title:"Async Compaction Deployment Models",excerpt:"Mechanisms for executing compaction jobs in Hudi asynchronously",author:"vbalaji",category:"blog"},s=void 0,p={permalink:"/cn/blog/2020/08/21/async-compaction-deployment-model",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-08-21-async-compaction-deployment-model.md",source:"@site/blog/2020-08-21-async-compaction-deployment-model.md",title:"Async Compaction Deployment Models",description:"We will look at different deployment models for executing compactions asynchronously.",date:"2020-08-21T00:00:00.000Z",formattedDate:"August 21, 2020",tags:[],readingTime:1.925,truncated:!0,prevItem:{title:"Ingest multiple tables using Hudi",permalink:"/cn/blog/2020/08/22/ingest-multiple-tables-using-hudi"},nextItem:{title:"Efficient Migration of Large Parquet Tables to Apache Hudi",permalink:"/cn/blog/2020/08/20/efficient-migration-of-large-parquet-tables"}},l=[{value:"Spark Structured Streaming",id:"spark-structured-streaming",children:[]},{value:"DeltaStreamer Continuous Mode",id:"deltastreamer-continuous-mode",children:[]},{value:"Hudi CLI",id:"hudi-cli",children:[]},{value:"Hudi Compactor Script",id:"hudi-compactor-script",children:[]}],u={toc:l};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"We will look at different deployment models for executing compactions asynchronously."),(0,a.kt)("h1",{id:"compaction"},"Compaction"),(0,a.kt)("p",null,"For Merge-On-Read table, data is stored using a combination of columnar (e.g parquet) + row based (e.g avro) file formats.\nUpdates are logged to delta files & later compacted to produce new versions of columnar files synchronously or\nasynchronously. One of th main motivations behind Merge-On-Read is to reduce data latency when ingesting records.\nHence, it makes sense to run compaction asynchronously without blocking ingestion."),(0,a.kt)("h1",{id:"async-compaction"},"Async Compaction"),(0,a.kt)("p",null,"Async Compaction is performed in 2 steps:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("em",{parentName:"strong"},"Compaction Scheduling")),": This is done by the ingestion job. In this step, Hudi scans the partitions and selects ",(0,a.kt)("strong",{parentName:"li"},"file\nslices")," to be compacted. A compaction plan is finally written to Hudi timeline."),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("em",{parentName:"strong"},"Compaction Execution")),": A separate process reads the compaction plan and performs compaction of file slices.")),(0,a.kt)("h1",{id:"deployment-models"},"Deployment Models"),(0,a.kt)("p",null,"There are few ways by which we can execute compactions asynchronously. "),(0,a.kt)("h2",{id:"spark-structured-streaming"},"Spark Structured Streaming"),(0,a.kt)("p",null,"With 0.6.0, we now have support for running async compactions in Spark\nStructured Streaming jobs. Compactions are scheduled and executed asynchronously inside the\nstreaming job.  Async Compactions are enabled by default for structured streaming jobs\non Merge-On-Read table."),(0,a.kt)("p",null,"Here is an example snippet in java"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},'import org.apache.hudi.DataSourceWriteOptions;\nimport org.apache.hudi.HoodieDataSourceHelpers;\nimport org.apache.hudi.config.HoodieCompactionConfig;\nimport org.apache.hudi.config.HoodieWriteConfig;\n\nimport org.apache.spark.sql.streaming.OutputMode;\nimport org.apache.spark.sql.streaming.ProcessingTime;\n\n\n DataStreamWriter<Row> writer = streamingInput.writeStream().format("org.apache.hudi")\n        .option(DataSourceWriteOptions.OPERATION_OPT_KEY(), operationType)\n        .option(DataSourceWriteOptions.TABLE_TYPE_OPT_KEY(), tableType)\n        .option(DataSourceWriteOptions.RECORDKEY_FIELD_OPT_KEY(), "_row_key")\n        .option(DataSourceWriteOptions.PARTITIONPATH_FIELD_OPT_KEY(), "partition")\n        .option(DataSourceWriteOptions.PRECOMBINE_FIELD_OPT_KEY(), "timestamp")\n        .option(HoodieCompactionConfig.INLINE_COMPACT_NUM_DELTA_COMMITS_PROP, "10")\n        .option(DataSourceWriteOptions.ASYNC_COMPACT_ENABLE_OPT_KEY(), "true")\n        .option(HoodieWriteConfig.TABLE_NAME, tableName).option("checkpointLocation", checkpointLocation)\n        .outputMode(OutputMode.Append());\n writer.trigger(new ProcessingTime(30000)).start(tablePath);\n')),(0,a.kt)("h2",{id:"deltastreamer-continuous-mode"},"DeltaStreamer Continuous Mode"),(0,a.kt)("p",null,"Hudi DeltaStreamer provides continuous ingestion mode where a single long running spark application",(0,a.kt)("br",{parentName:"p"}),"\n","ingests data to Hudi table continuously from upstream sources. In this mode, Hudi supports managing asynchronous\ncompactions. Here is an example snippet for running in continuous mode with async compactions"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},"spark-submit --packages org.apache.hudi:hudi-utilities-bundle_2.11:0.6.0 \\\n--class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer \\\n--table-type MERGE_ON_READ \\\n--target-base-path <hudi_base_path> \\\n--target-table <hudi_table> \\\n--source-class org.apache.hudi.utilities.sources.JsonDFSSource \\\n--source-ordering-field ts \\\n--schemaprovider-class org.apache.hudi.utilities.schema.FilebasedSchemaProvider \\\n--props /path/to/source.properties \\\n--continous\n")),(0,a.kt)("h2",{id:"hudi-cli"},"Hudi CLI"),(0,a.kt)("p",null,"Hudi CLI is yet another way to execute specific compactions asynchronously. Here is an example "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},"hudi:trips->compaction run --tableName <table_name> --parallelism <parallelism> --compactionInstant <InstantTime>\n...\n")),(0,a.kt)("h2",{id:"hudi-compactor-script"},"Hudi Compactor Script"),(0,a.kt)("p",null,"Hudi provides a standalone tool to also execute specific compactions asynchronously. Here is an example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},"spark-submit --packages org.apache.hudi:hudi-utilities-bundle_2.11:0.6.0 \\\n--class org.apache.hudi.utilities.HoodieCompactor \\\n--base-path <base_path> \\\n--table-name <table_name> \\\n--instant-time <compaction_instant> \\\n--schema-file <schema_file>\n")))}m.isMDXComponent=!0}}]);