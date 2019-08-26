## Program structure

Bee language enable developers to create small programs using a single file, or a larger program using multiple files. Each file have extension .bee or .cfg and it represents a component or a configuration file. Bee is a space sensitive language. That means indentation of code and spaces are relevant.

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

A configuration file have extension .cfg. It can be used by the compiler or by the application. One application can run with different configuration files. Application documentation must contain description of configuration constants.

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
 System constants are using "$" prefix. These constants are global and immutable. There are several predefined constants available in Bee. These constants can be used to locate project files or connect to databases. You can define new system constants at the beginning of your _driver_ component.

|Constant  | Environment| Description                |
|----------|------------|----------------------------|
|$bee_home | BEE_HOME   | Bee home folder            |
|$bee_lib  | BEE_LIB    | Bee library home           |
|$bee_path | BEE_PATH   | Bee library path           |
|$pro_home | N/A        | Program home folder        |
|$pro_lib  | N/A        | Program library home       |
|$pro_mod  | N/A        | Program components home    |
|$pro_log  | N/A        | Reporting folder           |

### Compiler directives

Compiler directives are system constants that control the compilation process. You can setup these options in compiler configuration file or in driver source file. You can not change these options after compilation. They are available for normal control flow statements. You can use _when_ statement to check $platform for example.

|Constant  | Default value | Description
|----------|---------------|----------------------------------------------------------------
|$precision| 0.00001       | Control numeric precision
|$recursion| 10000         | Control how deep a recursion before give up
|$timer    | 10            | Control time in seconds before a loop give up
|$debug    | "Off"         | Control if debug information is included
|$echo     | "Off"         | Control if statement is printed to console in case of error
|$trace    | "Off"         | Control if @trace variable is getting populated with information
|$date     | "DMY" / "MDY" | Control date format: DD/MM/YYYY or MM/DD/YYYY
|$time     | "T24" / "T12" | Control time format: HH:MM:SS,MS am/pm or HH:MM:SS,MS
|$platform | "Windows"     | Alternative: "Linux", "Mac" is the target platform

**note**
* You can overwrite compiler parameters in driver but not in _aspect_ or _module_ components;
* Precision is controlling display precision for real numbers, float and double numbers;

### System Variables

System variables are defined usually at the beginning of the component. 

**introspection:**

Following system variables are available for debugging:

```
@timer  //contains duration information about last executed statement
@stack  //contains debug information about current call stack
@trace  //contains reporting information about executed statements
@level  //contains how deep is the current call stack
@count  //contains last query count: updated/inserted/deleted records
@query  //contains last native query statement
@error   //contains last error or is empty = {}
@threads //contains number of active threads
```

**notes:** 
* System variables are global and are defined in a library;
* Prefix "@" is used to improve code readability;

### Components

A component is a source file with extension .bee. You can organize an application using multiple components. When compiled, all components are merged into a single monolithic application. 

**Name:**

One _component_ is identified by a _name_ created with one different keyword depending on component role:

* driver: define the leading component for an application;
* module: define a component that can be reused by many applications;
* aspect: define a component that belong to an application;

### Drivers
A _driver_ is the main application component. It has the role to lead the application main thread. When _driver_ execution is over the application give control back to the operating system.

**notes:**

* A _driver_ is the application entry point,
* Any application must have one single _driver_,
* A _driver_ can read configuration files at startup,
* A driver can be terminated early using keywords: _halt_, or _fail_.

### Modules
A _module_ is a reusable component usually located in a sub-folder of _"lib"_ folder. One driver or aspect can _load_ from a _library_ one or more _modules_ using _load_ statement. From each _module_ we can use one or more public members with scope qualifier using dot notation or aliases.

**notes:**
* Modules must have at least one public member;
* Modules does not have rogue statements;
* Modules can not be stored in project _"src"_ folder;
* You can loaded a module one single time;
* You can not load a module from a block statement;

### Aspects
An _aspect_ is a component located in _"src"_ folder. A _driver_ or another _aspect_ can execute an _aspect_ multiple times. After _aspect_ is executed, its states are removed from memory. Think of an aspect as a code fragment.

**notes:**
* An _aspect_ do not have public elements;
* An _aspect_ have rogue statements;
* An _aspect_ that has no rogue statements is unusable or unfinished;
* An _aspect_ can have parameters and side effects;
* An _aspect_ can be executed in parallel on multiple threads;
* An _aspect_ can be executed in parallel with other aspects;
* An _aspect_ can have results but can not be used in expressions;

## Declaration

Bee is using 6 kind of declarations:

* load  // import  a module in global scope
* alias // declare alternative name for module
* type  // declare data types
* make  // declare variable
* save  // declare a constant
* rule  // declare named code block

## Statement

Each statement start with one imperative keyword: 

**Examples:**

* alter  :change/modify variable value or assign new value
* read   :accept input from console into a variable
* write  :output to console result of an expressions
* apply  :execute one rule in synchronous mode

**notes:**

* One statement is usually indented 2 space;
* One statement is usually described in a single line;
* One expression in a statement can extend on multiple lines;
* Multiple statements on a single line are separated with ";"
* You can create _line comment_ using "*" 
* A statement may continue after _line comment_ on the next line;

### Code block
Statements can be contained in blocks of code.

* when  // create two ways decision statement
* case  // create multi path conditional selector
* while // create conditional repetitive block
* for   // create iterator for all elements in a domain or collection
* trial // create a block of code that may fail, to handle exceptions

**notes:**

* Each block is finalized with a different keyword:
* Closing keyword can be one of: { done, repeat, next };
* Statements in nested blocks are using indentation at 2 spaces;

### Rogue statement

A _driver_ or _aspect_ can contain statements that do not belong to any rule. These are called _rogue_ statements and are driving the program execution. Rogue statements are executed top down until to last keyword that is usually _over_.

**Example:**

```
driver main(*params ∈ S):
** read the number of parameters
make c := params.count;
halt if (c = 0);
** print comma separated parameters
make i:= 0 ∈ Z;
while (i < c) do
  write params[i];
  alter i += 1;
  write "," if (i < c);
repeat;
** print the buffer to console
print;
  
over. //end of driver
```

Do not try to understand this example. It is just a worm-up! 

**Notes:** 
* This program is a driver having file-name "main.bee";
* Input parameter _*params_ is an array of strings;
* Any Bee component is ending with mandatory keyword: _"over"_; 
* Early driver termination can be trigger using: halt or exit;

## External code

Modules can be imported from a library folder like this:

**Imports:**

```
load $bee_lib.folder_name:(*);     //load all modules from folder
load $bee_lib.folder_name:(x,y,z); //load modules x.bee, y.bee and z.bee
```

* using:(*) all modules from a folder are loaded in local scope;
* using:(x,y,z) only some modules are loaded in local scope;

**Qualifier**
Bee use _"dot notation"_ to locate external members. After load the file name becomes the scope qualifier for this notation. It is possible to change the qualifier name using `:=` like in example below:

```
load  qualifier := $bee_lib.folder_name.module_name; // load a single module
apply qualifier.member_name; // using a fake qualifier
```

**Note:**

A module is loaded with a fake qualifier only once. If you do it several times, the last qualifier is used. So it is legal to load all modules from one folder, then for a particular module you overwrite the qualifier name.

All public members must use the specified qualifier or you can use "with" block to suppress the qualifier for a region of code. Using "with" is useful but sometimes not good enough so we have invented the "alias".

**Alias**

You can create an alias for a specific member to eliminate the qualifier. This method can be used to "merge" public members into current scope. A member can have one single alias in a component. If you do it multiple times, only the last alias is used. It is a bad practice to change the alias of a member.

```
alias new_name := qualifier.member_name;
```

**Examples:**

```
load $runtime.cpp_lib:(*); // load cpp library
load $runtime.asm_lib:(*); // load asm library
load $runtime.bee_lib:(*); // load bee core library
load $program.pro_lib:(*); // load project library
```

## Global context

One application has a global context where variables and constants are allocated. Each application file can contribute with public elements that can be merged in this context. The global context can be also called _application context_ or _session context_;

* Global context helps to use _public identifiers_ from loaded components;
* When a component is loaded, its public members are defined in the _global context_;

## Name space

A component has its own name-space where you can define members and statements. Component namespace can contain public or private members.

**example:**
```
** component name-space
make i := 1 ∈ Z;   // create a private variable
trial
  ** local name-space
  make v := i;     // v is local reference to nonlocal: i 
  make i := 2 ∈ Z; // create i local 
  print i;         // expected: 2 (local)
  print v;         // expected: 1 (nonlocal)
done;
print i; //expected: 1  (unmodified)

over.
```
**See examples:** 
* [lv.bee](./demo/lv.bee)
* [gv.bee](./demo/gv.bee)  


## Public members

In Bee all members that begin with dot "." are public members.

```
** component name-space
save .pi := 3.14; // public constant (global)
make .v ∈ N;      // public variable (global)

** public rule f
rule .f(x ∈ N) ∈ N => (x + 1);

** public rule m
rule .m(x, y ∈ N) => (r ∈ N):
  alter r := x + y;
return;
```

**note:** 
* private members are visible in current component and do not require _scoping_ notation;
* public members are visible from external components using _scoping_ notation;
* public members can be renamed in global scope using "alias" statement;
* public members that have alias can still be called using the original identifiers;

## Comments

Comments can be used to document the code or the configuration files.

**Single line**

For single line comments we use one or two stars like: "\*\*";   

* This comment can be extended to multiple stars to create a separator,
* You can use single line comment at beginning of new line,
* You can use two spaces to indent the comment and align with the code.

**End of line**

Before new line of code: (EOL) you can use comments starting with bang: "//"

* notice one line may be or not a full statement. the end of statement is not (EOL)
* you can use "//" in the middle of an expression, if expression is on multiple lines,
* you can have multiple statements separated by ";" in a line but only one comment;

**Box comment

This notation is specific to Bee language. It is a multi-line comment starting with "+-" and end with "-+". The upper right corner is missing. I guess you will notice this defect later. However you can use old-style C comments.

**Old style C comments

This notation is supported in Bee for large section of blocks. It start with "/*" and end with "*/". Anything in between these two symbols are comments. Nested comments are supported. This kind of comments can be embedded in expressions. Therefore sometimes they are called "expression comments".

**Notes:** 
* Bee syntax is Wiki friendly: you can open *.md files using Bee highlighter for Notepad++
* Bee comments are inspired from C language, Ada language and Wiki notation
* Single hash "#" and double hash "##" is a title and recognized by Bee highlighter

**Limitations:**

1. You can not use contractions. This is silly but if you do you mess-up the highlighter,
1. Symbol "\\" has special meaning in Bee. Sometimes it must be escaped double bar "\\\\".
1. Symbol "//" can be used in Wiki URL, therefore you can not use it in expressions () [] or {}.

**Example:**

In next example we are using various comments into a demo program.

```
+------------------------------------------------------------------
| At the beginning of program you can have  several comments,     | 
| to explain how the program works. This notation is preferred.   |
+-----------------------------------------------------------------+
driver main:

** This is a single line comment
pass; // does nothing
... 

/* 
   This kind of comment is supported.
   /* Expression comments are allowed */
   /* Nested comments are allowed. */   
*/

** Expression comments
print ("comment in expression \n", /*first line*/
       "is working \n",            /*second line*/
       "this is a test \n"         /*last line*/ 
      ); // end of expression

over. // end of driver

*******************************************************************
** This is the old style boxed comment, used for matrix printers **
*******************************************************************
```

**note:** 
Any test after the end of program is considered a comment and is ignored by the compiler. After "over." nothing is parsed. So you can use free text or even code that you wish to preserve for later use.

## Execution

**driver:**

When a program is executed the driver is located and executed first. If a program do not have a "driver", it can not be executed nor compiled. The driver is the program main entry point. It is executed only once. 

**aspect:**

One aspect is executed from driver or from another aspect. When executed rogue statements of an aspect are executed top down in sequential order. You can not run an aspect from itself. Recursive aspects are not supported.

**module:**

The driver or aspect can load numerous modules. After loading, all public elements can be executed on demand. Before execution the driver can interact with the user to ask for input. After executing it can print feedback and reuse or store results for later use.


**pattern:**

This pattern demonstrate how to use a rule from a module named "module_name"

```** loading a module
load $pro.src.module_name;

** give alias to aspect rule
alias new_name: qualifier.rule_name;

** results can be captured using make
make result := qualifier.rule_name(arguments);

** modify a variable using rule alias:
alter result := new_name(arguments);
```

**pattern:**

This pattern demonstrate how to declare an aspect named "test.bee".

```
** define aspect with parameter "p" and result "r"
aspect test(p ∈ N) => (r ∈ N):

** define a local rule
rule abs(i ∈ Z) => (v ∈ N):
  when (i < 0) do 
    alter v := -i;
  else
    alter v := i;
  done;  
return;

alter r := abs(p); //call rule"abs"

over.
```

**Using aspect:**

Define driver named "main" and use previous defined "test" aspect.
```
** define a driver main.bee
driver main:
** define variable result
make result ∈ N;
** execute one aspect "test" and collect the result
apply $pro_lib.test(-3) +> result;
print result; //expect: 3

** define one alias for an aspect
alias test := $pro_lib.test;

** define a collector (collection)
make collect ∈ [N]

** prepare aspects for parallel execution
defer test( 1) +> collect;  
defer test(-1) +> collect;  
defer test(-2) +> collect;  
defer test(-3) +> collect;  

yield; // execute pending aspects (using 4 threads)

print collect; // [1,1,2,3]

over.
```

**Read next:** [Syntax Overview](overview.md)
