---
toc_max_heading_level: 4
---

# Resources

Resources are the fundamental foundation to any game engine, and Godot is no different. 
Resources represent all things from assets such as images, textures, and sounds, to Godot-specific assets like scenes, scripts, and even `Orchestration`s.
While many of these resources can be set directly on scene nodes using the **Inspector** view, you may need to dynamically load or work with resources at runtime.

For example, your game may define different themes that have unique styles, icons, textures that can be chosen in the game's settings by the user.
In such cases, it may make sense to load only the preferred theme, and therefore these need to be handled dynamically at runtime.

In this section, you will learn more about `Resource`s, and how to load and access them using Orchestrator.

## Resource paths

A resource path is a special string that begins with `res://` and follows the Godot semantics for providing a universal resource identifier (URI) to the specific resource file.
Orchestrator provides a specialized node, **Get Resource Path**, that specifically makes working with resource paths (URIs) simple.

To create a **Get Resource Path** node:

1. Locate the resource in the **FileSystem** view.
2. Select the file and drag the file onto the graph.
3. Upon releasing the mouse, select the **Get Path** option on the context-menu.

## Resource path properties

The **Get Resource Path** properties can be modified in the **Inspector** view, after selecting the node.

| Property | Description                                                           |
|:---------|:----------------------------------------------------------------------|
| Path     | The complete Godot `res://` path to the resource file in the project. |

:::info
The **Get Resource Path** node does not load the resource from the **FileSystem**.
Instead, this node simply returns the fully-qualified path to the file in the Godot project.
This can be useful for passing the resource's path to another node that loads the resource, such as a scene or an image.
:::

## Preload resources

When you need to load a resource like a texture at runtime, you could use the **Engine Singleton** node to access the `ResoureLoader` singleton.
However, this approach loads the resource at the time the `Call Load` function is called in the execution flow, and if the resource loading blocks too long during the frame, the game may stutter.

One way to avoid this problem is use a technique called *preloading*, which is where resources are loaded automatically when the owning scene is loaded by the engine.
This guarantees that the rendering of the scene is more stable and less likely to have stutter, while the trade-off is that the loading of the scene may take slightly longer.

To preload resources with Orchestrator, you need to add a **Preload Resource** node:

1. Locate the resource in the **FileSystem** view.
2. Select the file and drag the file onto the graph.
3. Upon releasing the mouse, select the **Preload** option in the context-menu.

:::info
When a **Preload Resource** node exists in an `Orchestration`, Orchestrator will automatically *load* the resource when the node that owns the orchestration enters the scene tree.
Multiple subsequent nodes can accept the *output* pin as an input without incurring any overhead since the resource is loaded once.
:::

## Preload resource properties

The **Preload Resource** properties can be modified in the **Inspector** view, after selecting the node.

| Property | Description                               |
|:---------|:------------------------------------------|
| Resource | A reference to the resource to be loaded. |
