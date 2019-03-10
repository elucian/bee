## Operating System

Interaction with operating system require import from library.

```
+-------------------------
\wee 
  |
  |-->system
  |     |-->io.wee
  |
  +-->db
  ...
-------------------------+  
```

## File IO

To read and write into files and save to disk, we must use method "open" from system.io library.
This library define type "H" for file handler. It offer support for file input/output from operating system.

**Methods**

Next is a fragment from system.io library that define functions open and close.

```
.open(name ε S, mode ε A) => (f ε H):
...
.close(f ε H):
...
...

remember: public functions start with "."

```

**Example**

```
#driver

-- initialize the system library 
wee io := $wee.system.io.*;
let file := io.open('foo.txt','+w');

-- write into the file using put
file.put("Hello World!");
file.write;

-- read the entire content from file
let content := file.read;

file.close; 

put content;
write;

over.
```

Expected output:

```
"Hello World!"
```

**File IO**

Other functions available in systen.io

| Function | Purpose
|----------|------------------------------------------ 
| .exist   | Check if file exist on disk
| .list    | Read file list from directory
| .open    | Open a file for read or write
| .close   | Close a file after using it
| .erase   | Remove a file from disk
| .clean   | Remove all files from directory
| .make    | Make a directory
| .remove  | Remove a directory
| .find    | Find a list of files in directory

**Work in progress:
