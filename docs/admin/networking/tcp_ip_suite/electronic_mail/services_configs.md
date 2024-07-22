# Services configs

## Outlook

- Username: `Your email address`;
- Password: `Your Microsoft account password`;

### POP3

- Host: `outlook.office365.com`;
- Port: `995`;
- Encryption: `TlS`;

### IMAP

- Host: `outlook.office365.com`;
- Port: `993`;
- Encryption: `TlS`;

### SMTP

- Host: `smtp-mail.outlook.com`;
- Port: `587`;
- Encryption: `STARTTLS` (nodemailer: set `secure` to `false`);

## Yahoo

- Username: `Your full Yahoo Mail address`;
- Password: `Your Yahoo Mail password or app password`;

### IMAP

- Host: `imap.mail.yahoo.com`;
- Port: `993`;
- Encryption: `TlS`;

### SMTP

- Host: `smtp.mail.yahoo.com`;
- Port: `465` or `587`;
- Encryption: `TLS/SSL`;

## GMail

### IMAP

- Host: `imap.gmail.com`;
- Port: `993`;
- Encryption: `TlS`;
- Password: `XOAuth2 (SASL)`;

XOAuth2 function example:

```typescript

    function prepareXOAuth2Token(accessToken: string): string {
        const user = this.user;

        return Buffer
            .from([`user=${user}`, `auth=Bearer ${accessToken}`, '', '']
                .join('\x01'), 'utf-8')
            .toString('base64');
    }

```

### SMTP

- Host: `smtp.gmail.com`;
- Port: `465`;
- Encryption: `TLS`;
- Password: `OAuth2`;