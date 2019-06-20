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

| Constant | Environment| Description                |
|----------|------------|----------------------------|
|$bee_home | BEE_HOME   | Bee home folder            |
|$bee_lib  | BEE_LIB    | Bee library home           |
|$bee_path | BEE_PATH   | Bee library path           |
|$pro_home | N/A        | Program home folder        |
|$pro_lib  | N/A        | Program library home       |
|$pro_mod  | N/A        | Program components home    |
|$pro_log  | N/A        | Reporting folder           |

### System directives

Directives are controlling the application compilation. These directives have a pre-defined values. You can setup these values in compiler configuration file. Once compilation is done you can not change these options.

| Constant | Default value | Description
|----------|---------------|----------------------------------------------------------------
|$precision| 0.001         | Control numeric precision
|$recursion| 10000         | Control how deep a recursion before give up
|$timer    | 10            | Control time in seconds before a loop give up
|$debug    | Off / On      | Control if debug information is included
|$echo     | Off / On      | Control if statement is printed to console in case of error
|$trace    | Off / On      | Control if #trace variable is populated with information
|$date     | DMY / MDY     | Control date format: DD/MM/YYYY or MM/DD/YYYY
|$time     | T24 / T12     | Control time format: HH:MM:SS,MS am/pm or HH:MM:SS,MS
|$platform | "Windows"     | Alternative: "Linux", "Mac" is the target platform

**note**
* You can overwrite system directives in driver but not in _aspect_ or _method_ components;
* Precision is controlling both: rational numbers and display precision for floating numbers;

### System Variables

System variables are defined usually at the beginning of the component. 

**introspection:**

Some system variables are available for debugging:

```
#timer: contains duration information about last executed statement
#stack: contains debug information about current call stack
#trace: contains reporting information about executed statements
#level: contains how deep is the current call stack
#count: contains last query count: updated/inserted/deleted records
#query: contains last native query statement
#error: contains last error message
```

**notes:** 
* System variables are global and may be specific to a component;
* User can create new system variables specific to application;
* Prefix "&" is used to avoid scope qualifier and improve code readability;

### Components

A component is a source file with extension .bee. You can organize an application using components. When compiled, all components are merged into a single monolithic application. Bee do not use dynamic loaded components: (.dll). 

**Name:**

One _component_ is identified by a _name_ created with one different keyword depending on component role:

* driver: define the leading component name for an application;
* aspect: define a component that belong to an application;
* module: define a component that can be reused by many applications;

**notes:**
* One application can have one single _driver_;
* One _driver_ can load multiple _aspects_ and _modules_;
* One _aspect_ can also load _aspects_ and _modules_;
* One _module_ can also load modules but not _aspects_;
* One component file is ending with keyword _over_;

### Drivers
There is one single _driver_ component for one application. It has the role to lead the application main thread. When _driver_ execution is over the application give control back to the operating system. 

**usability:**

A _driver_ can read configuration files, define system constants, system variables, application menus, database connections and such. It is the application entry point. A driver can be terminated early using keywords: _halt_, or _fail_.

### Aspects
An application architect can separate system concerns in multiple _aspects_. One aspect is a component located in _"src"_ folder. A driver can load an aspect only once, then it can use any of its public members on demand. 


**Usability:**
* At least one aspect element must be public;
* Usually an aspect do not have rogue statements;
* If aspect has rogue statements these are executed only once, when the aspect is loaded first time;
* Aspect variables have one single value shared in application global context.

### Modules
A module is a reusable component stored in a library. This in a sub-folder of _"lib"_. One driver or aspect can _load_ from a library one or more modules. From each module we can use one or more public members with scope qualifier.

**notes:**
* Modules must have public members;
* Modules does not have rogue statements;

## Declaration

Bee is using 7 kind of declarations:

* load  :import  a library in global scope
* alias :declare alternative name for library or aspect
* type  :declare data types
* make  :declare variable
* rule  :declare named code block

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

* when  :create two ways decision statement
* case  :create multi path conditional selector
* while :create conditional repetitive block
* for   :create iterator for all elements in a domain or collection
* trial :create a block of code that may fail, to handle exceptions

**notes:**

* Each block is finalized with a different keyword:
* Closing keyword can be one of: { done, repeat, next };
* Statements in nested blocks are using indentation at 2 spaces;

### Rogue statement

A _driver_ or _aspect_ can contain statements that do not belong to any rule. These are called _rogue_ statements and are driving the program execution. Rogue statements are executed top down until to last keyword that is usually _over_.

**Example:**

```
driver main:
** read the number of parameters
make c := $params.count;
halt if (c = 0);
** print comma separated parameters
make i:= 0 ∈ Z;
while (i < c) do
  write $params[i];
  alter i += 1;
  write "," if (i < c);
repeat;
** print the buffer to console
print;
  
over; !end of driver
```

Do not try to understand this example. It is just a worm-up! 

**Notes:** 
* This program is a driver :=  having file-name "main.bee";
* Input parameter _*params_ is an array of strings;
* Any Bee component is ending with mandatory keyword: _"over"_; 
* Early driver termination can be trigger using: halt or exit;

## External code

Libraries and components can be imported like this:

**Imports:**

```
load $bee_lib.folder_name:(.);
load $bee_lib.folder_name:(x,y,z);
```

* using:(.) all public members are borrowed in local scope;
* using:(x,y,z) only some public members are borrowed in local scope;

**Qualifier**
Bee use _"dot notation"_ to locate external members. After load the file name becomes scope qualifier for this notation. It is possible to change the qualifier name using `:=` like in example below:

```
load  qualifier := $bee_lib.folder_name;
apply qualifier.member_name;
```

**Note:**

When a component is loaded with qualifier, you can not borrow its members. All public members must use the specified qualifier or you can use "with" block to suppress the qualifier for a region of code.

**Alias**

You can create an alias for a for specific members:

```
alias new_name := qualifier.member_name;
```

**Examples:**

```
load $runtime.cpp_lib:(.); !load cpp library
load $runtime.asm_lib:(.); !load asm library
load $runtime.bee_lib:(.); !load bee core library
load $program.pro_lib:(.); !load project library
```

## Global context

One application has a global context where variables and constants are allocated. Each application file can contribute with new elements that can be created in this context. The global context can be also called _application context_ or _session context_;

* Global context helps to store and identify _public identifiers_ from all loaded components;
* When a component is loaded, all public members are defined in the _global context_;

## Name space

A component can establish one or more local name-spaces where you can define component members and statements.

**example:**
```
** component name-space
make i := 1 ∈ Z; 
trial
  ** local name-space
  make v := i;     !v is local reference to nonlocal: i 
  make i := 2 ∈ Z; !create i local 
  print i;         !expected: 2 (local)
  print v;         !expected: 1 (nonlocal)
done;
print i; !expected: 1  (unmodified)

over.
```
**See examples:** 
* [lv.bee](../demo/lv.bee)
* [gv.bee](../demo/gv.bee)  


## Public members

In Bee all members that begin with dot "." are public members.

```
make .pi :: 3.14; !public constant
make .v ∈ N;      !public variable

** public rule
rule .f(x ∈ N) ∈ N => (x + 1);

** public rule
rule .m(x, y ∈ N) => (r @ N);
  alter r := x + y;
return;
```

**note:** 
* private members are visible in current component and do not require _scoping_ notation;
* public members are visible from external components using _scoping_ notation;


## Comments

Comments can be used to document the code or the configuration files.

**Single line**

For single line comments we use one or two stars like: "\*\*";   

* This comment can be extended to multiple stars to create a separator,
* You can use single line comment at beginning of new line,
* You can use two spaces to indent the comment and align with the code.

**End of line**

Before new line of code: (EOL) you can use comments starting with bang: "!"

* notice one line may be or not a full statement. the end of statement is not (EOL)
* you can use "!" in the middle of an expression, before the end of statement ";",
* you can have multiple statements separated by ";" in a line but only one comment;

**Notes:** 
Bee syntax is Wiki friendly: you can open *.md files using Bee highlighter for Notepad++

**Limitations:**
1. You can not use single "#" for titles: it is a prefix. However you can use two: "##",
2. You can not use contractions. This is silly but if you do you mess-up the highlighter,
3. You should not use exclamation mark in text. Else the next phrase will show gray,
4. Symbol "\`" has special meaning in Bee. Sometimes it must be escaped using "\\`".

**Example:**

In next example we are using various comments into a demo program.

```
+------------------------------------------------------------------
| At the beginning of program you can have  several comments,     | 
| to explain how the program works. This notation is preferred.   |
+-----------------------------------------------------------------+
driver main:

** This is a single line comment
pass; !this statement does nothing
... 
** Other statements
over. !end of driver main

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

One aspect is executed when is loaded first time from driver or from another aspect. Rogue statements from an aspect can be used for _aspect initialization_. You can not run an aspect a second time during the lifespan of a session.

**module:**

The driver or aspect can load numerous modules. After loading, all public elements can be executed on demand. Before execution the driver can interact with the user to ask for input. After executing it can print feedback and reuse or store results for later use.


**pattern:**

```** initialize an aspect
load qualifier := $pro.src.aspect_name;
** results can be captured using alter
alter result := qualifier.rule_name(arguments);

** give alias to aspect rule
alias new_name := qualifier.rule_name;

** apply aspect using its alias:
alter result := new_name(arguments);
```

**Notes:**
* An application can have a single driver;
* Aspect can be loaded from a driver or another aspect;
* Public and private states from an aspect are persistent;
* Aspect can be initialized only once;
* Aspect elements can be used multiple times; 


**Restriction:**
* one component can not be loaded from inside a rule;
* the same component can not be loaded twice with different qualifiers;
* one component can have same file name with another but must use a different qualifier;

**Example:**

```
aspect mod:

** next rule is public
rule .main(i ∈ Z) => (v @ N):
  when (i < 0) do
    alter v := -i;
  else
    alter v := i;
  done;  
return;

over.
```

**Using aspect:**

```
driver main:
** define aspect "mod"
load mod := $pro.mod;

** define variable result
make result ∈ N;
** execute main procedure from aspect "mod"
alter result := mod.main(-3);
print result; !expect: 3

over.
```

**Read next:** [Syntax Overview](overview.md)
