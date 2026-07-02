
# Memory

**Memory** nodes are used to dynamically allocate and free objects in an `Orchestration`.

For example, you may add a `Button` to your user interface and based on some interaction, remove the button from the scene.
In this case, you would use a `New` node to create the button and the `Free` node to free it.

:::note
These nodes are currently considered experimental <EditorIcon name="NodeWarning"/>.

It is okay to use these nodes, as they're plans to make these stable in Orchestrator 2.6.
It's just their implementation may change in the future, but existing scripts will auto-upgrade.
:::

## Creating objects

The **New** or **Create Instance** node is responsible for creating a new instance of a given object.
You can use this node to allocate a new instance of any type, as long as the type is not a singleton.

In languages like GDScript, the equivalent is the `new()` function:
```gdscript title="Example of creating a button" showLineNumbers
func _ready() -> void:
  var button = Button.new()  
```

In Orchestrator, the equivalent node is:

<Figure image="/img/nodes/memory/memory-new-node.png">Create a new instance of a <b>Button</b> node</Figure>

To create a **New** or **Create Instance** node:

1. Right-click in the graph to access the **All Actions** view.
2. Search for `New`, locating the `Memory > New` node.
3. Either press the **Add** button or simply hit **Enter**.
4. In the **Inspector** view, select the desired `Class Name` from the inspector, defaults to `Object`.

:::warning
Godot's **Object** selector window shows all possible object class names; however, not all choices can be used.
If the class name is a singleton, i.e. `OS`, this value will not be accepted, and you will need to select another value.
:::

### Node Properties

| Property                               | Description                                                    |
|:---------------------------------------|:---------------------------------------------------------------|
| <EditorIcon name="String"/> Class Name | Specifies the class name of the object to be created.          |
| <EditorIcon name="Object"/> Instance   | The newly created instance of the specified `Class Name` type. |

## Freeing objects

In languages like GDScript, you need to know the context of the object to pick precisely what type of function you should call to deallocate an object.
For example, if the object is a `Node` and it's still in the scene tree, you should use `queue_free()`.
If object is any other type of object, you should use `free()`.

In Orchestrator, we simplify this logic by using a universal **Free Instance** node.
It's responsible for making the most appropriate choice for the deallocator function call based on the object's type.
There's no need to guess.

<Figure image="/img/nodes/memory/memory-free-node.png">Free an instance of a <b>Button</b> node</Figure>

To create a **Free** or **Free Instance** node:

1. Right-click in the graph to access the **All Actions** view.
2. Search for `Free`, locating the `Memory > Free` node.
3. Either press the **Add** button or simply hit **Enter**.
4. Connect the object to be freed to the input `Target` pin.

### Node Properties

| Property                               | Description                                       |
|:---------------------------------------|:--------------------------------------------------|
| <EditorIcon name="Object"/> Instance   | The instance that should be deallocated or freed. |

:::tip
If the object has already been deallocated, this node is a no-op.
:::