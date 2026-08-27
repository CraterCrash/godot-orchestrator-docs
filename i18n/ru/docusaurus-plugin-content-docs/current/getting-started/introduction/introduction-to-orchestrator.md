---
sidebar_position: 1
---

# Introduction to Orchestrator

This article is to help you determine if Orchestrator might be a good fit for you.
We will introduce some broad features of the plug-in and give you a feel for what is achievable while also answering questions such as "what do I need to know to get started?".

This is by no means an exhaustive overview.
We will introduce many more features in this getting started series.

## What is Orchestrator?

Orchestrator is a Godot plug-in designed to provide visual-scripting capabilities to any Godot game project.
It can be used to create games or applications that are released on a myriad of platforms, including desktop, mobile, or the web.

You can also create console games using Orchestrator, although you either need strong programming skills or a developer to port the game for you.

:::note
The Orchestrator development team cannot provide an open source console export due to licensing terms imposed by console manufacturers.
Regardless of the engine used, releasing games on consoles is always a lot more work than other platforms.
You can read more in the <ExternalLink href="https://docs.godotengine.org/en/stable/tutorials/platform/consoles.html#doc-consoles">Godot documentation</ExternalLink>.
:::

## What can the plug-in do?

The idea of Orchestrator as a visual-scripting tool began as an in-house experiment for several unpublished games at Crater Crash Studios.
The team soon began to see the benefit of open sourcing the project for other Godot developers, especially after the Godot engine officially discontinued its own visual scripting support at the end of Godot 3.

The plug-in is designed to fully integrate with the Godot engine, allowing developers to visually design game logic, code, behaviors, state machines, RPG-based conversations, and more using visual nodes and a graph canvas instead of text-based editors used for Godot's built-in script languages: `C#` and `GDScript`.

Here is a very simple example of an `Orchestration`, the main visual script resource.
This script is designed to rotate an object at constant speed each frame tick:

<Figure image="/img/common/example-orchestration.png" caption="An example orchestration"></Figure>

You can find many more examples in our <ExternalLink href="https://github.com/Vahera/godot-orchestrator-examples">GitHub examples repository</ExternalLink>.

## How to install the plug-in?

Orchestrator does not ship with the Godot Editor, and instead it must be installed into your Godot project as a plug-in.
For information on how to install the plug-in into a new project, please read the [Installation Guide](installation-guide).

## How does it work and look?

Orchestrator provides you with an entirely new workspace tab in the main editor viewport to create visual graphs for connecting nodes that represent logical actions, constructing game logic that powers your game.

<Figure image="/img/common/godot-editor-orchestrator.png" caption="Orchestrator main view"></Figure>

The team strives to not only provide a feature-rich experience with the power of visual scripting without its traditional drawbacks, but to do so consistently so where you don't realize you are using a plug-in rather than out of the box Godot.
Any project is also evolving, so while we believe the integration is done quite well, there is always room for improvement.

## What language is an Orchestration?

The Godot engine provides two core programming languages out of the box, `GDScript` and `C#`.
These two languages provide seamless, powerful scripting opportunities in the engine; however, both of these are entirely text-driven.

Orchestrator provides a new type of programming language to Godot, to create new script resource types called `Orchestration`s.
An orchestration, offered called an `OrchestratorScript` or `OScript` for short, is a visual-scripting language where you connect visual blocks together to build games.

Orchestrator's code base is written in C++, the most popular language used in the gaming industry.
Developers use C++ because it's highly optimized and efficient, which is critical in high-performance games.

However, as a developer using Orchestrator, you aren't required to know C++, or really any type of language syntax.
The plug-in is designed to connect visual blocks of functionality together to create logic.
An `Orchestration` is translated automatically to machine instructions at runtime, so that the script runs at optimal speeds under the most taxing game requirements.

And finally, the plug-in seamlessly integrates with the Godot Editor and Godot Engine thanks to the GDExtension technology, a binding provided by the Godot development team for creating high-performance plug-ins and code in C and C++, that can run inside the Godot Editor or in exported Godot games.

## What do I need to know to use Orchestrator?

Orchestrator is a feature packed plug-in for Godot, with thousands of features.
Its goal is to abstract away a lot of the technical noise around syntax and specific language features, enabling you to conceptualize what you need and to combine high-level behavior nodes to create game logic. 

While we try and make the plug-in accessible to the most junior of developers, having a basic understanding programming concepts can help tremendously.
As we continue to refine the plug-in and find more ways to simplifying its design, your input will help shape this effort more than anything else possible. 

In the next part, you will get an overview of the plug-ins essential concepts.