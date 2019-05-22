# Program structure

Bee language enable developers to create small programs using a single file, or a larger program using multiple files. Each file have extension *.bee or *.cfg and it represents a module or a configuration file. Bee is a space sensitive language. That means indentation of code and spaces are relevant.

**bookmarks**

Next you can learn general concepts about Bee applications:

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

### Configuration
One application can load system constants from a configuration file. These are stored as "$name:value" pairs. Some system constants can be derived from environment variables using concatenation operators "&","+", "/" or "\\". 

A configuration file have extension *.cfg. It can be used by the compiler or by the application. One application can run with different configuration files. Application documentation must contain description of configuration constants.

Sometimes a _file template_ is provided to for copy and modify. Template file may contain comments using Bee syntax that you will learn later. Bee application will automatically parse configuration file to read values for: _system constants_.

**compiling:**
Bee can use a compile-time configuration file:
```
\>bee program_name -c file_name.cfg
```

**running:**
Bee can use a runt-time configuration file:
```
\>program_name -c file_name.cfg
```

### System Constants
 System constants are using "$" prefix. These constants are global and immutable. There are several predefined constants available in Bee. These constants can be used to locate project files or connect to databases. You can define new system constants at the beginning of your _driver_ module.

| Constant | Environment| Description                |
|----------|------------|----------------------------|
|$bee_home | BEE_HOME   | Bee home folder            |
|$bee_lib  | BEE_LIB    | Bee library home           |
|$bee_path | BEE_PATH   | Bee library path           |
|$pro_home | N/A        | Program home folder        |
|$pro_lib  | N/A        | Program library home       |
|$pro_mod  | N/A        | Program modules home       |
|$pro_log  | N/A        | Reporting folder           |

### System Directives

Directives are controlling the application compilation. These directives have a pre-defined constant value. You can setup these values in compiler configuration file. Once compilation is done you can not change these options.

| Constant | Default value | Description
|----------|---------------|----------------------------------------------------------------
|$precision| 0.001        | Control numeric precision
|$recursion| 10000        | Control how deep a recursion before give up
|$timer    | 10           | Control time in seconds before a loop give up
|$debug    | Off / On     | Control if debug information is included
|$echo     | Off / On     | Control if statement is printed to console in case of error
|$trace    | Off / On     | Control if #trace variable is populated with information
|$date     | DMY / MDY    | Control date format: DD/MM/YYYY or MM/DD/YYYY
|$time     | T24 / T12    | Control time format: HH:MM:SS,MS am/pm or HH:MM:SS,MS
|$platform | "Windows"    | Alternative: "Linux", "Mac" is the target platform

**note**
* You can overwrite system directives in driver but not in _aspect_ or _component_ modules;
* Precision is controlling both: rational numbers and display precision for floating numbers;

### System Variables

System variables are defined usually at the beginning of the module. 

**predefined**
```
#error  -- contains last error message
#stack  -- contains debug information about current call stack
#trace  -- contains reporting information about executed statements
#level  -- contains how deep is the current call stack
#count  -- contains last query count: updated/inserted/deleted records
#query  -- contains last native query statement
```

**notes:** 
* System variables are global and may be specific to a module;
* User can create new system variables specific to application;
* Prefix "#" is used to avoid scope qualifier and improve code readability;

### Modules

A module is a source file with extension *.bee. We split an application in multiple modules. Once an application is compiled, all modules are merged into a monolithic application. Bee do not use dynamic loaded modules: (.dll)

**attributes**

One _module_ is identified by several _attributes_. These are _system variables_, used by the compiler:

* #role: can have 3 exclusive values:{ _driver_, _aspect_, _component_};
* #name: the driver name it is usually the same as the file name;
* #description: a short description of the module;

**Notes**
* Default role for a _module_ is _driver_;
* One application can have one single _driver_;
* One _driver_ can load one or more _components_;
* One _driver_ can _play_ multiple _aspects_;
* One _aspect_ can also load _components_;
* One _aspect_ can also _play_ other aspects;

### Drivers
There is one single _driver file_ for one application. This file has #role = "driver". A _driver_ has the role to lead the application main functionality. When _driver_ is over the application stop and give control back to operating system. 

A _driver_ can read configuration file, define system constants, system variables, application menus, database connections and such. It is the application entry point. A driver can be terminated early using keywords: _halt_, or _fail_. Normally a driver file is ending with keyword: _over_ followed by a dot.

### Aspects
An application architect can separate system concerns in multiple _aspects_. One aspect is a module located in _"src"_ folder. A driver can _play_ multiple aspects with parameters. Aspect result can be captured after execution using operator "+>". Not all _aspects_ have a result. 

**execution**
Aspects can not be executed in parallel but only sequential. We consider that various _aspects_ can depend on each other to be executed in order like a process. If one aspect fail the application should analyze the #error and continue or terminate the execution.

**notes:**
* One aspect can accept parameters;
* One aspect can produce results; 
* One aspect must have rogue statements;
* Usually aspect members are private;
* To execute one aspect you use keyword: _play_;

### Components
Components are reusable modules organized in libraries. A library in a sub-folder stored in _"lib"_ folder. A component contains public members but does not have rogue statements. One module can _load_ from a library one or more components. A component usually do not have rogue statements and is not executable using _play_ statement;

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
#role := "driver";
#name := "main"

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
* This program is a #role = "driver" having file-name "main.bee";
* Input parameter _*params_ is an array of strings;
* Any Bee module is ending with mandatory keyword: _"over"_; 
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

You can create an alias for a scope qualifier or for specific members:

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

## Name space

A module can establish one or more name-spaces where you can define module members and statements.

**example**
```
** module name-space
make i := 1 ∈ Z; 
trial
  ** local name-space
  make i := 2 ∈ Z;
  print i;  -- expected: 2
done;
print i;  -- expected: 1  

over.
```
**See examples:** 
* [lv.bee](../demo/lv.bee)
* [gv.bee](../demo/gv.bee)  

A module member can be found using dot notation, also known as _scoping_ operator:

**syntax:**
```
scope_name.member_name
```

## Public members

In Bee all members that begin with dot "." are public members.

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

**note:** 
* private members are visible in current module and do not require _scoping_ notation;
* public members are visible from external modules using _scoping_ notation;

## Comments

Comments can be used to document the code or the configuration files.

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
#role := "driver"

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

* A driver is the program main entry point. It is executed only once;
* A component do not contain rogue statements and do not have parameters;
* An aspect can contain rogue statements that are executed using _play_;

#### Aspect Execution

A large program can have multiple _aspects_. The driver control the execution of aspects in specified order top down. Before execution of every aspect the driver can interact with the user to ask for input. After playing one or more aspects the driver can print the results to the console.

**properties**

* An aspect can be executed once or multiple times; 
* An aspect is executed using keyword _play_;
* An aspect can receive parameters and can produce results;
* An aspect is always executed synchronously, not in parallel;
* An aspect can not be used in expressions except unpacking;
* An aspect can be terminated early using:"exit" or "halt" or "fail";

**pattern**

```
-- declare an alias for an aspect file
load $pro.src.file_name.bee;

-- play when aspect do not have any result:
play aspect_name(parameter_list);

-- result can be captured using "+>" or any other modifier:
play aspect_name(parameter_list) +> (result,...)
```

#### Parameters

```
#name := "mod";
#role := "aspect";

input  i ∈ Z;  -- input parameter "i"
output v ∈ N;  -- output parameter "v"

when (i < 0) do
  alter v := -i;
else
  alter v := i;
done;  

over.
```

```
#role := "driver";

-- define variable result
make result ∈ N;

-- define aspect "mod"
load $pro/mod.bee;

-- execute aspect "mod"
play  mod(-3) +> result;
print result;  --expect: 3

over.
```

One aspect can have multiple input and output parameters:
```
input a,b ∈ Z, c ∈ R; --input parameters
output v,z ∈ N; -- output parameters
```

**note:** 
* both input/output statements are optional;
* one aspect can have single input and single output statement;


**Read next:** [Syntax Overview](overview.md)
