# SOAP

Abstract SOAP representation:

```xml

<SOAP_envelope>
    <SOAP_header>
        <SOAP_header_block/>
        <SOAP_header_block/>
    </SOAP_header>
    
    <SOAP_body>
        <SOAP_message_body/>
    </SOAP_body>
</SOAP_envelope>

```

SOAP message example:

```xml

<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
    <s:Header>
        <m:transaction xmlns:m="soap-transaction" s:mustUnderstand="true">
            <transactionID>1234</transactionID>
        </m:transaction>
    </s:Header>
    
    <s:Body>
        <n:purchaseOrder xmlns:n="urn:OrderService">
            <from>
                <person>Christopher Robin</person>
                <dept>Accounting</dept>
            </from>
            
            <to>
                <person>Pooh Bear</person>
                <dept>Honey</dept>
            </to>
            
            <order>
                <quantity>1</quantity>
                <item>Pooh Stick</item>
            </order>
            
        </n:purchaseOrder>
    </s:Body>
</s:Envelope>

```

RPC-style SOAP message example:

```xml

<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
    <s:Header>
        <m:transaction xmlns:m="soap-transaction" s:mustUnderstand="true">
            <transactionID>1234</transactionID>
        </m:transaction>
    </s:Header>
    
    <s:Body>
        <n:getQuote xmlns:n="urn:QuoteService">
            <symbol xsi:type="xsd:string">
                IBM
            </symbol>
        </n:getQuote>
    </s:Body>
</s:Envelope>

```

SOAP response message example:

```xml

<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
    <s:Body>
        <n:getQuoteRespone xmlns:n="urn:QuoteService">
            <value xsi:type="xsd:float">
                98.06
            </value>
        </n:getQuoteResponse>
    </s:Body>
</s:Envelope>

```

## Structure

### Envelopes

- Envelope that contains a Header element - must contain no more than one;

### mustUnderstand Attribute

#### Entire message

- recipient must understand how to process that message;
- if the recipient does not understand the message, the recipient must reject the message and explain the problem to the sender;

#### Header block

- if the sender wants to require that the recipient understand a particular block it should add `mustUnderstand="true"` attribute to the header block;
- if recipient does not understand the block to which it is attached, the recipient must reject the entire message;

### Versioning

- If a SOAP Version 1.1 compliant application receives a SOAP Version 1.2 message, a "version mismatch" error will be triggered;
- If a SOAP Version 1.2 compliant application receives a SOAP Version 1.1 message, the application may choose to either process it or throw an error;

Version 1.1 namespace: `http://schemas.xmlsoap.org/soap/envelope/`;
Version 1.2 namespace: `http://www.w3.org/2001/06/soap-envelope`;

Version 1.1 envelope example:

```xml

<!-- Version 1.1 SOAP Envelope -->
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
...
</s:Envelope>

```

```xml

<!-- Version 1.2 SOAP Envelope -->
<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
    ...
</s:Envelope>

```
When applications report a version mismatch error back to the sender of the message, it may  optionally include an Upgrade header block that tells the sender which 
version of SOAP it supports:

```xml

<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <V:Upgrade xmlns:V="http://www.w3.org/2001/06/soap-upgrade">
            <envelope qname="ns1:Envelope" xmlns:ns1="http://www.w3.org/2001/06/soap-envelope"/>
        </V:Upgrade>
    </s:Header>
    
    <s:Body>
        <s:Fault>
            <faultcode>s:VersionMismatch</faultcode>
            <faultstring>Version Mismatch</faultstring>
        </s:Fault>
    </s:Body>
</s:Envelope>

```

## Faults

Is a special type of message that describes errors occurred during communication process:

```xml

<s:Envelope xmlns:s="...">
    <s:Body>
        <s:Fault>
            <faultcode>Client.Authentication</faultcode>
            <faultstring>
                Invalid credentials
            </faultstring>
            <faultactor>http://acme.com</faultactor>
            <details>
                <!-- application specific details -->
            </details>
        </s:Fault>
    </s:Body>
</s:Envelope>

```

- **faultcode** - type of error that occurred, the value must be an XML Qualified Name (code defined within a XML namespace);
- **faultstring** - a human-readable explanation of the error;
- **faultactor** - the unique identifier of the message processing node at which the error occurred;
- **details** - details about the error that occurred;

### Standard Fault Codes

- **VersionMismatch** - invalid namespace for the SOAP Envelope element;
- **MustUnderstand** - a Header block contained a `mustUnderstand="true`" flag that was not understood by the message recipien;.
- **Server** - internal server error;
- **Client** - there is a problem in the message (for example, the message contains invalid authentication credentials);

### MustUnderstand Faults

- the SOAP fault structure is not allowed to express any information about which headers were not understood; 
- the `details` element would is reserved for the purpose of expressing error information related to the processing of the `body`;
- the SOAP Version 1.2 specification defines a standard `Misunderstood` header block;
- `Misunderstood` header block is optional, which makes it unreliable

Misunderstood header block:

```xml

<s:Envelope xmlns:s="...">
    <s:Header>
        <f:Misunderstood qname="abc:transaction" xmlns:="soap-transactions" />
    </s:Header>
    
    <s:Body>
        <s:Fault>
            <faultcode>MustUnderstand</faultcode>
            <faultstring>
                Header(s) not understood
            </faultstring>
            <faultactor>http://acme.com</faultactor>
        </s:Fault>
    </s:Body>
</s:Envelope>

```

### Custom Faults

- a web service may define its own custom fault codes;
- only requirement is that these custom faults be namespace qualified;

Example:

```xml

<s:Envelope xmlns:s="...">
    <s:Body>
        <s:Fault xmlns:xyz="urn:myCustomFaults">
            <faultcode>xyz:CustomFault</faultcode>
            <faultstring>
                My custom fault!
            </faultstring>
        </s:Fault>
    </s:Body>
</s:Envelope>

```

## Message Exchange Model

- SOAP specify a mechanism of identifying  which parts of the SOAP message are intended for processing by specific actors in its message path (_targeting_);
- _targeting_ can only be used in relation to header blocks;
- header block is targeted to a specific actor through the use of the actor attribute;
- the value of the actor attribute is the unique identifier of the intermediary(посредник) being targeted;
- this identifier may be the URL (intermediary location) or something more generic;
- intermediaries that do not match the actor attribute must ignore the header block;
- if the message does not pass through the signature verifier, then the signature block is ignored;

Example:

```xml

<s:Envelope xmlns:s="...">
    <s:Header>
        <x:signature actor="uri:SignatureVerifier">
            ...
        </x:signature>
    </s:Header>
    <s:Body>
        <abc:purchaseOrder>...</abc:purchaseOrder>
    </s:Body>
</s:Envelope>

```

### Routing Protocol

- WS-Routing defines a standard SOAP header block for expressing routing information;
- WS-Routing is a third-party extension to SOAP;
- its role is to define the exact sequence of intermediaries through which a message is to pass;
- mustUnderstand="true" flag can be set on the path header block;

```xml

<s:Envelope xmlns:s="...">
    <s:Header>
        <m:path xmlns:m="http://schemas.xmlsoap.org/rp/"
                s:mustUnderstand="true">
            <m:action>http://www.im.org/chat</m:action>
            <m:to>http://D.com/some/endpoint</m:to>
            <m:fwd>
                <m:via>http://B.com</m:via>
                <m:via>http://C.com</m:via>
            </m:fwd>
            <m:rev>
                <m:via/>
            </m:rev>
            <m:from>mailto:johndoe@acme.com</m:from>
            <m:id>
                uuid:84b9f5d0-33fb-4a81-b02b-5b760641c1d6
            </m:id>
        </m:path>
    </S:Header>
    <S:Body>
        ...
    </S:Body>
</S:Envelope>

```

## Using SOAP for RPC-Style Web Services

### Packaging RPC request rules

- method call is represented as a single structure with each in or in-out parameter modeled as a field in that structure;
- names and physical order of the parameters must correspond to the names and physical order of the parameters in the method being invoked;

#### Example

Java method declaration:

```javascript

String checkStatus(String orderCode, String customerID);

```

Java method invocation:

```java

result = checkStatus("abc123", "Sam's Store");

```

SOAP method invocation:

```xml

<s:Envelope xmlns:s="...">
    <s:Body>
        <checkStatus xmlns="..."
                     s:encodingStyle="http://www.w3.org/2001/06/soap-encoding">
            <orderCode xsi:type="string">abc123</orderCode>
            <customerID xsi:type="string">
                Bob's Store
            </customerID>
        </checkStatus>
    </s:Body>
</s:Envelope>

```

SOAP method response:

```xml

<s:Envelope xmlns:s="...">
    <s:Body>
        <checkStatusResponse
                s:encodingStyle="http://www.w3.org/2001/06/soap-encoding">
            <return xsi:type="xsd:string">new</return>
        </checkStatusResponse>
    </SOAP:Body>
</SOAP:Envelope>

```

- The name of the message response structure (_checkStatusResponse_) element is not important, but the convention is to name it after the method, with Response appended.
- The name of the return element is arbitrary - the first field in the message response structure is assumed to be the return value;

### Reporting Errors

- SOAP fault is the standard method of returning error responses to RPC clients; 
- SOAP fault is used to convey the exact nature of the error that has occurred and can be extended to provide additional information through the use of the _detail_ element;

## SOAP's Data Encoding

- Encoding styles are completely optional, and in many situations not useful;
- SOAP envelopes are designed to carry any arbitrary XML documents no matter what the body of the message looks like;

### XML Schemas and xsi:type

SOAP defines three different ways to express the data type of an accessor.

1. Use the _xsi:type_ attribute on each accessor, explicitly referencing the data type according to the XML Schema specification:

```xml

<person>
    <name xsi:type="xsd:string">John Doe</name>
</person>

```

2. Reference an XML Schema document that defines the exact data type of a particular element within its definition:

```xml

<person xmlns="personschema.xsd">
    <name>John Doe</name>
</person>

<!-- where "personschema.xsd" defines the name element as type=xsd:string -->

```

3. Reference some other type of schema document that defines the data type of a particular element within its definition:

```xml

<person xmlns="urn:some_namespace">
    <name>John Doe</name>
</person>
        
<!-- where "urn:some_namespace" indicates some namespace in which the value of name elements are strings -->

```

## SOAP Data Types

SOAP encoding provides two alternate syntaxes for expressing instances of data types within the SOAP envelope.

- _anonymous accessor_, and is commonly found in SOAP encoded arrays:

```xml

<SOAP-ENC:int>36</SOAP-ENC:int>

```

- _named accessor_:

```xml

<value xsi:type="xsd:int">36</value>

```

### Accessor

- SOAP defines that accessors may either be single-referenced or multireferenced using _id_ and _href_ attributes;
- A single-referenced accessor doesn't have an identity except as a child of its parent element;

Example:

```xml

<people>
    <person name='joe smith'>
        <address>
            <street>111 First Street</street>
            <city>New York</city>
            <state>New York</state>
        </address>
    </person>
</people>

```

- a multireferenced accessor uses id to give an identity to its value;
- other accessors can use the href attribute to refer to their values;

Example:

```xml

<people>
    <person name='joe smith'>
        <address href='#address-1'/>
    </person>
    <person name='john doe'>
        <address href='#address-1'/>
    </person>
</people>

<address id='address-1'>
    <street>111 First Street</street>
    <city>New York</city>
    <state>New York</state>
</address>

```

- this approach can also be used to allow an accessor to reference external information sources that are not a part of the SOAP Envelope;

Example:

```xml

<person name='joe smith'>
    <address href='http://acme.com/data.xml#joe_smith' />
</person>

```

#### Null Accessors

If the receiver expects to find the accessor in the message, a better method of indicating whether an accessor contains a null value would be to use the XML Schema 
defined _xsi:nil="true"_ attribute:

```xml

<name xsi:type="xsd:string" xsi:nil="true" />

```

### Value

- a _value_ represents either a single data unit or combination of data units ("Moe");
- an accessor represents an element that contains or allows access to a value ("firstname");

Example:

```xml

<firstname> Joe </firstname>

```

### String

- a string is represented with the string data type, rather than as an array of bytes;
- a collection of bytes that does not represent a text string encoded using _base64_ string:

```xml

<some_binary_data xsi:type="SOAP-ENC:base64">
    aDF4JIK34KJjk3443kjlkj43SDF43==
</some_binary_data>

```

### Integer

Example:

```xml

<SOAP-ENC:int>42</SOAP-ENC:int>

```

### Compound value

A compound value represents a combination of two or more accessors grouped as children of a single accessor:

```xml

<name>
    <firstname> Joe </firstname>
    <lastname> Smith </lastname>
</name>


```

### Structs

A _struct_ is a compound value in which each accessor has a different name:

```xml

<!--A struct -->
<person>
    <firstname>Joe</firstname>
    <lastname>Smith</lastname>
</person>

```

### Arrays

- an _array_ is a compound value in which the accessors have the same name (values are identified by their positions in the array);
- an _array_ is indicated as accessors of the type SOAP-ENC:Array, or a type derived from that;
- the type of elements that an array can contain is indicated through the use of the SOAP defined arrayType;

Simple array example:

```xml


<some_array xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="se:string[3]">
    <se:string>Joe</se:string>
    <se:string>John</se:string>
    <se:string>Marsha</se:string>
</some_array>

```

Two-dimensional array example:

```xml

<data xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[2][]">
    <names href="#names-1"/>
    <names href="#names-2"/>
</data>

<names id="names-1" xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[2]">
    <name>joe</name>
    <name>john</name>
</names>

<names id="names-2" xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[2]">
    <name>mike</name>
    <name>bill</name>
</names>

```

Additional array examples:

```xml

<names xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[2,2]">
    <name xsi:type="xsd:string">a1d1</name>
    <name xsi:type="xsd:string">a2d1</name>
    <name xsi:type="xsd:string">a1d2</name>
    <name xsi:type="xsd:string">a2d2</name>
</names>

<names xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[4]">
    <name xsi:type="xsd:string">a1d1</name>
    <name xsi:type="xsd:string">a2d1</name>
    <name xsi:type="xsd:string">a3d1</name>
    <name xsi:type="xsd:string">a4d1</name>
</names>


```

#### Partially Transmitted Array

- a partially transmitted array is one in which only part of the array is serialized into the SOAP envelope;
- such array is indicated through the use of the _SOAP-ENC:offset_ that provides the number or ordinals counting from zero to the first ordinal position transmitted;

Example:

```xml

<names xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[5]" SOAP-ENC:offset="[2]">
    <name>Item 4</name>
    <name>Item 5</name>
</names>

```

#### Sparse arrays

Sparse arrays represent a grid of values with specified dimensions that may or may not contain any data.

Example:

```xml

<names xsi:type="SOAP-ENC:Array" SOAP-ENC:arrayType="xsd:string[10,10]">
    <name SOAP-ENC:position="[2,5]">data</name>
    <name SOAP-ENC:position="[5,2]">data</name>
</names>

```

## SOAP Transports

### SOAP over HTTP

- the _SOAPAction_ HTTP header is defined by the SOAP specification, and indicates the intent of the SOAP HTTP request (Its value is completely arbitrary);
- servers can then use the SOAPAction header to filter unacceptable requests;

HTTP request containing a SOAP message example:

```http request

POST /StockQuote HTTP/1.1
Content-Type: text/xml
Content-Length: nnnn
SOAPAction: "urn:StockQuote#GetQuote"
<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
...
</s:Envelope>

```

HTTP response containing a SOAP message: 

```http request

HTTP/1.1 200 OK
Content-Type: text/xml
Content-Length: nnnn
<s:Envelope xmlns:s="http://www.w3.org/2001/06/soap-envelope">
...
</s:Envelope>

```