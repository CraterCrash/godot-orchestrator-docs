---
toc_max_heading_level: 4
---

# Properties

**Properties** are attributes on an object, that describe certain object state.
For example, a `Button` in a user interface may have an icon property to provide some visual indicator of what the button does.

## Property types

Properties are associated with a specific data type, such as `Boolean`, `Integer`, or `Float`, but can also be represented by more complex types such as `Object`, `Array`, `Dictionary`, or specialized packed array types.
Properties are specifically color coded for easy identification, just like [variables](variables#variable-types).

## Accessing properties

Properties can be accessed in two ways: by using the **Get** node (called an accessor) or the **Set** node (called a mutator).

You can create a **Set** or **Get** node for a property by:

1. Right-clicking in the graph or dragging a connection from an existing node
2. In the **All Actions** dialog, search for the property of interest, i.e. `Get Position` or simply `Position`.
3. Make sure that the selection has an icon similar to <EditorIcon name="MemberProperty"/> and not <EditorIcon name="MemberMethod"/> on the right.
4. Either press the **Add** button or simply hit **Enter**.

Using **Property** nodes allows an `Orchestration` to read or modify the state of that property.
For example, a character controller would update the `Position` property each frame based on input. 

### Get property

The property **Get** node accesses the current value of a property. 
These nodes do not have execution control flow pins as they're designed to specifically return a single value to be used as *input* values to other nodes.

<Figure image="/img/nodes/properties/property-get-node.png">Get <b>Position</b> property</Figure>

In this example, to get the `position` property, the `Node3D` object reference must be provided as an input.
This could be a **Get Self** reference if the current script is based on a `Node3D` type, or some other object.

### Set property

The property **Set** node updates or modifies the value of a property.
These nodes have execution control flow pins as they're designed to be called in a sequence chain.
These nodes also have an *input* pin based on the property's type to set the property value with.

<Figure image="/img/nodes/properties/property-set-node.png">Set <b>Position</b> property</Figure>

In this example, to set the `position` property, the `Node3D` object reference must be provided as an input.
This could be a **Get Self** reference if the current script is based on a `Node3D` type, or some other object.

## Properties via Methods

A property's value can be accessed or modified using method calls, too.

<Figure image="/img/nodes/properties/property-via-methods.png">Get/Set <b>Position</b> using Methods</Figure>

The benefit to using methods rather than properties is the implied `Self` reference.