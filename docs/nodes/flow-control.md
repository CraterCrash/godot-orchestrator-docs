---
toc_max_heading_level: 4
---

# Flow Control

**Flow Control** nodes are some of the most common types of nodes used in visual scripting, as they provide the control over the sequence of how an Orchestration's nodes are executed.
In other programming languages, these include constructs like if/else or branches, loops, and others.

In this section we'll talk about each **Flow Control** node Orchestrator provides.

## Branch - If/Else

<Figure image="/img/nodes/flow-control/branch-node.png" caption="Conditional / Branch node"></Figure>

The **Branch** node serves as a simple way to create decision-based flow from a single true/false condition.
Once executed, the Branch node looks at the incoming value of the attached boolean input, and outputs an execution pulse down the appropriate output.

In this simple example, the branch is checking the current state of a boolean variable.
If `true`, it sets the color of a light to be red.
If `false`, it sets the color to blue.

<Figure image="/img/nodes/flow-control/branch-node-example.png" caption="Branch node example"></Figure>

### Node properties {#node-properties-branch}

The following describes the input and output pins for the **Branch** node.

| Pin                                 | Description                                                                     |
|:------------------------------------|:--------------------------------------------------------------------------------|
| <EditorIcon name="bool"/> Condition | Takes a boolean value used to indicate which output pin that will be triggered. |
| True                                | This outputs an execution pulse if the incoming condition was `true`.           |
| False                               | This outputs an execution pulse if the incoming condition was `false`.          |

## Chance

<Figure image="/img/nodes/flow-control/chance-node.png" caption="Chance node"></Figure>

The **Chance** node works by calculating a value between 0 and 100, and sending the execution out one of two output pins.
The percentage chance is set in the **Inspector** view by setting the value of `Chance` to a value between 0 and 100.

* If the random value generated is between 0 and the specified `Chance`, the top output pin will be chosen.
* If the random value generated is greater than the `Chance` value and less-than equal to 100, the bottom output pin will be chosen.

This provides a simple, yet effective, random binary choice decision path. 

### Node properties {#node-properties-chance}

The following describes the input and output pins for the **Chance** node.

| Pin               | Description                                                                                             |
|:------------------|:--------------------------------------------------------------------------------------------------------|
| Top Output Pin    | The output pin that emits a pulse if the random value is between `0` and `Chance` (chance inclusive).   |
| Bottom Output Pin | The output pin that emits a pulse if the random value is between `Chance` and `100` (chance exclusive). |

## Delay

<Figure image="/img/nodes/flow-control/delay-node.png" caption="Delay node"></Figure>

A **Delay** node works by temporarily yielding the execution of the orchestration without blocking the game loop.
The is done by using coroutines and Godot signals to *await* on the internal timer's `timeout` callback.

```gdscript title="GDScript example of Delay using await" showLineNumbers
func my_function() -> void:
  print("Hello")
  await get_tree().create_timer(1).timeout
  ## Outputs this after 1 second have passed.
  ## This happens without blocking the game's render loop due to coroutine behavior.
  print("Function completed")
```

### Using delay in functions

Unlike an event graph, when using **Delay** within a user-defined function, special consideration must be taken. 

Godot natively supports the use of the `await` keyword within top-level functions like `_ready`.
However, as soon as you use the **Delay** node, which maps to `await` within a user-defined function, any location that calls that function must also be **Awaited**.
For example, in GDScript:

```gdscript title="GDScript example of Delay using await" showLineNumbers
func _ready() -> void:
  await my_function()
  
func my_function() -> void:
  print("Hello")
  await get_tree().create_timer(1).timeout
  ## Outputs this after 1 second have passed.
  ## This happens without blocking the game's render loop due to coroutine behavior.
  print("Function completed")
```

Orchestrator handles this use case by specifying that a user-defined function is an **Awaited Function**.
This can be done by right-clicking the call function node, as shown below, and enabling the **Await Function** feature.

<Figure image="/img/nodes/flow-control/delay-node-example.png" caption="How to await a user-defined function that uses Delay"></Figure>

When a user-defined function is marked for **Await**, it will be indicated by an <EditorIcon name="Timer"/> icon.

### Node properties {#node-properties-delay}

The following describes the input and output pins for the **Delay** node.

| Pin                                 | Description                                                                            |
|:------------------------------------|:---------------------------------------------------------------------------------------|
| <EditorIcon name="float"/> Duration | Specifies the number of seconds to yield the orchestration by, defaults to `1` second. |

## For loop

<Figure image="/img/nodes/flow-control/for-loop-node.png" caption="For Loop node"></Figure>

The **For Loop** node works like a `randi` loop in GDScript.
It emits an execution pulse for each index between the given first and last index value out the **Loop Body** pin, including the current **Index** value.
Once the loop finishes, an execution pulse is output the **Completed** pin.

In the following simple example, the loop is triggered when the player touches a simple level trigger.
The loop iterates 10 times, each time calling a **Print String**, logging the message "Iteration is: n", where `n` is the current iteration index.

<Figure image="/img/nodes/flow-control/for-loop-node-example.png" caption="For Loop node example"></Figure>

:::note
The standard **For Loop** node does not provide a way to break the loop early.
<br/>If you need loop `break` behavior, see [`For loop with break`](#for-loop-with-break).
:::

### Node properties {#node-properties-for-loop}

The following describes the input and output pins for the **For Loop** node.

| Property                             | Description                                                                                        |
|:-------------------------------------|:---------------------------------------------------------------------------------------------------|
| <EditorIcon name="int"/> First Index | Takes an integer representing the first index in the loop (inclusive).                             |
| <EditorIcon name="int"/> Last Index  | Takes an integer representing the last index in the loop (inclusive)                               |
| Loop Body                            | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| <EditorIcon name="int"/> Index       | This outputs the current index in the loop.                                                        |
| Completed                            | This outputs an execution pulse when the loop has reached the for loop has completed.              |

## For loop with break

<Figure image="/img/nodes/flow-control/for-loop-break-node.png" caption="For Loop with Break node"></Figure>

The **For Loop With Break** node is an enhanced version of the **For Loop** node, allowing the loop's execution to terminate early.

In this simple example, the loop is triggered when the player touches a simple level trigger.
The loop iterates 1000 times, each time hitting a Branch which checks if the loop has hit 500 iterations.
If it has not, then a message with the current iteration is placed on the screen.
Once it exceeds 500, the Branch sends a pulse into the **Break** pin, which breaks the loop.

<Figure image="/img/nodes/flow-control/for-loop-break-node-example.png" caption="For Loop with Break node example"></Figure>

### Node properties {#node-properties-for-loop-with-break}

The following describes the input and output pins for the **For Loop With Break** node.

| Property                             | Description                                                                                        |
|:-------------------------------------|:---------------------------------------------------------------------------------------------------|
| <EditorIcon name="int"/> First Index | Takes an integer representing the first index in the loop (inclusive).                             |
| <EditorIcon name="int"/> Last Index  | Takes an integer representing the last index in the loop (inclusive)                               |
| Break                                | This execution input pin breaks the loop when triggered.                                           |
| Loop Body                            | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| <EditorIcon name="int"/> Index       | This outputs the current index in the loop.                                                        |
| Completed                            | This outputs an execution pulse when the loop has reached the for loop has completed.              |
| Aborted                              | This outputs whether the loop broke early due to the **Break** input pin.                          |

## For each loop

<Figure image="/img/nodes/flow-control/for-each-loop-node.png" caption="For Each Loop node"></Figure>

The **For Each Loop** node works similarly to the **For Loop** node, except that it iterates over an `Array`.

<Figure image="/img/nodes/flow-control/for-each-loop-node-example.png" caption="For Each Loop node example"></Figure>

In the above example, the loop is triggered when a player touches a simple level trigger.
The loop iterates over an `Array`, output each element to the screen.
Once all elements in the array have been iterated, the loop exits through the **Completed** output pin.

### Node properties {#node-properties-for-each-loop}

The following describes the input and output pins for the **For Each Loop** node.

| Property                             | Description                                                                                        |
|:-------------------------------------|:---------------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Array     | The collection to be iterated.                                                                     |                                                                      
| Loop Body                            | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| <EditorIcon name="Variant"/> Element | This outputs the current array element.                                                            |
| <EditorIcon name="int"/> Index       | This outputs the current index in the loop.                                                        |
| Completed                            | This outputs an execution pulse when the loop has reached the for loop has completed.              |

## For each loop with break

<Figure image="/img/nodes/flow-control/for-each-loop-break-node.png" caption="For Each Loop with Break node"></Figure>

The **For Each Loop With Break** node works in a very similar manner to the **For Each Loop** node, except that it includes an *input* pin that allows for the loop's execution to terminate early.

In this simple example, the loop is triggered when the player touches a simple level trigger.
The loop iterates for each element in the array, each time hitting a Branch which checks if the loop has hit the second element.
If it has not, then a message with the current element is placed on the screen.
Once the second element is reached, the Branch sends a pulse into the **Break** pin, which breaks the loop.

<Figure image="/img/nodes/flow-control/for-each-loop-break-node-example.png" caption="For Each Loop with Break node example"></Figure>

### Node properties {#node-properties-for-each-loop-with-break}

The following describes the input and output pins for the **For Each Loop With Break** node.

| Property                             | Description                                                                                        |
|:-------------------------------------|:---------------------------------------------------------------------------------------------------|
| <EditorIcon name="Array"/> Array     | The collection to be iterated.                                                                     |
| Break                                | This execution input pin breaks the loop when triggered.                                           |
| Loop Body                            | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| <EditorIcon name="Variant"/> Element | This outputs the current array element.                                                            |
| <EditorIcon name="int"/> Index       | This outputs the current index in the loop.                                                        |
| Completed                            | This outputs an execution pulse when the loop has reached the for loop has completed.              |
| Aborted                              | This outputs whether the loop broke early due to the **Break** input pin.                          |

## Random

<Figure image="/img/nodes/flow-control/random-node.png" caption="Random node"></Figure>

A **Random** node allows specifying one or more output execution pins, and one will be chosen randomly.
Each output control flow pin has an equal chance to be picked.

To add a new output execution, simply click the <EditorIcon name="ZoomMore"/> button to add a new choice output.
To remove an output execution, simply right-click the name of the choice and select **Remove Pin** from the context-menu.

### Node properties {#node-properties-random}

The following describes the input and output pins for the **Random** node.

| Pin      | Description                                                                                    |
|:---------|:-----------------------------------------------------------------------------------------------|
| Choice_n | A random choice output execution between 0..n depending on the number of random choices added. |

## Select - Ternary

<Figure image="/img/nodes/flow-control/select-node.png" caption="Select node"></Figure>

A **Select** node acts like a *gate* or *ternary* operator, emitting one of two different input values referred to as `A` and `B` based on a condition.
If the condition is `true`, the **Select** node allows the value of `A` to be sent as the output value.
If the condition is `false`, the **Select** node allows the value of `B` to be sent as the output value.

```gdscript title="GDScript example of ternary selection" showLineNumbers
var result = a if condition else b
```

### Changing pin types

By default, the **Select** node uses the Godot <EditorIcon name="Variant"/> wildcard type to allow any value to be attached.
The input pin types can be restricted by right-clicking on the `A` or `B` input pins, and selecting **Change Pin Type** in the context-menu, shown below:

<Figure image="/img/nodes/flow-control/select-node-context-menu.png" caption="Changing Select node's pin type"></Figure>

By selecting a type, such as `Integer`, the pin types will change from <EditorIcon name="Variant"/> to <EditorIcon name="int"/>.

### Node properties {#node-properties-select}

The following describes the input and output pins for the **Select** node.

| Pin                                 | Description                                                                 |
|:------------------------------------|:----------------------------------------------------------------------------|
| <EditorIcon name="Variant"/> A      | One of two values that will be output if the `Pick A` condition is `true`.  |
| <EditorIcon name="Variant"/> B      | One of two values that will be output if the `Pick A` condition is `false`. |
| <EditorIcon name="bool"/> Pick A    | Controls whether the value of `A` or `B` is emitted as the `Return Value`   |
| <EditorIcon name="Variant"/> Result | The output value of the gate, depends on what the `Pick A` condition is.    |

## Sequence

<Figure image="/img/nodes/flow-control/sequence-node.png" caption="Sequence node"></Figure>

A **Sequence** node allows the execution of two or more execution chains in sequential order.
This is done by first executing the connections of **Then 0**, followed by **Then 1**, and so on until all output connections have been called.

Additionally, new output connections can be added by pressing the <EditorIcon name="ZoomMore"/> button on the graph node.
If an output connection should be removed, right-click the output pin name and select **Remove Pin**.

:::tip
Unlike most control flow nodes that create nested scopes, the **Sequence** node does not.
The **Sequence** node is purely for organizational purposes, and consolidates all output pin control flows into the same scope.
:::

### Node properties {#node-properties-sequence}

The following describes the input and output pins for the **Sequence** node.

| Pin    | Description                                                                               |
|:-------|:------------------------------------------------------------------------------------------|
| Then 0 | The first output connection chain to be executed, and cannot be removed.                  |
| Then 1 | The second output connection chain to be executed, and cannot be removed.                 |
| Then n | The next output connection chain to be executed, any chain where `n >= 2` can be removed. |

## Switch nodes

A switch node reads a data *input*, and based on that value, sends the execution flow out to the matching (or optional default) execution *output* pin.
There are several types of switches available: **General**, **Integer**, **String**, and **Enumeration**.

### General Switch

<Figure image="/img/nodes/flow-control/switch-node.png" caption="Switch node"></Figure>

The general **Switch** node is the equivalent to a GDScript's `match` keyword.
For every value you would want to match, press the <EditorIcon name="ZoomMore"/> button to add new `Case n` input pins, as shown here:

<Figure image="/img/nodes/flow-control/switch-node-with-cases.png" caption="Switch node with cases"></Figure>

If the **Value** pin matches one of the values connected to any of the **Case n** pins, the control flow temporarily goes out the associated case's output pin to the right.
This allows for you to specify specific logic to execute when that case matches.
If none of the **Case n** pins match, the control flow temporarily goes out the **Default** pin on the top right.

When all control flow has executed on the specific **Case n** or **Default** output pin, control flow returns to the **Switch** node, and exits the node through the **Done** pin.

#### Node properties {#node-properties-switch}

The following describes the input and output pins for the **Switch** node.

| Pin                                 | Description                                                                                                                                                      |
|:------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <EditorIcon name="Variant"/> Value  | The value to be matched against zero or one of the supplied cases.                                                                                               |
| <EditorIcon name="Variant"/> Case n | One or more values to be matched against the supplied `Value` input.                                                                                             |
| Done                                | When control returns to the **Switch**, this pin will be pulsed.<br/>All logic after the **Switch** should be added here.                                        |
| Default                             | If none of the **Case n** values matched, this pin will be pulsed to execute the default logic.<br/>After the logic ends, control is returned to the **Switch**. |
| Case n Output                       | If the **Case n** value matches, this pin will be pulsed to execute that branch's logic.<br/> After the logic ends, control is returned to the **Switch**.       |

### Enumeration Switch

The **Switch On Enumeration** node is a general node that allows changing the execution's control flow based on a specific enumeration type's value.
In Godot, there are hundreds of enumeration types like `ClockDirection`, `DisplayServer.VSyncMode`, and more.

<Figure image="/img/nodes/flow-control/switch-on-enumeration-node.png" caption="Example Switch On Enumeration node for ClockDirection"></Figure>

Unlike other switch nodes, the **Switch on Enumeration** node has no **Default** or **Done** output pins.
This means that if if you have logic that all branches should converge toward, its up to you to connect those later in the branch paths.

The output execution pins for **Switch on Enumeration** nodes are auto-generated based on the enumeration's properties.

### Integer Switch

<Figure image="/img/nodes/flow-control/switch-on-integer-node.png" caption="Switch On Integer node"></Figure>

The **Switch on Integer** node provides an advanced branch-scenario based on a gapless sequence of numeric values.
The sequence start position is dictated by the **Start Index**, which can be set in the **Inspector** view.

<Figure image="/img/nodes/flow-control/switch-on-integer-inspector.png" caption="Switch On Integer Inspector Options"></Figure>

Specifying the **Start Index** as `1` and then pressing the <EditorIcon name="ZoomMore"/> button will add an output pin labeled `1`.

<Figure image="/img/nodes/flow-control/switch-on-integer-add-output-pin.png" caption="Add output pin"></Figure>

Pressing the <EditorIcon name="ZoomMore"/> once more will add another output pin labeled `2`, and so on.

When right-clicking and selecting **Remove pin** for any of the output numeric case pins, any pins that come afterward will have their value decreased by `1`.
This is expected because the **Switch on Integer** node is designed to be a gapless, sequence of numeric values.

In addition, the **Switch on Integer** node **Default** output pin (aka else) can be toggled on or off.

- When the *input* value matches the output pin's integer label, that output pin will be pulsed.
- If none of the output pin label's match the input value, and **Default** is enabled, the **Default** pin will be pulsed.
- If none of the output pin label's match the input value, and the **Default** pin is not enabled, execution ends.

#### Node properties {#node-properties-switch-integer}

The following describes the input and output pins for the **Switch on Integer** node.

| Pin                            | Description                                                                      |
|:-------------------------------|:---------------------------------------------------------------------------------|
| <EditorIcon name="int"/> Value | The value to be matched against zero or one of the supplied cases.               |
| n                              | Optional output value match cases. If label matches, the pin is pulsed.          |
| Default                        | If enabled, this pin is pulsed if none of the optional output value cases match. |

### String switch

<Figure image="/img/nodes/flow-control/switch-on-string-node.png" caption="Switch On String node"></Figure>

The **Switch on String** node provides an advanced branch-scenario based on string values matched to user-defined cases.

<Figure image="/img/nodes/flow-control/switch-on-string-inspector-add-output-pin.png" caption="Switch on String Inspector Options"></Figure>

In the **Inspector** view, the **Switch on String** node can specify whether string matches are or are not case-sensitive.
In addition, the **Default** pin can be enabled or disabled based on needs.

To introduce new case match options, pressing the <EditorIcon name="ZoomMore"/> button will add a new `Case_n` output pin, as seen below.

<Figure image="/img/nodes/flow-control/switch-on-string-add-output-pin.png" caption="Add new output pin"></Figure>

The pin label can be customized in the **Inspector** view, by expanding the **Pin Names** section, and adjusting their values:

<Figure image="/img/nodes/flow-control/switch-on-string-inspector-add-output-pin-name-changed.png" caption="Output match value changed in Inspector"></Figure>

One the pin names are changed, the **Switch on String** node will reflect the changes immediately:

<Figure image="/img/nodes/flow-control/switch-on-string-add-output-pin-name-changed.png" caption="Output match value changed on node"></Figure>

Repeat the process for any additional output pins you would like to add.
To remove an output execution pin, right-click on the pin name and select **Remove Pin**.

#### Node properties {#node-properties-switch-string}

The following describes the input and output pins for the **Switch on String** node.

| Pin                               | Description                                                                      |
|:----------------------------------|:---------------------------------------------------------------------------------|
| <EditorIcon name="String"/> Value | The value to be matched against zero or one of the supplied cases.               |
| Case_n / Custom Label             | Optional output value match cases. If label matches, the pin is pulsed.          |
| Default                           | If enabled, this pin is pulsed if none of the optional output value cases match. |

## Type cast - Is

<Figure image="/img/nodes/flow-control/type-cast-node.png" caption="Type cast node"></Figure>

A **Type Cast** node is a special type of flow control type that allows for checking the input value's logical type.
When the input value's type matches the configured type in the node, the **Yes** output pin will receive the output pulse, and the `as ...` output data pin will contain the value cast to the desired type.
When the input value's type does not match the configured type in the node, the **No** output pin will receive the output pulse, and the `as ...` output data pin will be `null`.

In GDScript, this is typically represented by one of two approaches:

```gdscript title="GDScript using cast" showLineNumbers
func my_function(node : Node3D) -> void:
  var camera : Camera3D = node
  if camera:
    ## The input node is a Camera3D
  else:
    ## The input node is not a Camera3D
```

```gdscript title="GDScript using is" showLineNumbers
func my_function(node : Node3D) -> void:
  if node is Camera3D:
    ## The input node is a Camera3D
  else:
    ## The input node is not a Camera3D
```

### Changing the selected cast type

To change the type in the cast operation:

1. Select the **Type Cast** node in the graph.
2. In the **Inspector** view, press the button in the `Type` property.
3. Select the desired type from the dialog.

### Node properties {#node-properties-type-cast}

The following describes the input and output pins for the **Type Cast** node.

| Pin                                  | Description                                                                                       |
|:-------------------------------------|:--------------------------------------------------------------------------------------------------|
| <EditorIcon name="Object"/> Instance | The input value to be checked against the configured `Type` property.                             |
| Yes                                  | The output pin that receives the execution pulse if the `Instance` is a `Type`.                   |
| No                                   | The output pin that receives the execution pulse if the `Instance` is not a `Type`.               |
| <EditorIcon name="Object" /> as ...  | The output data pin that will contain the casted instance as `Type`, if the cast outputs **Yes**. |

## While

<Figure image="/img/nodes/flow-control/while-node.png" caption="While node"></Figure>

The **While** node provides a construct similar to a **For Loop** except the iteration of the loop is driven by an input boolean condition.

In the following example, we have an integer variable `x` that is initialized as `0`.
The while loop has a boolean condition that checks if `x` is less-than 10, and if so, will output an execution pulse to the **Repeat** pin, printing some text onto the screen and incrementing `x` by one.
When `x` finally reaches 10, the boolean condition is no longer true, and the while loop ends by emitting an output execution pulse to the **Done** pin.

<Figure image="/img/nodes/flow-control/while-node-example.png" caption="While node example"></Figure>

:::info
The **While** node intentionally does not support `break` semantics.<br/>
Whether the loop breaks early should be controlled by the <EditorIcon name="bool"/> `Condition` input pin.
:::

### Node properties {#node-properties-while}

The following describes the input and output pins for the **While** node.

| Pin                                 | Description                                                                       |
|:------------------------------------|:----------------------------------------------------------------------------------|
| <EditorIcon name="bool"/> Condition | The condition that is evaluated on each loop iteration.                           |
| Repeat                              | The output pin that receives the execution pulse if the condition remains `true`. |
| Done                                | The output pin that receives the execution pulse if the condition is `false`.     |
