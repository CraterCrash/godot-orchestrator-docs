---
toc_max_heading_level: 4
---

# Scene

Sometimes an `Orchestration` simply modifies the behavior of the node that it's attached; however, there are other situations where one node needs to coordinate, manipulate, or interact with other nodes in your scene.
Orchestrator provides several useful ways to interact with other scene nodes and the Godot `SceneTree`.

## Scene nodes

Godot provides dozens of scene node types, which provide some basic archetype in the engine.
For example, there are nodes that provide user interface widgets, nodes that provide behaviors for 2D games, and others for 3D games.
Additionally, these nodes have specializations for things such as characters, meshes, triggers, and more.

When you attach an `Orchestration` to a scene node, the `Orchestration` will inherit the behavior of the base type you assigned when you created the script.
Most users assign the script's base type to match the node type you attach the orchestration to, a common parent type such as `Node3D`, `Node2D`, or `Node`.

## Accessing scene node behaviors

Accessing a scene node's behavior (functions and properties) occurs by searching for the function or property in the **All Actions** dialog.
The main question is whether you want to access a function or property for the node that the `Orchestration` is attached, or are you wanting to access a function or property on another node in the scene.

### Behaviors on orchestration's owner

By default, the **All Actions** dialog presents a list of behaviors that are relevant to the `Orchestration` owner when you right-click on the graph.
For example, if the base type selected is a `Node3D` and you would like to call the `rotate_y` function:

1. Right-click on the graph to open the **All Actions** dialog.
2. Search for `rotate_y`.
3. Select the `Call Rotate Y` and either pressed the **Add** button or hit **Enter**.

:::note
When you drag the mouse from either an input or output pin, the **All Actions** dialog presents a context-specific list of actions based on the type of pin you dragged from.
This context-specific list often will be a subset or not even related to the base type of the `Orchestration`, so make sure to right-click on the graph to access the **All Actions** dialog if you're interested in the attached node's methods or properties.
:::

### Behaviors on other nodes

To access behavior on other scene nodes, this requires a reference to that specific scene node.
A reference to that node can be obtained simply by:

1. Selecting the desired scene node in the **Scene** view.
2. Drag the scene node onto the graph.
3. Releasing the mouse button will spawn a **Get Scene Node** node.

:::info
A **Get Scene Node** uses a Godot `NodePath` to refer to the scene node.
If you rearrange your scene, the path to the node may change, and the **Get Scene Node** will need to be updated to reflect the new path.
In order to change the path, select the **Get Scene Node** and then modify the `Node Path` property in the **Inspector** view.
:::

## Scene node properties

The **Get Scene Node** node is designed to use a `NodePath` to find the node in the current scene and return a reference to the physical node object in the scene.
To modify the **Get Scene Node** properties, use the **Inspector** view.

| Property  | Description                                            |                                            
|:----------|:-------------------------------------------------------|
| Node Path | The relative path to the node that should be returned. |

The *output* data pin on the node will contain the reference to the node identified by the `Node Path`.
By dragging the mouse away from the *output* pin will open the **All Actions** dialog with access to context-specific actions to the scene node's type.

## Scene tree

The `SceneTree` is the top-level concept in a scene, it represents the container that wraps the actual scene.
It is also the place where you can access many common scene helper functions such as `create_timer`, `create_tween`, or calling the `quit()` function to exit the game.

There are two ways to access the `SceneTree`:

- Call the `get_tree()` method on the current node
- Use the `Get Scene Tree` visual script node

Regardless of which approach is used, dragging away from the *output* pin will provide direct access to functions and properties on the godot `SceneTree` object.

### Using the get_tree method

The `get_tree()` method is accessible to an `Orchestration` as long as the base type you chose inherits from `Node`.
If you chose a type that inherits from `Control`, `Node2D`, or `Node3D`, then you can safely access `get_tree()`.

1. Right-click the graph, opening the **All Actions** dialog.
2. Search for `Call Get Tree`, and select the `Call Get Tree` option by either pressing **Add** or hitting **Enter**.

### Using the get scene tree node

The **Get Scene Tree** node is another way to access the `SceneTree` from within an `Orchestration`.
This method is preferred and will work regardless of the base type chosen.

1. Right-click the graph, opening the **All Actions** dialog.
2. Search for `Get Scene Tree` and select the `Call Get Scene Tree` option, either by pressing **Add** or hitting **Enter**.

## Scene Tree properties

There are no properties that can be modified in the **Inspector** view.
The **Get Scene Tree** node simply returns a reference to the `SceneTree` godot object as an *output* pin.

## Instantiating scenes

You may find you have the need to load a specific scene and attach the scene to the current scene.
This is often done when spawning in creatures, other players, or transitioning between scenes.

In languages like `GDScript` or `C#`, the process to instantiate a scene first involves loading the scene from disk, and then creating an instance of the scene.
Orchestrator simplifies this in a single step using the **Instantiate Scene** node.

<Figure image="/img/nodes/scene/instantiate-scene-node.png" caption="Instantiate Scene Node"></Figure>

To add an **Instantiate Scene** node to the graph:

1. Right-click the graph and search for **Instantiate Scene**.
2. Select the `Instantiate Scene` option, and press **Add** or simply hit **Enter**.

### Set what scene to load

Setting which scene to load can be done by either pressing the **Assign...** button on the node itself or by selecting the `Scene` property in the **Inspector** view.
In both cases:

1. Navigate through the **Select File** dialog, locating the scene you instantiate.
2. Select the file and press **Open** or simply double-click the scene file to select.

Once the scene file is selected, the `Scene` property on the node and in the **Inspector** view will include the `res://` based path to the scene.

## Instantiate scene properties

To set the properties for the **Instantiate Scene** node, either modify the `Scene` property directly on the node or select the node and use the **Inspector** view to modify the `Scene` property.

| Property | Description                                                                         |
|:---------|:------------------------------------------------------------------------------------|
| Scene    | Specifies the full `res://` based path to the scene file that will be instantiated. |

* The `Scene` property can be set dynamically by assigning an connection to the `Scene` input pin that contains the full path to the scene to load.
* The *output* pin will refer to the root `Node` in the scene that was loaded.

:::info
It is perfectly safe to connect the `Scene Root` *output* pin to other node input pins if necessary.
The same instantiated scene root will be returned rather than instantiating the scene for each node input.

If used in a loop, a *new* scene will only be created when the *input* control flow pin is called.
:::