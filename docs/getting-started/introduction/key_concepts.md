---
sidebar_position: 2
---

# Overview of key concepts

Orchestrator is a Godot-plugin that is based on a set of key abstractions.

An `Orchestration` is the main resource that you will be creating and managing using the Orchestrator plug-in, commonly referred to as `.torch` files.
It represents a Godot `Script` object that contains one or more graphs with any number of connected nodes.

Orchestrations also support user-defined functions, variables, and signals, much like you would see in `GDScript` or `C#` script.
Since an orchestration is considered a Godot `Script`, you can attach it to any scene node, and it will be able to interact with the engine just like Godot's text-based script options.

There are **6** major concepts, and we're going to look at them briefly to give you a sense of how the plug-in works.

### Scenes

While scenes are not something specific to Orchestrator, they are the foundation to which Orchestrator stands.
It's extremely important to understand what scenes are, how they're used, and why they're important in a Godot project.

In Godot, developers break down a game into reusable components, called *scenes*.

A scene can literally be anything, a character, a weapon, a menu in the user interface, a single house, an entire level, and the list continues.
Godot's scene system is designed to be flexible; providing the role of both prefabs (archetypes) and scenes/levels, terms often used in other engines.

<Figure image="/img/getting-started/key_concepts_main_menu.webp" caption="Simple scene"></Figure>

For more information about Scenes, see the [Godot documentation](https://docs.godotengine.org/en/stable/getting_started/step_by_step/nodes_and_scenes.html#scenes) for details.

### Nodes

A scene is composed of one or more *nodes*.
Nodes are Godot's smallest building blocks that you arrange into tree hierarchies.

<Figure image="/img/getting-started/key_concepts_character_nodes.webp" caption="Simple node"></Figure>
  
In this example, it is made up of a `CharacterBody2D` node named "Player", a `Camera2D`, a `Sprite2D`, and a `CollisionShape2D`.
The `CharacterBody2D` or "Player", is the root of this scene.
The other nodes are children of the root scene node, which creates a set of node hierarchies in the scene tree.

:::info
The node names end with `2D` because this is a two-dimensional scene; however 3D counterparts end with `3D`.
:::

If you look closely at the node in the scene called "Player", there is an <EditorIcon name="Script"/> icon to the right.
This icon signifies that the node has a script attached.

The visual scripts you create with Orchestrator, called `Orchestration`s, are scripts that can be attached to scene nodes.
When they are attached, the <EditorIcon name="Script"/> is shown in the scene view next to the node.

For more information about Nodes, see the [Godot documentation](https://docs.godotengine.org/en/stable/getting_started/step_by_step/nodes_and_scenes.html#nodes) for details.

### Graph workspace

The **Graph** is the main workspace where you will spend the vast majority of your time creating orchestrations.
It is the canvas where you will place nodes, connect them together to create complex behaviors.

<Figure image="/img/getting-started/graph-workspace.png" caption="Orchestrator graph workspace"></Figure>

To the right of the **Graph** canvas is what is called the **Component** view.
The **Component** view is where you can add, rename, and remove a variety of high-level components in an Orchestration.

An `Orchestration` is not restricted to just a single **Graph** workspace.
You can add multiple graphs using the <EditorIcon name="Add"/> button at the top of the **Graph** panel in the **Component** view.

In addition, when you add a user-defined function, these will also have their own **Graph** and will be opened in separate tabs.
In the image above, you can see several tabs for **EventGraph**, **apply_rotation**, and others.
This technique allows for optimal organization in visual scripts, preventing clutter and *spaghetti* code.

The **Component** view also allows for creating **Variables** and **Signals**.

### Graph nodes and pins {#graph-nodes-and-pins}

A **Graph** is built from *graph nodes* that you connect together with *wires*.
This is the part of Orchestrator that replaces writing lines of code, so it's worth taking a moment to understand how the pieces fit together before you start the tutorials.

:::info
The word "node" means two different things in Orchestrator.
A **scene node**, like `Sprite2D` or `Camera2D`, lives in the **Scene** dock and is part of your game.
A **graph node**, like **Print String** or **Branch**, lives in an orchestration's **Graph** and represents a single step of logic.
In this documentation, when we refer to nodes in a graph, we mean graph nodes.
:::

<Figure image="/img/getting-started/key_concepts_graph_anatomy.png" caption="Anatomy of a graph"></Figure>

#### Pins

Every graph node has *pins*, the small connection points along its left and right edges.
Pins on the left side are **inputs**, and pins on the right side are **outputs**.
There are two kinds of pins, and they do very different jobs:

* <EditorIcon name="VisualShaderPort"/> **Execution pins**, drawn as white arrows, control **when** a node runs and in what **order**.
* <EditorIcon name="GuiGraphNodePort" size={10}/> **Data pins**, drawn as circles and colored by their data type, carry **values** into and out of a node.

When you drag from an output pin to an input pin, a *wire* is created that connects the two.
Execution wires can only connect to execution pins, and data wires can only connect to data pins of a compatible type.

A few rules govern how many wires a pin can have:

* An output execution pin can connect to only **one** node, because execution can only continue in one place at a time.
  Several output execution pins can, however, lead into the same input execution pin.
* An input data pin can receive only **one** wire, because a value can only come from one place.
  An output data pin can feed as many input data pins as you like.

If you connect a wire to a pin that already has its maximum, the old wire is replaced.

#### Execution flow

Execution wires describe the order in which your logic runs, much like the order of lines in a text-based script.

A graph always starts running from an **event** node, such as **Init**, **Ready**, or **Process**.
Events are called by the Godot Engine at specific moments, for example, when the object is created or once every frame.
When an event fires, execution follows the white wire from its output execution pin to the next node's input execution pin, runs that node, and continues along that node's output execution pin.
When there are no more wires to follow, execution stops.

A node that has execution pins only runs when execution reaches it.
If such a node is not connected to an event, either directly or through other nodes, it will never run.

Some nodes have more than one output execution pin.
For example, the **Branch** node continues along its `True` or `False` pin depending on a condition, and the **Sequence** node runs each of its `Then` pins one after another.
These are the visual equivalents of `if`/`else` statements and blocks of code.

#### Data flow

Data wires describe where values come from, much like variables and expressions in a text-based script.

When a node runs, it first reads the values on its input data pins.
If an input data pin has a wire connected, the value comes from the node on the other end of that wire.
If an input data pin has no wire, the node uses the default value you type directly into the pin.

Data flows from right to left as a node *pulls* the values it needs, while execution flows from left to right.
For example, a **Set Rotation** node that is reached by execution pulls the value for its `Radians` input from whatever is wired into it, which may in turn pull values from other nodes.

#### Pure nodes

Some graph nodes have no execution pins at all, only data pins.
These are called **pure** nodes, and examples include math operators like **Multiply**, getting a variable's value, and functions that only compute and return a value, like **Get Rotation**.

Pure nodes do not need to be connected to execution wires.
Instead, they are evaluated automatically whenever another node pulls a value from one of their output data pins.

:::tip
If you wired up a node and it does not seem to do anything, check whether it has an input execution pin.
If it does, it needs an execution wire leading to it from an event.
:::

#### Adding nodes

Most graph nodes are added using the **All Actions** dialog, which you open by right-clicking on the graph.
The dialog lists every action that is available in the current script's context, grouped by category, and can be filtered by typing in its search box.

If you drag a wire from a pin and release the mouse over an empty area of the graph, the **All Actions** dialog opens using that pin's context.
In this case, the dialog only lists actions that can be connected to that pin, and the new node is wired up for you automatically.

For more details, see the [All actions dialog](first-look-at-the-plugin#all-actions-dialog) section.

### Signals

All Godot objects can emit signals, a notification to an observer when a specific event occurs.

:::info
Signals are Godot's version of the *observer* pattern.
:::

Signals allow you to communicate with other parts of the game without creating a hard dependency between two parts of the code.
This allows for a significant amount of flexibility when building scenes, and how you can construct orchestrations.

To add a signal to the `Orchestration`, use the **Component** view and click the <EditorIcon name="Add"/> icon in the **Signals** panel header.

Observers can be connected to signals either through code or using the Editor's interface.
The way to connect a signal to an `Orchestration` is using the Editor's interface.

<Figure image="/img/getting-started/key_concepts_signals.webp" caption="Signals"></Figure>
  
Locate the **Node** view, this is in the same dock where you will find the **Inspector** and **History** tab views.
In the **Node** view, there are two distinct subsections, _Signals_ and _Groups_.
Make sure that the _Signals_ section is highlighted, as shown above.

In this view, signals are represented with the <EditorIcon name="Signal"/> icon next to its name.
If a signal has any connections, there will be child items listed under the signal, denoted with the <EditorIcon name="Slot"/> icon.

For example, the above image shows that the function `_on_area_2d_body_entered()` will be called when the `body_entered` signal is emitted.
This is an example of creating an `Area2D`, a 2D area trigger, and notifying some observer that an object has entered the trigger's area.

For more information about signals, see the [Signals](../../nodes/signals) node reference.

### Variables

A **Variable** represents a named value that can be assigned a value or its value read in the visual script.
Variables are useful for passing data between different parts of the script, and for maintaining state that is managed by the `Orchestration`.

To add a new variable, use the **Component** view and click the <EditorIcon name="Add"/> icon in the **Variables** panel header.

For more information about variables, see the [Variables](../../nodes/variables) node reference.

