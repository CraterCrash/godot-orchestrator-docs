---
toc_max_heading_level: 4
---

# Constants

Constants are an integral part of any programming language, as they provide a human-readable names to special values.
For example, in mathematics, there are numerous constants called `TAU` and `PI`, and Orchestrator supports these and many more.

In this section, you will learn what are Orchestrator's constant types, and how to use them.

:::warning
Constant nodes are considered _experimental_<EditorIcon name="NodeWarning"/>, and may change in the future.
While it is safe to use these in your Orchestrations, they may be replaced by a more consolidated, and user-friendly node in the future.
:::

## Class-specific constants

<Figure image="/img/nodes/constants/class-constant-node.png" caption="Example class constant node"></Figure>

Class-specific constants are constants that must be accessed by using the class as a prefix.
For example, if your game needs to access the `SYSTEM_DIR_DESKTOP`, you would do so by using the `OS` class.

In GDScript, the code would look like:
```gdscript
var desktop_directory = OS.SYSTEM_DIR_DESKTOP
```

To access a class-specific constant in Orchestrator:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Class constant`.
3. Press the **Add** button or simply press **Enter**.

Once the node has spawned, select the node in the **Graph** and adjust its properties in the **Inspector** view.

| Property   | Description                                                                          |                                                                          
|:-----------|:-------------------------------------------------------------------------------------|
| Class Name | The Godot class that owns the constant, i.e. `OS`.                                   |
| Constant   | The constant value to output from the node when executed, i.e. `SYSTEM_DIR_DESKTOP`. |

## Global constants

<Figure image="/img/nodes/constants/global-constant-node.png" caption="Example global constant node"></Figure>

Global constants are very similar to class-specific constants; however, since they are in the global namespace, they do not require the use of a prefix to access.
For example, if your game needs base behavior around the constant for the `ESC` key, you would use the `KEY_ESCAPE` global constant.

To access global constants in Orchestrator:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Global constant`
3. Press the **Add** button or simply press **Enter**.

Once the node has spawned, select the node in the **Graph** and adjust the properties in the **Inspector** view.

| Property | Description                                                                  |
|:---------|:-----------------------------------------------------------------------------|
| Constant | The constant value to output from the node when executed, i.e. `KEY_ESCAPE`. |

## Math-specific constants

<Figure image="/img/nodes/constants/math-constant-node.png" caption="Example math constant node"></Figure>

Godot specifically registers math-specific constants slightly differently, therefore in order to access constants such as `One`, `PI`, `PI/2`, `TAU`, and others, you must use a **Math Constant** node.

To access math constants in Orchestrator:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Math constant`
3. Press the **Add** button or simply press **Enter**.

Once the node has spawned, select the node in the **Graph** and adjust the properties in the **Inspector** view.

| Property | Description                                                          |
|:---------|:---------------------------------------------------------------------|
| Constant | The constant value to output from the node when executed, i.e. `PI`. |

## Singleton-specific constants

<Figure image="/img/nodes/constants/singleton-constant-node.png" caption="Example singleton constant node"></Figure>

Singleton-specific constants are very similar to class-specific constants; however, these are related specifically to Godot's registered singleton objects, such as `Input` or `AudioServer`.
For example, to access `MOUSE_MODE_HIDDEN` or `MOUSE_MODE_CAPTURED`, you would use a **Singleton Constant** node.

To access singleton constants in Orchestrator:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Singleton constant`
3. Press the **Add** button or simply press **Enter**.

Once the node has spawned, select the node in the **Graph** and adjust the properties in the **Inspector** view.

| Property   | Description                                                                         |
|:-----------|:------------------------------------------------------------------------------------|
| Class Name | The singleton class to scope the constants based upon, i.e. `Input`.                |
| Constant   | The constant value to output from the node when executed, i.e. `MOUSE_MODE_HIDDEN`. |

## Type-specific constants

<Figure image="/img/nodes/constants/type-constant-node.png" caption="Example type constant node"></Figure>

Type-specific constants are similar to class-specific constants; however, these are related specifically to Godot built-in data types.
For example, if you want to use `Vector3.ZERO` to set a Vector3 to its default value, you would use a **Type Constant** node.

To access type constants in Orchestrator:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Type constant`
3. Press the **Add** button or simply press **Enter**.

Once the node has spawned, select the node in the **Graph** and adjust the properties in the **Inspector** view.

| Property   | Description                                                                |
|:-----------|:---------------------------------------------------------------------------|
| Basic Type | The Godot built-in type to scope the constants based upon, i.e. `Vector3`. |
| Constant   | The constant value to output from the node when executed, i.e. `ZERO`.     |
