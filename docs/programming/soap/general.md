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

What SOAP does specify, however, is a mechanism of identifying which parts of the SOAP
message are intended for processing by specific actors in its message path. This mechanism is
known as "targeting" and can only be used in relation to header blocks (the body of the SOAP
envelope cannot be explicitly targeted at a particular node).

A header block is targeted to a specific actor on its message path through the use of the
special actor attribute. The value of the actor attribute is the unique identifier of the
intermediary being targeted. This identifier may be the URL where the intermediary may be
found, or something more generic. Intermediaries that do not match the actor attribute must
ignore the header block.


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

The actor attribute on the signature header block is how the signature verifier intermediary
knows that it is responsible for processing that header block. If the message does not pass
through the signature verifier, then the signature block is ignored.


### Routing Protocol

WS-Routing defines a standard SOAP header block (see Example 2-12) for expressing
routing information. Its role is to define the exact sequence of intermediaries through which a
message is to pass.

To ensure that the message path defined by the WS-Routing header block is properly
followed, and because WS-Routing is a third-party extension to SOAP that not every SOAP
processor will understand, the mustUnderstand="true" flag can be set on the path header
block.

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


The rules for packaging an RPC request in a SOAP envelope are simple:

The method call is represented as a single structure with each in or in-out parameter
modeled as a field in that structure.

The names and physical order of the parameters must correspond to the names and
physical order of the parameters in the method being invoked.

This means that a Java method with the following signature:

String checkStatus(String orderCode,
String customerID);


can be invoked with these arguments:
result = checkStatus("abc123", "Bob's Store")


using the following SOAP envelope:

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

Responses

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

The name of the message response structure (checkStatusResponse) element is not
important, but the convention is to name it after the method, with Response appended.
Similarly, the name of the return element is arbitrary—the first field in the message response
structure is assumed to be the return value.


Reporting Errors

The SOAP RPC conventions make use of the SOAP fault as the standard method of returning
error responses to RPC clients. As with standard SOAP messages, the SOAP fault is used to
convey the exact nature of the error that has occurred and can be extended to provide additional information through the use of the detail element. There's little point in
customizing error messages in SOAP faults when you're doing RPC, as most SOAP RPC
implementations will not know how to deal with the custom error information.

## SOAP's Data Encoding

- Encoding styles are completely optional, and in many situations not useful;
- SOAP envelopes are designed to carry any arbitrary XML documents no matter what the body of the message looks like;

A value represents either a single data unit or combination of data units.

An accessor represents
an element that contains or allows access to a value. In the following, firstname is an
accessor, and Joe is a value:

```xml

<firstname> Joe </firstname>

```

A compound value represents a combination of two or more accessors grouped as children of
a single accessor

```xml

<name>
<firstname> Joe </firstname>
<lastname> Smith </lastname>
</name>


```


There are two types of compound values,

A struct is a compound value in which each accessor has a different name
An array is a compound value in which the accessors have the same name (values are identified by their positions in the array)


```xml

<!--A struct -->
<person>
<firstname>Joe</firstname>
<lastname>Smith</lastname>
</person>
<!--An array-->
<people>
<person name='joe smith'/>
<person name='john doe'/>
</people>

```

Through the use of the special id and href attributes, SOAP defines that accessors may either
be single-referenced or multireferenced. A single-referenced accessor doesn't have an identity
except as a child of its parent element. In Example 2-16, the <address> element is a singlereferenced
accessor.

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

A multireferenced accessor uses id to give an identity to its value. Other accessors can use the
href attribute to refer to their values. In Example 2-17, each person has the same address,
because they reference the same multireferenced address accessor.

```xml

<people>
<person name='joe smith'>
<address href='#address-1'
</person>
<person name='john doe'>
<address href='#address-1'
</person>
</people>
<address id='address-1'>
<street>111 First Street</street>
<city>New York</city>
<state>New York</state>
</address>

```

This approach can also be used to allow an accessor to reference external information sources
that are not a part of the SOAP Envelope (binary data, for example, or parts of a MIME multipart envelope). Example 2-18 references information contained within an external XML
document.

```xml

<person name='joe smith'>
<address href='http://acme.com/data.xml#joe_smith' />
</person>

```

XML Schemas and xsi:type