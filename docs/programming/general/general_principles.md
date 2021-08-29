# General principles

- DRY – Don’t Repeat Yourself;
- KISS – Keep It Simple Stupid;
- YAGNI – You Aren’t Gonna Need It;
- TDD – Test Driven Development;
- BDUF – Big Design Up Front;
- SOC – Separation of Concerns;
 
## SOLID Principles
 
### S – Single Responsibility Principle
 
Every function you write should do exactly one thing. It should have one clearly defined goal.
 
### O – Open-Closed Principle
 
Meaning that if someone wants to extend our module’s behavior, they won’t need to modify existing code if they don’t want to.
 
### L – Liskov Substitution Principle
 
Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it. If it looks like a duck, quacks like a duck, but needs 
batteries – you probably have the wrong abstraction.
 
### I – Interface Segregation Principle
 
Interface segregation actually means you shouldn’t create bloated interfaces. The lesson here is whenever you expose a module for outside use, make sure only the bare essentials are 
required and the rest are optional.
 
### D – Dependency Inversion Principle

Dependency Injection is all about handing over control from the function itself to the caller of the function. In our case its defining who controls the type of parameters the function receives.
