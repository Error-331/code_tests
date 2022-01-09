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
