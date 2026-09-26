
# Comments

<Figure image="/img/nodes/comments/comment-node-example.png" caption="Example usage of a comment node"></Figure>

Multiple **Comment Nodes** can be added to a visual script graph.
These can be used for organizational purposes to make the **Graphs** more readable, but they can also be used for informational purposes as they allow for text-based descriptions to be added just like adding comments in code.

## Creating comment nodes

Creating comment nodes requires a few short steps:

1. **Right-click** and choose `Add Comment` from the all actions window.
   <Figure image="/img/nodes/comments/add-comment-all-actions.png" caption="Add comment node"></Figure>
2. Selecting the node will display several configurable properties in the editor Inspector, including the ability to customize the titlebar text, the titlebar alignment, the node's background color along with the font size, color, and text.
   <Figure image="/img/nodes/comments/add-comment-inspector.png" caption="Add comment node inspector properties"></Figure>
3. The comment node can be resized by dragging the lower right corner.
Note that if you want to move the comment box and any nodes that it contains, double-clicking the comment node's titlebar will toggle between selecting and unselecting all nodes within the comment box's boundary.
This serves as a useful way to rearrange groups of nodes that are related.

## Editing comment node properties

All comment node properties are maintained in the **Inspector** view.
See the [Properties](#properties) section for details on what node properties can be customized.

## Deleting comment nodes

Clicking on any comment node and pressing the **Delete** key, or **Right-Click** and selecting **Delete** from the pop-up menu will remove the comment node from the graph.
Removing a comment node will have no impact on the nodes that it contains, as long as the nodes contained are unselected when the comment node is deleted.

## Properties {#properties}

Comment nodes have a number of properties that can be adjusted in the **Inspector** view.
Simply select the comment node to show its properties in the **Inspector** view.

| Property         | Description                                                                                                                              |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| Titlebar Text    | The text that will be shown in the comment node's title bar.                                                                             |
| Align Center     | If this is checked, the titlebar text will be center aligned.                                                                            |
| Background Color | This allows you to change the background color of the comment node. Remember to use Alpha to adjust the transparency of the background.  |
| Font Size        | This allows specifying the text size of the text in the node's panel area.                                                               |
| Text Color       | This allows you to change the text color of the text in the node's panel area.                                                           |
| Comments         | This allows you to provide an extended description using a multi-lined text area that will be added to the node's panel area.            |