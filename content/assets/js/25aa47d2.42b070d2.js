"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[1299],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return p}});var i=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)a=o[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=i.createContext({}),d=function(e){var t=i.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},u=function(e){var t=d(e.components);return i.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=d(a),p=n,g=h["".concat(l,".").concat(p)]||h[p]||c[p]||o;return a?i.createElement(g,r(r({ref:t},u),{},{components:a})):i.createElement(g,r({ref:t},u))}));function p(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,r=new Array(o);r[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,r[1]=s;for(var d=2;d<o;d++)r[d]=a[d];return i.createElement.apply(null,r)}return i.createElement.apply(null,a)}h.displayName="MDXCreateElement"},22949:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return d},toc:function(){return u},default:function(){return h}});var i=a(87462),n=a(63366),o=(a(67294),a(3905)),r=["components"],s={title:"Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",excerpt:"How T3Go\u2019s high-performance data lake using Apache Hudi and Alluxio shortened the time for data ingestion into the lake by up to a factor of 2. Data analysts using Presto, Hudi, and Alluxio in conjunction to query data on the lake saw queries speed up by 10 times faster.",author:"t3go",category:"blog"},l="Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",d={permalink:"/blog/2020/12/01/high-perf-data-lake-with-hudi-and-alluxio-t3go",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-12-01-high-perf-data-lake-with-hudi-and-alluxio-t3go.md",source:"@site/blog/2020-12-01-high-perf-data-lake-with-hudi-and-alluxio-t3go.md",title:"Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",description:"T3Go  is China\u2019s first platform for smart travel based on the Internet of Vehicles. In this article, Trevor Zhang and Vino Yang from T3Go describe the evolution of their data lake architecture, built on cloud-native or open-source technologies including Alibaba OSS, Apache Hudi, and Alluxio. Today, their data lake stores petabytes of data, supporting hundreds of pipelines and tens of thousands of tasks daily. It is essential for business units at T3Go including Data Warehouse, Internet of Vehicles, Order Dispatching, Machine Learning, and self-service query analysis.",date:"2020-12-01T00:00:00.000Z",formattedDate:"December 1, 2020",tags:[],readingTime:7.915,truncated:!0,prevItem:{title:"Optimize Data lake layout using Clustering in Apache Hudi",permalink:"/blog/2021/01/27/hudi-clustering-intro"},nextItem:{title:"Employing the right indexes for fast updates, deletes in Apache Hudi",permalink:"/blog/2020/11/11/hudi-indexing-mechanisms"}},u=[{value:"Enable Near real time data ingestion and analysis",id:"enable-near-real-time-data-ingestion-and-analysis",children:[]},{value:"Enable Incremental processing pipeline",id:"enable-incremental-processing-pipeline",children:[]},{value:"Accessing Data using Hudi as a unified format",id:"accessing-data-using-hudi-as-a-unified-format",children:[]},{value:"Data lake ingestion",id:"data-lake-ingestion",children:[]},{value:"Data analysis on the lake",id:"data-analysis-on-the-lake",children:[]},{value:"Concurrent accesses across multiple storage systems",id:"concurrent-accesses-across-multiple-storage-systems",children:[]},{value:"Microbenchmark",id:"microbenchmark",children:[]}],c={toc:u};function h(e){var t=e.components,s=(0,n.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.t3go.cn/"},"T3Go"),"  is China\u2019s first platform for smart travel based on the Internet of Vehicles. In this article, Trevor Zhang and Vino Yang from T3Go describe the evolution of their data lake architecture, built on cloud-native or open-source technologies including Alibaba OSS, Apache Hudi, and Alluxio. Today, their data lake stores petabytes of data, supporting hundreds of pipelines and tens of thousands of tasks daily. It is essential for business units at T3Go including Data Warehouse, Internet of Vehicles, Order Dispatching, Machine Learning, and self-service query analysis."),(0,o.kt)("p",null,"In this blog, you will see how we slashed data ingestion time by half using Hudi and Alluxio. Furthermore, data analysts using Presto, Hudi, and Alluxio saw the queries speed up by 10 times. We built our data lake based on data orchestration for multiple stages of our data pipeline, including ingestion and analytics."),(0,o.kt)("h1",{id:"i-t3go-data-lake-overview"},"I. T3Go data lake Overview"),(0,o.kt)("p",null,"Prior to the data lake, different business units within T3Go managed their own data processing solutions, utilizing different storage systems, ETL tools, and data processing frameworks. Data for each became siloed from every other unit, significantly increasing cost and complexity. Due to the rapid business expansion of T3Go, this inefficiency became our engineering bottleneck."),(0,o.kt)("p",null,"We moved to a unified data lake solution based on Alibaba OSS, an object store similar to AWS S3, to provide a centralized location to store structured and unstructured data, following the design principles of  ",(0,o.kt)("em",{parentName:"p"},"Multi-cluster Shared-data Architecture"),"; all the applications access OSS storage as the source of truth, as opposed to different data silos. This architecture allows us to store the data as-is, without having to first structure the data, and run different types of analytics to guide better decisions, building dashboards and visualizations from big data processing, real-time analytics, and machine learning."),(0,o.kt)("h1",{id:"ii-efficient-near-real-time-analytics-using-hudi"},"II. Efficient Near Real-time Analytics Using Hudi"),(0,o.kt)("p",null,"Our business in smart travel drives the need to process and analyze data in a near real-time manner. With a traditional data warehouse, we faced the following challenges:  "),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"High overhead when updating due to long-tail latency"),(0,o.kt)("li",{parentName:"ol"},"High cost of order analysis due to the long window of a business session"),(0,o.kt)("li",{parentName:"ol"},"Reduced query accuracy due to late or ad-hoc updates"),(0,o.kt)("li",{parentName:"ol"},"Unreliability in data ingestion pipeline"),(0,o.kt)("li",{parentName:"ol"},"Data lost in the distributed data pipeline that cannot be reconciled"),(0,o.kt)("li",{parentName:"ol"},"High latency to access data storage")),(0,o.kt)("p",null,"As a result, we adopted Apache Hudi on top of OSS to address these issues. The following diagram outlines the architecture:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"architecture",src:a(1851).Z})),(0,o.kt)("h2",{id:"enable-near-real-time-data-ingestion-and-analysis"},"Enable Near real time data ingestion and analysis"),(0,o.kt)("p",null,"With Hudi, our data lake supports multiple data sources including Kafka, MySQL binlog, GIS, and other business logs in near real time. As a result, more than 60% of the company\u2019s data is stored in the data lake and this proportion continues to increase."),(0,o.kt)("p",null,"We are also able to speed up the data ingestion time down to a few minutes by introducing Apache Hudi into the data pipeline. Combined with big data interactive query and analysis framework such as Presto and SparkSQL, real-time data analysis and insights are achieved."),(0,o.kt)("h2",{id:"enable-incremental-processing-pipeline"},"Enable Incremental processing pipeline"),(0,o.kt)("p",null,"With the help of Hudi, it is possible to provide incremental changes to the downstream derived table when the upstream table updates frequently. Even with a large number of interdependent tables, we can quickly run partial data updates. This also effectively avoids updating the full partitions of cold tables in the traditional Hive data warehouse."),(0,o.kt)("h2",{id:"accessing-data-using-hudi-as-a-unified-format"},"Accessing Data using Hudi as a unified format"),(0,o.kt)("p",null,"Traditional data warehouses often deploy Hadoop to store data and provide batch analysis. Kafka is used separately to distribute Hadoop data to other data processing frameworks, resulting in duplicated data. Hudi helps effectively solve this problem; we always use Spark pipelines to insert new updates into the Hudi tables, then incrementally read the update of Hudi tables. In other words, Hudi tables are used as the unified storage format to access data."),(0,o.kt)("h1",{id:"iii-efficient-data-caching-using-alluxio"},"III. Efficient Data Caching Using Alluxio"),(0,o.kt)("p",null,"In the early version of our data lake without Alluxio, data received from Kafka in real time is processed by Spark and then written to OSS data lake using Hudi DeltaStreamer tasks. With this architecture, Spark often suffered high network latency when writing to OSS directly. Since all data is in OSS storage, OLAP queries on Hudi data may also be slow due to lack of data locality."),(0,o.kt)("p",null,"To address the latency issue, we deployed Alluxio as a data orchestration layer, co-located with computing engines such as Spark and Presto, and used Alluxio to accelerate read and write on the data lake as shown in the following diagram:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"architecture-alluxio",src:a(17209).Z})),(0,o.kt)("p",null,"Data in formats such as Hudi, Parquet, ORC, and JSON are stored mostly on OSS, consisting of 95% of the data. Computing engines such as Flink, Spark, Kylin, and Presto are deployed in isolated clusters respectively. When each engine accesses OSS, Alluxio acts as a virtual distributed storage system to accelerate data, being co-located with each of the computing clusters."),(0,o.kt)("p",null,"Specifically, here are a few applications leveraging Alluxio in the T3Go data lake."),(0,o.kt)("h2",{id:"data-lake-ingestion"},"Data lake ingestion"),(0,o.kt)("p",null,"We mount the corresponding OSS path to the Alluxio file system and set Hudi\u2019s  ",(0,o.kt)("em",{parentName:"p"},"\u201c",(0,o.kt)("strong",{parentName:"em"},"target-base-path"),"\u201d"),"  parameter value to use the alluxio:// scheme in place of oss:// scheme. Spark pipelines with Hudi continuously ingest data to Alluxio. After data is written to Alluxio, it is asynchronously persisted from the Alluxio cache to the remote OSS every minute. These modifications allow Spark to write to a local Alluxio node instead of writing to remote OSS, significantly reducing the time for the data to be available in data lake after ingestion."),(0,o.kt)("h2",{id:"data-analysis-on-the-lake"},"Data analysis on the lake"),(0,o.kt)("p",null,"We use Presto as an ad-hoc query engine to analyze the Hudi tables in the lake, co-locating Alluxio workers on each Presto worker node. When Presto and Alluxio services are co-located and running, Alluxio caches the input data locally in the Presto worker which greatly benefits Presto for subsequent retrievals. On a cache hit, Presto can read from the local Alluxio worker storage at memory speed without any additional data transfer over the network."),(0,o.kt)("h2",{id:"concurrent-accesses-across-multiple-storage-systems"},"Concurrent accesses across multiple storage systems"),(0,o.kt)("p",null,"In order to ensure the accuracy of training samples, our machine learning team often synchronizes desensitized data in production to an offline machine learning environment. During synchronization, the data flows across multiple file systems, from production OSS to an offline HDFS followed by another offline Machine Learning HDFS."),(0,o.kt)("p",null,"This data migration process is not only inefficient but also error-prune for modelers because multiple different storages with varying configurations are involved. Alluxio helps in this specific scenario by mounting the destination storage systems under the same filesystem to be accessed by their corresponding logical paths in Alluxio namespace. By decoupling the physical storage, this allows applications with different APIs to access and transfer data seamlessly. This data access layout also improves performance."),(0,o.kt)("h2",{id:"microbenchmark"},"Microbenchmark"),(0,o.kt)("p",null,"Overall, we observed the following improvements with Alluxio:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"It supports a hierarchical and transparent caching mechanism"),(0,o.kt)("li",{parentName:"ol"},"It supports cache promote omode mode when reading"),(0,o.kt)("li",{parentName:"ol"},"It supports asynchronous writing mode"),(0,o.kt)("li",{parentName:"ol"},"It supports LRU recycling strategy"),(0,o.kt)("li",{parentName:"ol"},"It has pin and TTL features")),(0,o.kt)("p",null,"After comparison and verification, we choose to use Spark SQL as the query engine. Our performance testing queries the Hudi table, comparing Alluxio + OSS together against OSS directly as well as HDFS."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"microbench",src:a(77849).Z})),(0,o.kt)("p",null,"In the stress test shown above, after the data volume is greater than a certain magnitude (2400W), the query speed using Alluxio+OSS surpasses the HDFS query speed of the hybrid deployment. After the data volume is greater than 1E, the query speed starts to double. After reaching 6E data, it is up to 12 times higher than querying native OSS and 8 times higher than querying native HDFS. The improvement depends on the machine configuration."),(0,o.kt)("p",null,"Based on our performance benchmarking, we found that the performance can be improved by over 10 times with the help of Alluxio. Furthermore, the larger the data scale, the more prominent the performance improvement."),(0,o.kt)("h1",{id:"iv-next-step"},"IV. Next Step"),(0,o.kt)("p",null,"As T3Go\u2019s data lake ecosystem expands, we will continue facing the critical scenario of compute and storage segregation. With T3Go\u2019s growing data processing needs, our team plans to deploy Alluxio on a larger scale to accelerate our data lake storage."),(0,o.kt)("p",null,"In addition to the deployment of Alluxio on the data lake computing engine, which currently is mainly SparkSQL, we plan to add a layer of Alluxio to the OLAP cluster using Apache Kylin and an ad_hoc cluster using Presto. The goal is to have Alluxio cover all computing scenarios, with Alluxio interconnected between each scene to improve the read and write efficiency of the data lake and the surrounding lake ecology."),(0,o.kt)("h1",{id:"v-conclusion"},"V. Conclusion"),(0,o.kt)("p",null,"As mentioned earlier, Hudi and Alluxio covers all scenarios of Hudi\u2019s near real-time ingestion, near real-time analysis, incremental processing, and data distribution on DFS, among many others, and plays the role of a powerful accelerator on data ingestion and data analysis on the lake. With Hudi and Alluxio together,  ",(0,o.kt)("strong",{parentName:"p"},"our R&D engineers shortened the time for data ingestion into the lake by up to a factor of 2. Data analysts using Presto, Hudi, and Alluxio in conjunction to query data on the lake saw their queries speed up by 10 times faster.")," Furthermore, the larger the data scale, the more prominent the performance improvement. Alluxio is an important part of T3Go\u2019s plan to become a leading enterprise data lake in China. We look forward to seeing further integration with Alluxio in T3Go\u2019s data lake ecosystem."))}h.isMDXComponent=!0},17209:function(e,t,a){t.Z=a.p+"assets/images/2020-12-01-t3go-architecture-alluxio-b29648cdbfd10db14fde73b66ec499a5.png"},1851:function(e,t,a){t.Z=a.p+"assets/images/2020-12-01-t3go-architecture-fe954f5964b0aa1c1dbccf7193cd92eb.png"},77849:function(e,t,a){t.Z=a.p+"assets/images/2020-12-01-t3go-microbenchmark-f8bb8b80b32eaedbcc990260459b319b.png"}}]);