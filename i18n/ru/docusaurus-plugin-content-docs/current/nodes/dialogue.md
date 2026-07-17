---
toc_max_heading_level: 4
---

# Dialogue

Any RPG game heavily relies on a solid foundation for telling a story and providing an immersive experience for the player.
One the tools that help facilitate this is using a conversation system to drive the interaction between the player and the game's story.

Orchestrator provides two key nodes to support conversation:

- Show Message node
- Dialogue Choice node

## Show message node

<Figure image="/img/nodes/dialogue/show-message-node.png" caption="Show message node"></Figure>

The **Show Message** node is the foundation of the dialogue and RPG conversation system.
It allows you to define who is speaking, and the text they're going to say.
Additionally, you can define any number of choice inputs that allow the player to control the execution flow throughout the conversation.

### Using a custom scene

Orchestrator provides a default basic scene for conversations in the `res://addons/orchestrator/scenes` directory.
While you may edit this scene directly, we **strongly recommend** that you make a copy and customize the scene in a different path.

To use a custom scene with the conversation system:

1. Locate your **Show Message** node(s) in the graph.
2. Click on the `Default Scene` button for the **Scene** property.
3. Locate your new custom scene file in the project, and press **Open**.

:::info
We understand that it may be cumbersome to set the **Scene** on each **Show Message** node manually.
We will be adding an Orchestrator setting in the future to allow setting a custom default scene in the `Project Settings`.
:::

### Non-linear conversation flow

One of the most powerful ways to create immersive RPG conversation is to provide options when interacting with non-player characters, creating responses that are tailored based on the choices selected by the player.
Orchestrator's **Show Message** node provides for this using the <EditorIcon name="ZoomMore"/> button.

To add one or more conversation choices:

1. Press the <EditorIcon name="ZoomMore"/> button to add a conversation choice.
2. Add a **Dialogue Choice** node to the graph and wire its output pin to the input pin of the message node's choice.
3. Connect any output logic to that choice's output pin, which will receive the output pulse when the player selects that choice.

:::tip
Use choice output pins in **Show Message** nodes to alter the global game state can that influence future interactions with non-player characters for a truly immersive experience.
:::

### Properties

The following properties can be set on the **Show Message** node:

| Pins     | Description                                                                                         |
|:---------|:----------------------------------------------------------------------------------------------------|
| Speaker  | The name of the character that is currently speaking the `Message` text.                            |
| Message  | The text being spoken by the `Speaker`.                                                             |
| Scene    | The file path to the custom scene to be rendered when the node executes.                            |
| Choice n | Optional choices that can be selected by the player when interacting with the non-player character. |

:::note
If no choices are specified, the player will be prompted to press a `Continue` button when using the default scene.
:::

## Dialogue choice node

<Figure image="/img/nodes/dialogue/choice-node.png" caption="Dialogue choice node"></Figure>

The **Dialogue Choice** node is a special type of node that describes a specific choice that can be picked by the player when interacting with a **Show Message** node.
Therefore, for **Dialogue Choice** nodes to be useful, they must be paired with a **Show Message** node.

<Figure image="/img/nodes/dialogue/dialogue-example.png" caption="Dialogue example"></Figure>

In the above example, there are two **Dialogue Choice** nodes that are connected to a **Show Message** node.
When the **Show Message** node executes, each choice's `visible` input condition is evaluated to determine whether that specific choice should be shown to the player.
This can be extremely useful for creating varied responses and actions the player can take based on game state.

| Pins    | Description                                                                                         |
|:--------|:----------------------------------------------------------------------------------------------------|
| Text    | The text to be diplayed in the conversation dialogue window for that specific choice.               |
| Visible | Whether the this choice should be visible to the player                                             |
| Choice  | The output pin that should be connected to one of the `Choice n` input pins of a Show Message node. |

