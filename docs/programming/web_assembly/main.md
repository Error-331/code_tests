# WebAssembly

WebAssembly is a virtual Instruction Set Architecture (ISA) for a stack machine. Generally, an ISA is a binary format designed to execute 
on a specific machine. 

WebAssembly is designed to run on a virtual machine - it’s not designed for physical hardware.

User must embed the WebAssembly binary in a host environment that controls the loading and initializing of a WebAssembly module.

## Libraries

- wasm-pack (Rust);
- Emscripten (C/C++);

## WAT

WAT is like an assembly language for the WebAssembly virtual machine.

## Page

Is the smallest chunk of memory that can allocated at one time to linear memory (64KB).

## WASI

WASI is a runtime specification for WebAssembly applications and is a standard for WebAssembly interaction with the operating system. 
It allows WebAssembly to use the filesystem, make system calls, and handle input and output. 

The Mozilla Foundation has created a WebAssembly runtime called wasmtime that implements the WASI standard. 

With WASI, WebAssembly can do everything that a native application can do but in a secure and platform-independent way. 

It does it all with performance similar to native apps.

Node.js can also run a WASI experimental preview using the `--experimental-wasi-unstable-preview1` flag. 


