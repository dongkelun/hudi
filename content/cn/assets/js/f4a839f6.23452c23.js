"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[7992],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return m}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(a),m=i,g=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return a?n.createElement(g,r(r({ref:t},d),{},{components:a})):n.createElement(g,r({ref:t},d))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},59807:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return c}});var n=a(87462),i=a(63366),o=(a(67294),a(3905)),r=["components"],l={title:"Ingest multiple tables using Hudi",excerpt:"Ingesting multiple tables using Hudi at a single go is now possible. This blog gives a detailed explanation of how to achieve the same using `HoodieMultiTableDeltaStreamer.java`",author:"pratyakshsharma",category:"blog"},s=void 0,p={permalink:"/cn/blog/2020/08/22/ingest-multiple-tables-using-hudi",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-08-22-ingest-multiple-tables-using-hudi.md",source:"@site/blog/2020-08-22-ingest-multiple-tables-using-hudi.md",title:"Ingest multiple tables using Hudi",description:"When building a change data capture pipeline for already existing or newly created relational databases, one of the most common problems that one faces is simplifying the onboarding process for multiple tables. Ingesting multiple tables to Hudi dataset at a single go is now possible using HoodieMultiTableDeltaStreamer class which is a wrapper on top of the more popular HoodieDeltaStreamer class. Currently HoodieMultiTableDeltaStreamer supports COPY_ON_WRITE storage type only and the ingestion is done in a sequential way.",date:"2020-08-22T00:00:00.000Z",formattedDate:"August 22, 2020",tags:[],readingTime:2.67,truncated:!0,prevItem:{title:"How nClouds Helps Accelerate Data Delivery with Apache Hudi on Amazon EMR",permalink:"/cn/blog/2020/10/06/cdc-solution-using-hudi-by-nclouds"},nextItem:{title:"Async Compaction Deployment Models",permalink:"/cn/blog/2020/08/21/async-compaction-deployment-model"}},d=[{value:"Configuration",id:"configuration",children:[]},{value:"Run Command",id:"run-command",children:[]},{value:"Example",id:"example",children:[]}],u={toc:d};function c(e){var t=e.components,a=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"When building a change data capture pipeline for already existing or newly created relational databases, one of the most common problems that one faces is simplifying the onboarding process for multiple tables. Ingesting multiple tables to Hudi dataset at a single go is now possible using ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieMultiTableDeltaStreamer")," class which is a wrapper on top of the more popular ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieDeltaStreamer")," class. Currently ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieMultiTableDeltaStreamer")," supports ",(0,o.kt)("strong",{parentName:"p"},"COPY_ON_WRITE")," storage type only and the ingestion is done in a ",(0,o.kt)("strong",{parentName:"p"},"sequential")," way."),(0,o.kt)("p",null,"This blog will guide you through configuring and running ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieMultiTableDeltaStreamer"),"."),(0,o.kt)("h3",{id:"configuration"},"Configuration"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"HoodieMultiTableDeltaStreamer")," expects users to maintain table wise overridden properties in separate files in a dedicated config folder. Common properties can be configured via common properties file also."),(0,o.kt)("li",{parentName:"ul"},"By default, hudi datasets are created under the path ",(0,o.kt)("inlineCode",{parentName:"li"},"<base-path-prefix>/<database_name>/<name_of_table_to_be_ingested>"),". You need to provide the names of tables to be ingested via the property ",(0,o.kt)("inlineCode",{parentName:"li"},"hoodie.deltastreamer.ingestion.tablesToBeIngested")," in the format ",(0,o.kt)("inlineCode",{parentName:"li"},"<database>.<table>"),", for example ")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.deltastreamer.ingestion.tablesToBeIngested=db1.table1,db2.table2\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"If you do not provide database name, then it is assumed the table belongs to default database and the hudi dataset for the concerned table is created under the path ",(0,o.kt)("inlineCode",{parentName:"li"},"<base-path-prefix>/default/<name_of_table_to_be_ingested>"),". Also there is a provision to override the default path for hudi datasets. You can create hudi dataset for a particular table by setting the property ",(0,o.kt)("inlineCode",{parentName:"li"},"hoodie.deltastreamer.ingestion.targetBasePath")," in table level config file"),(0,o.kt)("li",{parentName:"ul"},"There are a lot of properties that one might like to override per table, for example")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.recordkey.field=_row_key\nhoodie.datasource.write.partitionpath.field=created_at\nhoodie.deltastreamer.source.kafka.topic=topic2\nhoodie.deltastreamer.keygen.timebased.timestamp.type=UNIX_TIMESTAMP\nhoodie.deltastreamer.keygen.timebased.input.dateformat=yyyy-MM-dd HH:mm:ss.S\nhoodie.datasource.hive_sync.table=short_trip_uber_hive_dummy_table\nhoodie.deltastreamer.ingestion.targetBasePath=s3:///temp/hudi/table1\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Properties like above need to be set for every table to be ingested. As already suggested at the beginning, users are expected to maintain separate config files for every table by setting the below property")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.deltastreamer.ingestion.<db>.<table>.configFile=s3:///tmp/config/config1.properties\n")),(0,o.kt)("p",null,"If you do not want to set the above property for every table, you can simply create config files for every table to be ingested under the config folder with the name - ",(0,o.kt)("inlineCode",{parentName:"p"},"<database>_<table>_config.properties"),". For example if you want to ingest table1 and table2 from dummy database, where config folder is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"s3:///tmp/config"),", then you need to create 2 config files on the given paths - ",(0,o.kt)("inlineCode",{parentName:"p"},"s3:///tmp/config/dummy_table1_config.properties")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"s3:///tmp/config/dummy_table2_config.properties"),"."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Finally you can specify all the common properties in a common properties file. Common properties file does not necessarily have to lie under config folder but it is advised to keep it along with other config files. This file will contain the below properties")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.deltastreamer.ingestion.tablesToBeIngested=db1.table1,db2.table2\nhoodie.deltastreamer.ingestion.db1.table1.configFile=s3:///tmp/config_table1.properties\nhoodie.deltastreamer.ingestion.db2.table2.configFile=s3:///tmp/config_table2.properties\n")),(0,o.kt)("h3",{id:"run-command"},"Run Command"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"HoodieMultiTableDeltaStreamer")," can be run similar to how one runs ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieDeltaStreamer"),". Please refer to the example given below for the command. "),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("p",null,"Suppose you want to ingest table1 and table2 from db1 and want to ingest the 2 tables under the path ",(0,o.kt)("inlineCode",{parentName:"p"},"s3:///temp/hudi"),". You can ingest them using the below command"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"[hoodie]$ spark-submit --class org.apache.hudi.utilities.deltastreamer.HoodieMultiTableDeltaStreamer `ls packaging/hudi-utilities-bundle/target/hudi-utilities-bundle-*.jar` \\\n  --props s3:///temp/hudi-ingestion-config/kafka-source.properties \\\n  --config-folder s3:///temp/hudi-ingestion-config \\\n  --schemaprovider-class org.apache.hudi.utilities.schema.SchemaRegistryProvider \\\n  --source-class org.apache.hudi.utilities.sources.AvroKafkaSource \\\n  --source-ordering-field impresssiontime \\\n  --base-path-prefix s3:///temp/hudi \\ \n  --target-table dummy_table \\\n  --op UPSERT\n")),(0,o.kt)("p",null,"s3:///temp/config/kafka-source.properties"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.deltastreamer.ingestion.tablesToBeIngested=db1.table1,db1.table2\nhoodie.deltastreamer.ingestion.db1.table1.configFile=s3:///temp/hudi-ingestion-config/config_table1.properties\nhoodie.deltastreamer.ingestion.db21.table2.configFile=s3:///temp/hudi-ingestion-config/config_table2.properties\n\n#Kafka props\nbootstrap.servers=localhost:9092\nauto.offset.reset=earliest\nschema.registry.url=http://localhost:8081\n\nhoodie.datasource.write.keygenerator.class=org.apache.hudi.keygen.CustomKeyGenerator\n")),(0,o.kt)("p",null,"s3:///temp/hudi-ingestion-config/config_table1.properties"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.recordkey.field=_row_key1\nhoodie.datasource.write.partitionpath.field=created_at\nhoodie.deltastreamer.source.kafka.topic=topic1\n")),(0,o.kt)("p",null,"s3:///temp/hudi-ingestion-config/config_table2.properties"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.recordkey.field=_row_key2\nhoodie.datasource.write.partitionpath.field=created_at\nhoodie.deltastreamer.source.kafka.topic=topic2\n")),(0,o.kt)("p",null,"Contributions are welcome for extending multiple tables ingestion support to ",(0,o.kt)("strong",{parentName:"p"},"MERGE_ON_READ")," storage type and enabling ",(0,o.kt)("inlineCode",{parentName:"p"},"HoodieMultiTableDeltaStreamer")," ingest multiple tables parallely. "),(0,o.kt)("p",null,"Happy ingesting!"))}c.isMDXComponent=!0}}]);