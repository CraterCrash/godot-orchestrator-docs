
# Autoloads

## Godot's autoload concepts 

Godot's scene system, while powerful and flexible, has a drawback: there is no method for storing information (e.g. a player's score or inventory) that is needed by more than one scene.

It's possible to address this with some workarounds, but they come with their own limitations:

* You can use a "master" scene that loads and unloads other scenes as children.
However, this means you can no longer run those scenes individually and expect them to work correctly.
* Information can be stored to disk in `user://` and then loaded by other scenes that require it, but frequently saving and loading data is cumbersome and inefficient.

The <ExternalLink href="https://en.wikipedia.org/wiki/Singleton_pattern">Singleton pattern</ExternalLink> is a useful tool for solving this common use case.
In Godot's case, it's possible to reuse the same scene or class for multiple singletons, as long as they have different names.

Using this concept, you can create objects that:

* Are always loaded, no matter which scene is currently running.
* Can store global state such as player data.
* Can handle switching scenes and in-between scene transitions.
* *Act* like a singleton, since Orchestrator and GDScript neither support global variables by design.

Godot uses a concept called **Autoloads** to achieve these characteristics.
You can read more about Godot's implementation in the <ExternalLink href="https://docs.godotengine.org/en/stable/tutorials/scripting/singletons_autoload.html#autoload">Godot documentation</ExternalLink>.

## Registering autoloads {#registering-autoloads}

Before you can use an **Autoload** in Godot, it must first be registered. 
To register an autoload:

1. Open `Project > Project Settings > Autoloads` dialog.
2. Select the path to the Orchestration, GDScript, or C# script.
3. Assign a unique `Node Name` for the autoload.
4. Press the `+ Add` button to register the autoload.

## Accessing autoloads in orchestrations

Accessing an autoload in an Orchestration requires using the **Get Autoload** node.
The **Get Autoload** node returns a reference to the specific Autoload as its *output* pin.

<Figure image="/img/nodes/autoloads/autoload-node-example.png" caption="Example autoload node"></Figure>

In the above example, the **Autoload Node** returns a reference to the **GameData** autoload.

There are two ways to add an **Autoload** node:

1. Selecting the registered autoload from the `Project > Autoloads` **All Actions** category list.
   <Figure image="/img/nodes/autoloads/autoload-project-autoloads.png" caption="Selecting an autoload directly from the action list"></Figure>
   :::note
   This choice is only permitted when right-clicking the graph; it will not be shown when dragging from an input/output pin.
   :::

2. Adding a generic **Get Autoload** node to the graph.

To add a generic **Autoload** node:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `autoload`.
3. Select the **Get Autoload** choice and press the **Add** button or simply press **Enter**.

## Changing the autoload reference

If the project has only defined a single autoload, the **Get Autoload** node will default to that autoload.
If you have defined multiple autoloads in your project, you may need to change the autoload reference.

To change the autoload reference:

1. Select the **Get Autoload** node.
2. In the **Inspector** view, change the `Autoload` property.

## Orchestrations as autoloads

An orchestration can also be used as an *Autoload*, just like `.gd` and `.cs` scripts.
To use an `Orchestration` as an **Autoload**, follow the [Registering autoloads](#registering-autoloads) procedure, and select the `Orchestration` rather than a GDScript (`.gd`) or C# (`.cs`) script files.

:::tip
When adding or removing an autoload from `Project > Project Settings` autoload tab, the **All Actions** choices will automatically update to reflect the changes.
:::