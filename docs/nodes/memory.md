
# Memory

**Memory** nodes are used to dynamically allocate and free objects in an `Orchestration`.

For example, you may add a `Button` to your user interface and based on some interaction, remove the button from the scene.
In this case, you would use a `New` node to create the button and the `Free` node to free it.

:::note
These nodes are currently considered experimental <EditorIcon name="NodeWarning"/>.<br/>
While it's okay to use these nodes, be aware that their implementation may change in the future.
:::

## Creating objects

The **New** or **Create Instance** node is responsible for creating a new instance of a given object.
You can use this node to allocate a new instance of a any `Node`, `Resource`, or `Object` type, as long as the type is not a singleton.

<Figure image="/img/nodes/memory/memory-new-node.png">Create a new instance of a <b>Button</b> node</Figure>

To create a **New** or **Create Instance** node:

1. Right-click in the graph to access the **All Actions** view.
2. Search for `New`, locating the `Memory > New` node.
3. Either press the **Add** button or simply hit **Enter**.
4. In the **Inspector** view, select the desired `Class Name` from the inspector, defaults to `Object`.

:::warning
Godot's **Object** selector window shows all possible object class names; however, not all choices can be used.
If the class name is a singleton, i.e. `OS`, this value will not be accepted and you will need to select another value.
:::

### Properties

| Property   | Description                                           |
|:-----------|:------------------------------------------------------|
| Class Name | Specifies the class name of the object to be created. |

## Freeing objects

The **Free** or **Deallocate Instance** node is responsible for destroying an instance of a given object.
This node uses a combination of `queue_free()`, `memdelete`, and `unreference()` to deallocate the object based on its type.
For example, if the node is still in the scene tree, the `queue_free()` method is used.
If the object is a `Resource`, the `unreference()` method is used because resources are reference counted.

<Figure image="/img/nodes/memory/memory-free-node.png">Free an instance of a <b>Button</b> node</Figure>

To create a **Free** or **Deallocate Instance** node:

1. Right-click in the graph to access the **All Actions** view.
2. Search for `Free`, locating the `Memory > Free` node.
3. Either press the **Add** button or simply hit **Enter**.
4. Connect the object to be freed to the input `Target` pin.

