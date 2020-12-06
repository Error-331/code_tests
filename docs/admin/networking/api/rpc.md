# RPC (Remote Procedure Calls)

## General

- Programming model built on top of request-response network protocols;
- In the client, the objects that expose these procedures are called stubs;
- When application code invokes a procedure on a stub, the stub translates the arguments into bytes and then sends a request to the server, the contents of which are the serialized arguments;
- In the server, the objects that expose these procedures are service implementations; 
- The server machinery receives the request, translates the bytes back into procedure arguments, and then invokes a procedure on the service implementation; 

## RPC systems

- The networking aspect of the technology is abstracted away from application code;

- There is a way to define the interfaces as the names and signatures of the procedures that can be invoked along with the data types that are exchanged as arguments and return values;
 
- For RPC systems that are language-agnostic (e.g. can be used with multiple programming languages), the interface is typically defined in an Interface Definition Language;

- The RPC systems often include code generation tools for transforming the interface descriptions into usable libraries;

- Unlike REST, these systems typically do not expose all of the flexibility of HTTP;

- Some eschew HTTP completely, opting for a custombinary TCP protocol;

- Those that do use HTTP as a transport tend to have rigid conventions for mapping RPCs to HTTP requests;
