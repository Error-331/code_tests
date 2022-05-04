# Domain-Driven Design

Model that focuses on the subject matter (the domain). 

## Commands

- recognize that users have goals and pursue intentions when using software (example: adjust the sales tax rate to comply with the new legal requirements);
- a command is an object that encapsulates a domain intention;
- it has a descriptive name (example: 'Cancel the order'), data and metadata;
- while the data provides the domain details (example: which order is involved), the metadata contains business parameters such as an order ID.\;
- as a rule of thumb, the name of a command consists of an imperative verb(глагол) and a noun(существительное);
- command does not necessarily have to be processed by the application to which the command is sent - it can also be rejected;

## Domain-Events

- describe a fact that happened and cannot be undone (example: order was canceled cannot be undone);
- domain event is similar to a command in that it also has a name, dates, and metadata;
- domain event is similar to a command in that it also has a name, dates, and metadata; 
- the name is often expressed using a past tense noun and verb (example: 'Order canceled');
- a command and a domain event do not necessarily have to be in a 1:1 relationship;
- command can trigger different domain events or different commands cause the same domain event;
- the only decisive factor here is that a command always entails at least one domain event unless it was initially rejected for technical reasons;

## State

- sometimes data is required independent of the command and whose lifespan outlasts that of the (short-lived) command;
- such information forms the 'state' of an application, i.e., it represents the current state of all functional objects;
- commands change the state, and domain events inform about its change; 
- under certain circumstances, however, domain events also occur, although the state has not been changed;
- not changing can also be technically relevant information (example: refusal of a cancellation request);
- an essential requirement of the state is always consistent, reliable, and correct; 
- command must therefore be atomic, maintain consistency, must not interfere with one another, and must entail permanent changes;
- they, therefore, follow the classic ACID criteria known from **relational databases**;
- it is up to the application to guarantee these criteria in the interaction of commands, domain events, and states;

## Aggregates

- is a shell that encapsulates the functionall/logicall related state with the corresponding commands and domain events, serializes commands if necessary, 
and resolves any conflicts;
- a command always refers to exactly one aggregate;
- there are no aggregate-wide commands;  
- DDD occasionally speaks of aggregates representing a **transactional boundary**;
- large aggregates prevent domain conflicts but damage the application's concurrency since commands may have to be serialized;
- small aggregates promote this concurrency but quickly lead to domain conflicts;
- **aggregates should be as large as necessary but as small as possible**;

