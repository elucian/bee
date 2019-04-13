# Program structure

* One Bee program has one driver and multiple aspects.
* All program files have the same extension:  *.bee

**bookmarks**
* [Project](#project)
* [Directives](#directives)
* [Declarations](#declarations)
* [Statements](#statements)
* [Code blocks](#code-blocks)
* [External Code](#external-code)
* [Global scope](#global-scope)
* [Public members](#public-members)
* [Execution](#execution)
* [Comments](#comments)
* [Data types](#data-types)

## Project

Bee project is a folder with a specific structure. This contains one or many programs that can run independent or simultaneously. Programs can be used to collaborate into n-tire applications. 

## Aspects
One aspect is a file usually located in _"src"_ folder that can be used from main program. Aspects can call each other to resolve one or multiple concerns. A good architect will separate concerns in related aspects.

All aspect members are usually private. One aspect can accept parameters and can produce one or multiple results. Also one aspect can use global variables. This method is discouraged. It is better to use parameters and results for communication.

## Libraries
Libraries are reusable program components. A library is a file that contains public: types, constants and rules, called _members_. Libraries and aspects have the same file extension: *.bee. Aspects are specific to one project while libraries can be used into one or multiple projects.

Library members are usually public. One library can not have parameters and does not produce results. Instead a driver can import a library and combine itʼs members into statements and expressions.

There are two kind of libraries: Standard libraries, provided by Bee runtime environment and project specific libraries. These libraries are stored usually in _"lib"_ folder and are used by one or more aspects.

**tree**
```
$PRO_HOME
  |-- bin
  |
  |-- src
  |    |-- aspect1.bee
  |    |-- aspect2.bee
  |
  |-- lib
  |    |-- library1.bee
  |    |-- library2.bee
  |
  |-- doc
  |    |-- readme.md
  |
  |-- client.bee
  |-- server.bee

```

## System Variables
There are several predefined constants that program will provide for dealing with environment variables. System constants are using uppercase letters and "$" prefix. System variables can be used to locate project component files.

## Project Folders
The location where the Bee is installed is $BEE_HOME. Bee library folder is $BEE_LIB. These variables are created by Bee run-time environment. It can be the virtual machine or the compiled program itself.

| Constant | Environment| Description                |
|----------|------------|----------------------------|
|$BEE_HOME | BEE_HOME   | Level home folder          |
|$BEE_LIB  | BEE_LIB    | Level library home         |
|$BEE_PATH | BEE_PATH   | Level library path         |
|$PRO_HOME | N/A        | Program home folder        |
|$PRO_LIB  | N/A        | Program library home       |
|$PRO_MOD  | N/A        | Program modules home       |
|$PRO_LOG  | N/A        | Reporting folder           |


## Directives
Compiler directive symbol "#" is used to identify type.
Bee has 3 kind of program files each with different role: 

```
#library -- reusable library
#aspect  -- one aspect of a problem
#driver  -- main program
```

**Notes**
* A program must have one single driver file;
* A driver can include several libraries;
* A driver can execute multiple aspects;
* A library can be included in another library;
* An aspect can not be included in a library;
* Global variables are shared between driver an aspects;
* One aspect instance is identified by aspect qualifier;

## Declarations

Bee is using 4 kind of declarations:

* import  -- define: library
* alias   -- define: aspect name
* define  -- define: constant
* accept  -- define: aspect parameters
* return  -- define: aspect results
* type    -- define: data types
* make    -- define: variable
* rule    -- define: rule

## Statements

Each statement start with one keyword. 

**Examples:**

* alter   --change/modify variable value or assign new value
* read    --accept input from console into a variable
* write   --output to console result of an expressions
* resolve --resolve one aspect of a larger problem

Any statement is mandatory terminated by ";" 
Multiple statements on a single line are separated by ";"

## Code blocks
Statements can be contained in blocks of code.

* Each block of code start with a specific keyword.
* Block of code is ending with same keyword and ";"

**Keywords:**

* when    -- create multi-path selector using conditions
* switch  -- create multi-path selector using a value
* while   -- create repetitive block of code
* trial   -- create a block of code to handle exceptions

## Driver file

Bee is a free form language. That means indentation of code is not relevant.
In Bee there is no _main()_ function. Instead we define a _driver_ file using directive #driver. 
This is the program entry point. One program can have a single _driver_ and many _aspects_.

A _driver_ can contain statements that do not belong to any rule.
These are called _rogue_ statements and are driving the program execution.
Rogue statements are executed top down in synchronous mode.

**Example:**

```
#driver "main"

make i, c ∈ Z;
alter c := $params.count;

over if (c = 0);
-- comma separated parameters
while (i > c):
  write $params[i];
  alter i += 1;
  write "," if (i < c);
while;
-- print the buffer to console

over;
```

**Notes:** 
* This program is a #driver having file-name "main.bee";
* $params is a global system variable available in #driver and #aspect;
* Parameter _params_ is of type [S] that is a list are strings;
* Bee file is ending with "over;" that is mandatory keyword;

Do not try to understand the example. This is just a worm-up :)

## External Code
In Bee library can be imported like this:

**Imports:**

```
#import bee_lib;
```

* use :* all public members are used
* use :(x,y,z) only x,y,z members are used

Using a qualifier for Bee aspect members:

**pattern**
```
-- import with qualifier
#import qualifier := path/library_name:(*);
#import qualifier := path/library_name:(member_list);

-- use qualifier for rule execution:
apply qualifier.rule_name(arguments);
```

**Environment variables**

* Environment variables are global, usual uppercase and start with $ symbol. 
* All system variables are automatic imported from OS environment into global variables.
  
## Global scope

**usability**

* Bee is using one global scope. Global variables are usually lowercase;
* Global variables are unique and are visible in all project components;
* Global variable name start with symbol "$" and are declared usually first; 
* Global variables do not need dot qualifier and are usually defined by libraries;

**system variables*

Some Bee pre-defined variables are available in global scope.

```
$path = $BEE_PATH  --contains a list of folders
$pro  = $BEE_PRO   --contains path to current program
$bee  = $BEE_HOME  --contains path to Bee runtime 
$params --contains a list of parameters
$error  --contains last exception
$dres   --contains default resolution for Q = 0.001
```

**importing**

```
#import cpp_lib := $bee.cpp.myLib:(*) --import cpp library
#import asm_lib := $bee.asm.myLib:(*) --import asm library
#import bee_lib := $bee.lib.myLib:(*) --import core library
#import pro_lib := $pro.lib.myLib:(*) --import project library
```

**See example:** [gv.bee](../demo/gv.bee)

## Local scope

Local scope is a private memory space;
Local variables are private inside local scope;
One aspect can have local constants, variables and rules;
One library can have local constants, variables and rules;
Bee rules can have local declarations or public declarations. 

**See example:** [lv.bee](../demo/lv.bee)

## Public members

In Bee all members that start with dot "." are public members.

* A public member from a library can be access using dot qualifier;
* A public member from one Ordinal number can be access without dot qualifier;

```
--public constant
define .pi := 3.14;

--public variable
make .v ∈ N;

--public rule
rule .f(x ∈ N) => (x + 1) ∈ N;

--public rule
rule .m(x, y ∈ N, r @ N):
  alter r := x + y;
rule;

```
## Rule ABI mapping
In Bee one can use external rules written in Assembly, Ada, C or CPP.
Usually these mappings are implemented in a #library file.

**Example:**
This is myLib.bee file: 
```
#library "mLib"

#import $bee.cpp.myLib.(*); -- load cpp library

-- define a wrapper for external "fib"
rule fib(n ∈ Z) => (x ∈ Z):
  alter x := myLib.fib(n -> Z);
rule;

```

This is the driver file.
```
#driver "main"
-- import library
#import $bee.lib.myLib.(*);

--use external rule
print myLib.fib(5);
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)
 
## Comments

Bee enable several notations for comments: 

### Single line comment**

For single line comments we use a pair of two symbols: 

{ "--", "**", "##" } 

**Comment conventions:**

* You can use \#\# in your program as title comments starting at beginning of a line.
* You can use \-\- as the end of a line comment. You can also use \-\-\> like an arrow.

**Notes:** These are chosen for following reasons:

1. In Wiki "**" is for making titles bold. So Bee is Wiki friendly.
2. In Wiki "##" represents title 2. Iʼm using Wiki notation to print Bee documentation.
3. A Wiki page can be open and looks good using Bee syntax color in Notepad++

The only problem is the apostrophe must not use "'" instead you can use Unicode symbol: ` ʼ `

**Possible separators:**

If a program is very large you can use separators to create large sections of code.

```
------------------------
************************
```

### Multi-line comments

For multi-line comments we have 3 possible comments.

```
1. Vertical bar comment:      |* .... *| (expression comment)
2. (+/-) comment  block:      +- .....-+ (start program comment)
3. A rogue string that is not used in a statement is ignored by the compiler. 
```

**Example:**

In next example we are using various comments into a demo program.

```
+----------------------------------------------------------------
   At the beginning of program we can have  several comments    
   to explain how the program works. This notation is preferred.
----------------------------------------------------------------+
#driver "demo"

## This is a title in program

** This is a sub-title in program

-- this is a demo driver with comments

over;
*******************************************************************
 After end of program we can use free text or normal comments. 
 These kind of comments are not available inside the program body. 
*******************************************************************
```

## Program Execution

When a program is executed the driver is located and executed first. If a program do not have a "driver" file it can not be executed nor compiled into an executable file.

* A #driver is the program main entry point. It is executed only once;
* A #library usually do not contain rogue statements do not have parameters;
* An #aspect can be executed multiple times using "resolve" statement;

One library is loaded only once. If a library is imported in many aspects and contain rogue statements these are executed when the library is imported. So these statement if they exist will "initialize" the library.

## Aspect Execution

In Bee you can split a large problem into multiple _aspects_. You can resolve one aspect at a time synchronously. The driver control the execution of aspects in specified order top down. Before resolving an aspect the driver can interact with the user to ask for input. After resolving an aspect the driver can retrieve, combine, report or save the results. Some aspects can be self sufficient and require minimum interaction with the driver.

**properties**

* An aspect can be executed once or multiple times; 
* One aspect of a problem is executed using keyword _resolve_;
* When aspect is resolved all rogue statements are executed;
* An aspect can receive parameters and can produce results;
* An aspect is always executed synchronously, never in parallel;
* An aspect can not be used in expressions except unpacking and assignment;

**pattern**

```
-- declare an alias for an aspect file
alias aspect_name := $pro.src.file_name.bee;

-- resolve when aspect do not have any result:
resolve aspect_name(parameter_list);

-- result can be captured using ":=" or any other modifier:
resolve result := aspect_name(parameter_list);

-- resolving and capture results in a list;
resolve result_list <+ aspect_name(parameter_list);
```

**parameters**

```
#aspect "mod"

accept i ∈ Z; -- define parameter "i"
return v ∈ N; -- define result "v"

when (i < 0):
  alter v := -i;
else:
  alter v := i;
when;  

over;
```

```
#driver "main"

-- define local variable result
make result ∈ N;

-- define aspect "mod"
alias mod := $pro/mod.bee

-- execute aspect "mod"
resolve result := mod(-3) ;
print   result; --> expect: 3

over;
```

**multiple**

One aspect can have multiple parameters and multiple results:
```
accept a,b ∈ Z, c ∈ R; -- define parameters "a,b,c"
return v,z ∈ N; -- define two results "v" and "z"
```

**note:** 
* only one accept is used for one aspect;
* only one return is used for one aspect;


**Read next:** [Syntax Overview](overview.md)
