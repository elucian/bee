## Operators

In Bee operators are created using Unicode symbols.   
Read about supported symbols here: [symbols](symbols.md)

## Delimiters

|Symbol     | Description
|-----------|--------------------------------------------------------------
|`\|*...*\|`| Block comments \| Nested comments **| 
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
  *   | End of line comment
  #   | Single line comment
  $   | System constant  \| Environment variables
  &   | System variable  \| Global variable
  @   | Define method result /| input/output parameters
  ∈   | Define variable/constant/result/input only parameter
  ?   | Template modifier. Associated with string templates
  !   | Exclude lower or upper limit in domain notation
  +   | Maximum upper limit for a domain \| Unicode notation U+ 
  -   | Minimum lower limit in a domain  \| Unicode notation U- 
  :   | Pair up key-value in a collection or rule call
  ;   | End of statement \| Statement separator
  .   | Decimals for real numbers \| String concatenation
  .   | Membership dot notation \| Prefix for public member/attribute
  \_  | Anonymous variable \| Has constant value one space (_ = ' ')
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
------|------------------------------------------------------------------
 \+-  | Start for multiple line comments
 \-+  | End for multiple line comments  
 ..   | Define domain (n..m) \| Array slice [n..m]
 ::   | Define a constant (used with make)
 =\>  | Define: rule expression \| rule result
 \<:  | Define subset from set \| Specify super-type for a new type
 :=   | Assign by value \| Reset reference
 :+   | Assign by copy  \| Keep reference
 \+\> | Collector: capture result. Associated with: _play_ and _apply_
 
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
  ∈    | check if element belong to collection
  =    | same value \| equivalent objects (deep comparison)
  ≠    | divergent values \| divergent objects (deep comparison)
  ≡    | same reference (shallow comparison)
  ≈    | approximative equal numbers, used with `±` like: (x ≈ 4 ± 0.25)
 \>    | value is greater than 
 \<    | value is less than
  ≥    | greater than or equal to
  ≤    | less than or equal to


**missing:** 

Operator "≢" is not used. Instead you can use expression:

```
  ¬(x ≡ y); * divergence of two objects
```

## Collection operators

symbol | `->`       |meaning
-------|------------|----------------------------------------------------------
  ∩    | Set        |Intersection between two collections
  ∪    | Set        |Union between two collections
  ⊂    | Logic      |Set is included in superset: "⊂"
  ⊃    | Logic      |Set contain subset: "⊃"  
  ⊖    | Set        |Set symmetric difference  
  \+   | Array      |Concatenation between two arrays
  \+=  | Collection |Append element to collection 
  \-=  | Collection |Remove element from collection 
  ∀    | Element    |Enumerate all elements from a collection
  ∃    | Logic      |Check if exist one element in a collection
                                          
## Logic Operators 

Bee is using constants:  True = 1 and False = 0

symbol| meaning    | notes
------|----------- |-------------------------------
  ¬   | NOT        | unary operator
  ∧   | AND        | shortcut operator
  ∨   | OR         | shortcut operator
  ⊕   | XOR        | exclusive OR
  ↓   | NOR        | p ↓ q = ¬ (p ∨ q)
  ↑   | NAND       | p ↑ q = ¬ (p ∧ q)

 p  | q  |¬ p |p ⊕ q |p ∧ q | p ∨ q
----|----|----|------|------|--------
 1  | 1  | 0  | 0    |1     | 1     
 1  | 0  | 0  | 1    |0     | 1     
 0  | 1  | 1  | 1    |0     | 1     
 0  | 0  | 1  | 0    |0     | 0      


**Bitwise operators**

Bitwise operators are overloaded for numbers.

symbol| meaning       | notes
------|---------------|-------------------------------
 «    | bit SHIFTL    | shift bits to left  
 »    | bit SHIFTR    | shift bits to right  


**See also:** [Bit Manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) 

Arity = 1

 a    | ¬ a | a « 1 | a » 2  
------|-----|-------|--------
 0000 |1111 | 0000  | 0000   
 1111 |0000 | 1110  | 0011   
 0111 |1000 | 1110  | 0001   
 0110 |1001 | 1100  | 0001   


Arity = 2
 
 a    | b   | a ∧ b  | a ∨ b | a ~ b
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
