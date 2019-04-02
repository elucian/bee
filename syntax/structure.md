# Program structure

* One Bee program has one driver and multiple modules.
* All program files have the same extension:  *.bee

**bookmarks**

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

## Directives
Compiler directive symbol "#" is used to identify file type.
Bee has 3 kind of program files each with different role: 

```
#library -- reusable library
#module  -- project module
#driver  -- main module
#timer   -- set-up program time limit
```

**Notes**
* A program must have one single driver file;
* A program can be created using multiple modules
* A library can be included in driver or modules programs;
* A module can be instantiated once or multiple times

## Declarations

Bee is using 2 kind of declarations:

* type  -- define: data types
* value -- create/initialize a value variable

## Statements

Each statement start with one keyword. 

**Examples:**

* define  --define a constant
* type    --define data type
* make    --will allocate memory for new variables
* rule    --create a reusable expression
* aspect  --create a block to resolve a problem or concern
* alter   --change/modify variable value or assign new value
* read    --accept input from console into a variable
* write   --output to console result of an expressions
* solve   --resolve one aspect of a problem

Multiple statements on same line are separated by ";"
A statement is optional terminated by ";"

## Code blocks
Statements can be contained in blocks of code.

* Each block of code start with a specific keyword.
* Block of code is ending with same keyword and ";"

**Keywords:**
* "when"   make multi-path groups of statements based on logical conditions
* "while"  group of statements that can be repeated multiple times

## Driver file

Bee is a free form language. That means indentation of code and spaces are not relevant.
In Bee aspect "main" is optional. Instead we define a _driver_ file using directive #driver. 
This is the program entry point. One program can have a single _driver_ and many _modules_.

A _driver_ can contain statements that do not belong to any rule or aspect.
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
* $params is a global system variable available in #driver and #module;
* Parameter _params_ is of type [S] that is a list are strings;
* Bee file is ending with "over;" that is mandatory keyword;

Do not try to understand the example. This is just a worm-up :)

## External Code
In Bee external code can be imported like this:

**Imports:**

```
#import bee_lib;
```

* use :* all public members are used
* use :(x,y,z) only x,y,z members are used

Using alias for Bee module members:

**pattern**
```
-- import with alias
#import qualifier := path./.module:(*);
#import qualifier := path./.module:(member_list);

-- use alias qualifier for an aspect call:
qualifier.aspect_name(arguments);
```

**Environment variables**
Environment variables are globals anthat start with $ symbol. 
All system variables are automatic imported from OS environment.
  
## Global scope

**Import diverse files**

Bee is using one global scope. All modules are using same global scope.
Global variables are unique and are visible in all project modules.
Global variables are lowerwhen and are pretagined in Bee language.

```
#import $bee.cpp.myLib:(*) --import cpp library
#import $bee.asm.myLib:(*) --import asm library
#import $bee.lib.myLib:(*) --import core library
#import $pro.lib.myLib:(*) --import project library
```

Other pretagined global variables:

```
$params --contains a list of parameters
$path   --contains a list of folders 
```

**See example:** [gv.bee](../demo/gv.bee)

## Local scope
A Bee a rule or aspect can have local declarations. 
Local variables are private inside local scope.

**See example:** [lv.bee](../demo/lv.bee)

## Public members
In Bee all members that start with dot "." are public members.
A public member from another module can be access using dot notation.

For symmetry a end of public aspect or rule also use prefix ".".
This is useful for a long rule to know that is public at the end.

```
--public constant
define .pi := 3.14;

--public variable
make .v ∈ N;

--public rule
rule .f(x ∈ N) => (x + 1) ∈ N;

--public aspect
aspect .m(x, y ∈ N, r @ N):
  r := x + y;
aspect;

```

## Execution

A #driver is the program main entry point. It is executed only once.
A #library do not contain executable code and canʼt receive parameters
A #module is similar to a library except that is specific to a project

One module is loaded only once in memory. If module is used in many files and contain rogue statements these statements are executed only once, first time the module is imported. So these statement if they exist will "initialize" the module.

## Rule ABI mapping
In Bee one can use external rules written in Assembly, Ada, C or CPP.
Usually these mappings are implemented in a #library file.

**Example:**
This is myLib.bee file: 
```
#library "mLib"

#import $bee.cpp.myLib.(*); -- load cpp library

-- define a wrapper for external "fib"
functor fib(n ∈ Z) => (x ∈ Z):
  alter x := myLib.fib(n -> Z);
functor;

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

In We comments are number one concern. We enable several notations that enable ASCII comments. 

**Single line comment**

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
########################
```

**Multi-line comments**

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
**  This is a documentation to explain more about program scope. **
**  It can span multiple rows and can terminate with separators. **
*******************************************************************
" After end of program we can have text based comments or normal 
  comments. These kind of comments are also available inside the  
  program body. "
*******************************************************************
```
## Using Modules

* Usually modules are declaring data types, rules and aspects.
* Rogue statements can be used for module initialization.
* A module is executed when is imported using _wee_ statement. 

## Data types

Bee implements a variety of data types and data structures. In most use whens programmers do not have to define new structures but customize existing ones.

Users can define type aliases using symbol "<:" and a _type descriptor_. Type aliases will inherit all aspects of the original type and can have additional aspects.

Bee is a modular and extensible language. Using this technique, one module can extend types declared in any other module. However a super-type can not be used as a sub-type. It must be explicit converted.

**Read next:** [Syntax Overview](overview.md)
