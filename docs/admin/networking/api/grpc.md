# gRPC

gRPC is a cross-platform RPC system that supports a wide variety of programming languages. It excels at providing high performance and ease of use, to greatly simplify the construction of all types of
distributed systems.

## General

- gRPC uses HTTP/2 as its transport protocol;
- HTTP/2 , aims to be more efficient and more secure;
- gRPC call consists of a client-provided service name and method name, optional request metadata (key-value pairs) and zero or more request messages;
- A call is completed when the server provides optional response header metadata, zero or more response messages, and response trailer metadata. 
- The trailer metadata indicates the final disposition of the call: whether it was a success or a failure;
- A message is just a sequence of zero or more bytes;
- A call may have any number of request and response messages;
- The stub layer is where interface constraints and data types are defined;
- The stub marries the IDL-defined interfaces to a channel (The stub code is generated from the IDL); 
- The channel layer provides the ABI that these generated stubs use;

## Streaming

- Streaming allows a request or response to have an arbitrarily large size;
- Full-duplex support; 

## Performance and Efficiency

- Not verbose as JSON;

## Security

- Uses secure HTTP/2;
- Can use TLS;

## Where to use gRPC

- Microservices ()from medium and large enterprises systems all the way to “web-scale” eCommerce and SaaS offerings);
- Client-Server Applications (desktop or mobile devices); 
- Integrations and APIs;
- Browser-based Web Applications (there are tools for exposing gRPC APIs as REST+JSON, where they can then be easily consumed by browser clients);