## Bee Design

Bee is a high level, modular, explicit and esoteric programming language. It is designed for small technical applications, console programming and 2D graphics. Next I will explain some of the strategy for Bee design:

## Modular

Bee applications are usually small, based on single source file. However Bee enable usage of multiple files for separation of concerns. There are 3 kind of modules in an application:

1. One _"main module"_ that contain entry point: main() rule;
1. Multiple _"application modules"_ that represents _parts_ of the application;
1. Multiple _"reusable modules"_ organized in library folders and sub-folders; 

## Explicit
Bee is an explicit language: We believe explicit is better than implicit. For this we try to give as much control to developers as it is possible. There are very few places where implicit behavior is only present to make the language more user friendly. Next design choices make Bee an explicit language:

1. Bee require declarations of data types for all elements: constants, variables, parameters and results. Unlike dynamic languages that use implicit data types that can be changed in the same scope. 
1. Most languages do not have a name for result variables in functions. Bee allow developers to declare explicit names and types for every result. This is helpful when a subroutine has multiple results.
1. Precision is implicit: maximum possible in most languages, forcing the computation of multiple decimals that are not necessary. In Bee you can define rational numbers that have fixed decimals with default precision.
1. Variables and parameters are automatically initialized with zero value. Explicit initialization is possible for variables. If a parameter has explicit initial value it becomes optional.
1. Bee has two assignment operators: ":" and ":=". First is called "pair up". Second is called "assign". Primitive types are transfer by value, while composite types are transferred by reference.
1. In a rule, primitive type parameters are transferred _by value_ while composite type parameters and objects are transferred _by reference_. Same rule apply for result variables. 
1. Bee do not have pointers nor pointer arithmetic. However you can define references to primitive types using boxing operator [x] that are as good as pointers.

## Esoteric
Bee is esoteric: it is a _read me first_ research language. Unlike other esoteric languages Bee looks familiar to students and academics who know some mathematics. New developers can study and reuse _code snippets_ created by language authors. However only Bee experts can create examples and algorithms. Experts need a special keyboard designed for Bee, or a programmable keyboard for games that may be expensive. I'm using Logitech G110 that is capable of producing any Unicode symbol used in Bee language. Next design choices makes Bee an esoteric language:

1. Bee use Unicode operators. This is the main factor that makes Bee esoteric: { ÷ · × ¬ ∧ ∨ ∈ ≤ ≥ ≡ ≠ ≈ ± ⊂ ⊃ ∪ ∩ ↑ ↓ » « ⊕ ⊖ ∀ ∃}. This can be difficult to type without a programmable keyboard.
1. Bee use one single letter for primitive types: {A B C D T F L W U N Q R S X Z} This come from mathematics. We have not used Unicode symbols: { ℂ ℍ ℕ ℙ ℚ ℝ ℤ }. We could have, but not all capital letters are available: {A B F L D S T X} there are all missing and the Bee language could look inconsistent.
1. Single letter symbols make type annotation very compact. Sometimes a list of parameters could be long with various type annotations. Avoiding long expressions is one of Bee goals, so it is logical to use short type identifiers.
1. Bee support some Greek and Cyrillic letters: {∀ ∃ Σ Π Δ Γ Λ Φ Ψ Ω Б Г Д Ж И Л Ф Ц Ч Ш Щ Э Я}. We could have support all but some look too much like the Latin letters. Also we enable some lowercase Greek letters: {λ φ π α β ɣ ε δ μ ω }
1. Bee support superscript numbers: {⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹}. We recognize superscript as power: x² and xⁿ. You can also use any Latin superscript characters: (ᵃ..ᶻ). Caret symbol ^ is used only for expression based exponents like: X^(¹/₂)
1. Subscript numbers are recognized as numbers in fractions like: {¹/₂,⁻¹/₄,³/₄...}. You can also use composite identifiers starting with a letter: (x₁, x₂, α₁, β₂ ω₂) are some valid identifiers in Bee. 
1. Bee use Unicode symbols for geometric types. These symbols are intuitive and make geometric types shorter. For example: `∠` = Angle, ⊡ = Dot, ◷ = Arc. Many other shapes are recognized. 
1. Bee define the "if" statement differently than most other languages. The "if" keyword is used as a _conditional_ for other statements or as ternary operator in lambda expressions. 
1. Bee is using "#" for module single line comments outside of any rule or block of code. This is same symbol used in Wiki *.md pages for titles and sub-titles. It does not support indentation.
1. Bee is using "\*\*" for single line comment inside rules and blocks. This is used in Wiki *.md files for bold. You can use "**" only after at least two space indentation.
1. Bee use "+- ... -+" for block comment. In combination with "|" you can create boxed comments where "+" is the corner of the box. This is useful to create a module header.
1. Bee support C like comments: `/* ... */` is for "expression comments" that can be used in parenthesis. Two slashes "//" represent end of line comment or statement comment. This can not be used in parenthesis or brackets.
1. For string pattern replication you can use star: "\*" operator. For example "01" * 4 = "01010101". In other languages the same operator is numeric _times_ but in Bee we are using "·" for _times_ like in mathematics. 
1. For concatenation between two strings We have chosen: "&". A number can be appended to a string like: `"10" & 1 = "101"` that may look strange but you get used to it. Alternative operators: {+ . / \\} can be used.
1. Bee is an imperative language. That is: most statements start with a verb. For example "make" will create one or more variables. Using "alter" you can modify variables. This approach reduces the number of keywords for declarations.
1. Bee do not use any abbreviation for keywords. This enable spell checking tools, to avoid typos in source code. Also, not all developers know English. Bee offer the opportunity to learn some English while learning the language.
1. Data type is declared after identifier and initialization, as optional _hint_. This makes type inference possible. In Java for example, the type keyword is mentioned, before the identifier name. This makes the _type_ mandatory.
1. Bee use keyword _rule_ to define a subroutine and keyword _apply_ to execute a subroutine. We have considered other keyword alternatives: {"routine", "functor", "relation", "method"}, but the _rule_ is more general for all these cases.
1. Bee use the symbol "\*" prefix to declare variable number of arguments. In C and JavaScript you must use 3 dots for this job "...". I think this was a poor choice. In Bee we use this symbol to describe syntax patterns.
1. Bee use _sigil_ "$" for _system constants_ and "@" for _system variables_. These are global, so protecting them with a _sigil_ is useful to prevent overriding by mistake.
1. Bee use starting and ending keywords to define blocks of code, not curly brackets. This eliminate the nested bracket nightmares and improve visual aspect of the code. We can use brackets for data literals: ordinals, sets, hash tables and objects.
1. Bee has support for markup large text. This include <text>, <sql>, <xml> and <html>. You can use template notation "#()" inside these string literals for string interpolation. 

**Read Next:** [Bee Syntax](https://github.com/sage-code/bee/blob/master/syntax/readme.md)
