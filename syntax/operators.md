## Operators

In Bee operators are created using Unicode symbols.   
Read about supported symbols here: [symbols](symbols.md)

## Delimiters

|Symbol     | Description
|-----------|--------------------------------------------------------------
| `+-...-+` | Block comments \| Boxed comments
| `(_,_,_)` | Expression \| Tuple literal \| Data record
| `[_,_,_]` | Range \| Index \| Array literals \| Parameterize types
| `{_,_,_}` | Ordinal type \| Set of values \| Hash map


## Strings

symbol  | description
--------|-----------------------------------------------------
 \`z\`  | Single ASCII symbol 
 'x'    | Fixed capacity Unicode string literal 
 "y"    | Variable capacity Unicode string literal

## Single Symbols

symbol| description
------|----------------------------------------------------------------
 `!`  | End of line comment
 `?`  | Template modifier. Associated with string templates 
 `*`  | String replication
 `#`  | System variable  \| Global variable
 `$`  | System constant  \| Environment variables
 `&`  | String concatenation
 `@`  | Define method result /| input/output parameters
 `∈`  | Define variable/constant/result/input only parameter
 `+`  | Maximum upper limit for a domain \| Unicode notation U+ 
 `-`  | Minimum lower limit in a domain  \| Unicode notation U- 
 `:`  | Pair up key-value in a collection or rule call
 `;`  | End of statement \| Statement separator
 `.`  | Decimals for real numbers \| Path string concatenation
 `.`  | Membership dot notation \| Prefix for public member/attribute
 `|`  | Declarative collection builder: {set, list, hash, array}
 `_`  | Anonymous variable \| Has constant value one space (_ = ' ')
 `\\` | Escape character (\\n := New Line) \| maybe regular expressions

## Numeric operators  

Listed in the order of precedence top down.

symbol| description
------|------------------------------------------------------------------
 `/`  | Rational number division (higher precedence)
 `-`  | Change sign, replace "y = -x" with "y = -1·x"
 `^`  | Power symbol used with fractions or expressions   
 `·`  | Multiplication
 `÷`  | Real division 
 `×`  | Array multiplication \| Matrix multiplication
 `%`  | Modulo operator
 `+`  | Numeric addition \| List append \| Mattrix addition
 `-`  | Numeric subtraction \| Collection difference 
 `±`  | Numeric tolerance (use with ≈)

## Double Symbols

Double symbols is a group of two ASCII symbols considered as one.    

symbol| description
------|------------------------------------------------------------------
 `**` | Single line comment (allow indentation)
 `..` | Define domain (n..m) \| Define array slice [n..m]
 `./` | Define domain (n./m) (m is excluded)
 `/.` | Define domain (n/.m) (n is excluded) 
 `::` | Initialize a constant
 `=>` | Define: rule expression \| rule result
 `<:` | Define subset from set \| Specify super-type for a new type
 `++` | Extend a matrix by specified (n,m) columns (n ≥ 1)
 
## Modifiers

Each modifier is created with pattern "x=" where x is a single symbol:

symbol| meaning
------|--------------------------------------------------------------------
 `:=` | Binding value \| Borrow reference 
 `::` | Deep copy \| Initialize constant
 `+=` | Increment value \| append element
 `-=` | Decrement value \| remove element
 `·=` | Multiplication modifier 
 `÷=` | Real division modifier
 `^=` | Power  modifier
 `%=` | Modulo modifier

## Relation Operators

Relation operators are used to compare expressions.

symbol | meaning
-------|--------------------------------------------------------------------
 `∈`   | check if element belong to collection
 `=`   | same value \| equivalent objects (deep comparison)
 `≠`   | divergent values \| divergent objects (deep comparison)
 `≡`   | same reference (shallow comparison)
 `≈`   | approximative equal numbers, used with `±` like: (x ≈ 4 ± 0.25)
 `>`   | value is greater than 
 `<`   | value is less than
 `≥`   | greater than or equal to
 `≤`   | less than or equal to

**negation:** 

Operator: "/" can be used in combination with other operators:

```
  x /= y; ! x ≠ y (not equivalent)
  x /≡ y; ! not the same 
  x /∈ y; ! not belong
  x /≈ y; ! not similar
  x /> y; ! x ≤ y
  x /< y; ! x ≥ y
```

## Collection operators

symbol | result     |meaning
-------|------------|----------------------------------------------------------
 `∩`   | Set        |Intersection between two collections
 `∪`   | Set        |Union between two collections
 `⊂`   | Logic      |Set is included in superset: "⊂"
 `⊃`   | Logic      |Set contain subset: "⊃"  
 `⊖`   | Set        |Set symmetric difference  
 `+`   | String     |Concatenation between two strings
 `+`   | List       |Concatenation between two lists
 `+`   | Array      |Concatenation between two arrays
 `∀`   | Element    |Enumerate all elements from a collection
 `∃`   | Logic      |Check if exist one element in a collection
                                          
## Logic Operators 

Bee is using constants:  True = 1 and False = 0

symbol| meaning    | notes
------|----------- |-------------------------------
  `¬` | NOT        | unary operator
  `∧` | AND        | shortcut operator
  `∨` | OR         | shortcut operator
  `⊕` | XOR        | exclusive OR
  `↓` | NOR        | p ↓ q = ¬ (p ∨ q)
  `↑` | NAND       | p ↑ q = ¬ (p ∧ q)

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
 `«`  | bit SHIFTL    | shift bits to left  
 `»`  | bit SHIFTR    | shift bits to right  


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
 `+`  | concatenate two strings after trimming first string 
 `.`  | concatenate two literals using \ or // depending on OS
 `/`  | concatenate two strings with / and de-duplicate last
 `\\` | concatenate two strings with \\ and de-duplicate last
 
**Read Next:** [keywords](keywords.md)
