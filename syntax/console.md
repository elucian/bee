## Bee Console

Bee console is an interactive REPL compiler for Bee.    
That is: Read Execute Print Loop also known as interpreter.

* This program is based on commands that you can type;
* You can use these commands to load, compiler and run Bee modules;
* You can run this console application using Python;

## Install Console
The console application is part of Bee project. This require Python 3.x to be installed on your computer. Then you can use GitHub desktop application to clone the project on your computer. After cloning you will be able to run the console.

## Running Console
To start the console on Windows you can use a shortcut. The shortcut for starting level console available in the project root and may required some modifications for your computer. You can click the shortcut Bee.lnk to start.

## Console Commands:
When Bee console is active, you have a prompt:

```
--------------------------------------------------
            Welcome to Bee console
         Copyright (c) sagecode.net 2016
--------------------------------------------------

bee:>

```

The following commands are available:

Command	| Command Description
--------|-------------------------------------------
help	| display this help
exit	| end Bee console
quit	| end Bee console
lex 	| execute lexer
scan	| execute scanner
parse	| parse a program
run 	| run a program
next	| execute next step
clear	| remove parsed programs from memory
resume	| exit debug mode and continue
stop	| stop execution of current program
status	| display current status
debug	| change debug level
config	| display configuration
home	| change home path folder
report	| print a report (ast, st, status, program)

Some commands use a parameter. If you do not use the parameter the command will ask for it or will display helpful information. For example following command will display the full syntax and description of parameters for “report” command:

```
bee:>help report
```

## Parameters:

For main program level.py I have added several parameters to enhance the startup configuration. All parameters are optional including the program file.
```
-h   --help    : display a short description of parameters
-p   --pfile   : program file to be compiled/parsed
-a   --action  : one of {run,compile,debug,parser,scanner,lexer}
-d   --driver  : one of {batch,console,service}
-o   --home    : a folder where the level programs are located
-m   --mode    : debug mode {trace,regular,silent}
```
## Batch file:
To avoid writing and rewriting parameters for running console I have created a batch file to start Bee console. This can be used as an example to create other batch files to start Bee compiler with different configurations.

## Console Purpose
Bee console can be used to parse, run and debug Bee programs. The order of operations is important. After a program is parsed it can be run once or several times from memory. If debug mode is “manual” the program can be run “step by step”.

After a program is parsed and run several times, the “clear” command will remove parsed programs from memory. Then a program can be parsed again. Console application should not stop until you type quit or exit command even if the program contains errors.

## Debugging Code
Console can run “step by step”. In debug mode, the following commands are usable: {next, resume, stop}. During the program runtime the debug mode can be changed but no other program can be parsed until the current program stop running using stop or resume.

## Internal Reporting 
There are 3 reports available: AST := “Abstract Syntax Tree”, ST := “Symbol Table” and “Program”. These 3 reports can be created using “report” commands any time and will contain information only after a program is parsed.

To print a report use following commands:
```
bee:>report st
bee:>report ast
bee:>report program
```
I hope you will find Bee console interesting and easy to use.

## Parser Job

The parser is building AST and ST. Also parser must do verify program syntax against possible errors. Until now the parser is able to do the following verification:

Does the statement end with “;” ?
Does the section terminate with “end <section>?
Is the statement properly indented?
Has the statement a proper structure?
If is an expression then is this expression correct?
If is an assignment does the variable type match to expression type?
If is a procedure call does all required parameters have values?
If a variable is used is this variable initialized (have assigned value)?
If is a function call is this function returning the proper type for expression?
If I use a record or a matrix member is this member initialized?
If I assign to a record or to a matrix a literal is this literal valid?
Know How
Bee1 parser is a descendant parser implemented using recursive functions. Also is a predictive parser because I’m predicting what comes next from current position.

Making ST and AST: Parser is reading the program top down token by token using the Lexer. Every token is recorded in AST (Abstract Syntax Tree) in the form of a Node object.

If a token is a new identifier (type, variable, constant or subroutine) it is recorded into ST (Symbol Table) as an object. Bee use a declaration for every new identifier. Every identifier must have a base-type and a type name. An identifier can’t be used until has the type established and is assigned.

In AST I do not afford do keep all information from tokens into Nodes. This could  be a waste of memory. The token contains the entire line of the program. Therefore the parser has a buffer (a list of tokens) where I keep only several tokens just in case I need to look back for a second. Every time when I read a new token I put the token at the end of the list and I discard the first element from the list. So this is like a queue of tokens.

Parsing flow
Parser is a class that is used to parse one single program or module. I use parser to store information about the status of parsing activity. Parser is used to create a hierarchy of name-spaces and build members for ST and AST.

Parser get tokens from Lexer one by one. When a new token is read the previous token is stored in AST as a primary Node or child Node. When a token represents an identifier is also added into the ST as an Identifier object. ST (Symbol Table) is a dictionary collection of nested NameSpaces.

**Backing up.**
When I find a token is a new identifier I must add this to symbol table (ST). However I may not know all information about the identifier until I read several more tokens. When the information is available I must go back and fix the identifier information in Symbol Table.

This is because Bee syntax specify the identifier name first and type specification next unlike Java where the type is first and the identifier name is next.

**Variable initialization:**

In Bee, initialization of variables can be done during declaration. For example:

variable

v_ex:0 integer;

When I do the assign “:0” I have not yet read the “integer” token. So I have no idea what kind of variable is going to be. Therefore the assign type verification is postponed until the information become available. This is called “late type verification”.

For now the Bee compiler do not allow a full expression to be used in declaration initialization. I allow only simple expressions: constants or variables that are already initialized or literal expressions. The late type verification will be implemented in the near future.

Bee Executor:
At this time the program can’t be executed. I have started to work on implementation for the executor. I have no prior experience so I’m doing my best to understand how is done. I’m a bad student so I will probably do a lot of mistakes and learn from them.

My plan is to create an interpreter that can be executed from the console. For this I have started evaluation of a simple expression. I will try to implement a REPL application.

A read–eval–print loop (REPL), also known as an interactive top-level or language shell, is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates them, and returns the result to the user;

Until now I have implemented a Polish notation “expression resolver”. This is based on a function that receive a list of strings. Every string represent an expression element that can be a symbol, a function or a value.

Expresion resolver can be now used in Bee Console with the new command:

bee:> eval <expression>
The expression can be a infix mathematical expression. Can contain round parentheses, numbers and operators: arithmetic: (+,-,*,/,^) relations (~ := < >) and logical (and or not true false).

The evaluator convert the expression from infix notation into post-fix notation. Then it try to resolve the expression and print the result. I have manage to resolve simple infix expressions.

For this I have created several new packages: levString, levNumeric, levLogic. In these packages I have created an “operator map” and a “function map” for every data type. These are implemented as a dictionary of pointers to Python native functions or to Bee built-in functions. The levExecutor include these packages and use the maps to call specific operator implementation or function implementation.

**Bee Library**

Built-in subroutine (procedure, function) must be available in the Name-Space of level Program. This is required for the Parser to know data types of built-in subroutine and parameter specifications. Therefore the signature of the function must be registered in Bee library.

I need to create a new kind of region: “declare” region will describe the built-in subroutine but will not describe the implementation. These subroutines are called “external” and will be implemented in folder level/lib

The lib/default.lev module will include several other library modules. This is the module that is automatically loaded before any Bee program and is imported into program name-Space as any other module.


**End of Manual**

**Go back:**[overview](overview.md)