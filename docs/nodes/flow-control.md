---
toc_max_heading_level: 4
---

# Flow Control

**Flow Control** nodes are some of the most common types of nodes used in visual scripting, as they provide the control over the sequence of how an Orchestration's nodes are executed.

## Branch

<Figure image="/img/nodes/flow-control/branch-node.png" caption="Conditional / Branch node"></Figure>

The **Branch** node serves as a simple way to create decision-based flow from a single true/false condition.
Once executed, the Branch node looks at the incoming value of the attached boolean input, and outputs an execution pulse down the appopriate output.

In this simple example, the branch is checking the current state of a boolean variable.
If `true`, it sets the color of a light to be red.
If `false`, it sets the color to blue.

<Figure image="/img/nodes/flow-control/branch-node-example.png" caption="Branch node example"></Figure>

| Pin       | Description                                                                     |
|:----------|:--------------------------------------------------------------------------------|
| Condition | Takes a boolean value used to indicate which output pin that will be triggered. |
| True      | This outputs an execution pulse if the incoming condition was `true`.           |
| False     | This outputs an execution pulse if the incoming condition was `false`.          |

## Chance

<Figure image="/img/nodes/flow-control/chance-node.png" caption="Chance node"></Figure>

The **Chance** node works by calculating a value between 0 and 100, and sending the execution out one of two output pins.
The percentage chance is set in the **Inspector** view by setting the value of `Chance` to a value between 0 and 100.

* If the random value generated is between 0 and the specified `Chance`, the top output pin will be chosen.
* If the random value generated is greater than the `Chance` value and less-than equal to 100, the bottom output pin will be chosen.

| Pin               | Description                                                                                             |
|:------------------|:--------------------------------------------------------------------------------------------------------|
| Top Output Pin    | The output pin that emits a pulse if the random value is between `0` and `Chance` (chance inclusive).   |
| Bottom Output Pin | The output pin that emits a pulse if the random value is between `Chance` and `100` (chance exclusive). |

## Delay

<Figure image="/img/nodes/flow-control/delay-node.png" caption="Delay node"></Figure>

A **Delay** node works by temporarily yielding the execution of the orchestration without blocking the game loop.
The is done by using coroutines and Godot signals to *await* on the internal timer's `timeout` callback.

| Pin      | Description                                                                            |
|:---------|:---------------------------------------------------------------------------------------|
| Duration | Specifies the number of seconds to yield the orchestration by, defaults to `1` second. |

## For loop

<Figure image="/img/nodes/flow-control/for-loop-node.png" caption="For Loop node"></Figure>

The **For Loop** node works like a standard code loop, firing off an execution pulse for each index between a start and end value.

In the following simple example, the loop is triggered when the player touches a simple level trigger.
The loop iterates 10 times, each time calling a **Print String**, logging a prefix message with the current iteration.

<Figure image="/img/nodes/flow-control/for-loop-node-example.png" caption="For Loop node example"></Figure>

| Property    | Description                                                                                        |
|:------------|:---------------------------------------------------------------------------------------------------|
| First Index | Takes an integer representing the first index in the loop (inclusive).                             |
| Last Index  | Takes an integer representing the last index in the loop (inclusive)                               |
| Loop Body   | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| Index       | This outputs the current index in the loop.                                                        |
| Completed   | This outputs an execution pulse when the loop has reached the for loop has completed.              |

### How to break the loop

<Figure image="/img/nodes/flow-control/for-loop-break-node.png" caption="For Loop with Break node"></Figure>

The **For Loop With Break** node works in a very similar manner to the **For Loop** node, except that it includes an *input* pin that allows for the loop's execution to terminate early.

To trigger the loop to break early, you evaluate some condition during the **Loop Body** control flow, and connect a control flow pin back to the **Break** input pin when that condition is met.
When the **Break** input pin receives the input pulse, the loop breaks immediately.

When the loop breaks early, the **Aborted** output pin will receive the output control flow rather than the **Completed** output pin.
This allows the orchestration to have different behavior if the loop exited early or not.
If that's not required, simply connect both the **Aborted** and **Completed** pins to the same target pin.

| Property    | Description                                                                                        |
|:------------|:---------------------------------------------------------------------------------------------------|
| Break       | This execution input pin breaks the loop when triggered.                                           |
| Aborted     | This outputs whether the loop broke early due to the **Break** input pin.                          |

## For each

<Figure image="/img/nodes/flow-control/for-each-loop-node.png" caption="For Each Loop node"></Figure>

The **For Each Loop** node works in a very similar manner ot the **For Loop** node, except that this node specifically iterates over a collection.

<Figure image="/img/nodes/flow-control/for-each-loop-node-example.png" caption="For Each Loop node example"></Figure>

In the above example, the loop is triggered when a player touches a simple level trigger.
The loop iterates over a collection, output each element to the screen.
Once all elements in the collection have been iterated, the loop exits through the **Completed** output pin.

| Property  | Description                                                                                        |
|:----------|:---------------------------------------------------------------------------------------------------|
| Array     | The collection to be iterated.                                                                     |                                                                      
| Loop Body | This outputs an execution pulse on each iteration of the loop as it moves between the two indices. |
| Element   | This outputs the current array element.                                                            |
| Index     | This outputs the current index in the loop.                                                        |
| Completed | This outputs an execution pulse when the loop has reached the for loop has completed.              |

### How to break the loop

<Figure image="/img/nodes/flow-control/for-each-loop-break-node.png" caption="For Each Loop with Break node"></Figure>

The **For Each Loop With Break** node works in a very similar manner to the **For Each Loop** node, except that it includes an *input* pin that allows for the loop's execution to terminate early.

To trigger the loop to break early, you evaluate some condition during the **Loop Body** control flow, and connect a control flow pin back to the **Break** input pin when that condition is met.
When the **Break** input pin receives the input pulse, the loop breaks immediately.

When the loop breaks early, the **Aborted** output pin will receive the output control flow rather than the **Completed** output pin.
This allows the orchestration to have different behavior if the loop exited early or not.
If that's not required, simply connect both the **Aborted** and **Completed** pins to the same target pin.

| Property  | Description                                                                                        |
|:----------|:---------------------------------------------------------------------------------------------------|
| Break     | This execution input pin breaks the loop when triggered.                                           |
| Aborted   | This outputs whether the loop broke early due to the **Break** input pin.                          |

## Random

<Figure image="/img/nodes/flow-control/random-node.png" caption="Random node"></Figure>

A **Random** node allows specifying one or more output execution pins, and one will be chosen randomly when the node executes.

To add a new output execution, simply click the <EditorIcon name="ZoomMore"/> button to add a new choice output.
To remove an output execution, simply right-click the name of the choice and select **Remove Pin** from the context-menu.

| Pin      | Description                                                                                    |
|:---------|:-----------------------------------------------------------------------------------------------|
| Choice_n | A random choice output execution between 0..n depending on the number of random choices added. |

## Select

<Figure image="/img/nodes/flow-control/select-node.png" caption="Select node"></Figure>

A **Select** node acts like a *gate*, emitting one of two different input values referred to as `A` and `B` based on a condition.
If the condition is `true`, the **Select** node allows the value of `A` to be sent as the output value.
If the condition is `false`, the **Select** node allows the value of `B` to be sent as the output value.

:::info
By default, the **Select** node uses the Godot **Any** type to allow any value to be attached to its input pins.
To restrict the **Select** node to a specific Godot type, right-click on the `A`, `B`, or `Result` pins and pick a type from the `Change Type` context-menu.
:::

| Pin    | Description                                                                 |
|:-------|:----------------------------------------------------------------------------|
| A      | One of two values that will be output if the `Pick A` condition is `true`.  |
| B      | One of two values that will be output if the `Pick A` condition is `false`. |
| Pick A | Controls whether the value of `A` or `B` is emitted as the `Return Value`   |
| Result | The output value of the gate, depends on what the `Pick A` condition is.    |

## Sequence

<Figure image="/img/nodes/flow-control/sequence-node.png" caption="Sequence node"></Figure>

A **Sequence** node allows the execution of two or more execution chains in sequential order, by first executing the connections of **Then 0**, followed by **Then 1**, and so on until all output connections have been called.

Additionally, new output connections can be added by pressing the <EditorIcon name="ZoomMore"/> button on the graph node.
If an output connection should be removed, right-click the output pin name and select **Remove Pin**.

| Pin    | Description                                                                               |
|:-------|:------------------------------------------------------------------------------------------|
| Then 0 | The first output connection chain to be executed, and cannot be removed.                  |
| Then 1 | The second output connection chain to be executed, and cannot be removed.                 |
| Then n | The next output connection chain to be executed, any chain where `n >= 2` can be removed. |

## Switch

A switch node reads a data *input*, and based on that value, sends the execution flow out to the matching (or optional default) execution *output* pin.
There are several types of switches available: [**Any**](#switch-on-any), [**Enumeration**](#switch-on-enumeration), [**Integer**](#switch-on-integer), and [**String**](#switch-on-string).

In general, switches have an *execution* input, and a *data* input for the type of data they evaluate.
The outputs are all *execution* outputs.

### Switch on Any

<Figure image="/img/nodes/flow-control/switch-node.png" caption="Switch node"></Figure>

A **Switch** node is a dynamic flow control node that matches an input value to zero or one specific values.
When the node is first placed, no **Case** input pins are defined, meaning that the node will always execute the **Default** output pin first, and once that path of code is executed, the node will exit the **Done** output pin.

#### Adding control flow cases

By pressing the <EditorIcon name="ZoomMore"/> button, **Case** input and output execution control flow pins are added to the node.
An example **Switch** node with case input pins is shown below.

<Figure image="/img/nodes/flow-control/switch-node-with-cases-example.png" caption="Example switch node with cases"></Figure>

All input pins are of any <EditorIcon name="Variant"/> type, allowing you to connect any type of node to the input pin.
The **Switch** node will use Godot's *Variant Equality* algorithm to determine whether the value matches a case.
In this example, if the input **value** pin matches:

* Integer value matches `1`, the **Case 0** output pin's control flow path receives the output pulse initially.
* Integer value matches `2`, the **Case 1** output pin's control flow path receives the output pulse initially.
* Any other value, the **Default** output pin receives the output pulse initially.

Once the **Case** or **Default** output control flow pins end their code:

* Control returns back to the **Switch** node
* The **Done** output pin will receive the output pulse.

:::tip
If you want to implement an *if-else if-else* equality-based branch logic, the **Switch** node a great alternative to chaining multiple **Branch** nodes.
:::

:::warning
You should always make sure the **Done** output control flow pin connects to the next stage of your logic.
If the **Done** output control flow pin is left disconnected, control will end after the **Case** or **Default** output code path concludes.
:::

#### Removing a control flow case

If a **Case** mapping should be removed, right-click the **Case n** input pin name and select **Remove Pin**.
If any connections exist for the **Case n** input or output pins, they will be disconnected. 
All remaining pins will be shifted up after the **Case** is removed.

#### Toggle the default pin

The **Switch** node does not support hiding the **Default** output pin.
However, if you want the control flow to end with this node, simply pass an **input** value that does not equal any of the supplied **Case** input values.

### Switch on Enumeration

An enumeration is a data type that represents a set of named values that represent a numeric constant.
Several examples of Godot enumerations are `Key`, `KeyModifierMask`, `MouseButton`, `PropertyHint`.

Orchestrator provides a predefined node for each enumeration, allowing you to drop in a **Switch On Enumeration** node that's specifically tailored to that enumeration type.
The following is an example of the **Switch On Mouse Button** node:

<Figure image="/img/nodes/flow-control/switch-on-enumeration-mouse-button.png" caption="Switch on Mouse Button"></Figure>

A **Switch On Enumeration** node works by looking up the input **value** and mapping it to the output control flow that matches that enumeration's constant value.
Since an enumeration is defined as a finite number of constants, this node is not dynamic and pins cannot be added or removed.

:::tip
You can find all the **Switch on Enumeration** nodes by searching for `Switch On` in the **All Actions** dialog.
:::

:::warning
It is expected that the input **value** will always be within the Enumeration's defined range.
If the value does not map to one of the enumeration's constants, control flow will end, and an error will be raised.
:::

### Switch on Integer

<Figure image="/img/nodes/flow-control/switch-on-integer-node.png" caption="Switch On Integer node"></Figure>

A **Switch On Integer** node allows you to compare a numeric input **value** to zero or more output control flows.
This is a great way to quickly map an integer input to a value within a finite range of values.

#### Adding control flow outputs

1. Select the switch node in the **Graph** to display its properties in the **Inspector** view.
2. Change the **Start Index** to the lowest integer value that you want to check against.
   <Figure image="/img/nodes/flow-control/switch-on-integer-inspector-start-index.png" caption="Modify start index"></Figure>
3. Click on the <EditorIcon name="ZoomMore"/> button to add a new *output* pin with the **Start Index** value.
   <Figure image="/img/nodes/flow-control/switch-on-integer-add-output-pin.png" caption="Add output pin"></Figure>

Clicking on the <EditorIcon name="ZoomMore"/> button will add additional output pins, with the value incremented by 1 each time.

#### Removing control flow outputs

To remove an execution pin, right-click on the output pin and select **Remove Pin**.

:::note
This node expects the output control flow pins to be in a range with no gaps.
By removing an output execution pin, any other output pins with a value greater than the removed pin to be decremented by 1.

If you need gaps in values, use the [**Switch On Any**](#switch-on-any) node instead.
:::

#### Toggle the default pin

To remove the **Default** output pin, follow this procedure:

1. Select the switch node in the **Graph** to display its properties in the **Inspector** view.
   <Figure image="/img/nodes/flow-control/switch-on-string-inspector.png" caption="Switch On String Inspector View"></Figure>
2. Toggle the property `Has Default Pin` to show or hide the **Default** output flow.

:::note
If the **input** value does not map to any output pin names and the **Default** output pin is hidden, the control flow execution ends with this node.
:::

### Switch on String

<Figure image="/img/nodes/flow-control/switch-on-string-node.png" caption="Switch On String node"></Figure>

A **Switch on String** node allows you to compare a string input **value** to zero or more output control flows.
This is a great way to quickly map a string input to a series of string values.

#### Adding control flow outputs

1. Select the switch node in the **Graph** to display its properties in the **Inspector** view.
   <Figure image="/img/nodes/flow-control/switch-on-string-inspector.png" caption="Switch On String Inspector View"></Figure>
2. Click on the <EditorIcon name="ZoomMore"/> button on the node in the **Graph** to add new *output* pins.
   <Figure image="/img/nodes/flow-control/switch-on-string-add-output-pin.png" caption="Add new output pin"></Figure>
3. A new expandable section called **Pin Names** will appear in the **Inspector** view.
   <Figure image="/img/nodes/flow-control/switch-on-string-inspector-add-output-pin.png" caption="Inspector changes"></Figure>
4. Adjust the names of all the *output* pins accordingly.
   <Figures>
   <Figure image="/img/nodes/flow-control/switch-on-string-add-output-pin-name-changed.png" caption="Output match value changed on node"></Figure>
   <Figure image="/img/nodes/flow-control/switch-on-string-inspector-add-output-pin-name-changed.png" caption="Output match value changed in Inspector"></Figure>
   </Figures>

Repeat the process for any additional output pins you would like to add.

#### Removing control flow outputs

To remove an output execution pin, right-click on the pin name and select **Remove Pin**.

#### Toggle the default pin

To remove the **Default** output pin, follow this procedure:

1. Select the switch node in the **Graph** to display its properties in the **Inspector** view.
   <Figure image="/img/nodes/flow-control/switch-on-string-inspector.png" caption="Switch On String Inspector View"></Figure>
2. Toggle the property `Has Default Pin` to show or hide the **Default** output flow.
    
:::note
If the **input** value does not map to any output pin names and the **Default** output pin is hidden, the control flow execution ends with this node.
:::

## Type cast

<Figure image="/img/nodes/flow-control/type-cast-node.png" caption="Type cast node"></Figure>

A **Type Cast** node is a special type of flow control type that allows for checking the input value's logical type.
When the input value's type matches the configured type in the node, the **Yes** output pin will receive the output pulse, and the `as ...` output data pin will contain the value cast to the desired type.
When the input value's type does not match the configured type in the node, the **No** output pin will receive the output pulse, and the `as ...` output data pin will be `null`.

To change the type in the cast operation:

1. Select the **Type Cast** node in the graph.
2. In the **Inspector** view, press the button in the `Type` property.
3. Select the desired type from the dialog.

| Pin      | Description                                                                                       |
|:---------|:--------------------------------------------------------------------------------------------------|
| Instance | The input value to be checked against the configured `Type` property.                             |
| Yes      | The output pin that receives the execution pulse if the `Instance` is a `Type`.                   |
| No       | The output pin that receives the execution pulse if the `Instance` is not a `Type`.               |
| as ...   | The output data pin that will contain the casted instance as `Type`, if the cast outputs **Yes**. |


## While

<Figure image="/img/nodes/flow-control/while-node.png" caption="While node"></Figure>

The **While** node provides a construct similar to a **For Loop** except the iteration of the loop is driven by an input boolean condition.

In the following example, we have an integer variable `x` that is initialized as `0`.
The while loop has a boolean condition that checks if `x` is less-than 10, and if so, will output an execution pulse to the **Repeat** pin, printing some text onto the screen and incrementing `x` by one.
When `x` finally reaches 10, the boolean condition is no longer true, and the while loop ends by emitting an output execution pulse to the **Done** pin.

<Figure image="/img/nodes/flow-control/while-node-example.png" caption="While node example"></Figure>

| Pin       | Description                                                                       |
|:----------|:----------------------------------------------------------------------------------|
| Condition | The condition that is evaluated on each loop iteration.                           |
| Repeat    | The output pin that receives the execution pulse if the condition remains `true`. |
| Done      | The output pin that receives the execution pulse if the condition is `false`.     |
