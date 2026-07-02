---
toc_max_heading_level: 4
---

# Arrays

One of Godot's built-in types is an `Array`, which is responsible for storing a collection of elements.

The Orchestrator documentation does not get into the specifies of what an `Array` is or is used for at a fundamental level.
If you need more details on what an `Array` is or why you may need or want to use such a type, please see the [Godot documentation](https://docs.godotengine.org/en/stable/classes/class_array.html).

## Overview

The Godot engine exposes a variety of nodes to operate on `Array` container types, such as getting an entry by its index, removing an entry by index or value, or getting the size of the array to name a few.
These operations can all be found by searching for _array_ in the **All Actions** search window, some shown below:

<Figure image="/img/nodes/array/array-nodes.png">Sample of array nodes</Figure>

Orchestrator extends the Godot Engine by introducing several custom node types, denoted by the special <EditorIcon name="FileThumbnail"/> icons:

* [`Make Array`, to create a new array type](#creating-an-array)
* [`Add Element`, adds an element to an existing array type](#add-element)
* [`Find Array Element`, finds an element in an existing array](#find-element-index)
* [`Remove Array Element`, removes an element in an existing array](#remove-by-value)
* [`Remove Array Element By Index`, removes an element in an existing array by index](#remove-by-index)
* [`Clear Array`, clears the contents of the array](#clear-array)
* [`Append Arrays`, appends the contents of one array into the other](#append-arrays)

There are also two operator nodes for `Array` data types:

* [`Get At Index`, gets an element at a given index](#get-element-at-index)
* [`Set at Index`, sets an element at a given index](#set-element-at-index)

For any Godot provided `Array` action, you can view the documentation for that action in the Godot Editor by right-clicking the node in the graph and clicking the **View Documentation** option.
The following sections focus on the custom nodes and the behavior they supply to Orchestrator.

## Creating an array

To create a new `Array` to store elements, select the `Make Array` action in the **All Actions** search window.
The node is designed to accept zero or more elements as input values.
When the node is first placed onto the graph canvas, it will return an empty `Array`, as illustrated here:

<Figure image="/img/nodes/array/make-array.png">Creates an empty Array</Figure>

To add elements to the `Array` during construction, press the <EditorIcon name="ZoomMore"/> button.
This will add one new input pin for each key-press that accept <EditorIcon name="Variant"/> data types for the new element.
As shown below, this is what the node will look like after pressing the **Add Pin** button just once:

<Figure image="/img/nodes/array/make-array-add-pin-pressed.png">Creates an Array with an Element</Figure>

The <EditorIcon name="Variant"/> input pins are wildcards, and will accept any type of connection from any other pin type.

:::tip
Creating a **Typed** <EditorIcon name="Array"/> array is only supported in variable declarations.
:::

### Node properties {#node-properties-create}

The following describes the input and output pins for the **Make Array** node.

| Property                               | Description                                                          |
|:---------------------------------------|:---------------------------------------------------------------------|
| <EditorIcon name="Variant"/> Element n | This is the entry's _element_ value.                                 |
| <EditorIcon name="Array"/> Array       | The output `Array` that will contain any defined `Element n` values. |

## Add element

If you already have an `Array` value, one of the most common operations is to add a new element to the end of the array.
This can be done by using the **Add Array Item** node.

<Figure image="/img/nodes/array/add-array-item-node.png">Adds a new element to an Array</Figure>

### Node properties {#node-properties-add-item}

The following describes the input and output pins for the **Add Array Item** node.

| Property                             | Description                                                           |
|:-------------------------------------|:----------------------------------------------------------------------|
| <EditorIcon name="Array"/> Target    | This is the target `Array` that will be modified by this node.        |
| <EditorIcon name="Variant"/> Element | The element value that will be appended to the end of the `Array`.    |
| <EditorIcon name="Array"/> Array     | The modified `Array` as an output value, after the element was added. |
| <EditorIcon name="int"/> Index       | The index into the `Array` where the new element exists.              |

## Find element index

If you have an existing `Array` and you want to determine what index an element uses, this can be done by using the **Find Array Element** node.

<Figure image="/img/nodes/array/find-array-element-node.png">Finds an element's index in an Array</Figure>

### Node properties {#node-properties-find-element-index}

The following describes the input and output pins for the **Add Array Item** node.

| Property                          | Description                                                    |
|:----------------------------------|:---------------------------------------------------------------|
| <EditorIcon name="Array"/> Target | This is the target `Array` that will be searched.              |
| <EditorIcon name="Variant"/> Item | The element value to locate within the `Array`.                |
| <EditorIcon name="Array"/> Array  | The target `Array` as an output value for chaining operations. |
| <EditorIcon name="int"/> Index    | The index into the `Array` where the element exists.           |

:::tip
If the specified **Item** does not exist in the array, the returned **Index** will be `-1`.

You can also use the built-in Godot function `has` to search the `Array` if you simply need to know if the `Array` contains the element item.
The function returns `true` if the item exists and `false` if it does not.
:::

## Remove element

Another common operation is to remove an element from an `Array`.
Orchestrator provides two ways to remove elements, remove by index or by value.
These are described below.

### Remove by index

To remove an element from an `Array` by index requires that you know in advance the index/position of the element in the container.
This could be information you've stored in some data structure, or perhaps you've used the [`Find element index`](#find-element-index) node.

<Figure image="/img/nodes/array/remove-by-index-node.png">Removes an element by index in an Array</Figure>

#### Node properties {#node-properties-remove-element-index}

The following describes the input and output pins for the **Remove Array Item By Index** node.

| Property                          | Description                                                                                   |
|:----------------------------------|:----------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Target | This is the target `Array` that will be modified.                                             |
| <EditorIcon name="int"/> Index    | The element index to be removed.                                                              |
| <EditorIcon name="Array"/> Array  | The target `Array` as an output value for chaining operations, after the element was removed. |

### Remove by value

It's often common where you may have the element in an `Array`, but you don't know what the element's position is in the container.
You could use the [`Find element index`](#find-element-index) node or other functions to identify the position, but this adds unnecessary clutter to your graphs.
This is where the ability to remove by value becomes valuable.

<Figure image="/img/nodes/array/remove-by-value-node.png">Removes an element by value in an Array</Figure>

#### Node properties {#node-properties-remove-element-value}

The following describes the input and output pins for the **Remove Array Item** node.

| Property                             | Description                                                                                   |
|:-------------------------------------|:----------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Target    | This is the target `Array` that will be modified.                                             |
| <EditorIcon name="Variant"/> Element | The element to be removed.                                                                    |
| <EditorIcon name="Array"/> Array     | The target `Array` as an output value for chaining operations, after the element was removed. |
| <EditorIcon name="bool"/> Removed    | An output boolean value that indicates whether the element was found and removed.             |

## Clear array

If you need to remove all elements from an `Array`, while you could use a loop, that's highly inefficient.
The most efficient way to clear an array is to use the **Clear Array** node, as shown here.

<Figure image="/img/nodes/array/clear-array-node.png">Clear/remove all elements from an Array</Figure>

#### Node properties {#node-properties-clear-array}

The following describes the input and output pins for the **Clear Array** node.

| Property                             | Description                                                                                 |
|:-------------------------------------|:--------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Target    | This is the target `Array` that will be cleared.                                            |
| <EditorIcon name="Array"/> Array     | The target `Array` as an output value for chaining operations, after the array was cleared. |

## Append arrays

In some instances you may have multiple `Array` values where you'd like to combine their contents into a single `Array` value.
This can be achieved by using the **Append Arrays** node.

<Figure image="/img/nodes/array/append-arrays-node.png">Appends contents of the Source array into the Target array</Figure>

#### Node properties {#node-properties-append-arrays}

The following describes the input and output pins for the **Append Arrays** node.

| Property                          | Description                                                                                  |
|:----------------------------------|:---------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Target | This is the target `Array` that will be modified.                                            |
| <EditorIcon name="Array"/> Source | The source `Array` where elements will be copied from and appended to the target `Array`.    |
| <EditorIcon name="Array"/> Array  | The target `Array` as an output value for chaining operations, after the array was modified. |

## Operators

In most programming languages, the `Array` data type has index-based operators that allow you to read or write values using the `[]` brackets combined with an index/position.
Orchestrator's visual scripting language is no different.

### Get element at index

The **Get Element at Index** node is the effective inverse of the [`Find Array Element`](#find-element-index) node, allowing to read and obtain the value at a given index/position within the array.
If the supplied index is out of bounds for the `Array`'s size, an error occurs, just like GDScript.

```gdscript title="GDScript example of get by index" showLineNumbers
var arr : Array = ["a", "b", "c"]
print(arr[1]) ## outputs "b"
```

<Figure image="/img/nodes/array/get-element-at-index-node.png">Read the array element at a given index</Figure>

#### Node properties {#node-properties-get-by-index}

The following describes the input and output pins for the **Get Element at Index** node.

| Property                             | Description                                                                                                                  |
|:-------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Array     | This is the `Array` that will be read.                                                                                       |
| <EditorIcon name="int"/> Index       | The index within the `Array` to read.<br/>_The value should be greater-than-or-equal to `0` and less than the `Array` size._ |
| <EditorIcon name="Variant"/> Element | The element that exists at the specified **Index** within the `Array`.                                                       |

### Set element at index

The **Set Element at Index** node is the inverse of the [`Get element at index`](#get-element-at-index) node, allowing a value to be written to the given index/position within the specified array.
Unlike other languages where you use the `[]` operator to write the values, this node allows for resizing the array on-demand.

<Figure image="/img/nodes/array/set-element-at-index-node.png">Write an element at a given index in the array</Figure>

#### Node properties {#node-properties-set-by-index}

The following describes the input and output pins for the **Set Element at Index** node.

| Property                              | Description                                                                                    |
|:--------------------------------------|:-----------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Array      | This is the `Array` that will be modified.                                                     |
| <EditorIcon name="int"/> Index        | The index within the `Array` to write.<br/>_The value should be greater-than-or-equal to `0`._ |
| <EditorIcon name="Variant"/> Element  | The element to write at the specified **Index** within the `Array`.                            |
| <EditorIcon name="bool"/> Size To Fit | Specifies whether the `Array`'s capacity will be resized automatically.                        |
| <EditorIcon name="Array"/> Result     | The modified `Array` as an output value for chaining operations, after the array was modified. |