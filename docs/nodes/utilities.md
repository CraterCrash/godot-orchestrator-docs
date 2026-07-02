---
toc_max_heading_level: 4
---

# Utilities

## Make built-in type nodes {#construct-make}

For built-in Godot types like `Vector3`, you do not use the [`Memory > New Instance`](memory#creating-objects) node, but instead use the **Make** or **Compose** node.
This is because built-in types are allocated on the stack rather than on the heap.

These nodes allow you to create a specific built-in type from one or more different constructor arguments.
For example, `Vector3` provides the following choices:

<Figure image="/img/nodes/utilities/make-vector3-actions.png">Make Vector3 Actions</Figure>

One of the most common use cases is where you want to supply the `X`, `Y`, and `Z` values directly:

<Figure image="/img/nodes/utilities/make-vector3-node.png">Make Vector3 Node using X, Y, and Z</Figure>

This is the equivalent of GDScript:
```gdscript title="Creating a Vector3" showLineNumbers
var vec : Vector3 = Vector3(1.0, 2.0, 3.0)
```

## Breaking built-in type nodes {#destruct-break}

When you already have a `Vector3`, you may be interested in obtaining only the `X` coordinate value.
This is where the **Break** node is useful, as it allows you to take a struct-based built-in type and decompose it to its lower component types.

There is generally only one **Break** node per built-in type, e.g. for `Vector3`:

<Figure image="/img/nodes/utilities/break-vector3-node.png">Break Vector3 into X, Y, and Z</Figure>

Once the built-in type has been broken, you can access the individual components independently.

This is the equivalent of GDScript:
```gdscript title="Accessing a Vector3 X component" showLineNumbers
var vec : Vector3 = Vector3(1.0, 2.0, 3.0)
# Where you only want to print the X component of the Vector
print(vec.x) 
```

## Print string {#print-string}

The **Print String** node extends the standard Godot print functions, allowing to add text to an on-screen overlay.

<Figure image="/img/nodes/utilities/print-string-node.png">Print String Node</Figure>

:::tip
The <EditorIcon name="Notification"/> icon indicates the node only operates during debug/editor builds.
This makes this extremely useful to debugging without needing to remove the nodes for exports.
:::

### Node properties

The following describes the input and output pins for the **Print String** node.

| Property                                  | Description                                                                    |
|:------------------------------------------|:-------------------------------------------------------------------------------|
| <EditorIcon name="String"/> Text          | Specifies the text to be printed.                                              |
| <EditorIcon name="bool"/> Print To Screen | Specifies whether the text will be added to the `PrintString` overlay canvas.  |
| <EditorIcon name="bool"/> Print To Log    | Specifies whether the text will be added to the console/output panel.          |
| <EditorIcon name="Color"/> Text Color     | The color to be used when adding the text to the `PrintString` overlay canvas. |
| <EditorIcon name="float"/> Duration       | The time that the text remains on the screen before it disappears.             |
