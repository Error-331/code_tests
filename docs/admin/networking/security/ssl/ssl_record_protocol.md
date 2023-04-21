# SSL Record Protocol

- used for the encapsulation of higher-layer protocol data, and that it therefore fragments the data into manageable pieces—called fragments—that are processed individually;
- each fragment is optionally compressed and cryptographically protected according to the compression method and cipher spec of the SSL session state;
- steps: _fragmentation_, _compression_, _message authentication_, _encryption_;
- the data structure that results after _fragmentation_ is called **SSLPlaintext**;
- the one after compression is called **SSLCompressed**;
- the one after cryptographic protection (authentication and encryption) is called **SSLCiphertext**;
- in addition to the fragment field, each data structure comprises an 8-bit type field, a 16-bit version field, and another 16-bit length field;

## Contents of the fields

1. The _type_ field refers to the higher-layer SSL protocol:
   - 20 (0x14) SSL change cipher spec protocol;
   - 21 (0x15) alert protocol;
   - 22 (0x16) handshake protocol;
   - 23 (0x17) application data protocol;
2. The _version_ field refers to the version of the SSL protocol in use;
3. The _length_ field refers to the byte-length of the higher-layer protocol messages that are transmitted in the fragment part of the SSL record (multiple higher-layer protocol messages 
that belong to the same type can be concatenated into a single SSL record);

### Notes

- SSL record could be up to 2**16 − 1 = 65,535 bytes in length;
- According to spec the maximum record length should not exceed 2**14 − 1 = 16,384 bytes;

## Fragmentation

- the SSL record protocol fragments the higher-layer protocol data into blocks of _2**14 bytes_ or less;
- each block is packed into an **SSLPlaintext** structure;
- **SSLPlaintext** structure that is augmented with appropriate values for the _type_, _version_, and _length_ fields;

## Compression

- the SSL record protocol may optionally compress the fragment field of the **SSLPlaintext** structure and write it into the fragment field of the **SSLCompressed** structure;
- in the case of SSL 3.0, this field is initially set to **null** (no compression is invoked by default);
- if data needs to be compressed and encrypted, then the order of the operations matters;
- if data already encrypted, it cannot be compressed anymore;.
- whether the data is compressed or not - the output of this step is an **SSLCompressed**;

## Cryptographic Protection

- the SSL record protocol protects an **SSLCompressed** structure as defined in the cipher spec of the SSL session state;
- a cipher spec refers (according to the table bellow) to a pair of algorithms that are used to cryptographically protect data but it does not comprise a key exchange algorithm;
- the key exchange algorithm is used to establish an SSL session and a respective **master secret** (it is not part of the cipher spec);
- **cipher suite** - a cipher spec and a key exchange algorithm;
- each **cipher suite** is encoded in two bytes: the first byte is _0x00_ and the second byte refers to the hexadecimal representation of the cipher suite number as it occurs in the table;
- default **cipher suite** - SSL_NULL_WITH_NULL_NULL (does not provide any security at all);

SSL Cipher Suites:

| Name of the Cipher Suite               | Key Exchange   | Cipher       | Hash  |
|:---------------------------------------|:---------------|:-------------|:------|
| SSL_NULL_WITH_NULL_NULL                | NULL           | NULL         | NULL  |
| SSL_RSA_WITH_NULL_MD5                  | RSA            | NULL         | MD5   |
| SSL_RSA_WITH_NULL_SHA                  | RSA            | NULL         | SHA   |
| SSL_RSA_EXPORT_WITH_RC4_40_MD5         | RSA_EXPORT     | RC4_40       | MD5   |
| SSL_RSA_WITH_RC4_128_MD5               | RSA            | RC4_128      | MD5   |
| SSL_RSA_WITH_RC4_128_SHA               | RSA            | RC4_128      | SHA   |
| SSL_RSA_EXPORT_WITH_RC2_CBC_40_MD5     | RSA_EXPORT     | RC2_CBC_40   | MD5   |
| SSL_RSA_WITH_IDEA_CBC_SHA              | RSA            | IDEA_CBC     | SHA   |
| SSL_RSA_EXPORT_WITH_DES40_CBC_SHA      | RSA_EXPORT     | DES40_CBC    | SHA   |
| SSL_RSA_WITH_DES_CBC_SHA               | RSA            | DES_CBC      | SHA   |
| SSL_RSA_WITH_3DES_EDE_CBC_SHA          | RSA            | 3DES_EDE_CBC | SHA   |
| SSL_DH_DSS_EXPORT_WITH_DES40_CBC_SHA   | DH_DSS_EXPORT  | DES40_CBC    | SHA   |
| SSL_DH_DSS_WITH_DES_CBC_SHA            | DH_DSS         | DES_CBC      | SHA   |
| SSL_DH_DSS_WITH_3DES_EDE_CBC_SHA       | DH_DSS         | 3DES_EDE_CBC | SHA   |
| SSL_DH_RSA_EXPORT_WITH_DES40_CBC_SHA   | DH_RSA_EXPORT  | DES40_CBC    | SHA   |
| SSL_DH_RSA_WITH_DES_CBC_SHA            | DH_RSA         | DES_CBC      | SHA   |
| SSL_DH_RSA_WITH_3DES_EDE_CBC_SHA       | DH_RSA         | 3DES_EDE_CBC | SHA   |
| SSL_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA  | DHE_DSS_EXPORT | DES40_CBC    | SHA   |
| SSL_DHE_DSS_WITH_DES_CBC_SHA           | DHE_DSS        | DES_CBC      | SHA   |
| SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA      | DHE_DSS        | 3DES_EDE_CBC | SHA   |
| SSL_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA  | DHE_RSA_EXPORT | DES40_CBC    | SHA   |
| SSL_DHE_RSA_WITH_DES_CBC_SHA           | DHE_RSA        | DES_CBC      | SHA   |
| SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA      | DHE_RSA        | 3DES_EDE_CBC | SHA   |
| SSL_DH_anon_EXPORT_WITH_RC4_40_MD5     | DH_anon_EXPORT | RC4_40       | MD5   |
| SSL_DH_anon_WITH_RC4_128_MD5           | DH_anon        | RC4_128      | MD5   |
| SSL_DH_anon_EXPORT_WITH_DES40_CBC_SHA  | DH_anon        | DES40_CBC    | SHA   |
| SSL_DH_anon_WITH_DES_CBC_SHA           | DH_anon        | DES_CBC      | SHA   |
| SSL_DH_anon_WITH_3DES_EDE_CBC_SHA      | DH_anon        | 3DES_EDE_CBC | SHA   |
| SSL_FORTEZZA_KEA_WITH_NULL_SHA         | FORTEZZA_KEA   | NULL         | SHA   |
| SSL_FORTEZZA_KEA_WITH_FORTEZZA_CBC_SHA | FORTEZZA_KEA   | FORTEZZA_CBC | SHA   |
| SSL_FORTEZZA_KEA_WITH_RC4_128_SHA      | FORTEZZA_KEA   | RC4_128      | SHA   |

Example: 

- SSL_DH_RSA_WITH_3DES_EDE_CBC_SHA - cipher suite;
- RSA-authenticated fixed Diffie-Hellman key exchange;
- Triple DES (3DES) in CBC mode for encryption;
- SHA-1 for message authentication;

### Key Exchange

- the SSL protocol employs secret key cryptography for message authentication and bulk data encryption;
- some keying material must be established bilaterally between the client and the server;
- this material is derived from a 48-byte **premaster** secret (that is called pre_master_secret in the SSL protocol specification);
- there are three key exchange algorithms that can be used to establish such a **premaster** secret: RSA, Diffie-Hellman, and FORTEZZA;
- a key exchange without peer entity authentication is called _anonymous_;

#### Ways to establish premaster secret

1. RSA is used for key exchange:
   - then the client generates a premaster secret;
   - encrypts it with the server’s public key;
   - sends the resulting ciphertext to the server; 
   - the server’s public key, in turn, can either be long-termed and retrieved from a public key certificate, or short-termed and provided for a particular key exchange. 
   - the server must use a private key to decrypt the premaster secret;
2. Diffie-Hellman is used for key exchange: 
   - a Diffie-Hellman key exchange is performed; 
   - the resulting Diffie-Hellman value (without leading zero bytes) represents the premaster secret;
   - fixed Diffie-Hellman key exchange (DH) is used (fixed and part of the respective public key certificates):
     - this applies to the server, but it may also apply to the client;
     - if client authentication is required, then the client’s Diffie-Hellman parameters are fixed and part of the client certificate;
     - otherwise (i.e., if client authentication is not required), the parameters are generated on the fly and provided in appropriate SSL handshake messages (ClientKeyExchange);
   - ephemeral Diffie-Hellman key exchange (DHE) is used: 
     - the parameters that are needed are not fixed and hence not part of any public key certificate;
     - instead, the parameters are generated on the fly and provided in appropriate SSL handshake messages (ServerKeyExchange and ClientKeyExchange messages);
       * it has been shown that cross-protocol attacks are feasible, if arbitrary (i.e., nonstandard) groups are used;
       * it has been shown that breaking the Diffie-Hellman key exchange by computing the respective discrete logarithm can be simplified by using precomputation that is feasible
       for many standard groups;
     - a unique answer can be given only if the Diffie-Hellman key exchange is done on elliptic curves; In this case, it is clearly advantageous;
     - in either case, the parameters that are used in DHE are not authenticated, and hence they must be authenticated in some way to provide an authenticated key exchange; 
     - usually, the parameters are digitally signed with the sender’s private (RSA or DSS) signing key; 
     - the respective public verification key is provided in an appropriate public key certificate;
   - anonymous Diffie-Hellman key exchange (DH anon) is used: 
     - is similar to a DHE, but it lacks the authentication step that turns the Diffie-Hellman key exchange into an authenticated key exchange; 
     - either participant of a DH anon cannot be sure that its peer is authentic; 
     - it may be anybody spoofing a legitimate participant;
     - the key exchange is inherently anonymous, and as such it is susceptible to man-in-the-middle (MITM) attacks;
   - DHE appears to be the most secure version of the Diffie-Hellman key exchange;
   - it yields temporary keys that are authenticated in some meaningful way; 
   - DH has the problem that the keys that are generated are always the same for two participating entities;
   - DH anon has the problem that it is highly exposed to MITM attacks;
   - **DHE can provide forward secrecy that is sometimes also called perfect forward secrecy (PFS)**.
   - forward secrecy means that the compromise of any long-term key does not automatically compromise all session keys; 
   - only if DHE is used, then the adversary cannot attack a long-term key but must attack each session key individually;
3. FORTEZZA KEA is used for key exchange: 
   - is a specialty of SSL 3.0, and it is no longer supported in TLS;  The
   - it was implemented in an NSA approved security microprocessor called Capstone chip (sometimes also known as MYK-80) that also implemented a cipher called Skipjack; 
   - The FORTEZZA KEA was actually a way to provide the keying material necessary for Skipjack in a way that allowed a trusted third party to retrieve the encryption keys if needed;

Once a premaster secret is established, it can be used to construct a master secret that is called**master_secret** in the SSL protocol specification:

```

master_secret = MD5(pre_master_secret 
    + SHA(’A’ + pre_master_secret + ClientHello.random + ServerHello.random)) 
    + MD5(pre_master_secret + SHA(’BB’ + pre_master_secret + ClientHello.random + ServerHello.random)) 
    + MD5(pre_master_secret + SHA(’CCC’ + pre_master_secret + ClientHello.random + ServerHello.random))

```

- ’A’, ’BB’, and ’CCC’ refer to the respective byte strings 0x41, 0x4242, and 0x434343;
- _ClientHello.random_ and _ServerHello.random_ refer to a pair of values that are randomly chosen by the client and server and exchanged in SSL handshake protocol messages; 
- the combined use of MD5 and SHA-1 in the way specified above yields a unique and nonstandard pseudorandom function (PRF); 
- an MD5 hash value is 16 bytes long, so the total length of the **master secret** is 3 · 16 = 48 bytes; 
- its construction is the same for the RSA, Diffie-Hellman, or FORTEZZA key exchange algorithms 
- in the case of FORTEZZA, the encryption keys are generated inside the Capstone chip, so the master secret is not used here;
- the master secret is part of the session state and serves as a source of entropy for the generation of all cryptographic parameters (cryptographic keys and IVs) that are used in the sequel; 
- the premaster secret can be safely deleted from memory once the master secret has been constructed;

Once the master secret is obtained, essentially the same handcrafted PRF can also be used to generate an arbitrarily long key block, termed_key_block_. In this PRF construction, the 
master secret now serves as the seed (instead of the premaster secret), whereas the client and server random values still represent the salt values that make cryptanalysis more 
difficult. The key block is iteratively constructed as follows:

```

key_block =
    MD5(master_secret + SHA(’A’ + master_secret + ServerHello.random + ClientHello.random)) 
    + MD5(master_secret + SHA(’BB’ + master_secret + ServerHello.random + ClientHello.random)) 
    + MD5(master_secret + SHA(’CCC’ + master_secret + ServerHello.random + ClientHello.random)) 
    + [...]

```

Every iteration adds 16 bytes (the length of the MD5 output), and the construction is continued until the key block is sufficiently long to form the cryptographic 
SSL connection state elements:

```

client_write_MAC_secret
server_write_MAC_secret
client_write_key
server_write_key
client_write_IV
server_write_IV

```

- the first two values represent message authentication keys; 
- the second two values encryption keys;
- the third two values IVs that are needed if a block cipher in CBC mode is used (so they are optional); 
- any additional material in the key block is discarded; 
- the construction equally applies to RSA and Diffie-Hellman, as well as for the MAC key contruction of FORTEZZA; 
- it did not apply to the construction of the encryption keys and IVs for FORTEZZA 
- exportable encryption algorithms require some additional processing to derive the final encryption keys and IVs. 
- **two recent attacks have shown that exportable cipher suites are inherently dangerous and should no longer be supported**:
  - the _FREAK_ attack was published in March 2015;
  - the **Logjam** attack was announced two months later, in May 2015;
  - both attacks represent MITM attacks, in which an adversary (acting as a MITM) tries to downgrade the key exchange method used to something that is exportable, and hence breakable;

### Message Authentication








