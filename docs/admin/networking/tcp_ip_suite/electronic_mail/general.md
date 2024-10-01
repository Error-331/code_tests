# Electronic email

- there is a distinction between protocols that deliver email between SMTP hosts on the internetwork and those that let users access received mail on their local hosts'
- different protocols are used for sending mail between post offices and for home delivery;

## TCP/IP Email Communication Overview

The TCP/IP email communication process consists of five basic steps.

### Mail Composition

- The message contains two sections: the body and the header;
- The body of the message is the actual information to be communicated;
- The header contains data that describes the message and controls how it is delivered and processed;
- The message must be created so that it matches the standard message format for the email system so that it can be processed;

### Mail Submission

- Sender and receiver of a message do not necessarily need to be connected to the network simultaneously, nor even continuously, to use it;
- The system is designed so that after composing the message, the user decides when to submit it to the email system so it can be delivered; 
- This is done using SMTP;

### Mail Delivery

- The email message is accepted by the sender’s local SMTP system for delivery through the mail system to the destination user; 
- This is accomplished by performing a DNS lookup of the intended recipient’s host system and establishing an SMTP connection to that system; 
- SMTP also supports the ability to specify a sequence of SMTP servers through which a message must be passed to reach a destination; 
- Eventually, the message arrives at the recipient’s local SMTP system;

### Mail Receipt and Processing

- The local SMTP server accepts the email message and processes it; 
- It places the mail into the intended recipient’s mailbox, where it waits for the user to retrieve it;

### Mail Access and Retrieval

- The intended recipient periodically checks with its local SMTP server to determine whether any mail has arrived; 
- The recipient retrieves the mail, opens it, and reads its content; 
- This is done using a special mail access protocol or method; 
- The access protocol and client email software may allow the user to scan the headers of received mail (such as the subject and sender’s identity) to decide which mail messages to download;

### Special case

- If a user is sending email from a device that is already an SMTP server, then step *"Mail Submissio"n* can be omitted; 
- If the recipient is logged in to a device that is also an SMTP server, step *"Mail Access and Retrieval"* will be skipped, as the user can read mail directly on the server; 
- Thus, in the simplest case, all that occurs is composition, delivery, and receipt;

## The roles

### Sender’s Client Host 

- the sender composes an email message, generally using a mail client program on her local machine; 
- the mail, once composed,  is held in a buffer area called a **spool**; 
- when the user is done, all of the messages can be sent at once;

### Sender’s Local SMTP Server 

- the user’s mail is ready to be sent, he/she connects to the internetwork;
- the messages are then communicated to the user’s designated local SMTP server, normally run by the user’s Internet service provider (ISP); 
- the mail is sent from the client machine to the local SMTP server using SMTP ( (It is possible for the sender to be working directly on a device with a local SMTP server);

### Recipient’s Local SMTP Server 

- the sender’s SMTP server sends the email using SMTP to the recipient’s local SMTP server over the internetwork; 
- there, the email is placed into the recipient’s incoming mailbox (or inbox); 
- this is comparable to the outgoing spool that existed on the sender’s client machine; 
- it allows the recipient to accumulate mail from many sources over a period of time and retrieve them when it is convenient;

### Recipient’s Client Host 

- in certain cases, the recipient may access her mailbox directly on the local SMTP server; 
- a mail access and retrieval protocol (POP3, IMAP) is used to read the mail from the SMTP server and display it on the recipient’s local machine; 
- there, it is displayed using an email client program, similar to the one the sender used to compose the message in the first place;

