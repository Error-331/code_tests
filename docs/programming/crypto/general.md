# Crypto

## Symmetric encryption

- With symmetric encryption user encrypts data using a key, and then use the very same key to decrypt it again; 
- In many cases, the key can be derived from a password or passphrase;
- If the user wants to share the encrypted message with another person, he/she need to provide the other party with both the ciphertext (the encrypted data) and the key; 

### AES

- hardware acceleration for AES is available in all modern desktop, server CPUs (for example, the AES-NI instructions in Intel and AMD processors) and mobile/embedded chips;
- three different key lengths: 128, 192, or 256 bits (16, 24, or 32 bytes, respectively);
- shorter keys are not allowed in the standard;

Modes: 

- AES-CBC (Cipher Block Chaining) when one do not need authentication;
- AES-GCM (Galois/Counter Mode) when one needs authentication;
- AES-ECB is not suitable for encrypting data larger than one block (16 to 32 bytes, depending on the size of the key);

#### Authenticated Encryption (AE)

- Means that not only is the data encrypted (guaranteeing confidentiality), but also that a "tag" is added to guarantee the integrity of the message when it's decrypted;
- If someone were to alter the ciphertext, when user decrypts it, the authentication check would fail;
- Without AE, while the attacker would still be unable to decrypt ciphertext, they could alter it and make user decrypt invalid data;

#### Initialization vector

- An IV is a random sequence of bytes that should be regenerated every user encrypts a file;
- As a rule, user should **never reuse an IV**;
- 16 bytes for AES-CBC;
- 12 bytes for AES-GCM;
- The IV does not need to be kept secret, and it's common to store the IV, in plaintext form, alongside the encrypted data (ciphertext) - at the beginning of the encrypted stream;

#### AES Key Wrap

- AES Key Wrap, also called AES-KW, is a mode of operation of the AES cipher that is optimized for wrapping symmetric keys;
- the name of the cipher is 'id-aes256-wrap';
- the IV that's used is defined by the RFC and it's a fixed value (0xA6A6A6A6A6A6A6A6 - hex-encoded);

### ChaCha20-Poly1305

- ChaCha20 is a more recent symmetric cipher designed by Daniel J. Bernstein in the mid-'00s; 
- It's often used together with the Poly1305 hashing function (in this case, it's also called "message authentication code");
- The result of the combination of the two is the **ChaCha20-Poly1305** authenticated stream cipher;
- Both ChaCha20-Poly1305 and AES-GCM offer the same level of security, given keys of the same size, with neither of the two having any publicly-known security vulnerability;
- On devices where hardware-based AES acceleration is not available, ChaCha20-Poly1305 is known to be significantly faster;

### Key derivation

- user can stretch passphrases into safe keys by using a Key Derivation Function (KDF);
- two hashing functions were well-suited to be used for key derivation: **Argon2**, or if that's not available, **scrypt**;

#### Reusing keys

- with AES in GCM and CTR modes, user should never use the same IV twice with the same key, this may expose encryption key to an attacker;
- with GCM mode, the IV is relatively small at only 12 bytes, so the chances of a collision occurring are relatively high when the same key is reused many times;
- when a KDF to derive a key used, one can, for example, use a different random salt for each file, and then store that salt alongside the file (it's ok for the salt to be public); 
- using a different salt allows to get a different key every time, eliminating the risk of reusing an IV;

#### Wrapping keys

To avoid having to re-encrypt everything when a user changes their passphrase, the  usual scheme involves encrypting each file with a separate, random key, which is in turn
encrypted with the key derived from the user's passphrase.

- key wrapping and key unwrapping - fancier names that refer to the operations of encrypting and decrypting keys;
- when user encrypts another key, he/she are wraps it; 
- user can unwrap key to get the original key;
- the key that's used to wrap the other user key is usually called a **key encryption key (KEK)** or a **wrapping key (WK)**;

Algorithm:

1. Prompt the user for a passphrase, then derive a symmetric key from that using the KDF of choice, this will result in **wrapping key (WK)**;
2. Calculate the hash of the passphrase, which we'll use to verify that the user entered the correct passphrase when they try to encrypt or decrypt data;
3. Generate a random key, such as a random 32-byte sequence, which will be used as the user key (UK);
4. Using the WK, wrap the UK by encrypting it with the symmetric key encryption algorithm;
5. Store the wrapped key and the password hash with the user's profile in the application;

Using a different key for each file:

1. Each file a user encrypts uses a different, **random FK** ();
2. Two users want to have access to one file, each one having their own UK (UK1 and UK2, both those UKs are stored in a database wrapped with the respective user's wrapping key); 
3. The app will then wrap the FK twice, with UK1 and UK2; 
4. This gives both users access to that shared file and that only, without having to know the other person's UK;

## Asymmetric and Hybrid Encryption

- **asymmetric cryptography**, also called **public-key cryptography**, since it uses two kinds of keys – a public key and a private key;
- public-key cryptography is very slow and can only encrypt small amounts of data;
- in practice, most implementations rely on hybrid cryptosystems, in which the data is encrypted using a symmetric cipher;