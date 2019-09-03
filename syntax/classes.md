## Object Oriented

Bee language is using single inheritance similar to Java.

**bookmarks**

* [concept](#concept)
* [class](#class)
* [parameters](#parameters)
* [instance](#instance)
* [attributes](#attributes)
* [constructor](#constructor)
* [comparing](#comparing)
* [methods](#methods)
* [rules](#rules)
 
## Concept

A class is a composite data type. It implement properties and methods required to create objects. Objects are _state machines_ that are instantiated on demand and released from memory when they are no longer needed. The most important characteristics of objects are:

* Encapsulation: each object has its own states;
* Inheritance: an object inherit its base class;
* Polymorphic: an object can play its base class role;

## Object

We already know how to create objects using an object literal.

```
**declare an object**
make object := {attribute:value ...} ∈ Object; //full declaration
make object := {attribute:value ...}; // type inference for Object

```

**object constructor**

You can create simple objects using Object() default constructor:

```
make object_name := Object(attribute:value, ...); // using type inference
make object_name := Object(attribute:value, ...) ∈ Object; //full declaration
```

One object can receive attribute names that do not exist. Default constructor will create new attributes automatic and assign the value for each. Attributes do not need to be created for default constructor. However after object is created the structure is locked: no other attributes can be added.

## Class

A class is a subtype from a base class or from root class called: Object().

```
class class_name(self, parameters) <: Object:
...
```

**Class design**

In addition to a simple object, you can create a class with constructor and destructor in a single statement. A class is actually an object factory or a name-space depending on the way is defined. A class can be a simple collection of attributes and properties or can be much more if we create business rules for it.

**pattern:**

```
class class_name(param:value ∈ type, ...*args ∈ [S]) <: base_class:
  ** class local scope
  ...
create  //constructor
  ** call base class constructor
  self := base_class(argument,...);
  ... 
  ** object local scope
  ...  
remove //destructor
  ** object release region
  ...
return;
```

**Class Tree**
There is a special class that has name _"Object"_ and represents the root class. Each classes can inherit from Object or from other _"base class"_ forming a _"class tree"_. Each child class will have public elements of parent class.

**Notes**
* Parameter "self" is a reference to object that is about to be created,
* A class that do not have "create" region can not have "remove" either,
* A class that do not have "create" region can not be instantiated.

## Parameters 
A class can have parameters that receive values for object initialization.  Parameters have a local scope in class. If a parameter is of type reference its value will be propagated out but only if it is captured by a argument variable.

Class parameters can be assigned by name or by position. Last parameter in a class can use prefix (*) and receive multiple values (*args). This argument is called "variable argument" and is an Array that leaves on the stack and is created from the rest of the arguments.

**notes** 
* A constructor can be called a second time for same object, but this is a bad practice,
* A good constructor can check parameter self and fail if it is not Null.

## Instance
The _self_ is the current instance that is created using make. When _self_ is Null it can be created using superclass. If the superclass do not have a constructor, self must be explicit initialized using the Object() constructor. If self remain null after create the object can not be used.

**Note:** 

* Bee use make to create a new object,
* Object can be created by the class constructor.

**example**
```
** declare object from arbitrary class and initialize with the constructor
make object_name := class_name(param:value,...);

** deferred initialization (alternative)
make object_name ∈ class_name; 

** object is not initialized yest
pass if object_name = Null; // Not initialized 

** initialize the object using the constructor
alter object_name := class_name(param:value, ...);
```

## Attributes

A class can have properties and attributes.

* properties belong to class scope 
* attributes belong to object scope

**Example:**
This example show how to declare class properties and object attributes.

```
class Demo(param ∈ S) <: Object:
  ** declare class properties
  make .hasObjects := True; //define public property
  make _count      := 1;    //declare private property
create  
  when self = Null do
     self := Object(); //call default constructor    
     alter _count +=1; //count new object
  done; 
  ** declare object attributes
  make .public   :=  param;    //public attribute
  make _private  := "private"; //private attribute
remove
  alter _count -=1 if _count > 0; //count down one object
  alter .hasObjects := (_count > 0);  //reset public property    
return;
```

**notes**

* attributes and properties can be public or private,
* public attributes and properties start with ".",
* private attributes and properties start with "_",
* inherited attributes of _current object_ can be accessed using "self" qualifier.
* inherited properties of _base class_  can be accessed using "base" qualifier.

## Using the class

Class can be used as is or it can be instantiated.

```
** using class attribute with class qualifier
print (Demo.hasObjects); // expect: 0

make obj := Demo("my value"); //create instance of Demo

** using class attribute with object qualifier
print (obj.hasObjects); // expect: 1

** making a test
fail if obj.hasObject ≠ Demo.hasObjects; //expect to pass

** using object attributes with dot notation
print (obj.public);   // expect: "my value"
print (obj._private); // expect to fail
```

## Constructor
A class can have a single constructor. A constructor can use decision statements to create _"self"_ object with different parameters. This is call _conditional constructor_. If the constructor fail to create _"self"_ object will be Null. A Null object can not be used, it has no properties and no attributes.

```
...
create
  ** conditional constructor
  fail if self ≠ Null; //block object reuse
  when condition do
    base_class(self, some_arguments); //forward self to base_class
  else
    base_class(self, other_arguments); //forward self to base_class
  done;
  fail if self = Null; //verify if initialization is successful
return;
```

## Comparing
We can use comparison operators: {"=", "≠", "!="} and {"≡","!≡"} with objects. First comparison "=" will compare the object attributes. If the objects have equal attributes they are also equal. Second "≡" compare object location. If is the same the objects are identical.

Two objects are similar if they have the same class. The attributes may be different. For this we use "similar" operator that looks like this: "\~".

Operator "is" can be used with an object to check if the object is derived from specified class like:  `object is Class_Name`. Notice this can not be used with two objects. You must use "=" and "≡" to compare two objects.

**Ordering objects:** 

Operators ">" and "<" can work with objects that have a single attribute, or multiple attributes. This operation could be overwritten by a particular class. The default Object, has "order" implemented in a generic fashion. It may not work correctly if an object has more than one attribute. Two objects must be from the same base_class to be compared.

**Initialization**
Objects can be declared and initialize simultaneously using operator ":=" with constructor, or can be declared first using "∈" and initialize later using alter and operator ":=" with a constructor call. After the call the object should not be Null. If it is you should  not use it.

**Example:**
```
rule main:
  make o,n ∈ Object; //  Null objects 

  ** initialize the objects
  alter o := {test:1};
  alter n := {test:1}; 
  
  ** objects are equivalent
  pass if (o = n); // equivalent  
  fail if (o ≠ n); // equivalent  

  print o; // {test:1};
  print n; // {test:1};
  
  ** objects are not identical
  pass if (o!≡ n); // expected to pass  
  fail if (o ≡ n); // expected to pass  
return;
```

## Methods

The methods are rules associated to a class instance. 

**pattern:**

```
** declare a private method
rule _rule_name(self ∈ Class_Name, param ∈ Data_Type ...) => (result ∈ Type):
   pass; // do nothing
return;
```

**note** 
* self parameter is explicit declared and must be not Null,
* inside methods you can access self object using dot notation,
* methods can be called with dot notation,
* only objects have methods, classes have rules,
* methods are public or private to the module,
* public methods start with "." while private methods can use "_" prefix.

## Rules

A class can have internal rules that can be public or private.

**pattern**

```
** define a class with rules
class Test() <: Object:
  ** private class rule
  rule _hidden(message ∈ S):
    print(message);
  return;

  ** public class rules
  rule .run_me(message ∈ S):
    apply _hidden(message);
  return;  
return;

** test class rules
rule main()
  ** using rules of a class
  apply Test.run_me("Hello World"); 

  ** making an alias for an internal rule;
  alias run_me := Test.run_me;
  apply run_me("I'm alive!");
return;
```

**Notes:** 
* In the example above the class is used as a name-space,
* A class with rules can also have properties,
* A class with rules usually is not instantiated,
* Sometimes classes with rules can also have constructor and destructor.

Generics are in draft and not yet fully designed.

**Read next:** [Standard Library](standard.md)