
# Comments

<Figure image="/img/nodes/comments/comment-node-example.png" caption="Example usage of a comment node"></Figure>

A **Comment Node** can be used for multiple purposes.

The node can be configured with both a _title_ and _text_ that can add informational context to parts of a graph.
Additionally, comments can be used as organizational tools, to group logical parts of the graph together. 
This allows for moving groups of nodes together as a single unit rather than each node separately, or having to select all applicable nodes.

## Creating comment nodes

Creating comment nodes requires a few short steps:

1. **Right-click** and choose `Add Comment` from the all actions window. 
   <Figure image="/img/nodes/comments/add-comment-all-actions.png" caption="Add comment node"></Figure>
2. Selecting the node will display several configurable properties in the editor Inspector, including the ability to customize the titlebar text, the titlebar alignment, the node's background color along with the font size, color, and text.
   <Figure image="/img/nodes/comments/add-comment-inspector.png" caption="Add comment node inspector properties"></Figure>

:::tip
Comment nodes can also be added using the keybinding `Graph Editor > Create Nodes > Create Comment`.
By default, this keybinding is set to `C` but can be customized in the Orchestrator's `File > Settings > Shortcuts` tab.
:::

## Editing comment node properties

There are two ways to manage the properties for a **Comment Node**.
The first approach is to use the **Inspector** view in the editor, all public configurable properties are available there.

The second is to right-click the comment node's titlebar, showing a context menu of options:

<Figure image="/img/nodes/comments/comment-node-context-menu.png" caption="Comment node context menu"></Figure>

See the [Properties](#properties) section for details on what node properties can be customized.

## Deleting comment nodes

Clicking on any comment node and pressing the **Delete** key, or **Right-Click** and selecting **Delete** from the pop-up menu will remove the comment node from the graph.

Removing a comment node will have no impact on any nodes that it contains, as long as the nodes are not selected.
The removal of the comment node unbinds any attached nodes to the frame automatically, making the nodes ungrouped.

## Attach/Detach nodes

The **Comment Node** uses Godot's native `GraphFrame` behavior.
This means that when you drag a node over the top of a comment node, the frame will automatically join that node to the frame, grouping it with any other nodes the frame contains.

To ungroup a node from a comment node, right-click the node's titlebar and access its context-menu.
There will be an option called `Detach from Frame`, selecting it will detach the node and allow you to move it outside the frame's boundaries.

## Auto-shrink

By default, **Comment Nodes** enable the auto-shrink behavior, meaning that moving any nodes that are contained within the comment grow or shrink the comment node's boundaries accordingly.
When auto-shrink is disabled, the comment node's resizer tool becomes available in the bottom right-side of the comment node's frame.

The auto-shrink behavior can be disabled by toggling the comment node's auto-shrink behavior off either in the **Inspector** view or by the comment node's context-menu options.

## Properties {#properties}

Comment nodes have a number of properties that can be adjusted in the **Inspector** view.
Simply select the comment node to show its properties in the **Inspector** view.

| Property                 | Description                                                                                                                             |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| Icon                     | Specifies a custom icon to be placed in the top-right section of the comment node's title bar.                                          |
| Titlebar Text            | The text that will be shown in the comment node's title bar.                                                                            |
| Align Center             | If this is checked, the titlebar text will be center aligned.                                                                           |
| Background Color Enabled | This allows to control whether the background color is applied to the comment node.                                                     |
| Background Color         | This allows you to change the background color of the comment node. Remember to use Alpha to adjust the transparency of the background. |
| Font Size                | This allows specifying the text size of the text in the node's panel area.                                                              |
| Text Color               | This allows you to change the text color of the text in the node's panel area.                                                          |
| Comments                 | This allows you to provide an extended description using a multi-lined text area that will be added to the node's panel area.           |
| Autoshrink Enabled       | This controls whether the comment node auto-shrinks based on the nodes it contains, or whether it can be freely resized manually.       |