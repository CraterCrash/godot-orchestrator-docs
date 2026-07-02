---
toc_max_heading_level: 4
---

# Functions

A **Function** is a named unit of code that when executed, performs a specific task or intent.
For example, calling `draw()` draws whatever arguments were specified while `print()` will print whatever is passed to the console.

In the context of Orchestrator, you can create user-defined functions within an `Orchestration`.
These user-defined functions can be called from within that specific script from another graph, or could also be called from an external `Orchestration` script or even GDScript.

In this section, we'll talk about the various types of functions and how to use them within Orchestrator.

### Function Types

#### Global scope functions

In Godot, there is a category of functions called `@GlobalScope` functions.
These are freestanding functions that take a set of input values and generate an output based on those inputs.
Examples of global scope functions include `min`, `max`, or even `deg_to_rad`.

In Orchestrator, many of these appear until the `Math` or `Utilities` categories in the **All Actions** dialog.

The number of *input* and *output* pins, and their respective types, is driven by the Godot metadata.

#### Native functions

In Godot, there are hundreds of native classes, which include things like `Node`, `Control`, or `Camera3D`.
Each of these native classes expose a subset of their functions to the script subsystem, allowing for attached scripts to call these functions.

In Orchestrator, many of these appear in the **All Actions** dialog under the `Methods` or `Methods (Static)` categories.
Under these two top-level categories, methods are cataloged by their class type.
So finding something like rotating a `Node2D` around its Y-axis would be under `Methods > Node2D > rotate_y`.

The number of *input* and *output* pins, and their respective types, is driven by the Godot metadata.

#### Script functions

In Godot, script-based functions are what users can freely write as part of Orchestrator or GDScript.
These are functions you define yourself to define your own logic and behavior.

In the following sections, when we refer to user-defined functions, we're speaking about script-based functions.

The number of *input* and *output* pins, and their respective types, is driven by the function definition in the script.

## Function access specifiers

In certain programming languages, a concept exists called *visibility*.
In the simplest of terms, visibility defines who, what, and how that function can be called.

In Godot, there is no explicit concept of *visibility*.
To this end, it means that all functions that are exposed to the scripting subsystem are public and can be called by any other script.

However, Godot has a general rule that functions that are intended to be private or not called by other objects, are defined with a prefix, `_` (underscore) character.
If a function could be called by other objects, the underscore is omitted, denoting it's considered "public".

:::info
While other engines like Unreal provide the ability to toggle function visibility, this is currently not available.
Until Godot officially adds such support for this within its scripting API, there's no reasonable way to guard against this across the script landscape.
:::

## Declaring Script Functions

### Creating a function

To create a Function within an orchestration:

1. In the **Component** panel, press the <EditorIcon name="Add"/> button in the **Functions** section.
2. Enter a name for the Function.
   <Figure image="/img/nodes/functions/function-new-name.png" caption="Provide new function name"></Figure> 

The Function will open in a new tab in the **Graph Editor**.

### Editing a function

Once you have created a Function, you then need to define its functionality.
This is a step-by-step process:

* Create the necessary input and output parameters.
* Add nodes to the function graph between the **Function Entry** and **Function Return** node.

Once the function is created, you modify the details in the **Inspector** view.
To open the **Inspector** view to modify the function, you can:

* Select the **Function Entry** node in the graph.
* Select the **Function Result** node in the graph.
* Select your defined function in the **Functions** panel.

#### Inputs and outputs

You can set the input and output parameters in the **Inspector** view for the Function.

<Figure image="/img/nodes/functions/function-input-output-inspector.png" caption="Function inputs/outputs"></Figure>

To add an **Input** argument:

1. Press the `+ Add Inputs` button in the inspector.
2. Given the newly added row a name instead of its default `NewParam`.
3. Change the argument's type, it defaults to <EditorIcon name="Variant"/> Variant.
4. Specify whether the argument type is a single type, array, or dictionary.

Repeat this process until you've added all the desired input arguments.

To add an **Output** argument:

1. Press the `+ Add Outputs` button in the inspector, if its enabled.
2. The return value is always labeled `Return Value` and cannot be changed.
3. Change the return value's type, it defaults to <EditorIcon name="Variant"/> Variant.
4. Specify whether the argument type is a single type, array, or dictionary.

Any changes made to the input or output configurations will directly be reflected in the Function graph.
Once the appropriate input and output arguments have been specified, the Function is now ready for you to define its functionality.

:::note
Godot's function API is limited to a single return value.
If you need to return more than one value, consider wrapping the multiple values in an `Array` or `Dictionary`.
:::

### Coding

A Function is defined by creating an Orchestration graph that connects behavior between the **Function Entry** and the **Function Result** nodes.
In this example, we will create the necessary nodes to apply the 3D version of Pythagorean Theorem, returning the distance between 2 points in 3D space.

```gdscript title="Pythagorean's Theorem in GDScript" showLineNumbers
dx = (x2 - x1)^2
dy = (y2 - y1)^2
dz = (z2 - z1)^2
D  = sqrt(dx + dy + dz)
```

Representing this in an `Orchestration` may look like this:

<Figure image="/img/nodes/functions/function-define-distance-two-points.png" caption="Calculate distance between two 3D points."></Figure>

1. Break the two `Vector3` positions (`start` and `end`) into their respective `(x1,y1,z1)` and `(x2,y2,z2)` values.
2. Calculate the values for `dx`, `dy`, and `dz`.
3. Add `dx`, `dy`, `dz`, and then take the `sqrt` of that value.
4. Return the result using a **Function Return** node.

## Calling functions

Any built-in, native, or script/user-defined function can be called within your `Orchestration`.
In ths section, we're going to show how to call the `distance` function that was created in the above **Coding** section.

To create a node that will call your Function, you can either:

* Drag your Function from the **Components** view onto the graph, and select **Add Call to Function**.
* Right-click in the graph or drag from an appropriate execution or data pin to open the **All Actions** dialog.
Search for your function, and select it to add the **Function Call** node.

The graph below takes two vector variables, and on every tick, calculates the distance between the two and pints it to the screen.

<Figure image="/img/nodes/functions/function-print-distance-each-frame.png" caption="Prints distance to screen each frame"></Figure>

:::note
A script/user-defined function can be called from within the current `Orchestration`, another `Orchestration`, or even `GDScript`.
For the two latter use cases, the script must have an object reference to call the functions.
For the former, the implied `self` reference suffices.
:::

## Variable argument functions

Some functions in Godot are called variable argument functions, or more aptly *vararg* or *variadic* for short.
These functions are designed to take zero or more static arguments, followed by zero or more variable arguments.

In many languages, variable argument functions are defined like:

```gdscript title="Example of a variable argument function in GDScript" showLineNumbers
func min(x: Variant, y: Variant, ...):
  pass
```

In this example, the `min` function accepts at a minimum two `Variant` values called **x** and **y**.
However, the function may be called with additional `Variant` values if the caller wishes to compute the minimum across more than two values.

Orchestrator supports all Godot built-in and native-class functions that use variable arguments.
You can recognize these as the function call node will have a <EditorIcon name="ZoomMore"/> button in the bottom right corner, allowing you to add additional *input* pins to the node.

<Figure image="/img/nodes/functions/min-function-vararg.png" caption="Min function with variable arguments"></Figure>

If you decide at a later time that you want to remove a variable argument from the node, simply right-click on the name of the argument and select **Remove Pin**.

<Figure image="/img/nodes/functions/min-function-vararg-remove-pin.png" caption="Remove arg3 from vararg function Min"></Figure>

Only pins that you were able to add to a variable argument function can be removed.

:::tip
Orchestrator's own script functions currently do not support variable arguments.<br/>
This will be added in a future update.
:::

## Method chaining

In text-based programming languages, method chaining is a technique to simplify code by calling multiple methods on the same object in a single line or a chain.
In visual scripting tools, method chaining is not as common, but Orchestrator supports method chaining.

For example, in the following graph, we are applying a position and rotation to the camera.

<Figure image="/img/nodes/functions/no-method-chaining.png" caption="No method chaining"></Figure>

You will notice that we have to not only call **Set Position** and **Set Rotation**, but we have to link the `Camera3D` node to each function call.
If you were to add additional steps that you needed to perform on the Camera, you would begin to have spaghetti like connections.

Now, thanks to method chaining, you can connect the target output to the input of the next function call.

<Figure image="/img/nodes/functions/method-chaining.png" caption="Method chaining in Orchestrator"></Figure>

This makes the graph easier to read and understand, as well as easier to maintain.

To enable method chaining:

1. Left-click the **Call Function** node.
2. Open the **Inspector** view.
3. Check the `Chain` option.
   <Figure image="/img/nodes/functions/method-chaining-inspector.png" caption="Enable chaining"></Figure>

Once enabled, a new output pin labeled `Target` will appear, allowing you to chain the functions together.
