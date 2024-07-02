# Transaction state POP3 commands

- `STAT` - tells you how many and how big the emails are in the mailbox;
- `LIST` - returns a line for each message containing the message number and size;
- `RETR` - returns the content of a particular message (identified by the number);
- `DELE` - marks a message as deleted (only actually deleted after QUIT);
- `NOOP` - does nothing, used to keep the connection alive;
- `RSET` - unmarks all messages marked as deleted;