---
toc_max_heading_level: 4
---

# Dictionary

One of Godot's built-in types is a `Dictionary`, which is responsible for storing key-value pairs.
Dictionaries are associative containers that preserve insertion order. 
In other languages, these are often referred to a hash map or an associative array.

The Orchestrator documentation does not get into the specifics of what a `Dictionary` is or is used for at a fundamental level.
If you need more details on what a `Dictionary` is or what you may need or want to use such a type, please see the [Godot documentation](https://docs.godotengine.org/en/stable/classes/class_dictionary.html).

## Overview 

The Godot engine exposes a variety of nodes to operate on `Dictionary` container types, such as getting an entry by key, removing an entry by key, or getting the size of the dictionary to name a few.
These operations can all be found by searching for _dictionary_ in the **All Actions** search window, some shown below:

<Figure image="/img/nodes/dictionary/dictionary-nodes.png">Sample of dictionary nodes</Figure>

Orchestrator extends the Godot Engine by introducing two custom node types, denoted by the special <EditorIcon name="Dictionary"/> icons:

* [`Make Dictionary`, to create a new dictionary type](#creating-a-dictionary)
* [`Set`, to set a dictionary key/value pair](#setting-value-in-an-existing-dictionary)

For any Godot provided `Dictionary` action, you can view the documentation for that action in the Godot Editor by right-clicking the node in the graph and clicking the <EditorIcon name="Help"/> **View Documentation** option.
The following sections focus on the custom nodes and the behavior they supply to Orchestrator.

## Creating a dictionary

To create a new `Dictionary` to store key/value pairs, select the `Make Dictionary` action in the **All Actions** search window.
The node is designed to accept zero or more key/value pairs.
When the node is first placed onto the graph canvas, it will return an empty `Dictionary`, as illustrated here:

<Figure image="/img/nodes/dictionary/make-dictionary.png">Creates an empty Dictionary</Figure>

To add key/value pairs to the `Dictionary` during construction, press the <EditorIcon name="ZoomMore"/> button.
This will add two new input pins for each key-press that accept <EditorIcon name="Variant"/> data types for the new key and its associated value.
As shown below, this is what the node will look like after pressing the **Add Pin** button just once:

<Figure image="/img/nodes/dictionary/make-dictionary-add-pin-pressed.png">Creates a Dictionary with a Key and Value</Figure>

The <EditorIcon name="Variant"/> input pins are wildcards, and will accept any type of connection from any other pin type.

### Node properties {#node-properties-create}

The following describes the input and output pins for the **Make Dictionary** node.

| Property                                   | Description                                                                                           |
|:-------------------------------------------|:------------------------------------------------------------------------------------------------------|
| <EditorIcon name="Variant"/> Key n         | This is the entry's _key_ value that will be used to uniquely identify the value in the `Dictionary`. |
| <EditorIcon name="Variant"/> Value n       | This is the entry's _value_, that will be associated with its match `Key n` in the `Dictionary`.      |
| <EditorIcon name="Dictionary"/> Dictionary | The output `Dictionary` that will contain any defined `Value n` values associated by the `Key n`      |

:::tip
When using the **Make Dictionary** node, each `Key n` should be unique.
If multiple input key/value pairs use the same **Key**, only the last pair with the highest index `n` for `Key n` will remain.
:::

## Setting value in an existing dictionary

In languages like **GDScript** or **C#**, the designer uses subscript operators to assign values into a `Dictionary`.
These operators use the key to effectively insert or displace any existing entry with that key in an already existing dictionary.
Here's a trivial example:

```python
the_dict[the_key] = the_value
```

In visual scripting, there isn't a concept of subscript operators, so this operation must be performed using a custom node type that handles the intrinsic subscript manipulation for you.
This is precisely what the **Set Dictionary Item** node does.

<Figure image="/img/nodes/dictionary/set-dictionary-item.png">Set a dictionary key/value item node</Figure>

This node is extremely powerful as it provides a variety of functionality and information about the operation as outputs.
See the [node properties](#node-properties-set) section for details on the input and output pins.

### Node properties {#node-properties-set}

The following describes the input and output pins for the **Set Dictionary Item** node.

| Property                                   | Description                                                                                                 |
|:-------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| <EditorIcon name="Dictionary"/> Target     | This is the target `Dictionary` that will be modified by this node.                                         |
| <EditorIcon name="Variant"/> Key           | This is the dictionary key (a wildcard) to be inserted or modified by this node.                            |
| <EditorIcon name="Variant"/> Value         | This is the value (a wildcard) associated with the key that will be added by this node.                     |
| <EditorIcon name="Dictionary"/> Dictionary | This is the modified `Dictionary`, after the key has been added by the node.                                |
| <EditorIcon name="bool"/> Replaced         | This represents whether an existing entry with the `Key` was replaced if the value is `true`.               |
| <EditorIcon name="Variant"/> Old Value     | This is the old value (a wildcard) that was replaced for the `Key`, if the `Replaced` output pin is `true`. |
