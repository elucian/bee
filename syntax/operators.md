## Operators

In Bee operators are created using Unicode symbols.   
Read about supported symbols here: [symbols](symbols.md)

## Delimiters

|Symbol     | Description
|-----------|--------------------------------------------------------------
|`\|\*...\*\|` | Block comments \| Nested comments
| `(_,_,_)` | Expression \| Tuple literal \| Data record
| `[_,_,_]` | Range \| Index \| Array literals \| Parameterize types
| `{_,_,_}` | Ordinal type \| Set of values \| Hash map


## Strings

symbol  | description
--------|-----------------------------------------------------
 \`z\`  | Back quote (grave accent) single symbol
 'x'    | Limited capacity string literal 
 "y"    | Variable capacity string literal

## Single Symbols

symbol| description
------|----------------------------------------------------------------
 \#   | Compiler directives prefix \| Template placeholder
  $   | Global variables prefix \| System environment constants
  @   | Define a reference \| Define output parameter 
  :   | Pair up key-value in a collection or rule call
  ;   | End of statement \| Statement separator
  .   | Decimals for real numbers \| String concatenation
  .   | Membership dot notation \| Prefix for public member/attribute
  \_  | Anonymous variable \| Has constant value one space (_ = ' ')
  \*  | Replicate value \| [*] Multiple elements  \|Variable arguments  
  \\  | Escape character (\\n := New Line) \| maybe regular expressions

## Numeric operators  

Listed in the order of precedence top down.

symbol| description
------|------------------------------------------------------------------
 /    | Rational number division (higher precedence)
\-    | Change sign, replace "y = -x" with "y = -1·x"
 ^    | Power symbol used with fractions or expressions   
 ·    | Multiplication
 ÷    | Division 
 ×    | Array and matrix multiplication
 %    | Modulo operator
\+    | Numeric addition \| List append
\-    | Numeric subtraction \| Collection difference 
 ±    | Numeric tolerance (use with ≈)

## Double Symbols

Double symbols is a group of two ASCII symbols considered as one.    

symbol| description
------|------------------------------------------------------
 \+-  | Start for multiple line comments
 \-+  | End for multiple line comments  
 \##  | Start for a title comment    
 \**  | Start for a subtitle comment
 \--  | Start for single line comment
 ..   | Define range [n..m] \| Define slice from Array
 =\>  | Define: rule expression \| rule result
 -\>  | rule pipeline \| Explicit conversion 
 \<+  | Unpack a list \| Format template injector
 \<:  | Define subset \| User composite type
 ::   | explicit reference \| explicit boxing
 :=   | modify value \| deep copy \| alias qualifier


## Arithmetic modifiers

Each modifier is created with pattern "x=" where x is a single symbol:

symbol| meaning
------|------------------------------------------------------------------
 +=   | increment value
 -=   | decrement value
 ·=   | multiplication modifier 
 ÷=   | real division modifier
 /=   | rational division modifier
 ^=   | power  modifier
 %=   | modulo modifier

## Relation Operators

Relation operators are used to compare expressions.

symbol | meaning
-------|--------------------------------------------------------------------
  ∈    | element belong to collection
  ≡    | same memory address, same reference: (shallow comparison)
  =    | equality of two values, collections or objects (deep comparison)
  ≠    | divergence of two values, collections or objects (deep comparison)
  ≈    | approximative equal, used with `±` like: (x ≈ 4 ± 0.25)
 \>    | value is greater than 
 \<    | value is less than
  ≥    | greater than or equal to
  ≤    | less than or equal to


**patterns:** 
```
 ¬(x ≡ y)  ; --divergence of two references, (not the same address)
 ¬(x = y)  ; --divergence of two values, objects or collections
```

## Collection operators

symbol | `=>`       |meaning
-------|------------|-------------------------------------------------
  ∩    | Set        |Intersection between two collections
  ∪    | Set        |Union between two collections
  ⊂    | Logic      |set is included in superset: "⊂"
  ⊃    | Logic      |set contain subset: "⊃"  
  \+   | Array      |Concatenation between two arrays
  \+=  | collection |Append element to collection 
  \-=  | collection |Remove element from collection 
                                          
## Logic Operators 

Bee is using constants:  True = 1 and  False = 0

symbol| meaning    | notes
------|----------- |-------------------------------
  ↔   | Equivalent | if and only if
  ¬   | NOT        | unary operator
  ∧   | AND        | shortcut operator
  ∨   | OR         | shortcut operator
  

 p  | q  |¬ p |p ~ q |p ↔ q |p ∧ q | p ∨ q
----|----|----|------|------|------|--------
 1  | 1  | 0  | 0    | 1    |1     | 1     
 1  | 0  | 0  | 1    | 0    |0     | 1     
 0  | 1  | 1  | 1    | 0    |0     | 1     
 0  | 0  | 1  | 0    | 1    |0     | 0      


**Bitwise operators**

Bitwise operators are overloaded for numbers.

symbol| meaning       | notes
------|---------------|-------------------------------
 ←    | bit SHIFTL    | shift bits to left  
 →    | bit SHIFTR    | shift bits to right  


**See also:** [Bit Manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) 

Arity = 1

 A    | ¬ A | A ← 1 | A → 2  
------|-----|-------|--------
 0000 |1111 | 0000  | 0000   
 1111 |0000 | 1110  | 0011   
 0111 |1000 | 1110  | 0001   
 0110 |1001 | 1100  | 0001   


Arity = 2
 
 A    | B   | A ∧ B  | A ∨ B | A ~ B
------|-----|--------|-------|--------
 00   | 00  | 00     | 00    |  11    
 01   | 00  | 00     | 01    |  10    
 11   | 01  | 01     | 11    |  00    
 10   | 11  | 10     | 11    |  01    

## String operators

Symbol| Description
------|---------------------------------------------------------------
 `*`  | String pattern repetition \| String generator
 `&`  | concatenate two strings as they are
 `/`  | concatenate two strings with / and de-duplicate last
 `\`  | concatenate two strings with \\ and de-duplicate last
 
**Read Next:** [keywords](keywords.md)
