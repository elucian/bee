## Operators

In Bee operators are created using Unicode symbols.   
Read about supported symbols here: [symbols](symbols.md)

## Delimiters

|Symbol     | Description
|-----------|--------------------------------------------------------------
| `+-...-+` | Block comments \| Boxed comments
| `#(....)` | String interpolation (placeholder)
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
------|-------------------------------------------------------------------------------
 `!`  | Negation symbol for relations \| Excluded from domain
 `?`  | Template modifier. Associated with string templates 
 `*`  | String replication
 `@`  | System variable  \| Global variable
 `$`  | System constant  \| Environment variables
 `&`  | String concatenation \| number concatenation
 `#`  | String interpolation placeholder for operator "?"
 `∈`  | Define variable/constant/result/parameter type
 `+`  | Maximum upper limit for a domain \| Unicode notation U+ 
 `-`  | Minimum lower limit in a domain  \| Unicode notation U- 
 `:`  | Pair up key-value in a collection or rule call 
 `:`  | Define constant or type or rule or component name
 `;`  | End of statement \| Statement separator
 `.`  | Decimals for real numbers \| Path string concatenation
 `.`  | Membership dot notation \| Prefix for public member/attribute
 `|`  | Declarative collection builder: {set, list, hash, array}
 `|`  | Exact divisor: since 15 = 3 · 5 then (3 \∣ 15 = True) and (5 \∣ 15 = True) 
 `_`  | Anonymous variable \| Constant value = one space (_ = ' ')
 `\\` | Escape character (\\n := New Line) 

## Numeric operators  

Listed in the order of precedence top down.

symbol| description
------|------------------------------------------------------------------
 `-`  | Change sign, replace "y = -x" with "y = -1·x"
 `/`  | Rational number division 
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
 `//` | End of line comment (may be in expression) 
 `**` | Single line comment (allow indentation)
 `..` | Define domain (n..m) \| Define array slice [n..m]
 `.!` | Define domain (n.!m) (m is excluded)
 `!.` | Define domain (n!.m) (n is excluded) 
 `!!` | Define domain (n!!m) (n,m are excluded) 
 `=>` | Define: rule expression \| rule result
 `->` | Data cast pipeline operator / Type conversion
 `<:` | Define subset from set \| Specify super-type for a new type
 `++` | Extend a matrix by specified (n,m) columns (n ≥ 1)
 `<<` | Much less      0.1 \<\< 2  but not (0.1 \<\< 1) 
 `>>` | Much greater   2 \>\> 0.9  but not (1 \>\> 0.9)
 
## Modifiers

Each modifier is created with pattern "x=" where x is a single symbol:

symbol| meaning
------|--------------------------------------------------------------------
 `:=` | Binding value \| Borrow reference 
 `::` | Deep copy \| Clone operator
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
 `~`   | similar numbers: (0.1 ~ 0.9) \| not similar (-1 !~ +1) 
 `~`   | similar characters: ('a' ~ 'A')  \| not similar ('a' !~ 'B')
 `>`   | value is greater than: (2 > 1)
 `<`   | value is less than: (1 < 2)
 `≥`   | greater than or equal to
 `≤`   | less than or equal to


**negation:** 

Operator: "!" can be used in combination with other operators:

```
  x != y; //equivalent to: ¬(x = y)
  x !≡ y; //equivalent to: ¬(x ≡ y)
  x !∈ y; //equivalent to: ¬(x ∈ y)
  x !≈ y; //equivalent to: ¬(x ≈ y)
```

## Collection operators

symbol | result     |meaning
-------|------------|----------------------------------------------------------
 `∩`   | Set        |Intersection between two collections
 `∪`   | Set        |Union between two collections
 `⊂`   | Logic      |Set is included in superset: "⊂"
 `⊃`   | Logic      |Set contain subset: "⊃"  
 `Δ`   | Set        |Set symmetric difference  
 `+`   | String     |Concatenation between two strings
 `+`   | List       |Concatenation between two lists
 `+`   | Array      |Concatenation between two arrays
 `∀`   | Element    |Specify all elements from a collection X[∀]
 `∃`   | Logic      |Check a collection for qualification using an expression
                                          
## Logic Operators 

Bee is using enumeration symbols:  True = 1 and False = 0

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
------|-------------------------------------------------------------------
 `*`  | String pattern repetition \| String generator
 `.`  | concatenate two literals using \ or; // depending on OS
 `/`  | concatenate two strings with / and de-duplicate last
 `\\` | concatenate two strings with \\ and de-duplicate last
 `+`  | concatenate two strings after trimming first string 
 `&`  | concatenate two strings as they are or numbers as string literals

 
**Read Next:** [keywords](keywords.md)
