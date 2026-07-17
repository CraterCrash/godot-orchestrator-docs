---
sidebar_position: 2
toc_max_heading_level: 4
---

# Step by step

This series builds upon the [Introduction to Orchestrator](../introduction) and will get you started using the plug-in.
If you have not yet reviewed the [Godot Step-by-Step Guide](https://docs.godotengine.org/en/stable/getting_started/step_by_step/), we **strongly recommend** doing so before proceeding.

* [Creating your first orchestration](#creating-your-first-orchestration)
* [Listening for player input](#listening-for-player-input)

## Creating your first orchestration {#creating-your-first-orchestration}

In this lesson, you will code your first `Orchestration` to make the Godot icon turn in circles using Orchestrator.
As we mentioned [in the introduction](../introduction), we assume you have read all the prerequisites.

<Figure image="/img/step-by-step/scripting_first_script_rotating_godot.webp" caption="Example scene"></Figure>

### Project setup

Please <ExternalLink href="https://docs.godotengine.org/en/stable/tutorials/editor/project_manager.html#doc-creating-and-importing-projects">create a new project</ExternalLink> to start with a clean slate.
Your project should contain one picture: the Godot icon, which we often use for prototyping in the community.

#### Install the plug-in

Before we can proceed, we need to install the Orchestrator plug-in.
The plug-in can be installed from the Godot Asset Library or manually by downloading from our GitHub repository.

See the [Installation Guide](../introduction/installation-guide) on how to install the plug-in.

#### Creating the scene

We need to create a `Sprite2D` node to display the Godot icon in our game.
In the **Scene** view, click the **Other Node** button.

<Figure image="/img/step-by-step/scripting_first_script_click_other_node.webp" caption="Create scene"></Figure>

Type "Sprite2D" into the search box to filter the nodes, double-clicking on `Sprite2D` to create the node. 

<Figure image="/img/step-by-step/scripting_first_script_add_sprite_node.webp" caption="Add Sprite2D node to the scene"></Figure>

Once the Sprite2D node is added, your **Scene** view should now look like this:

<Figure image="/img/step-by-step/scripting_first_script_scene_tree.webp" caption="Scene view"></Figure>

A `Sprite2D` node requires a texture to display.

In the **Inspector** view on the right, the **Texture** property shows that it is *empty*.
To display the Godot icon, drag the file `icon.svg` from the **FileSystem** view onto the `Texture` property in the **Inspector** view.

<Figure image="/img/step-by-step/scripting_first_script_setting_texture.webp" caption="Setting Sprite2D texture"></Figure>

:::important
You can create `Sprite2D` nodes automatically by dragging and dropping images onto the viewport.
:::

Lastly, click and drag the icon in the viewport to center it in the game view.

<Figure image="/img/step-by-step/scripting_first_script_centering_sprite.webp" caption="Center image"></Figure>

### Creating a new orchestration

To create and attach a new `Orchestration` to our node, right-click on the `Sprite2D` in the **Scene** view and select **<EditorIcon name="ScriptCreate"/> Attach Script**.

<Figure image="/img/step-by-step/scripting_first_script_attach_script.webp" caption="Attach orchestration script to node"></Figure>

The **Attach Node Script** dialog will appear.
This dialog allows you to select the script's language, the file path, and other options.
Make sure the language is set to `Orchestrator`, leaving all the other options as their defaults.

Click the **Create** button to create the script.

<Figure image="/img/step-by-step/create-orchestration-dialog.png" caption="Attach node script dialog"></Figure>

The Orchestrator **<EditorIcon name="ClassList"/> EventGraph** workspace should appear with your `sprite_2d.os` orchestration open.

<Figure image="/img/step-by-step/create-orchestration-editor.png" caption="Editor window"></Figure>

### Hello world!

Our `Orchestration` script currently doesn't do anything.

Let's make it print the text "Hello, world!" to the output bottom panel to get started.

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Print String`, and select the `Print String` action.
3. To add the node, either press the **Add** button or simply hit **Enter**.
4. Change the value of the `Text` parameter to `Hello, world!`.

Lastly, we need to add a Godot event callback so that our **Print String** node outputs the value.

1. Press the <EditorIcon name="Override"/> button located at the top right of the **Functions** panel.
2. Search or the `Call Init` action.
3. To add the node, either press the **Add** button or simply hit **Enter**.

With the two nodes in the **Graph**, using your mouse:

1. Left-mouse click the white *output* arrow on the right side of the **Call Init** node.
2. Drag from this output pin to the *input* arrow on the left side of the **Print String** node.

If done successfully, the two nodes should be connected.

:::note
The **Init Event** is a special callback that represents the `_init()` function in GDScript, which acts like a constructor.
The Godot Engine calls this `_init()` on every object or node when it gets created, as long as this function is defined.
:::

Now, save the scene as `script_2d.tscn` if you have not already, then press `F6` (`Cmd+R` on MacOS), to run it.
Look at the **Output** panel in the editor, it should display "Hello, world!".

<Figure image="/img/step-by-step/scripting_first_script_print_hello_world.webp" caption="Hello, world! output"></Figure>

Lastly, we need to remove this "Hello, world" logic, so:

1. Click on the **Print String** node, and right-click, selecting the **Delete** option to remove the node.
2. Click on the **_init** entry in the **Graphs** section of the **Component Panel**.
3. Right-click and select the **Remove** option from the context-menu.

You should end up with an empty canvas.

### Turning around

It's time to make our node move and rotate.
To do so, we're going to add two member variables to our Orchestration: 

* The movement speed in pixels per second
* The angular speed in radians per second

<Figure image="/img/step-by-step/adding-variables.png" caption="Variables to add"></Figure>

#### Add movement speed

To define the movement speed variable:

1. Click the <EditorIcon name="Add"/> button to add a new variable in the **Variables** component section.
2. Give the variable the name `speed`, and press enter.
3. Select the variable in the **Component** view to have the **Inspector** display the variable's details.
4. In the **Inspector**, change the `Type` to an `Integer` and assign a default value of `400`.

#### Add angular speed {#add-angular-speed}

To define the angular speed variable:

1. Click the <EditorIcon name="Add"/> button to add a new variable in the **Variables** component section.
2. Give the variable the name `angular_speed`, and press enter.
3. Select the variable in the **Component** view to have the **Inspector** display the variable's details.
4. In the **Inspector**, change the `Type` to an `Float` and assign a default value of `3.14`.

:::important
Angles in Godot work in radians by default, but you have built-in functions available if you prefer to work with degrees.
:::

#### Apply rotation

To move our icon, we need to update its position and rotation every frame in the game loop.

We can use the **Process Event**, a Godot virtual override function, to do this.
If your orchestration extends a class that extends the `Node` class, like `Sprite2D`, this function will be called every frame and provide an argument called `delta`, which is the elapsed time since the last frame in `seconds`.

:::important
Games work by rendering many images per second, each called a frame, and they perform this in a loop.
We measure the rate at which a game produces these images in Frames Per Second (FPS).
Most games aim for 60 FPS, although you might find values lower or higher.
:::

We are going to add the **Process Event** node much like we did the **Init Event** node.

1. Press the <EditorIcon name="Override"/> button on the top-right of the **Functions** panel.
2. In the **All Actions** dialog, locate the `Call Process Event` node.
3. To add the node, either press **Add** or simply hit **Enter**.

With the **Process Event** node on the graph, we need to connect logic to this node to perform this computation, but visually:

```python
rotation += angular_speed * delta
```

The above line increment's the sprite's rotation every frame.
Here `rotation` is a property inherited from the `Node2D` class, which `Sprite2D` extends.
This means that we can work directly with the `rotation` property in the orchestration.

To do this visually, we need to add several more nodes to our graph:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Get Rotation`.
3. Select the `Get Rotation` choice and either press **Add** or simply hit **Enter**.
4. Right-click the graph again to open the **All Actions** dialog.
5. Search for `Set Rotation`.
6. Select the `Set Rotation` choice and either press **Add** or simply hit **Enter**.
7. Right-click the graph area once more to open the **All Actions** dialog.
8. Search for `Multiply`.
9. Select the "Multiply (Float)" choice that is under the **Float** category.
10. Either press **Add** or simply hit **Enter**.

Finally, match all the nodes as shown here.
This visually represents the `rotation += angular_speed * delta` logic.

<Figure image="/img/step-by-step/apply-rotation.png" caption="Apply rotation based on angular_speed and delta time"></Figure>

Run the scene in the editor to see the icon turn in-place.

<Figure image="/img/step-by-step/scripting_first_script_godot_turning_in_place.webp" caption="Godot rotates!"></Figure>

#### Apply movement

Let's now make the node move.
In order to do this, we need to add one additional step inside the **Process Event** node logic.

```python
var velocity = Vector2.UP.rotated(rotation) * speed
position += velocity * delta
```

In this code, we are using a variable named `velocity` to represent the direction and speed.
To make the node move forward, we start from `Vector2.UP`, a vector that simply points up, and we rotate it by calling the Vector2 method `rotated()`.
This expression, `Vector2.UP.rotated(rotation)`, is a vector that points forward relative to our icon.
By multiply this by our `speed` property, it gives us a velocity that we can use to move the node.
And finally we multiply this `velocity` with the `delta` time, and add that the node's current position for it to move per frame.

To set this up visually, we need to:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Type Constant`
3. Select the **Type Constant** node and set the type as `Vector2` and the constant as `UP` in the **Inspector**.
4. Right-click the graph to open the *All Actions** dialog.
5. Search for `Rotated`, selection the choice under the **Vector2** category.
6. Next add three math operator nodes
   * Multiply `Vector2` by `Integer`.
   * Multiply `Vector2` by `Float`.
   * Multiply `Vector2` by `Vector2`.
7. Finally add two function call nodes
   * Search for `Get Position`
   * Search for `Set Position`

With the nodes, we connect them as shown here:

<Figure image="/img/step-by-step/apply-movement.png" caption="Apply movement based on angular_speed, speed, and delta time"></Figure>

Run the scene to see the Godot head run in circles.

<Figure image="/img/step-by-step/scripting_first_script_rotating_godot (1).webp" caption="Godot runs in circles!"></Figure>

:::note
Moving nodes like this does not take into account collisions with other objects.
In a future tutorial, you will learn another approach to moving and detecing collisions.
:::

### Complete script

Here is what the complete `sprite_2d.os` orchestration script looks like for reference.

<Figure image="/img/step-by-step/apply-movement.png" caption="Apply movement based on angular_speed, speed, and delta time"></Figure>

## Refactor and use functions

A common task in programming is to polish code so that it's easier to digest and understand.
One of the common complaints of visual scripting is that it's a massive web of connections, and what we've done already is shaping up to be just that.
Thankfully, Orchestrator provides multiple tools to help with this, and the first is to use user-defined functions.

### Moving apply rotation to a function

The first task we're going to focus on is moving the **Apply Rotation** logic to a user-defined function called `apply_rotation`.
This user-defined function will accept the `delta` time in seconds. 

To create the user-defined function:

1. Press the <EditorIcon name="Add"/> button on the top-right of the **Functions** panel in the **Component** view.
2. When prompted for a function name, enter `apply_rotation` and press **Enter**.
3. In the **Inspector** view, adjust the function properties by setting the following properties:
   * Set the `Argument Count` to a value of `1`.
   * Adjust the **new** argument's type as `Float` and the name as `delta`.

The **Function Entry** node should now look like this in the graph:

<Figure image="/img/step-by-step/apply-rotation-function-entry-node.png" caption="Apply rotation function"></Figure>

You will have noticed that a new tab has been created at the top of the graph workspace called `apply_rotation()`.
One of the benefits with Orchestrator is that all user-defined functions are organized into their own graph.
This helps to declutter large graphs, and serves as a really neat way to organize your code.s

Now, you may wonder how do we get the nodes we created in the **EventGraph** into this user-defined graph.
Orchestrator supports bulk operations, so we're going to use **<EditorIcon name="ActionCut"/>Cut** and **<EditorIcon name="ActionPaste"/>Paste** to move that logic.
So at the top of the graph workspace, click the **EventGraph** tab to go back to the main **Graph**.

Left-click anywhere on the graph canvas and select the nodes that are specific to the rotation logic.
The following shows the nodes you should be selecting in case you may have forgotten, they're highlighted with a **yellow** border:

<Figure image="/img/step-by-step/apply-rotation-function-select-nodes.png" caption="Nodes to select"></Figure>

:::tip
You can also hold the `Ctrl` key and left click each node separately to select multiple nodes.
:::

Now to move these nodes to the user-defined function, we're going to first **Copy** them rather than use **Cut**:

1. Press the `Ctrl+C` shortcut to copy the selected nodes into the selection buffer.
2. In the **Component** view, double-click the `apply_rotation` function or click the `apply_rotation()` tab.
3. In the `apply_rotation` graph, press `Ctrl+V` to paste the selected nodes onto the graph.

:::note
The nodes may have been pasted near the center of the graph.
You can click the **<EditorIcon name="GridMinimap"/>Toggle the graph minimap** at the top of the graph to quickly find them.
Simply drag the selected nodes or the **Function Entry** node together.
:::

The next step here is to wire up the **Function Entry** node and the nodes that you just added.

1. Connect the `delta` output pin to the `A` input pin of the multiplication node.
2. Connect the output execution pin from the **Function Entry** node to the input execution pin of the **Call Set Rotation** node.

The user-defined function, `apply_rotation()` should look like this:

<Figure image="/img/step-by-step/apply-rotation-function-finished.png" caption="The apply_rotation(delta) function"></Figure>

The last step is to replace the logic in the **EventGraph** with our new function, `apply_rotation`.
Click on the **EventGraph** in the **Graphs** section of the **Component** view or select the **EventGraph** tab.

1. Right select all the currently selected nodes.
2. Press the `Del` key to remove the nodes from the graph.
3. Drag the `apply_function` from the **Component** view onto the graph.
4. Connect the output execution pin from **Process Event** node to the input execution pin of **Call Apply Rotation** node.
5. Connect the output `delta` pin from the **Process Event** node to the input `delta` pin of **Call Apply Rotation** node.
6. Connect the output execution pin from **Call Apply Rotation** to the **Call Rotated** node.
7. Open the **All Actions** dialog, search for `Get Rotation` and add it to the graph.
8. Lastly connect the output in from **Call Get Rotation** node to the `angle` pin of the **Call Rotated** node.

Your **EventGraph** should now look like this:

<Figure image="/img/step-by-step/refactored-apply-rotation.png" caption="After apply_rotation refactored"></Figure>

### Moving apply movement to a function

Now that we have moved the logic for rotation to a user-defined function, the next step is to do the same for **Apply Movement**.

1. Press the <EditorIcon name="Add"/> button on the top-right of the **Functions** panel in the **Component** view.
2. When prompted for a function name, enter `apply_movement` and press **Enter**.
3. In the **Inspector** view, adjust the function properties by setting the following properties:
   * Set the `Argument Count` to a value of `1`.
   * Adjust the **new** argument's type as `Float` and the name as `delta`.

The **Function Entry** node should look like this in the graph:

<Figure image="/img/step-by-step/apply-movement-function-entry-node.png" caption="Apply movement function"></Figure>

Now again, we're going to select and **Copy** the nodes from the **EventGraph** into our new `apply_movement` user-defined function.

1. Navigate back to the **EventGraph**.
2. Select **ALL** nodes except the **Process Event** and **Call Apply Rotation** nodes.
3. Press `Ctrl+C` to copy the nodes into the buffer.
4. Navigate back to the **Apply Movement** graph.
5. Press `Ctrl+V` to paste the nodes onto the graph.

With the nodes pasted, you need to wire up the **Function Entry** node with the other nodes.

1. Connect the output execution pin from the **Function Entry** node to the input execution pin of the **Call Rotated** node.
2. Connect the `delta` output pin from the **Function Entry** node to the `B` input pin that isn't connected.<br/>
This will be the `B` input pin on the **Multiplication** node between a `Vector2` and a `Float`.

The user-defined function graph should look like this:

<Figure image="/img/step-by-step/apply-movement-function-finished.png" caption="The apply_movement(delta) function"></Figure>

The last step is to replace the selected nodes in the **EventGraph** with the call to the new user-defined function that handles applying movement, `apply_movement`.

1. Delete all nodes in the **EventGraph** except the **Process Event** and **Call Apply Rotation** nodes.
2. Drag the `apply_movement` function from the **Component** view onto the graph.
3. Connect the **Call Apply Function** output execution pin to the **Call Apply Movement** input execution pin.
4. Connect the **Process Event** `delta` output pin to the **Call Apply Movement** `delta` input pin.

The new refactored **EventGraph** should now look like this:

<Figure image="/img/step-by-step/refactored-apply-rotation-and-movement.png" caption="The refactored EventGraph"></Figure>

By refactoring the logic from the **EventGraph** into two distinct **Function** graphs, this makes the graphs more readable.

:::tip
Any user-defined function can be focused by double-clicking the **Call Function** node.
For example, double-clicking the **Call Apply Rotation** node will open the `apply_rotation` function graph, and focus the function's **Function Entry** node.
:::  

## Listening for player input {#listening-for-player-input}

Building upon the steps from [Creating your first orchestration](#creating-your-first-orchestration) and [Reactor and use functions](#refactor-and-use-functions), let's look at another important feature of any game: giving control to the player.
To add this, we need to modify our `sprite_2d.os` orchestration.

<Figure image="/img/step-by-step/scripting_first_script_moving_with_input.webp" caption="Moving Godot with player input"></Figure>

You have two main tools to process player input in Godot using Orchestrator:

* Using the built-in event callbacks, mainly **Unhandled Input Event**.
Like **Process Event**, it's a built-in function call that Godot will call every time the player presses a key.
It's the tool you want to use to react to events that don't happen each frame, like pressing `Space` to jump.
* Using the **Engine Singleton** node to access the `Input` singleton.
A singleton is a globally accessible object. 
Godot provides access to several of these, and they're available in Orchestrator.
It's generally the right tool for checking for input every frame.

We are going to use the `Input` singleton here as we need to know if the player wants to turn or move each frame.

### Turning 

For turning, we should use a new variable: `direction`. 
In the **Component** panel, we're also going to create a new user-defined function to calculate the direction.

#### Calculating the direction

To add the new function, follow these steps:

1. Press the <EditorIcon name="Add"/> on the **Functions** panel in the **Component** view.
2. Set the new function name as `calculate_direction`.

In this function, what we ultimately want to accomplish is this logic:

```python title="GDScript"
func calculate_direction():
  var direction = 0
  if Input.is_action_pressed("ui_left"):
    direction = -1
  if Input.is_action_pressed("ui_right"):
    direction = 1
  return direction
```

Since this function will return an `Integer` value, we need to add a **Function Result** node to the graph.

1. Click on the **Function Entry** node if it isn't already selected.
2. In the **Inspector** view, enable the `Has Return Value` property.<br/>
   If this is not enabled, you cannot add a **Function Result** node to the graph.
3. In the **Inspector** view, set the `Return Type` to `Integer`.
4. Now, right-click on the graph to open the **All Actions** dialog.
5. Search for `Add Return`
6. Select the `Add Return Node` and press the **Add** button or simply press **Enter**.

The `calculate_direction` graph should look like this:

<Figure image="/img/step-by-step/calculate-direction-initial.png" caption="Calculate direction function"></Figure>

Our `direction` variable is a multiplier representing the direction in which the player wants to turn.
A value of `0` means the player isn't pressing the left nor the right arrow key.
A value of `1` means the player wants to turn right, while a value of `-1` means they want to turn left.

In Orchestrator, to check whether an action is pressed, we need to use the **Input Action** node.
This node allows you to check whether a specific action mapping is _pressed_, _released_, _just pressed_, or _just released_.

1. Right-click on the graph to open the **All Actions** dialog.
2. Search for `Input Action`.
3. Select the `Input Action` choice and press the **Add** button or simply press **Enter**.

We need two of these nodes, one to check `ui_left` and another to check `ui_right`.
We can duplicate an existing node by using the `Ctrl+D` shortcut.

To duplicate the **Input Action** node:

1. Select the **Input Action** node, if it isn't already selected.
2. Press the `Ctrl+D` shortcut or right-click and select the **<EditorIcon name="Duplicate"/>Duplicate** option.

You should now have two **Input Action** nodes, as shown here:

<Figure image="/img/step-by-step/input-action-nodes-duplicated.png" caption="Input action nodes"></Figure>

With these two nodes, you need to configure each of them to check for the desired state:

1. Select one **Input Action** node.
2. In the **Inspector** panel, set the `Action` to `ui_left`.
3. Select the other **Input Action** node.
4. In the **Inspector** panel, se the `Action` to `ui_right`.

These two nodes should now look like this:

<Figure image="/img/step-by-step/input-action-nodes-configured.png" caption="Input action nodes configured"></Figure>

Next, to apply the two `if` conditions, we need use two **Branch** nodes.

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Branch`.
3. Select the `Branch` option and press **Add** or simply hit **Enter**.
4. Select the **Branch Node** and duplicate it, so that you have two **Branch** nodes.

The next thing we need before we can wire up these nodes is a variable to represent the `direction` value.
In this case, define a variable named `direction` using the type `Integer` like had previously defined for `speed`.
For `direction`, leave its default value unchanged, as it will default to `0`.
If you need a reminder of how to do that, see the [Add angular speed](#add-angular-speed) section.

With the `direction` variable setup, drag the `direction` variable from the **Component** panel onto the graph **3** times.
Each time, making sure to select that you want to create a **Get direction** node.

Now one of the cleanest ways to represent a sequence of operations, like checking two `if` (**Branch**) conditions followed by some logic that will run based on the prior stages is to use a **Sequence** node.
In our case, we're going to create a **Sequence** node that will have **4** output execution pins, one to initialize our `direction` variable, two to handle the two `if` checks, and lastly one to handle the incrementing of the `rotation`.

1. Right-click the graph and open the **All Actions** dialog.
2. Search for `Sequence`.
3. Select the `Sequence` option and press **Add** or simply press **Enter**.
4. In the **Sequence** node, press the <EditorIcon name="ZoomMore"/> button so that there are **4** output execution pins.
5. Connect the `Then 0` output execution pin to one of the **Set direction** nodes.
6. In that **Set direction** node, make sure that the `direction` value is `0` (the default).

Now, lets wire up the nodes.

1. Starting with the **Sequence** node, connect the `Then 1` output pin to one of the **Branch** nodes.
2. Connect the **Action ui_left** node's output pin to the `Condition` input pin of that **Branch** node.
3. Connect the **Branch** node's `True` output execution pin to one of the **Set direction** nodes.
4. Set the `direction` input value to `-1` on the **Set direction** node.

At this point, we've taken care of setting up the first `if` condition for `Input.is_action_pressed("ui_left")`.
Now, we need to repeat this process for the other `if` condition.

1. Starting with the **Sequence** node, connect the `Then 2` output pin to the **Branch** node that isn't connected.
2. Connect the **Action ui_right** node's output pin to the `Condition` input pin of that **Branch** node.
3. Connect the **Branch** node's `True` output execution pin to the **Set direction** node that isn't connected.
4. Set the `direction` input value to `1` on the **Set direction** node.

With this, your graph should look similar to this:

<Figure image="/img/step-by-step/turning-input-left-right-step-1.png" caption="Initial setup for turning"></Figure>

Now, you need to wire the **Function Entry** and **Function Result** nodes with this, returning the `direction`.

1. Connect the **Function Entry** output execution pin to the input execution pin of the **Sequence** node.
2. Drag the `direction` variable from the **Component** view, and spawn a **Get direction** node.
3. Connect the `Then 3` output pin from the **Sequence** node to the input execution pin of the **Function Result** node.
4. Finally, connect the **Get direction** node's data output to the input `Return Value` pin of the **Function Result** node.

The graph for `calculate_direction()` should look like this:

<Figure image="/img/step-by-step/calculate-direction-complete.png" caption="The calculate_direction() function"></Figure>

#### Using the direction calculation

The last step is to use the the `calculate_direction` function inside our `apply_rotation` function.

1. Navigate to the `apply_rotation` function.
2. Drag the `calculate_direction` function onto the graph from the **Component** view.
3. Select the **Multiplication** node that multiplies two `Float` values and press `Ctrl+D` to duplicate.
4. Connect the **Apply Rotation** entry node output pin to the input execution pin of the **Call Calculate Direction** node.
5. Connect the `delta` output pin on **Apply Rotation** to the `B` input of the duplicated node.
6. Connect the `Return value` output pin on the **Call Calculate Direction** to the `A` input of the duplicated node.
7. Connect the duplicated node's output pin to the unconnected **Multiplication** node `A` pin.
8. Lastly connect the **Call Calculate Direction** output execution pin to the **Call Set Rotation** input execution pin.

The final graph should look like this:

<Figure image="/img/step-by-step/apply-rotation-function-with-turning.png" caption="Updated apply_rotation(delta) function"></Figure>

If you run the scene, the icon should rotate when pressing the `Left` and `Right` arrow keys.

:::tip
If you don't press either of the arrow keys, it will simply move forward, and off the screen.<br/>
So be sure to constantly press the `Left` or `Right` arrows to keep in on the screen.
:::

### Moving forward

Now, as nice as this simple game is at this point, we'd like to have better control of our Godot icon.

In this section, we're going to adjust how `apply_movement` works, and only have the icon move when the player presses the `Up` arrow key.
This will make the icon easier to control and keep on on the screen.

#### Calculating the velocity

If you recall when we originally designed the `apply_movement` function, we used the following to calculate the `velocity`.

```python title="GDScript"
var velocity = Vector2.UP.rotated(rotation) * speed
```

Now instead, we want to conditionalize this, having the `velocity` set to `Vector2.ZERO`, and only applying the calculation if the player has pressed the `Up` arrow key.

```python title="GDScript"
var velocity = Vector2.ZERO
if Input.is_action_pressed("ui_up"):
  velocity = Vector2.UP.rotated(rotation) * speed
```

We're going to accomplish this by introducing a new function called `calculate_velocity`.

1. Press the <EditorIcon name="Add"/> button at the top of the **Functions** panel in the **Component** view.
2. When asked for a function name, enter `calculate_velocity`.

In this function, we either want to return `Vector2.ZERO` if the player has not pressed the `Up` arrow key, or return the velocity based on the current `rotation` and `speed` values.
The first step we need to is to add the **Function Return** node, returning a `Vector2` value.

1. Select the **Function Entry** node.
2. In the **Inspector** view, enable the `Has Return Value`.
3. In the **Inspector** view, set the `Return Type` as `Vector2`.
4. In the graph, right-click to open the **All Actions** dialog.
5. Search for `Add Return`.
6. Select the `Add Return Node` option and press the **Add** button or simply hit **Enter**.

Now to simplify things, navigate back to the `apply_movement` graph and select these nodes.
The nodes to select are highlighted with a **yellow** border:

<Figure image="/img/step-by-step/calculate-velocity-copy-nodes.png" caption="Nodes to copy"></Figure>

1. Press the `Ctrl+C` shortcut to copy the nodes into the copy buffer.
2. Navigate back to the `calculate_velocity` function.
3. Press the `Ctrl+V` shortcut to paste the nodes onto the graph.

With these nodes in the `calculate_velocity` function, you are going to use a similar technique that was used for `direction`, relying on a **Sequence** node to:

- Initialize the `velocity` value to `Vector2.ZERO`
- Check whether the `ui_up` action is pressed, and only modifying the `velocity` if `true`.
- Return the calculated `velocity` value.

Before we add nodes, you need to create a `velocity` variable.
This variable should be of type `Vector2`, and its default value left unchanged.
If you don't remember the steps, you can refer to the [Add angular speed](#add-angular-speed) section once more.

With the `velocity` variable added, perform these steps:

1. Right-click the graph to open the **All Actions** dialog.
2. Search for `Sequence`.
3. Select the `Sequence` option and press the **Add** button or simply hit **Enter**.
4. Connect the output execution pin from the **Calculate Velocity** node to the input execution pin of the **Sequence** node.
5. Drag the `velocity` variable from the **Component** panel onto the graph.
6. Connect the `Then 0` output pin on the **Sequence** node to the input execution pin on the **Set Velocity** node.
7. Open the **All Actions** dialog, and add a **Branch** node to the graph.
8. Connect the `Then 1` output execution pin to the input execution pin of the **Branch** node.
9. Open the **All Actions** dialog, and add an **Input Action** node to the graph.
10. Select the **Input Action** node.
10. In the **Inspector** view, change the `Action` property to be `ui_up`.
11. Connect the **Input Action** output pin with the input `Condition` pin on the **Branch** node.
12. Connect the `True` output pin from the **Branch** node to the input execution pin on the **Call Rotated** node.
13. Select the `velocity` variable in the **Component** panel and drag onto the graph, selecting **Set velocity**.
14. Connect the output execution pin from **Call Rotated** to the input execution pin of **Set Velocity.
15. Connect the output pin from the **Multiplication** (A*B) node to the input pin of **Set Velocity**.
16. Drag the `velocity` variable from the **Component** panel and select **Get velocity**.
17. Connect the `Then 2` output execution pin to the **Return Node** input execution pin.
18. Finally, connect the **Get velocity** output pin to the **Return Node** input `Return Value` pin.

At the end, your graph for `calculate_velocity` should look like this:

<Figure image="/img/step-by-step/calculate-velocity-complete.png" caption="Complete calculate_velocity() function"></Figure>

#### Using the velocity calculation

With the `calculate_velocity` function done, we need to use this in the `apply_movement` function.
Navigate back to the `apply_movement` function and perform these steps:

1. Remove the node that you copied to the `calculate_velocity` function.<br/>In case you forgot, they're the ones shown here with a **yellow** border:
   <Figure image="/img/step-by-step/calculate-velocity-copy-nodes.png" caption="Nodes to delete"></Figure>
2. Drag the `caculate_velocity` function from the **Component** view onto the graph.
3. Connect the output execution pin from **Apply Movement** to the input pin on **Call Calculate Velocity** node.
4. Connect the output execution pin from **Call Calculate Velocity** to the input execution pin on **Call Set Position** node.
5. Finally, connect the `Return Value` output pin on **Call Calculate Velocity** node to the input `A` pin on the **Multiplication** node that's currently unconnected.

The new simplified `apply_movement` function should look like this:

<Figure image="/img/step-by-step/apply-movement-function-refactored-finished.png" caption="New refactored apply_movement() function"></Figure>

If you now run the scene, you'll notice the following happens:

* The Godot icon does not move unless you press the `Left`, `Right`, or `Up` arrow keys.
* The `Left` arrow key rotates the icon to the left.
* The `Right` arrow key rotates the icon to the right.
* The `Up` arrow key makes the icon move forward in its current facing direction.

<Figure image="/img/step-by-step/scripting_first_script_moving_with_input.webp" caption="Moving around is easy!"></Figure>

## Summary

In summary, every script in Godot represents a class that extends one of the engine's built-in classes.
The node types your classes inherit from give you access to properties, such as `rotation` and `position` in our sprite's case.
You also inherit many functions, which we didn't use in this example.

In an Orchestration, using variables is an excellent way to store and manage state.
Additionally, user-defined functions are a great way to organize smaller pieces of code to reduce the complexity of large visual script graphs.

And who would believe, in the end, all this was possible using three nodes in a graph:

<Figure image="/img/step-by-step/editor-finished.png" caption="Orchestrator, Visual Scripts aren't Spaghetti!!!!"></Figure>