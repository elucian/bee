# Program structure

* One Bee program has one driver and multiple aspects.
* All program files have the same extension:  *.bee

**bookmarks**
* [Project](#project)
* [Declaration](#declaration)
* [Statement](#statement)
* [External Code](#external-code)
* [Context](#global-context)
* [Comments](#comments)
* [Execution](#execution)

## Project

Bee project is a folder with a specific structure. This folder contains one or many programs that can run independent of each other on same computer or multiple computers. Programs can be designed to collaborate with each other into n-tire application architecture.

**project tree**
```
$pro_home
  |-- bin
  |
  |-- src
  |   |-- aspect1.bee
  |   |-- aspect2.bee
  |
  |-- lib
  |   |-- library1.bee
  |   |-- library2.bee
  |
  |-- doc
  |   |-- readme.md
  |
  |-- client.bee
  |-- server.bee

``` 

## System Variable
There are several predefined constants that program will provide for dealing with environment variables. System constants are using uppercase letters and "$" prefix. System variables can be used to locate project component files.

The location where the Bee is installed is $bee_home. Bee library folder is $bee_lib. These variables are created by Bee run-time environment. It can be the virtual machine or the compiled program itself.

| Constant | Environment| Description                |
|----------|------------|----------------------------|
|$bee_home | bee_home   | Level home folder          |
|$bee_lib  | bee_lib    | Level library home         |
|$bee_path | bee_path   | Level library path         |
|$pro_home | N/A        | Program home folder        |
|$pro_lib  | N/A        | Program library home       |
|$pro_mod  | N/A        | Program modules home       |
|$pro_log  | N/A        | Reporting folder           |

## Aspect
One aspect is a project file usually located in _"src"_ folder that can be executed from driver. Aspects can play each otherand and communicate using parameters. A good architect will separate concerns in multiple aspects with sugestive names.

**notes:**
* One aspect can accept parameters and can produce results; 
* Aspect file contains statements and declarations; 
* Usually all aspect members are private;

## Library
Libraries are reusable project components usually located in _"lib"_ folder. A library is a file that contains public elements. A library can be re-used in multiple programs.

**notes:**
* Library members are usually public;
* A library does not have parameters;
* A library does not produce results;


## Directive
Symbol "#" is used to create a compiler directive. Bee has 3 kind of program files each with different role: 

```
#library -- declare reusable library
#aspect  -- declare one aspect of a problem
#driver  -- declare main program
```

**Notes**
* A program must have one single driver file;
* A driver can include several libraries;
* A driver can execute multiple aspects;
* A library can be included in another library;

## Declaration

Bee is using 7 kind of declarations:

* load     -- define: library
* define   -- define: constant
* input    -- define: aspect parameters
* output   -- define: aspect results
* type     -- define: data types
* make     -- define: variable
* rule     -- define: rule

## Statement

Each statement start with one keyword. 

**Examples:**

* alter    -- change/modify variable value or assign new value
* read     -- accept input from console into a variable
* write    -- output to console result of an expressions
* play     -- play one aspect of a program synchronously
* apply    -- execute one rule in synchronous mode
* start    -- execute one rule in asynchronous mode

**notes:**

* One statement is ending at end of line if expression is finish;
* One statement can extend on multiple lines if expression is unfinished;
* You can not have multiple statements in a single line, except if statement;
* You can have a comment at end of line using ";" but this do not end the statement;

## Code block
Statements can be contained in blocks of code.

* begin -- create unconditional local context
* trial -- create trial/error block of code to handle exceptions
* when  -- create multi-path conditional selector
* scan  -- create visitor block for all elements in a collection
* cycle -- create unconditional repetitive block of code
* while -- create conditional repetitive block of code

**notes:**

* Each block is finalized with a different keyword:
* It can be: {"ready, done, repeat, next, over"}

## Driver file

Bee is a free form language. That means indentation of code is not relevant.
In Bee there is no _main()_ function. Instead we define a _driver_ file using directive #driver. 
This is the program entry point. One program can have a single _driver_ and many _aspects_.

A _driver_ can contain statements that do not belong to any rule.
These are called _rogue_ statements and are driving the program execution.
Rogue statements are executed top down until over keyword is riched.

**Example:**

```
#driver "main"

-- declare input parameters
input *params ∈ [String] 

-- check existence of parameters
make c := params.count
halt -1 if (c = 0)

-- print comma separated parameters
begin
  make i:= 0 ∈ Z
  while (i < c)
    write params[i]
    alter i += 1
    write "," if (i < c)
  repeat
  -- print the buffer to console
  print
ready  

over ; end of "main" program
```

Do not try to understand the example. This is just a worm-up! 

**Notes:** 
* This program is a #driver having file-name "main.bee";
* Variable parameter _*params_ is an array of strings;
* Any Bee module is ending with "over" that is mandatory keyword;
* Early driver termination can be trigger by "halt" or "exit";

## External code

Libraries and modules can be imported like this:

**Imports:**

```
load $bee_lib/folder_name/file_name
load $bee_lib/folder_name/*
```

* using :(*) all files with extension *.bee are included
* using :(x,y,z) only x,y,z files are found and included

Create alias for external identifiers to supress qualifier

```
alias name := file_name.member_name
alias name := folder_name.file_name.member_name
```

**Environment variables**

* Environment variables are global, usual uppercase and start with $ symbol. 
* All system variables are automatic imported from OS environment into global variables.
  
## Global context

One module or library is using a single global context. 

**usability**

* Bee is using one global context. This context is accessible in all files.
* Global members can be public or private. Public members start with a dot prefix;
* Global members are visible with qualifier name using dot notation;


**system variables*

* System variable names start with symbol "$" and are declared first; 
* Some pre-defined system variables are available in global context.

```
$path    = $bee_path  -- contains a list of folders
$program = $bee_pro   -- contains path to current program
$runtime = $bee_home  -- contains path to Bee runtime home
$error        -- contains last exception/error created by "fail"
$precision    -- contains default precision for Q = 0.001
$global       -- global context: universal qualifier
$local        -- local context: universal qualifier
```

**note** System variable do not require context qualifiers:

**importing**

```
load $runtime.cpp_lib:(*)  ; load cpp library
load $runtime.asm_lib:(*)  ; load asm library
load $runtime.bee_lib:(*)  ; load core library
load $program.pro_lib:(*)  ; load project library
```

**See example:** [gv.bee](../demo/gv.bee)

## Local context

Local context is a private memory space.

**example**
```
#driver "test"
** global context
make i := 1 ∈ Z  
do  
  ** local context
  make i := 2 ∈ Z
  print i ;expected: 2
done
print i ;expected: 1  

over.
```
**See example:** [lv.bee](../demo/lv.bee)

## Public member

In Bee all members that begin with dot "." are public members.

* A public member from a library can be access with dot qualifier;
* A public member from one Ordinal number can be access with dot qualifier;
* We can use _with_ keyword to suppress dot qualifier;

```
--public constant
define .pi := 3.14

--public variable
make .v ∈ N

--public rule
rule .f(x ∈ N) => (x + 1) ∈ N

--public rule
rule .m(x, y ∈ N, r @ N)
  alter r := x + y
return
```
## Rule ABI mapping
In Bee one can use external rules written in Assembly, Ada, C or CPP.
Usually these mappings are implemented in a #library file.

**Example:**
This is myLib.bee file: 
```
#library "mLib"

load $runtime.cpp.myLib.(*) ; load cpp library

-- define a wrapper for external "fib"
rule fib(n ∈ Z) => (x ∈ Z)
  alter x := myLib.fib(n -> Z)
return

```

This is the driver file.
```
#driver "main"
-- load library
load $bee.lib.myLib.(*)

--use external rule
print myLib.fib(5)
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)


## Comments

Bee enable several notations for comments: 

**End of line**

For end of line comment Bee used semi-column ";"

**Single line**

For single line comments we use a pair of two symbols: 

{ "--", "**", "##" } 

* You can use \#\# in your program as title comments starting at beginning of a line.
* You can use \-\- as indented comments. You can also use \-\-\ as a long line separator.

**Notes:** These are chosen for following reasons:

1. In Wiki "**" is for making titles bold. So Bee is Wiki friendly.
2. In Wiki "##" represents title 2. Iʼm using Wiki notation to print Bee documentation.
3. A Wiki page can be open and looks good using Bee syntax color in Notepad++
4. In wiki pages apostrophe can not use "'" instead use Unicode symbol: `ʼ`


**Boxed comments**

For boxed comments we use two symbols "+- ... -+".

```
+----------------------------------
| Boxed comment:                  |
|  - Do not support nesting       |
|  - Upper left + corner missing  |
+---------------------------------+
```

**Block comments**
Comment out a block of code using: "|*......*|"

```
|*
print "commented out"
*|

```

**Possible separators:**

If a program is very large you can use separators to create large sections of code.

```
####
****
----
```

**Example:**

In next example we are using various comments into a demo program.

```
+---------------------------------------------------------------
| At the beginning of program we can have  several comments    | 
| to explain how the program works. This notation is preferred.|
---------------------------------------------------------------+
#driver "demo"
## This is a title in program
   ** This is a sub-title in program
----------------------------------------------------------------      
over. ;end of program
****************************************************************
** Alternative boxed comment for ancient matrix printers      **
****************************************************************
```

**note:** 
Any test after the end of programm is considered a comment and
is ignored by the compiler. After last "." nothing else is parsed.

## Execution

#### Program Execution

When a program is executed the driver is located and executed first. If a program do not have a "driver", it can not be executed nor compiled into an executable file. 

* A #driver is the program main entry point. It is executed only once;
* A #library do not contain rogue statements and do not have parameters;
* An #aspect can contain rogue statements that are executed using "play";

#### Aspect Execution

A large program can have multiple _aspects_. The driver control the execution of aspects in specified order top down. Before execution of different aspects the driver can interact with the user to ask for input. After playing one or more aspects the driver can report results or a provide feedback.

**properties**

* An aspect can be executed once or multiple times; 
* One aspect of a problem is executed using keyword _play_;
* An aspect can receive parameters and can produce results;
* An aspect is always executed synchronously, not in parallel;
* An aspect can not be used in expressions except unpacking or assignment;
* An aspect can be terminated early using:"exit" or "fail";
* Using "halt" in aspect cause the program to stop immediately.

**pattern**

```
-- declare an alias for an aspect file
load $pro.src.file_name.bee

-- play when aspect do not have any result:
play aspect_name(parameter_list)

-- result can be captured using ":=" or any other modifier:
play aspect_name(parameter_list) +> result
```

#### Parameters

```
#aspect "mod"

input  i ∈ Z ; define parameter "i"
output v ∈ N ; define result "v"

when (i < 0)
  alter v := -i
else
  alter v := i
ready  

over.
```

```
#driver "main"

-- define variable result
make result ∈ N

-- define aspect "mod"
load $pro/mod.bee

-- execute aspect "mod"
play  mod(-3) +> result
print result ; expect: 3

over.
```

One aspect can have multiple parameters and multiple results:
```
input a,b ∈ Z, c ∈ R ; define parameters "a,b,c"
output v,z ∈ N ; define two results "v" and "z"
```

**note:** 
* only one input statement is used for one aspect;
* only one output statement is used for one aspect;

**Read next:** [Syntax Overview](overview.md)
