## Object Oriented

Bee language is using single inheritance similar to Java.

**bookmarks**

* [concept](#concept)
* [design](#design)
* [parameters](#parameters)
* [instance](#instance)
* [attributes](#attributes)
* [constructor](#constructor)
* [generics](#generics)
 
## Concept

A class is a composite data type. It implement properties and methods required to create objects. Objects are _state machines_ that are instantiated on demand and released from memory when they are no longer needed. The most important characteristics of objects are:

* Encapsulation: each object has its own states;
* Inheritance: an object inherit its base class;
* Polymorphic: an object can play its base class role;

## Object

We already know how to create objects using an object literal.

```
**declare an object**
make object := {attribute:value ...} <: Object; //full declaration
make object := {attribute:value ...}; // type inference

```

**object constructor**

You can create simple objects using Object() default constructor:

```
make object_name := Object(attribute:value, ...); // using type inference
make object_name := Object(attribute:value, ...) <: Object; //full declaration
```

One object can receive attribute names that do not exist. Default constructor will create new attributes automatic and assign the value for each. Attributes do not need to be created for default constructor. However after object is created the structure is locked: no other attributes can be added.

## Class

A class is a subtype from a base class or from root class called: Object.

```
class class_name(self, parameters) <: Object:
...
```

## Design

```
class class_name(self, parameters) <: base_class:
  ** class local context
  ...
create
  ** call base class constructor
  base_class(self, object_attribute:argument,...);
  ... 
remove
  ** object release region
  ...
return;
```

## Parameters 
A class can have parameters that receive values during object initialization. You can define optional parameters with default values using a pairs ":" symbol like (param_name:value ∈ type). Parameters have a local scope in class. They can be modified. If a parameter is of type reference its value will be propagated out but only if it is captured by a argument variable.

**example**
```
** declare object from arbitrary class and initialize with the constructor
make object_name := class_name(param:value,...);

** defered initialization (alternative)
make object_name ∈ class_name; 

** object is not initialized yest
pass if object_name ≡ Null; // Not initialized 

** initialize the object using the constructor
class_name(object_name, param:value, ...);
```

**note** Parameter self, do not need to be specified.

## Instance
The _self_ is the current instance that is created using make. When _self_ is Null it can be created using superclass. If the superclass do not have a constructor, self must be explicit initialized using the Object() constructor. If self remain null after create the object can not be used.

**Note:** 

* Bee use make to create a new object,
* Object can be created by the class constructor.

## Attributes

A class can have object attributes and class attributes.

**Object attributes**

* To declare and use object attributes we use scope qualifier self.*
* To access public object attributes we can use object name as qualifier:
* Oh yes, attributes can be public or private. Private attribute start with _

Declaration:
```
  ** public attribute
  self.attrbute_name := value ∈ type;  
  
  ** private attribute 
  self._attrbute_name := value ∈ type;  
  
```

Dot notation:
```
  object_name.object_attribute;
```

**Class attribute**
Class attributes are static and can be accessed using two scope qualifiers:

```
  object_name.class_attribute;
  class_name.class_attribute;
```

**Class Tree**
There is a special class that has name _"Object"_ and represents the "root" class. Each classes can grow from Object or from other "base class" forming a _"class tree"_. Bee is using single inheritance model. 

## Constructor
A class can have a single constructor. A constructor can use decision statements based on parameter values to create _"self"_ object in different creative ways based on conditions depending on parameters. This is call conditional constructor.

```
...
create
  ** conditional constructor
  fail if self ≠ Null; //block object reuse
  when (condition) do
    base_class(self, some_arguments); //forward self to base_class
  else
    base_class(self, other_arguments); //forward self to base_class
  done;
  fail if self = Null; //verify if initialization is successful
return;
```
**Idea to discuss**
Can we use this to create multiple-inheritance? Maybe call a second constructor using self. So it is augmented in turn with properties and methods from different constructors. Then maybe it will become a monster with 7 heads.

## Comparing objects
We can use comparison operators: {"=", "≠", "!="} and {"≡","!≡"} with objects. First comparison "=" will compare the object location. If the objects have same location they are also equal. Second compare object class and object attributes. If is the same class and all attributes are equal the objects are equivalent.

Operator (match) "~" and "!~", are going to work with objects. Two objects are similar if they have the same class. The attributes may be different. If the classes are different the operator will return false.

Superclass subclass operator: "<:" used like `object <: Class_Name` can be used as logical operator for objects. If is used in a logical expression it will return true if A is subclass of class C and false if not. Operator ":>" is similar but works the other way. 

Operator "is" can be used with an object to check if the object is derived from specified class like:  `object is Class_Name`. Notice this can not be used with two objects. You must use "=" and "≡" to compare two objects.

**Ordering objects:** 

Operators ">" and "<" can work with objects that have a single attribute, or multiple attributes. This operation could be overwritten by a particular class. The default Object, has this "order" implemented in a generic fashion. It may not work correctly if an object has more than one attribute. Two objects must be from the same base_class to be compared.

**Initialization**
Objects can be declared and initialize simultaneously using operator ":=" with constructor, or can be declared first using "∈" and initialize later using alter and operator ":=" with the a constructor call. Second call must use self as argument.

**Example:**
```
rule main:
  make o,n ∈ Object; //  Null objects 

  ** initialize the objects
  alter o := Object(test:1);
  alter n := Object(test:1); 
  
  ** objects are equivalent
  pass if (o ≡ n); // equivalent  
  print o; {test:1};
  print n; {test:1};
  
  ** objects are not the same
  fail if (o = n); // unexpected to fail
  pass if (o ≠ n); // expected to pass
return;
```

## Generics

A class can receive type as parameters. This allows to create generic algorithms for different data types. A similar effect can be created using variant parameters. The difference is at compile time the generic types create more efficient code.

**Generic Class:**
```
class {Generic_Type:Default_Type,...} Generic_Name(self: Null, param ∈ Generic_Type,...) <: Base_Class:
  ** declarations
  ...
create
  ** constructor
  ...
return;
```

**Using Generic:**
Generic class is used to define a subtype then you can declare one or more objects using alias type:

```
** declare new alias type from generic
type new_type: Generic_Class{Generic_Type:Type_Name};

** create new object: using new alias with arguments
make object_name :=  new_type(param:value,...);

** alternative: create new object directly from generic type
make onject_name := generic_class{Type_Name}(param:value,...);

```

**Read next:** [Processing](processing.md)