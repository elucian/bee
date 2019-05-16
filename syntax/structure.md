# Program structure

Bee language enable developers to create small programs using a single file, or a larger program using multiple files. Each file have extension *.bee or *.cfg and it represents a module or a configuration file. Bee is a space sensitive language. That means indentation of code and spaces are relevant.

**bookmarks**

Next we describe better Bee structure:

* [Project](#project)
* [Declaration](#declaration)
* [Statement](#statement)
* [External Code](#external-code)
* [Context](#global-context)
* [Comments](#comments)
* [Execution](#execution)

## Project

Bee project is a folder with a specific structure. A project contains one or more applications that can run independent of each other on same computer or a group of computers. Applications can be designed to collaborate with each other into n-tire architecture.

**project tree**

Next project tree contains two applications: client/server

```
$pro_home
  |-- bin
  |   |--client.exe
  |   |--server.exe
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
  |-- client.cfg
  |-- server.cfg

``` 

### System Variables
At the beginning of each component we can define system variables using prefix "#".

```
#module.role := "driver" | "aspect" | "component"
#module.name := "name"
#module.description := "description"
```

**module**

The #module is an system object that have pre-defined properties.

* role: can have 3 exclusive values:_driver_, _aspect_, _component_
* name: the driver name it is usually the same as the file name
* description: a short description of the module

**Notes**
* A program can have one single _driver_;
* A driver can load one or more _components_;
* A driver can execute one or multiple _aspects_;

### System Constants
There are several predefined constants available in Bee. System constants are using "$" prefix. These constants can be used to locate project files. You can define new system constants at the beginning of your _driver_.

| Constant | Environment| Description                |
|----------|------------|----------------------------|
|$bee_home | bee_home   | Level home folder          |
|$bee_lib  | bee_lib    | Level library home         |
|$bee_path | bee_path   | Level library path         |
|$pro_home | N/A        | Program home folder        |
|$pro_lib  | N/A        | Program library home       |
|$pro_mod  | N/A        | Program modules home       |
|$pro_log  | N/A        | Reporting folder           |

### Configuration
One application can load system constants from a configuration file. These are stored as "name:value" pairs of strings. Some system constants can be derived from environment variables. These are defined implicit in Bee runtime environment. 

Configuration file can be used by the compiler. This is called "compile-time" configuration file. Other configuration files are specific to a particular session. These are called "run-time" configuration files. There is no difference between the two except the file name and the values. 

### Driver
There is one single driver file for one application. This file has #module.role = "driver". You can interrogate any of module attributes using comparison operators. A driver has the role to lead the application main functionality. 

A driver can define global variables, application menu and can connect to a database. When a driver is terminated the application stop. Usually a driver terminate with keyword: _over_ or _halt_.

### Aspect
One aspect is a module located in _"src"_ folder. A driver can _play_ an aspect with parameters and capture the results after driver execution. An application architect can separate system concerns in multiple aspects.

**execution**
Aspects can not be executed in parallel but sequential. We consider that aspects are depending on each other to be executed in order like a process. If one aspect fail to execute the application should analyze the error and continue or terminate the driver execution.

**notes:**
* One aspect can accept parameters;
* One aspect can produce results; 
* Usually aspect members are private;
* To execute one aspect you use keyword: _play_

### Library
Libraries are folders containing reusable components. A library in usually a sub-folder stored in _"lib"_ root folder. A reusable component contains public members. From a library you can load all components or specified components.

**notes:**
* A component must have public members;
* A component does not have parameters;
* A component does not produce results;

## Declaration

Bee is using 7 kind of declarations:

* load     -- import : a library in global scope
* alias    -- declare: alternative name for library or aspect
* define   -- declare: constant
* input    -- declare: aspect parameters
* output   -- declare: aspect results
* type     -- declare: data types
* make     -- declare: variable
* rule     -- declare: named code block

## Statement

Each statement start with one imperative keyword: 

**Examples:**

* alter    -- change/modify variable value or assign new value
* read     -- accept input from console into a variable
* write    -- output to console result of an expressions
* play     -- play one aspect of a program synchronously
* apply    -- execute one rule in synchronous mode
* start    -- execute one rule in asynchronous mode

**notes:**

* One statement is usually indented 2 space;
* One statement is usually described in a single line;
* One expression in a statement can extend on multiple lines;
* Multiple statements on a single line are separated with ";"
* You can have a comment at end of line using "--" 
* A statement may continue after the end of line comment;

### Code block
Statements can be contained in blocks of code.

* with  -- create a scope qualifier suppression block/ mapping block
* when  -- create multi-path conditional selector
* quest -- create a multi-path value selector
* cycle -- create unconditional repetitive block of code
* while -- create conditional repetitive block of code
* scan  -- create visitor block for all elements in a collection
* trial -- create trial/error block of code to handle exceptions

**notes:**

* Each block is finalized with a different keyword:
* Closing keyword can be one of: { done, repeat, next };
* Statements and nested blocks are using indentation at 2 spaces;

### Rogue statement

A _driver_ or _aspect_ can contain statements that do not belong to any rule. These are called _rogue_ statements and are driving the program execution. Rogue statements are executed top down until to last keyword that is usually _over_.

**Example:**

```
#driver "main"

-- declare input parameters
input *params ∈ [String];

-- check existence of parameters
make c := params.count;
halt -1 if (c = 0);

-- print comma separated parameters
make i:= 0 ∈ Z;
while (i < c) do
  write params[i];
  alter i += 1;
  write "," if (i < c);
repeat;

-- print the buffer to console
print;
  
over; --end of driver
```

Do not try to understand this example. It is just a worm-up! 

**Notes:** 
* This program is a #driver having file-name "main.bee";
* Input parameter _*params_ is an array of strings;
* Any Bee module is ending with mandatory keyword: _"over"_ ;
* Early driver termination can be trigger using: halt or exit;

## External code

Libraries and modules can be imported like this:

**Imports:**

```
load $bee_lib/folder_name/*.bee;
load $bee_lib/folder_name/(x,y,z);
```

* using: /*.bee  all files with extension _bee_ are found on disk and parsed;
* using: (x,y,z) only x,y,z files are found on disk and parsed;

**Qualifier**
Bee use _"dot notation"_ to locate external members. After import the file name becomes scope qualifier for this notation.

```
qualifier.member_name
```

qualifier ::= file_name
qualifier ::= folder_name.file_name

**Alias**

You can create an alias for a qualifier or for specific members:

```
alias qualifier := folder_name.file_name
alias element   := qualifier.member_name
```

**Examples:**

```
load $runtime.cpp_lib:(*); --load cpp library
load $runtime.asm_lib:(*); --load asm library
load $runtime.bee_lib:(*); --load core library
load $program.pro_lib:(*); --load project library
```

## Global context

One application has a global context where variables and constants are allocated. Each application file can contribute with new elements that can be created in this context.

* Global context helps to store and identify global data and public members;
* When a module is loaded, all public members are defined in the global context;

## Local context

Local context is a private memory space available in a _rule_ or _trial_ block.

**example**
```
#driver "test"
** global context
make i := 1 ∈ Z; 
trial
  ** local context
  make i := 2 ∈ Z;
  print i ; -- expected: 2
done;
print i ; -- expected: 1  

over.
```
**See examples:** 
* [lv.bee](../demo/lv.bee)
* [gv.bee](../demo/gv.bee)  

## System variables

* System variable names start with symbol "#" and are declared usually at beginning of module; 
* Several predefined system variables are available in _global context_ with no declaration;

```
#error     -- contains last exception/error created by "fail"
#precision -- contains default precision for Q = 0.001
```

**note** 
* System variables are application states;
* System variable do not require scope qualifier;

## Public members

In Bee all members that begin with dot "." are public members.

* A public member from a library can be access with dot qualifier;
* A public member from one Ordinal number can be access with dot qualifier;
* We can use _with_ keyword to suppress dot qualifier;

```
--public constant
define .pi := 3.14;

--public variable
make .v ∈ N;

--public rule
rule .f(x ∈ N) => (x + 1) ∈ N;

--public rule
rule .m(x, y ∈ N, r @ N);
  alter r := x + y;
return;
```

## Comments

Bee enable redundant notations for comments:

**End of line**

For each line of code you can use optional "--" follow by a short comment before end of line.
 
* you can use "--" in the middle of an expression before end of statement ";" symbol;
* you can have multiple statements separated by ";" in a single line but only one comment;

**Single line**

For single line comments we use a pair of two symbols: 

{ "--", "**", "##" } 

* You can use \#\# in your program as title comments starting at beginning of a line;
* You can use \*\* in your program as sub-title comments or line separator;
* You can use \-\- as end of line comment or indented single line comment.

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

**Outline comment**

You can comment out a block of code using notation: "|*......*|"

```
|***************************|
|* print "commented out"   *|
|* old style block comment *|
|***************************|
```

**Possible separators:**

If a program is very large you can use separators to create large sections of code.

```
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
over; -- end of program
****************************************************************
** Alternative boxed comment for ancient matrix printers      **
****************************************************************
```

**note:** 
Any test after the end of program is considered a comment and
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
load $pro.src.file_name.bee;

-- play when aspect do not have any result:
play aspect_name(parameter_list);

-- result can be captured using ":=" or any other modifier:
play aspect_name(parameter_list) +> result
```

#### Parameters

```
#aspect "mod"

input  i ∈ Z ; --define parameter "i"
output v ∈ N ; --define result "v"

when (i < 0) do
  alter v := -i;
else
  alter v := i;
done;  

over.
```

```
#driver "main"

-- define variable result
make result ∈ N;

-- define aspect "mod"
load $pro/mod.bee;

-- execute aspect "mod"
play  mod(-3) +> result;
print result ; --expect: 3

over.
```

One aspect can have multiple parameters and multiple results:
```
input a,b ∈ Z, c ∈ R; --define parameters "a,b,c"
output v,z ∈ N; --define two results "v" and "z"
```

**note:** 
* only one input statement is used for one aspect;
* only one output statement is used for one aspect;

**Read next:** [Syntax Overview](overview.md)
