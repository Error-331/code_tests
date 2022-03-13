# General

Compact and self-contained way for securely transmitting information between parties as a JSON object.

- is an open standard (RFC 7519); 
- this information can be verified and trusted because it is digitally signed; 
- JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA;
- signed tokens can verify the integrity of the claims(претензии) contained within it, while encrypted tokens hide those claims from other parties;
- tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it;

## JSON Web Tokens in use

### Authorization 

- most common scenario for using JWT;
- once the user is logged in, each subsequent request will include the JWT;
- this token will allow the user to access routes, services, and resources that are permitted with that token; 
- single Sign On is a feature that allows (small overhead) to easily use JWT across different domains;

### Information Exchange

- JSON Web Tokens are a good way of securely transmitting information between parties;
- JWTs can be signed, using public/private key pairs, so the user can be sure the senders are who they say they are;
- Additionally, as the signature is calculated using the header and the payload, recipient can also verify that the content hasn't been tampered with;

## JSON Web Token structure

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

1. Header
2. Payload
3. Signature

JWT typically looks like the following:

```text

xxxxx.yyyyy.zzzzz

```

### Header

The header typically consists of two parts: 

1. Type of the token (JWT)
2. Signing algorithm (such as HMAC SHA256 or RSA)

**Example:**

```json

{
"alg": "HS256",
"typ": "JWT"
}

```

Then, this JSON is Base64Url encoded to form the first part of the JWT.

### Payload

- contains the claims; 
- claims are statements about an entity (typically, the user) and additional data;
- there are three types of claims: registered, public, and private claims;
- for signed tokens this information (protected against tampering) is readable by anyone;
- secret information should not b put in the payload or header elements of a JWT unless it is encrypted;

#### Types

1. Registered claims - set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims (Some of them:
iss (issuer), exp (expiration time), sub (subject), aud (audience), and others);
   
2. Public claims - these can be defined at will by the users. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or 
be defined as a URI that contains a collision resistant namespace;

3. Private claims - these are the custom claims created to share information between parties that agree on using them and are neither registered or 
public claims;

**Example:**
```json

{
"sub": "1234567890",
"name": "John Doe",
"admin": true
}

```

The payload is then Base64Url encoded to form the second part of the JSON Web Token.

#### Signature

To create the signature part user have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

**Example:**

```javascript

HMACSHA256(
base64UrlEncode(header) + "." +
base64UrlEncode(payload),
secret)

```

The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify 
that the sender of the JWT is who it says it is.
