---
sidebar_position: 2
---

# Overview of key concepts

Orchestrator is a Godot-plugin that is based on a set of key abstractions.

An `Orchestration` is the main resource that you will be creating and managing using the Orchestrator plug-in.
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

### Graph workspace

The **Graph** is the main workspace where you will spend the vast majority of your time creating orchestrations.
It is the canvas where you will place nodes, connecting them to create complex behaviors.

<Figure image="/img/getting-started/graph-workspace.png" caption="Orchestrator graph workspace"></Figure>

To the right of the **Graph** canvas is what is called the **Component** view.
The **Component** view is where you can add, rename, and remove a variety of high-level components in an Orchestration.

An `Orchestration` is not restricted to just a single **Graph** workspace.
You can add multiple graphs using the <EditorIcon name="Add"/> button at the top of the **Graph** panel in the **Component** view.

In addition, when you add a user-defined function, these will also have their own **Graph** and will be opened in separate tabs.
In the image above, you can see several tabs for **EventGraph**, **apply_rotation**, and others.
This technique allows for optimal organization in visual scripts, preventing clutter and *spaghetti* code.

The **Component** view also allows for creating **Variables** and **Signals**.

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

### Variables

A **Variable** represents a named value that can be assigned a value or its value read in the visual script.
Variables are useful for passing data between different parts of the script, and for maintaining state that is managed by the `Orchestration`.

To add a new variable, use the **Component** view and click the <EditorIcon name="Add"/> icon in the **Variables** panel header.

