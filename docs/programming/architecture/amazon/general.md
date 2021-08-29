SQS - for queuing
SNS - form messaging
Kinesis - for streams

# SQS (simple queues service)

- buffer messages from producer(s)
- multiple consumers for each queues
- Single consumer for each message
- Resilient to errors - if processing fails, the message becomes available again in the queue
  
## FIFO queues

- Buffer messages from procuder(s)
- Multiple consumers for each queue
- Single consumer for each message
- Guarantees first in, first out ordering
- Supports ordering within the queue using message groups
- Resilient to errors - if processing fails, the message becomes available again in the queue

SNS (simple notification service)

- Buffers messages from producer(s)
- Multiple consumers for each topic (more than 10 000 000 subscribers)
- Multiple consumers for each message
- Error resilience requires more work on the client

Kinesis

- Biffers messages from producer(s)
- Multiple consumers for each topic
- Multiple consumers for each message
- Ordering is guaranteed
- Resilience to errors
- Full replay is possible by resetting stream to a point in time

Start for Lambda - end with Fargate

Fargate - for containers

Lambda Limits

- Execution time cap: 15 minutes;
- 3,008 MB RAM limit;
- Some triggering differences between AWS Lambda and Fargate;


- Serverless or containers
- Containers are flexible, but are more heavyweight


If we use S3 'put object' event - no control of the processing order (one entity can be processed and stored before the first one)
fifo guaranties message order

Lambda function cannot be triggered from the FIFO queue (lambda based implementation) - need a long running process

Lambda

Reserve concurrency - better to use 10 and not more than 20

S3

data partitioning - important

time partitioning - good

Save raw data as close to the origin as possible.

if complex, save intermediate transformations as well.



serverless 


Serverless microservices should be designed to do one thing well

Think what should run sequentially and what should run in parallel

typical lambda (example 1)

- Step function checks training progress
- Can be checked once a minute
- Loop ends when training is complete
- Step function invokes Lambda function
-- Deploys new model
-- Can bs used live
  

- Sagemaker

Sagemaker classifier
- Linear learner
- XGBoost