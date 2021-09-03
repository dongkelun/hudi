"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[6642],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return m}});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,s=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),u=c(a),m=i,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||s;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=a.length,o=new Array(s);o[0]=u;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:i,o[1]=r;for(var c=2;c<s;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},53803:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return r},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return d},default:function(){return u}});var n=a(87462),i=a(63366),s=(a(67294),a(3905)),o=["components"],r={title:"Building an ExaByte-level Data Lake Using Apache Hudi at ByteDance",excerpt:"Ziyue Guan from Bytedance shares the production experience of building an ExaByte-level data lake using Apache Hudi and how it is used in the recommendation system at Bytedance.",author:"Ziyue Guan, translated to English by yihua",category:"blog"},l=void 0,c={permalink:"/blog/2021/09/01/building-eb-level-data-lake-using-hudi-at-bytedance",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2021-09-01-building-eb-level-data-lake-using-hudi-at-bytedance.md",source:"@site/blog/2021-09-01-building-eb-level-data-lake-using-hudi-at-bytedance.md",title:"Building an ExaByte-level Data Lake Using Apache Hudi at ByteDance",description:"Ziyue Guan from Bytedance shares the experience of building an ExaByte(EB)-level data lake using Apache Hudi at Bytedance.",date:"2021-09-01T00:00:00.000Z",formattedDate:"September 1, 2021",tags:[],readingTime:8.58,truncated:!0,nextItem:{title:"Reliable ingestion from AWS S3 using Hudi",permalink:"/blog/2021/08/23/s3-events-source"}},d=[{value:"Scenario Requirements",id:"scenario-requirements",children:[]},{value:"Design Decisions",id:"design-decisions",children:[]},{value:"Functionality Support",id:"functionality-support",children:[]},{value:"Performance Tuning",id:"performance-tuning",children:[]},{value:"Future Work",id:"future-work",children:[]}],p={toc:d};function u(e){var t=e.components,r=(0,i.Z)(e,o);return(0,s.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Ziyue Guan from Bytedance shares the experience of building an ExaByte(EB)-level data lake using Apache Hudi at Bytedance."),(0,s.kt)("p",null,"This blog is a translated version of ",(0,s.kt)("a",{parentName:"p",href:"https://mp.weixin.qq.com/s/oZz_2HzPCWgzxwZO0nuDUQ"},"the same blog originally in Chinese/\u4e2d\u6587"),".  Here are the ",(0,s.kt)("a",{target:"_blank",href:a(44308).Z},"original slides in Chinese/\u4e2d\u6587")," and ",(0,s.kt)("a",{target:"_blank",href:a(53200).Z},"the translated slides in English"),"."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide1 title",src:a(93832).Z})),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide2 agenda",src:a(25796).Z})),(0,s.kt)("p",null,"Next, I will explain how we use Hudi in Bytedance\u2019s recommendation system in five parts: scenario requirements, design decisions, functionality support, performance tuning, and future work."),(0,s.kt)("h2",{id:"scenario-requirements"},"Scenario Requirements"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide3 scenario requirements",src:a(3895).Z}),"\n",(0,s.kt)("img",{alt:"slide4 scenario diagram",src:a(61982).Z}),"\n",(0,s.kt)("img",{alt:"slide5 scenario details",src:a(685).Z})),(0,s.kt)("p",null,"In the recommendation system, we use the data lake in the following two scenarios:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"We use BigTable as the data storage for the near real-time processing in the entire system. There is an internally developed component TBase, which provides the semantics of BigTable and the abstraction of some requirements in the search advertisement recommendation scenarios, and shields the differences in underlying storage. For a better understanding, it can be directly regarded as an HBase. In this process, in order to serve offline data analysis and mining needs, the data needs to be exported to offline storage. In the past, users either use MR/Spark to directly access the storage, or obtain data by scanning the database, which do not meet the data access characteristics in the OLAP scenario. Therefore, we build BigTable's CDC based on the data lake to improve data timeliness, reduce the access pressure of the near real-time system, and provide efficient OLAP access and user-friendly SQL consumption methods.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"In addition, we also use data lakes in the scenarios of feature engineering and model training. We obtain two types of real-time data streams from internal and external sources. One is the instances returned from the system, which includes the features obtained when the recommendation system is serving. The other is the feedback from event tracking at vantage points and a variety of complex external data sources. This type of data is used as labels and forms a complete machine learning data sample with the previously mentioned features. For this scenario, we need to implement a merging operation based on the primary key to merge the instance and label together.  The time window range may be as long as tens of days, with the volume at the order of hundreds of billions of rows. The system needs to support efficient column selection and predicate pushdown. At the same time, it also needs to support concurrent updates and other related capabilities."))),(0,s.kt)("p",null,"These two scenarios pose the following challenges:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"The data is very irregular.")," Compared with Binlog, WAL cannot obtain all the information of a row, and the data size changes significantly.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"The throughput is relatively large."),"  The throughput of a single table exceeds ",(0,s.kt)("strong",{parentName:"p"},"100 GB/s"),", and the single table needs ",(0,s.kt)("strong",{parentName:"p"},"PB-level")," storage.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"The data schema is complex.")," The data is highly dimensional and sparse.  The number of table columns ranges from 1000 to 10000+. And there are a lot of complex data types."))),(0,s.kt)("h2",{id:"design-decisions"},"Design Decisions"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide6 design decisions",src:a(36788).Z}),"\n",(0,s.kt)("img",{alt:"slide7 design details",src:a(47014).Z})),(0,s.kt)("p",null,"When making the decision on the engine, we examine three of the most popular data lake engines, ",(0,s.kt)("strong",{parentName:"p"},"Hudi"),", ",(0,s.kt)("strong",{parentName:"p"},"Iceberg"),", and ",(0,s.kt)("strong",{parentName:"p"},"DeltaLake"),". These three have their own advantages and disadvantages in our scenarios. Finally, ",(0,s.kt)("strong",{parentName:"p"},"Hudi")," is selected as the storage engine based on Hudi's openness to the upstream and downstream ecosystems, support for the global index, and customized development interfaces for certain storage logic."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"For real-time writing, MOR with better timeliness is selected.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"We examine the index type.  First of all, because WAL can't get the partition of the data each time, it must use a global index. Among several global index implementations, in order to achieve high-performance writing, HBase is the only choice. The other two implementations have major performance gaps from HBase.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"Regarding the computing engine and API, Hudi's support for Flink was not perfect at the time, so we choose Spark which has more mature support. In order to flexibly implement some customized functionality and logic, and because the DataFrame API has more semantic restrictions, we choose the lower-level RDD API."))),(0,s.kt)("h2",{id:"functionality-support"},"Functionality Support"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide8 functionality support",src:a(23909).Z})),(0,s.kt)("p",null,"Functionality support includes MVCC and Schema registration systems that store semantics."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide9 mvcc",src:a(98660).Z})),(0,s.kt)("p",null,"First of all, in order to support WAL write, we implement the payload for MVCC, and based on Avro, we customized a set of data structure implementation with timestamp. This logic is hidden from users through view access. In addition, we also implement the HBase append semantics, which realizes the appending to the List type instead of overwriting."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide10 schema",src:a(36279).Z})),(0,s.kt)("p",null,"Because Hudi obtains the schema from write data, it is not convenient for working with other systems.  We also need some extensions based on the schema, so we build a metadata center to provide metadata-related operations."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"First of all, we realized atomic changes and multi-site high availability based on the semantics provided by internal storage. Users can atomically trigger schema changes through the interface and get the results immediately.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"Achieves versioning of the Schema by adding the version number. After having the version number, we can easily use the schema instead of passing JSON object back and forth. With multiple versions, schema evolution can also be flexibly achieved.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"We also support additional information encoding at the column level to help the business achieve special extended functionality in some scenarios. We replace column names with IDs to save the cost in the storage process.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"When the Spark job with Hudi is running, it builds a local cache at the JVM level and syncs the data with the metadata center through the pull method, to achieve rapid access to the schema and singleton instance of the in-process schema."))),(0,s.kt)("h2",{id:"performance-tuning"},"Performance Tuning"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide11 performance tuning",src:a(73140).Z})),(0,s.kt)("p",null,"In our scenario, the performance challenges are huge. ",(0,s.kt)("strong",{parentName:"p"},"The maximum data volume of a single table reaches 400PB+, the daily volume increase is PB level, and the total data volume reaches EB level.")," Therefore, we have done some work to improve performance based on the performance and data characteristics."),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide12 serialization",src:a(89886).Z})),(0,s.kt)("p",null,"Serialization includes the following optimizations:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"Schema: the cost of data serialization using Avro is very expensive which consumes a lot of compute resources. To address this problem, we first use the singleton schema instance in JVM to avoid CPU-consuming comparison operations during the serialization process.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"By optimizing the payload logic, the number of times of running serialization is reduced.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"With the help of a third-party Avro serialization implementation, the serialization process is compiled into bytecode to improve the speed of SerDe and reduce memory usage. The serialization process has been modified to ensure that our complex schema can also be compiled properly."))),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide13 compaction",src:a(30435).Z})),(0,s.kt)("p",null,"The optimization of the compaction process is as follows."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"In addition to the default Inline/Async compaction options, Hudi also supports flexible deployment of compaction. The characteristics of the compaction job are quite different from the ingestion job. In the same Spark application, it not only is impossible to set targeted settings but also has the problem of insufficient resource flexibility. We first build an independently deployed script so that the compaction job can be triggered and run independently. A low-cost mixed queue is used for resource scheduling for the compaction plan. In addition, we have also developed a compaction strategy based on rules and heuristics. The user's requirement is usually to guarantee a day-level or hour-level SLA, and targeted compression of data in certain partitions, so targeted compression capabilities are provided.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"In order to shorten the time of critical compaction, we usually do compaction in advance to avoid all work being completed in a single compaction job. However, if a FileGroup compacted has a new update, it has to be compacted again. In order to optimize the overall efficiency, we made a heuristic scheduling of when a FileGroup should be compacted based on business logic to reduce additional compaction costs.  The actual benefits of this feature are still being evaluated.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"Finally, we made some process optimizations for the compaction, such as not using WriteStatus's Cache and so on."))),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide14 hdfs sla",src:a(91510).Z})),(0,s.kt)("p",null,"As storage designed for throughput, HDFS has serious real-time write glitches when the cluster usage level is relatively high. Through communication and cooperation with the HDFS team, some improvements have been done."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"First, we replace the original data HSync operation with HFlush to avoid disk I/O write amplification caused by distributed updates.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"We make aggressive pipeline switching settings based on the scenario tuning, and the HDFS team has developed a flexible API that can control the pipeline to achieve flexible configurations in this scenario.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"Finally, the timeliness of real-time writing is ensured through independent I/O isolation of log files."))),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide15 process optimization",src:a(95995).Z})),(0,s.kt)("p",null,"There are also some small performance improvements, process modifications, and bug fixes. If you are interested, feel free to discuss that with me."),(0,s.kt)("h2",{id:"future-work"},"Future Work"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide16 future work",src:a(84343).Z}),"\n",(0,s.kt)("img",{alt:"slide17 future work details",src:a(94834).Z})),(0,s.kt)("p",null,"In the future, we will continue to iterate in the following aspects."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"Productization issues"),": The current way of using APIs and tuning parameters are highly demanding for the users, especially for the tuning, operation, and maintenance, which requires a deep understanding of Hudi principles to complete.  This hinders the promotion of that to users.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"Support issues for ecosystems"),": In our scenario, the technology stack is mainly on Flink, and the use of Flink will be explored in the future. In addition, the applications and environments used in upstream and downstream are complex, which requires cross-language and universal interface implementation. The current binding with Spark is cumbersome.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"Cost and performance issues"),": a common topic, since our scenario is relatively broad, the benefits from optimization are highly considerable.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},(0,s.kt)("strong",{parentName:"p"},"Storage semantics"),": We use Hudi as storage rather than a table format. Therefore, in the future, we plan to expand scenarios using Hudi, and need richer storage semantics.  We'll do more work in this area."))),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"slide19 hiring",src:a(13356).Z})),(0,s.kt)("p",null,"Finally, an advertisement, our recommendation architecture team is responsible for the recommendation architecture design and development for products such as Douyin, Toutiao, and Xigua Video. The challenges are big and the growth is fast. Now we are hiring people and the working locations include: Beijing/Shanghai/Hangzhou/Singapore/Mountain View.  If you are  interested, you are welcomed to add WeChat ",(0,s.kt)("inlineCode",{parentName:"p"},"qinglingcannotfly")," or send your resume to the email: ",(0,s.kt)("inlineCode",{parentName:"p"},"guanziyue.gzy@bytedance.com"),"."))}u.isMDXComponent=!0},44308:function(e,t,a){t.Z=a.p+"assets/files/bytedance-hudi-slides-chinese-697ab94acf090a0dd627bec988d9cc74.pdf"},53200:function(e,t,a){t.Z=a.p+"assets/files/bytedance-hudi-slides-english-878d79120cd12b838418e1815b12d8d6.pdf"},93832:function(e,t,a){t.Z=a.p+"assets/images/slide1-4395683e8b063979208436c3ecdecfbd.png"},36279:function(e,t,a){t.Z=a.p+"assets/images/slide10-698c9a0980df4f61806ae141521a12b0.png"},73140:function(e,t,a){t.Z=a.p+"assets/images/slide11-e6a0a852c7c72494dae31e8a9f95ba74.png"},89886:function(e,t,a){t.Z=a.p+"assets/images/slide12-fee0df68abb2b276bfc5c14f3733f5fc.png"},30435:function(e,t,a){t.Z=a.p+"assets/images/slide13-998b520f6392c9d218febdcb0f87b59f.png"},91510:function(e,t,a){t.Z=a.p+"assets/images/slide14-df2e6e49dd6da70d80a106fb39950575.png"},95995:function(e,t,a){t.Z=a.p+"assets/images/slide15-4340ab9068964e510a89f2bb70ef4adb.png"},84343:function(e,t,a){t.Z=a.p+"assets/images/slide16-358d556fb2c770f517d56ced6a880a66.png"},94834:function(e,t,a){t.Z=a.p+"assets/images/slide17-ae7bfe343dd1d0cd170f2f5d00094dea.png"},13356:function(e,t,a){t.Z=a.p+"assets/images/slide19-787cf360bbd5e0f4cdc06cbf6df16016.png"},25796:function(e,t,a){t.Z=a.p+"assets/images/slide2-33dbf59c0d2ac48489e6e8e0c1918b44.png"},3895:function(e,t,a){t.Z=a.p+"assets/images/slide3-717ff61fa0432142d84c418fc3a73200.png"},61982:function(e,t,a){t.Z=a.p+"assets/images/slide4-4d2f3854977f63b75788213b21518b62.png"},685:function(e,t,a){t.Z=a.p+"assets/images/slide5-63a50a959a8ca1fd6371bafd1765bd0a.png"},36788:function(e,t,a){t.Z=a.p+"assets/images/slide6-dfbac2ecb760185c7c401305c4796192.png"},47014:function(e,t,a){t.Z=a.p+"assets/images/slide7-5941e55407477f2a843749121fd90709.png"},23909:function(e,t,a){t.Z=a.p+"assets/images/slide8-1d407f163ced76b9b0a6a1c3a45ce6d6.png"},98660:function(e,t,a){t.Z=a.p+"assets/images/slide9-92ae2d70a81caf694e03658351410de8.png"}}]);