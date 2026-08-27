---
toc_max_heading_level: 4
---

# Signals

Godot implements the <ExternalLink href="https://en.wikipedia.org/wiki/Observer_pattern">observer pattern</ExternalLink> using signals.
A signal represents a callback that any Godot `Object`, including an `Orchestration`, can connect to and react when the signal is fired.
In addition, signals can provide contextual information using function arguments.

## Creating signals

To create a new signal in an orchestration, follow these steps:

1. Press the <EditorIcon name="Add"/> button on the **Signal** component view.
2. Enter a unique name when the new signal entry is added.
This is the name of the signal that parts of the orchestration as well as external Godot objects can connect and be notified when the signal is fired.

## Renaming signals

To rename a signal:

1. Right-click the signal in the component panel, and select **Rename** in the context-menu.
   <Figure image="/img/nodes/signals/signal-rename.png" caption="Rename a signal"></Figure> 
2. Enter the new signal name in the text box and press **Enter**.
   <Figure image="/img/nodes/signals/signal-rename-new-name.png" caption="Provide new signal name"></Figure>

:::info
Any node in the current orchestration that refers to the signal will automatically update when the signal is renamed.
Any other external resource, including another Orchestration will not automatically update and will need to be changed after the signal is renamed.
:::

## Deleting a signal

To delete a signal:

1. Select the **Signal** in the **Component** panel.
2. Right-click and select **Remove** in the context-menu.

:::info
Removing a **Signal** will also remove all signal nodes that refer to that signal from the orchestration.
:::

## Passing data with signals

Signals can also pass additional data to their listeners (objects that are connected to the signal), much like how a caller passes arguments to a function call.
Each signal has a signature, much like a function, and when an `Object` connects to the signal, the function that is registered as the `Callable` for the signal must match the signal's argument signature.

For example, a `CheckBox` emits both a `pressed` and a `toggled` signal.
The `pressed` signal does not pass any arguments, and so the callable will simply have an empty argument list.
An orchestration function that listens to `pressed` signals would look like, taking note that there are no arguments:

```cpp
void _on_pressed() {
}
```

The `toggled` signal is different, it passes the current *toggled* state of the `CheckBox`, notifying the listener of the current checked state of the `CheckBox`.
An orchestration function that listens to `toggled` signals would look like:

```cpp
void _on_toggled(bool p_new_checkbox_state) {
}
```

When you define a signal in Orchestrator, you can add arguments to the signal's signature in the **Inspector** view:

1. Select the **Signal** in the **Component** panel.
2. Modify the `Argument Count` property, which defaults to `0` for no arguments.
3. Expand each argument added, `Argument 1`, `Argument 2`, and so on.
4. Modify the argument's `type` by selecting a type from the drop-down list.
For example, to pass a 3D object's position, you would select `Vector3`, as positions in 3D space are represented by a Vector with `x`, `y`, and `z` coordinates.
5. Customize the argument's `name` to better describe what the argument represents.
For example, to pass a 3D object's position, you might set the name to `position`.

## Emit a signal

When a signal is emitted or fired, this notifies any connected observers that some condition has occurred.
The notification to all observer `Callable` functions happens within the main thread, synchronously.

### How to emit a signal

To emit a signal within an Orchestration:

1. Select the desired **Signal** from the **Component** view.
2. Drag the **Signal** onto the graph.
3. Releasing the mouse button will spawn an **Emit Signal** node.
4. Connect the execution pin with other nodes so that the signal is fired when needed.
5. If the **Signal** defines any arguments, connect any input arguments.

### Emit signal properties

You can set all the properties for a signal in the **Inspector** panel.

| Property          | Description                                                                                                     |
|:------------------|:----------------------------------------------------------------------------------------------------------------|
| Argument Count    | Specifies the number of arguments that the signal includes, defaults to `0`.                                    |
| Argument `n` Type | Specifies the n-th argument's type.<br/>Only connections that match the type can be connected to the input pin. |
| Argument `n` Name | Specifies the n-th argument's name, which can better describe what the argument represents.                     |

:::info
Each argument defined in the **Inspector** view will be represented as an input pin on the **Emit Signal** node in the graph.
:::

:::warning
Reducing the number of signal arguments will automatically disconnect any connections in the graph to that argument pin.
In the event you accidentally reduce the number of arguments and break a connection, be sure to reconnect the pins after adjusting the argument count.
:::

## Await a signal

There are situations where you may need to make use of a <ExternalLink href="https://en.wikipedia.org/wiki/Coroutine">coroutine</ExternalLink>, which allows the current execution of the code to temporarily yield until some condition is met before continuing the code continues where it left off.
This technique is quite powerful as it simplifies the logic needed to yield and wait for that condition.
In Godot, coroutines work in conjunction with signals.

### How to await a signal

To asynchronously wait for a signal to be fired:

1. Right-click the graph and search for `Await Signal` in the **All Actions** dialog.
2. Select `Await Signal` and press the **Add** button or simply press **Enter**.
3. Connect the execution pins with other nodes to that the *await* is called when needed.
4. Connect to manually assign the name of the signal to the `Signal Name` input pin.
5. Connect a reference to the object that emits the signal to the `Target` pin, which defaults to the current orchestration.

### Await signal properties

There are no properties in the **Inspector** view that can be modified for the **Await Signal** node; however, there are two input pins that can be customized on the node in the graph.

| Input       | Description                                                                        |
|:------------|:-----------------------------------------------------------------------------------|
| Target      | Specifies the object that the orchestration should connect to and wait.            |
| Signal Name | Specifies the name of the signal that the target that the orchestration will wait. |
