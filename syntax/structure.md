## Program structure

Bee language enable developers to create small programs using a single file, or a larger program using multiple files. Each file have extension .bee or .cfg and it represents a module or a configuration file. Bee is a space sensitive language. That means indentation of code and spaces are relevant.

**bookmarks**

Next you can learn general concepts about Bee applications:

* [Project](#project)
* [Modules](#modules)
* [Declarations](#declarations)
* [Statements](#statements)
* [External Code](#external-code)
* [Name space](#name-space)
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
  |   |-- module1.bee
  |   |-- module2.bee
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

### Global Constants
Global constants are using "$" prefix. There are several predefined system constants available in Bee. These constants can be used to locate project files or connect to databases. You can define new global constants at the beginning of any module.

|Constant  | Environment| Description                
|----------|------------|----------------------------
|$bee_home | BEE_HOME   | Bee home folder            
|$bee_lib  | BEE_LIB    | Bee library home           
|$bee_path | BEE_PATH   | Bee library path           
|$pro_home | N/A        | Program home folder        
|$pro_lib  | N/A        | Program library home       
|$pro_mod  | N/A        | Program modules home       
|$pro_log  | N/A        | Reporting folder           

### Compiler directives

Compiler directives are system constants that control the compilation process. You can setup these options in compiler configuration file or in source file. You can not change these options after compilation. They are available for normal control flow statements. You can use _when_ statement to check $platform for example.

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
* You can overwrite compiler parameters in driver but not in _module_ or _module_ modules;
* Precision is controlling display precision for real numbers, float and double numbers;

### Global Variables

Global variables are defined usually at the beginning of a module outside of any method. 

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
* System variables are global and are defined in core library;
* Prefix "@" is used to improve code readability;

### Modules
An _module_ is a file located in _"src"_ folder having extension *.bee. A _module_ can load another _module_ and can execute its rules multiple times. After _module_ is loaded, its global states are permanent in memory. 

**notes:**
* An  _module_ can have public elements,
* One _module_ can can contain method main(),
* One _module_ can load multiple other modules,
* One _module_ can be loaded a single time in another module,
* You can not load a module from a block statement,

### Library
A _library_ is a reusable module located in a sub-folder _"lib"_. One module can _load_ multiple _libraries_ using _load_ statement. From each _library_ you can use one or more public members using scope qualifier and dot notation.

**notes:**
* A library must have at least one public member,
* A library can not contain a method called main(),
* A library can not be stored in project _"src"_ folder,
* You can loaded a library one single time in a module,
* You can not load a library from a block statement.

### Main module

One module that contains method main() is the application _main module_. Main module is usually defining _global constants_, _global variables_ and main method. A good designer will split the rest of the application in secondary modules.

**restrictions**

* main module can not be imported in other modules;
* main module do not have public members;

## Declarations

Bee is using 6 kind of declarations:

* load  // import  a module in global scope
* alias // declare alternative name for module
* type  // declare data types
* make  // declare variable
* save  // declare a constant
* method  // declare named code block

### Statements

Each statement start with one imperative keyword: 

**Examples:**

* alter  :change/modify variable value or assign new value
* read   :accept input from console into a variable
* write  :register in console cash result of an expressions
* print  :output to console with end of new line and flush console cash
* apply  :execute one method in synchronous mode and wait for it to finish
* begin  :start execution of a method in asynchronous mode and do not wait to finish

**notes:**

* One statement is usually indented 2 space,
* One statement is usually described in a single line,
* Multiple statements on a single line are separated with ";",
* One expression in a statement can extend on multiple lines.

### Code blocks
Statements can be contained in blocks of code.

* when  // create two ways decision statement
* case  // create multi path conditional selector
* while // create conditional repetitive block
* for   // create iterator for all elements in a domain or collection
* trial // create a block of code that may fail, to handle exceptions

**notes:**

* Each block is finalized with a different keyword,
* Closing keyword can be one of: { done, redo, next },
* Statements in nested blocks are using indentation at 2 spaces.


### Main method

A module can define "rules". These are sub-programs that can be executed on demand. One special method is the main() method that can be defined in the main module. This method can receive multiple parameters and is automatically executed when program starts.

**Example:**

```
# demonstrate main method
method main(*params ∈ S):
   ** read the number of parameters
   make c := params.count;
   halt if (c = 0);
   
   ** print comma separated parameters
   make i:= 0 ∈ Z;
   while (i < c) do
     write params[i];
     alter i += 1;
     write "," if (i < c);
   redo;
   ** print the buffer to console
   print;  
return;
```

Do not try to understand this example. It is just a worm-up code! 

**Notes:** 
* This program consist of one main module;
* Input parameter _*params_ is an array of strings;
* Early program termination can be trigger using: halt or exit;
* Any method is ending with mandatory keyword: _"return"_; 

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

You can create an alias for a specific member to eliminate the qualifier. This method can be used to "merge" public members into current scope. A member can have one single alias in a module. If you do it multiple times, only the last alias is used. It is a bad practice to change the alias of a member.

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

## Global scope

One application has a global scope where variables and constants are allocated. Each application file can contribute with global elements that can be merged in this single scope. Global scope can be also called _application scope_;

* Global scope helps to use _public identifiers_ from loaded modules;
* When a module is loaded, its public members are defined in the _global scope_;

## Name space

A module has its own scope, that is called name-space where you can define members and statements. Module scope can contain public or private members. Public members start with "." while private members do not have any prefix or suffix.

```
# module name-space
save .pi := 3.14;   // public constant
make .v   ∈ N;      // public variable
make str := "test"; // private variable

# expression method foo is private
method foo(x ∈ N) ∈ N => (x + 1);

# block method bar is public
method.bar(x, y ∈ N) => (r ∈ N):
  alter r := x + y;
return;
```

**See examples:** 
* [lv.bee](./demo/lv.bee)
* [gv.bee](./demo/gv.bee)  


## Comments

Comments can be used to document the code or the configuration files.

**Single line**

For single line comments we use one or two stars like: "\*\*";   

* This comment can be extended to multiple stars to create a separator,
* You can use single line comment at beginning of new line,
* You can use two spaces to indent the comment and align with the code.

**End of line**

Before new line of code: (EOL) you can use comments starting with: "//"

* notice one line may be or not a full statement. the end of statement is not (EOL),
* you can use "//" in the middle of an expression, if expression is on multiple lines,
* you can have multiple statements separated by ";" in a line but only one comment,
* you can not use "//" inside paranthesis of any kind (), [] or {}.

**Box comment**

This notation is specific to Bee language. It is a multi-line comment starting with "+-" and end with "-+". The upper right corner is missing. I guess you will notice this defect later. However you can use old-style C comments.

**Old style C comments**

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

/* 
   This kind of comment is supported.
   /* Expression comments are allowed */
   /* Nested comments are allowed. */   
*/

# method descriptive comments (unindented comment outside rules)
method main():
  ** This is a single line comment (indented comment inside method)
  pass; // does nothing
  ... 
   
  ** Expression comments
  print ("comment in expression \n", /*first line*/
         "is working \n",            /*second line*/
         "this is a test \n"         /*last line*/ 
        ); // end of expression
  
return;

*******************************************************************
** This is the old style boxed comment, used for matrix printers **
*******************************************************************
```

## Execution

When a program is executed the _main module_ is located and executed first. If a program do not have a _main module_, it can not be executed nor compiled. The main() method is the program main entry point. It is executed only once.  If you try to execute method main() you can but there is no point to it.

**module:**

The main module can load numerous modules and libraries. After loading, all public elements can be executed on demand. Before execution the main() method can interact with the user to ask for input. After executing it can print feedback and reuse or store results for later use.


**pattern:**

This pattern demonstrate how to use a method from a module named "module_name"

```# loading a module
load $pro.src.module_name;

# give alias to module method
alias new_name: module_name.rule_name;

method main():
   ** results can be captured using make
   make result := module_name.rule_name(arguments);
   
   ** modify a variable using method alias:
   alter result := new_name(arguments);
return;   
```

## Using a module

This pattern demonstrate how to declare an module named "test.bee".

```
# define a public method
method .abs(i ∈ Z) => (v ∈ N):
  when (i < 0) do 
    alter v := -i;
  else
    alter v := i;
  done;  
return;
```

Define main module and use previous defined "test" module.

```
# execute one module "test" and collect the result
load $pro_src.test;


# define a collector (list)
make collect ∈ (N);

# execute test() and append result in collect
method main():
   ** normal use
   print abs(-1) // 1
   
   apply test.abs( 1) <+ collect;  
   apply test.abs(-2) <+ collect;  
   apply test.abs(-3) +> collect;  
   apply test.abs(-4) +> collect;    
   print collect; // (4,3,1,2)
return;   
```

**Read next:** [Syntax Overview](overview.md)
