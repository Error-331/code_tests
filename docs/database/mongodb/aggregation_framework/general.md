# Aggregation framework


## Ways to explain aggregations 

- running the executionStats variant is the most informative mode; 
- rather than showing just the query planner's thought process, it also provides actual statistics on the winning execution plan (the total keys examined, the total docs examined, etc.); 
- if the source collection is large or the pipeline is suboptimal, it will take a while to return the explain plan result;

QueryPlanner verbosity (default if no verbosity parameter provided):

```javascript

db.coll.explain("queryPlanner").aggregate(pipeline);

```

ExecutionStats verbosity: 

```javascript

db.coll.explain("executionStats").aggregate(pipeline);

```

AllPlansExecution verbosity:

```javascript

db.coll.explain("allPlansExecution").aggregate(pipeline);

```

### Examples

```javascript

db.coll.explain().aggregate([{"$match": {"name": "Jo"}}]);
db.coll.explain().aggregate(pipeline);

```

### Optimizing pipeline performance

- be cognizant of streaming vs blocking stages ordering;
- when executing an aggregation pipeline, the database engine pulls batches of records from the initial query cursor generated against the source collection; 
- the database engine then attempts to stream each batch through the aggregation pipeline stages. 
- for most types of stages, referred to as streaming stages, the database engine will take the processed batch from one stage and immediately stream it into the next part of the pipeline; 
- it will do this without waiting for all the other batches to arrive at the prior stage; 
- *two types of stages must block and wait for all batches to arrive and accumulate together at that stage - blocking stages*; 

Blocking stages: 

- $sort;
- $group (also refers to $bucket, $bucketAuto, $count, $sortByCount, and $facet stages);
- NOTE;

$sort blocking example:
- a pipeline must sort people in ascending order of age; 
- if the stage only sorts each batch's content before passing the batch on to the pipeline's result, only individual batches of output records are sorted by age but not the whole result set;

$group blocking example: 
- a pipeline must group employees by one of two work departments (either the sales or manufacturing department); 
- if the stage only groups employees for a batch, before passing it on, the final result contains the work departments repeated multiple times; 
- each duplicate department consists of some but not all of its employees.
- these often unavoidable blocking stages don't just increase aggregation execution time by reducing concurrency. 
- if used without careful forethought, the throughput and latency of a pipeline will slow dramatically due to significantly increased memory consumption;

#### $sort memory consumption and mitigation

- $sort stage will need to see all the input records at once, and so the host server must have enough capacity to hold all the input data in memory; 
- *amount of memory required depends heavily on the initial data size and the degree to which the prior stages reduced the size*; 
- multiple instances of the aggregation pipeline may be in flight at any one time, in addition to other database workloads; 
- *MongoDB enforces that every blocking stage is limited to 100 MB of consumed RAM (database throws an error if it exceeds this limit)*;
- use `allowDiskUse:true` option to avoid the memory limit obstacle; 
- However, the sacrifice here is significantly higher latency, and the execution time is likely to increase by orders of magnitude.

Approaches to circumvent the excessive memory consumption:

1. Use an index to sort: If the $sort stage does not depend on an $unwind, $group, or $project stage preceding it, move the $sort stage to near the start of the pipeline;
2. Apply a limit to sorting: If user needs the first subset of records from the sorted dataset, add a $limit stage directly after the $sort stage;
3. Reduce the number of records to sort: If options 1 and 2 are not possible, move the $sort stage to as late as possible in the pipeline and ensure earlier stages significantly reduce the number of records. 

#### $group memory consumption and mitigation

- the $group stage has the potential to consume a large amount of memory; 
- the aggregation pipeline's 100 MB RAM limit for blocking stages applies equally to the $group stage because it will potentially pressure the host's memory capacity; 
- as with sorting, the pipeline's allowDiskUse:true option can be used to avoid this limit for heavyweight grouping operations (with performance downsides);
- considerably reduced result data sets are produced, requiring far less processing memory than a $sort stage;

Approaches to circumvent the excessive memory consumption:

1. Avoid unnecessary grouping: avoid unwinding and regrouping documents just to process each array's elements, covers this recommendation in far greater detail;
2. Group summary data only: use the group stage to accumulate things such as totals, counts, and summary roll-ups only, rather than holding all the raw data of each record belonging to a group (use operators like); 
3. Make use of accumulator operators: $addToSet, $first, $last, $max, and $count;

### Avoid unwinding and regrouping documents just to process each array's elements