FILE TRANSFER PROTOCOL
(FTP)

The primary general file transfer protocol
in the TCP/IP suite shows its generality
directly through its unqualified name: the
File Transfer Protocol (FTP). FTP is one of the most
widely used application protocols in the world. It was
designed to allow the efficient transfer of files between
any two devices on a TCP/IP internetwork. It automatically takes care of the
details of how files are moved, provides a rich command syntax to allow
various supporting file operations to be performed (such as navigating the
directory structure and deleting files), and operates using the Transmission
Control Protocol (TCP) transport service for reliability.
In this chapter, I describe in detail the operation of FTP

To ensure that files are sent and received without loss of data that could corrupt
them, FTP uses the reliable TCP at the transport layer. An authentication system
is used to ensure that only authorized clients are allowed to access a server. At the
same time, a feature sometimes called anonymous FTP allows an organization that
wishes it to set up a general information server to provide files to anyone who might
want to retrieve them.

After a TCP connection is established, an FTP control connection is created.
Internal FTP commands are passed over this logical connection based on formatting
rules established by the Telnet Protocol. Each command sent by the client receives
a reply from the server to indicate whether it succeeded or failed. A data connection
is established for each individual data transfer to be performed. FTP supports normal and passive data connections, allowing either the server or client to initiate the
data connection. Multiple data types and file types are supported to allow flexibility
for various types of transfers.

The interface between an FTP user and the protocol is provided in the
form of a set of interactive user commands. After establishing a connection and
completing authentication, two basic commands can be used to send or receive
files. Additional support commands are provided to manage the FTP connection
as well as to perform support functions such as listing the contents of a directory or
deleting or renaming files. In recent years, graphical implementations of FTP have
been created to allow users to transfer files using mouse clicks instead of having to
memorize commands. Also, other applications can use FTP directly to move files
from one place to another.

FTP Operational Model, Protocol Components, and Key
Terminology

The standards that define FTP describe its overall operation using a simple conceptual tool called the FTP model.

The Server-FTP Process and User-FTP Process

FTP is a classic client/server protocol, as mentioned earlier. However, the client is
not called by that name, but rather is called the user. The name comes from the fact
that the human user that issues FTP commands works on the client machine. The
full set of FTP software operating on a device is called a process. The FTP software
on the server is called the server-FTP process, while the software on the client is the
user-FTP process.


FTP Control Connection and Data Connection

A critical concept in understanding FTP is that, although it uses TCP like many
other applications, it does not use just one TCP connection for all communication
the way most protocols do. Instead, the FTP model is designed around two logical
channels of communication between the server and user FTP processes:

Control Connection This is the main logical TCP connection that is created when
an FTP session is established. It is maintained throughout the FTP session and is
used only for passing control information, such as FTP commands and replies. It is
not used to send files.

Data Connection Each time data is sent from the server to the client or vice versa,
a distinct TCP data connection is established between them. Data is transferred over
this connection. When the file transfer is complete, the connection is terminated.


FTP Process Components and Terminology

Since the control and data functions are communicated using distinct channels,
the FTP model divides the software on each device into two logical protocol
components that are responsible for each channel. The protocol interpreter (PI) is a
piece of software that is charged with managing the control connection, issuing
and receiving commands and replies. The data transfer process (DTP) is responsible
for actually sending and receiving data between the client and server. In addition
to these two elements, the user FTP process includes a third component, a user
interface, that interacts with the human FTP user; it is not present on the server side.


Server-FTP Process Components

The server-FTP process contains two protocol elements:

Server Protocol Interpreter (Server-PI) The protocol interpreter is responsible
for managing the control connection on the server. It listens on the main reserved FTP port for incoming connection requests from users (clients). Once a connection is established, it receives commands from the user-PI, sends back replies, and
manages the server data transfer process.

Server Data Transfer Process (Server-DTP) The DTP on the server side is used to
send or receive data to or from the user-DTP. The server-DTP may either establish a
data connection or listen for a data connection coming from the user. It interacts
with the server’s local file system to read and write files.


User-FTP Process Components
The User-FTP Process contains three protocol elements:

User Protocol Interpreter (User-PI) This protocol interpreter is responsible for
managing the control connection on the client. It initiates the FTP session by
issuing a request to the server-PI. Once a connection is established, it processes
commands received from the user interface, sends them to the server-PI, and
receives replies. It also manages the user data transfer process.

User Data Transfer Process (User-DTP) The DTP on the user side sends or
receives data to or from the server-DTP. The user-DTP may either establish a data
connection or listen for a data connection coming from the server. It interacts with
the client device’s local file system.

User Interface The user interface provides a more friendly FTP interface to a
human user. It allows simpler user-oriented commands to be used for FTP functions
rather than the somewhat cryptic internal FTP commands, and it allows results and
information to be conveyed back to the person operating the FTP session.

Third-Party File Transfer (Proxy FTP)

The FTP standard actually defines a separate model for an alternative way of using
the protocol. In this technique, a user on one host performs a file transfer from one
server to another. This is done by opening two control connections: one each from
the user-PI on the user’s machine to the two server-PIs on the two servers. Then, a
server-DTP is invoked on each server to send data; the user-DTP is not used.
This method, sometimes called third-party file transfer or proxy FTP, is not widely
used today. A major reason for its lack of use is that it raises security concerns and
has been exploited in the past. 


FTP Control Connection Establishment, User Authentication,
and Anonymous FTP Access

You just saw how FTP uses distinct logical data and control channels that are established between an FTP client (user) and an FTP server. Before the data connection
can be used to send actual files, the control connection must be established. A specific process is followed to set up this connection and thereby create the permanent
FTP session between devices that can be used for transferring files.
As with other client/server protocols, the FTP server assumes a passive role in
the control connection process. The server protocol interpreter (server-PI) listens
on the special well-known TCP port reserved for FTP control connections: port 21.
The user-PI initiates the connection by opening a TCP connection from the user
device to the server on this port. It uses an ephemeral port number as its source
port in the TCP connection.
Once TCP has been set up, the control connection between the devices is
established, allowing commands to be sent from the user-PI to the server-PI and
reply codes to be sent back in response. The first order of business after the
channel is operating is user authentication, which the FTP standard calls the login
sequence. This process has two purposes:


Access Control The authentication process allows access to the server to be
restricted to only authorized users. It also lets the server control what types of
access each user has.


Resource Selection By identifying the user making the connection, the FTP
server can make decisions about what resources to make available to the user.

FTP Login Sequence and Authentication