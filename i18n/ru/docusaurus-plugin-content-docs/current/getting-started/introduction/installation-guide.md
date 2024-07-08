---
sidebar_position: 3
---

# Installation guide

There two ways to install the plug-in:

* Using the Godot Asset Library <EditorIcon name="AssetLib"/> in the Godot Editor.
* Downloading the plug-in from our <ExternalLink href="https://github.com/Vahera/godot-orchestrator/releases">GitHub repository</ExternalLink>.

In this section, we'll cover how to use both.

## Godot asset library

The Godot Editor has a built-in asset library feature, which allows users to search, download, and install Godot plug-ins, tools, and assets directly from their online asset catalog.

To access the **Asset Library**, we'll use the  <EditorIcon name="AssetLib"/> **AssetLib** tab at the top of the Godot Editor.

<Figure image="/img/common/godot-editor-assetlib.png" caption="Godot Asset Library"></Figure>

In the search box, type `Orchestrator` or simply `Scripting` to locate the plug-in.

<Figure image="/img/common/godot-editor-assetlib-search.png" caption="Search for Scripting / Orchestrator"></Figure>

Click the plug-in's name to open the **Information** dialog.

<Figure image="/img/common/godot-editor-assetlib-plugin.png" caption="Orchestrator plug-in information"></Figure>

Press the **Download** button to begin the download process.
When the download finishes, you'll be prompted to **Configure Asset Before Installing**, shown here:

<Figure image="/img/common/godot-editor-assetlib-configure.png" caption="Configure plug-in dialog"></Figure>

Uncheck the `Ignore asset root` option.

<Figure image="/img/common/godot-editor-assetlib-ignore-asset-root.png" caption="Uncheck ignore asset root"></Figure>
:::warning
Failing the uncheck this option will not install the plug-in correctly into your project.
:::

Finally, click the **Install** button, installing the plug-in into the `res://addons/orchestrator` directory.
After installation, the Godot Editor will prompt you to restart.

:::tip
There is currently an issue with the Godot Editor with loading textures used by GDExtension plug-ins.
The plug-in will be loaded before the textures are imported, causing the textures to not render initially or appear broken in some scenarios.
Restarting the Godot Editor one final time fixes the issue.
:::

## Download from GitHub

If you are interested in pre-release builds or are having trouble installing the plug-in using the Godot Asset Library, you can also download the plug-in binaries directly from our <ExternalLink href="https://github.com/Vahera/godot-orchestrator">GitHub Repository</ExternalLink>.
To install from GitHub, simply follow these steps:

1. Locate the latest release on the repository's <ExternalLink href="https://github.com/Vahera/godot-orchestrator/releases">Releases</ExternalLink> page.
   :::note
   While the repository page will show the latest **stable** release, if you are interested in pre-release builds, you will need to specifically look at the **Releases** page as pre-release builds are not listed on the main GitHub repository page.
   :::
2. Once you've located the desired release, expand the **Assets** section if it isn't already.
   <Figure image="/img/common/github-release-assets.png" caption="GitHub release assets"></Figure>
3. Locate the asset labeled `godot-orchestrator-<version>-plugin.zip`, and click it.<br/>
   This will download the artifact to your PC.

Once the artifact has been downloaded, it needs to be unzipped into your Godot project.
If you have not already created a Godot project, you should create one first following <ExternalLink href="https://docs.godotengine.org/en/stable/tutorials/editor/project_manager.html#doc-creating-and-importing-projects">these steps</ExternalLink>.

With the Godot project created, navigate to where you saved the downloaded file, and extract its contents directly into your Godot project's root-directory.
This should create a directory path like `<project-root>\addons\orchestrator`.

Once the files have been installed, focusing the Godot Editor will request to restart.
Simply follow the prompt, restarting Godot, and the plug-in should be active when the editor restarts.

:::tip
There is currently an issue with the Godot Editor with loading textures used by GDExtension plug-ins.
The plug-in will be loaded before the textures are imported, causing the textures to not render initially or appear broken in some scenarios.
Restarting the Godot Editor one final time fixes the issue.
:::