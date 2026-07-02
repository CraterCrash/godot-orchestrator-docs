---
toc_max_heading_level: 4
---

# Math

**Math** or **Operator** nodes are essential to every game, allowing a script to do anything from moving an object each frame to computing the probability of specific scenarios based on a wide array of input characteristics.
Godot, and by extension Orchestrator, provides nearly a dozen mathematical nodes to perform any type of computation.

## Operators

Orchestrator classifies math operations into **5** key groups:

| Type          | Description                                                                                                                                                          |
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Boolean       | Compares two values to determine their equality or relative coparison.<br/>*Examples: `==`, `!=`, `<`, `<=`, `>`, or `>=`*                                           |
| Numeric Math  | Performs a unary operation on a single value or binary operation on two or more values.<br/>*Examples: `+`, `-`, `*`, `/`, `-Unary`, `+Unary`, `%`, or `^` (power).* |
| Bitwise       | Performs bitwise operations on a given numeric value.<br/>*Examples: Shift left, Shift right, And, Or, Xor, or Negate.*                                              |
| Logic         | Performs a logical comparison between one or two values.<br/>*Examples: And, Or, Xor, and Not*                                                                       |
| Containment   | Checks whether a value is contained within a collection.<br/>*Examples: `has` or `contains`*                                                                         |

### Legacy non-promotable operators

When **Enable Type Promotion** is disabled in `File > Settings > Editor > Behavior`, Orchestrator will register an action mapping for all possible combinations of operations between various types.
For example, the node to add two `Integer` values differs from the node that adds two `Float` values.

For some users, they prefer this concrete style of operator nodes.

<Figure image="/img/nodes/math/math-operations.png" caption="Example of math non-promotable operator nodes"></Figure>

:::warning
Orchestrations that use non-promotable operator nodes will continue to function as they always have, regardless of whether type promotion is or isn't enabled. 

The non-promotable operator nodes are not currently deprecated, but they most likely will be in a future build.
There are plans to remove the non-promotable flavors in Orchestrator 3.0, in favor of the new promotable types.
:::

#### Adding nodes {#add-legacy-math-nodes}

To add a math node to the orchestration, simply:

1. Right-click the graph to access the **All Actions** dialog.
2. Search for the math operation, for example `Multiply`.
3. Select the right math operation for the two operand types.

#### Changing operands

After placing a **Math** node, if you need to change the operand type of one of the input values, then you must select a new node that matches your desired operands.
By following the [Add math nodes](#add-legacy-math-nodes) procedure, you can add the appropriate node and connect all the input/output pins before removing the old node.

To remove the old node, simply:

1. Select the node in the graph.
2. Either Right-Click and select **Delete** from the context-menu or simply press the `Del` button.

### Promotable operators

When **Enable Type Promotion** is enabled (the default) in `File > Settings > Editor > Behavior`, Orchestrator registers a single operator node per operation.
For example, there is a single `Utilities > Operators > Addition` node, regardless of its operands.

These new _promotable operator_ nodes allow users to change the operand types on the fly.
For some users, they prefer this approach, minimizing how often they need to access the **All Actions** dialog, duplicating an **Addition** node N times for Y operand combinations.

<Figure image="/img/nodes/math/math-operations-promotable.png" caption="Example of math promotable operator nodes"></Figure>

Unlike non-promotable operator nodes, these always spawn in with <EditorIcon name="Variant"/> Any data types.
These input operands can be changed by right-clicking the pin label and selecting **Change Pin Type**.

Finally, nodes like **Addition**, **Subtraction**, **Multiplication**, and **Division** all support 2+ operands.
Normal operator precedence holds, operands are evaluated top-down from A to Z.
To add additional operands, press the <EditorIcon name="ZoomMore"/> button.

:::tip
Promotable operator nodes will automatically change their input pin type on the first connection to an input pin, when all inputs are currently <EditorIcon name="Variant"/> wildcards.
This provides for a better user experience and faster development, potentially minimizing at least one, if not both **Change Pin Type** context-menu usages.
:::

#### Adding nodes {#add-math-nodes}

To add a math node to the orchestration, simply:

1. Right-click the graph to access the **All Actions** dialog.
2. Search for the math operation, for example `Multiply`.
3. Select the `Utilities > Operators > Multiply` node.
4. Either connect a wire to one of the operands for its type to change, or manually select its type.

#### Changing operands

Unlike non-promotable **Math** nodes, a promotable operator node's pin types can be changed at any time.
Simply right click one of the pins, navigate to the **Change Pin Type** sub-menu and select the desired type.

When selecting the <EditorIcon name="Variant"/> **Any** pin type, all pins will be returned changed to wildcard.
This will trigger any active connections to the pins to be disconnected automatically.
Additionally, duplicating a promotable operator node will set the pin types to <EditorIcon name="Variant"/> **Any**, too.