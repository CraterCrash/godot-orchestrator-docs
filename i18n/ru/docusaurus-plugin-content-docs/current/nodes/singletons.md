
# Singletons

A singleton represents a Godot object where there is only a single instance of that object present in your game.
The Godot engine provides dozens of singletons for various purposes.
In addition, user code can also add and register their own singletons that can be accessed globally.
To add a singleton reference to a script, place an **Engine Singleton** node onto the graph.

## Singleton types

By default, Godot provides dozens of singletons, each providing access to very specific features.
These singletons are registered by a unique name and can be referenced using that name.
The Godot provided singletons are:

| Singleton Name           | Description                                                                                                            |
|--------------------------|------------------------------------------------------------------------------------------------------------------------|
| AudioServer              | Server interface for low-level audio access.                                                                           |
| CameraServer             | Server keeping track of different cameras accessible in Godot.                                                         |
| ClassDB                  | A class information repository.                                                                                        |
| DisplayServer            | A server interface for low-level window management.                                                                    |
| EditorInterface          | Godot editor's interface.                                                                                              |
| Engine                   | Provides access to engine properties.                                                                                  |
| EngineDebugger           | Exposes the internal debugger.                                                                                         |
| GDExtensionManager       | Provides access to GDExtension functionality.                                                                          |
| GDScriptLanguageProtocol | -                                                                                                                      |
| Geometry2D               | Provides methods for some common 2D geometric operations.                                                              |
| Geometry3D               | Provides methods for some common 3D geometric operations.                                                              |
| Input                    | A singleton for handling inputs.                                                                                       |
| InputMap                 | A singleton that manages all `InputEventAction`s.                                                                      |
| IP                       | Internet protocol (IP) support functions such as DNS resolution.                                                       |
| JavaClassWrapper         | -                                                                                                                      |
| JavaScriptBridge         | Singleton that connects the engine with the browser's JavaScript context in Web export.                                |
| Marshalls                | Data transformation (marshalling) and encoding helpers.                                                                |
| NativeMenu               | A server interface for OS native menus.                                                                                |
| NavigationMeshGenerator  | Helper class for creating and clearing navigation meshes.                                                              |
| NavigationServer2D       | A server interface for low-level 2D navigation access.                                                                 |
| NavigationServer3D       | A server interface for low-level 3D navigation access.                                                                 |
| OS                       | Provides access to common operating system functionalities.                                                            |
| Performance              | Exposes performance-related data.                                                                                      |
| PhysicsServer2D          | A server interface for low-level 2D physics access.                                                                    |
| PhysicsServer2DManager   | A singleton for managing `PhysicsServer2D` implementations.                                                            |
| PhysicsServer3D          | A server interface for low-level 3D physics access.                                                                    |
| PhysicsServer3DManager   | A singleton for managing `PhysicsServer3D` implementations.                                                            |
| ProjectSettings          | Stores globally-accessible variables.                                                                                  |
| RenderingServer          | Server for anything visible.                                                                                           |
| ResourceLoader           | A singleton for loading resource files.                                                                                |
| ResourceSaver            | A singleton for saving `Resource`s to the filesystem.                                                                  |
| ResourceUID              | A singleton that manages the unique identifiers of all resources within a project.                                     |
| TextServerManager        | A singleton for managing `TextServer` implementations.                                                                 |
| ThemeDB                  | A singleton that provides access to static information about `Theme` resources used by the engine and by your project. |
| Time                     | A singleton for working with time data.                                                                                |
| TranslationServer        | A server responsible for language translations.                                                                        |
| WorkerThreadPool         | A singleton that allocates some `Thread`s on startup, used to offload tasks to these threads.                          |
| XRServer                 | Server for AR and VR features.                                                                                         |

## Selecting the singleton

Once an **Engine Singleton** node has been placed onto the graph canvas, it will default to the `Engine` singleton.
To change which singleton you want to access:

1. Select the **Singleton** node in the graph.
2. Select the designed choice in the **Inspector** view for the `Singleton` property.
   <Figure image="/img/nodes/singletons/singletons-inspector.png" caption="Changing singleton reference"></Figure>

## Accessing singleton functions

Godot singletons provide access to commonly used functions, such as `Time.get_unix_time_from_system()`.
To access singleton functions, simply:

1. Drag the mouse away from the output pin on the **Engine Singleton** node.
2. When releasing the mouse, the **All Actions** dialog will show.
3. Search for the desired function, i.e. `get unix time from system`
4. Select the function and press `Add` or hit `Enter` to place the function onto the graph.

## Registering a user-defined singleton

In addition to the singletons that are provided by Godot, users can also add their own singletons.
When a singleton is added, it's expected that you guarantee that the instance remains valid until the singleton is unregistered.
If a registered singleton is deleted before it's removed, the editor or game will likely crash.

To add a user-defined singleton using Orchestrator:

1. Place an **Engine Singleton** node that refers to the `Engine` singleton onto the graph.
2. Drag the mouse away from the output pin.
3. In the **All Actions** dialog, search for `register` and select `Call Register Singleton`.
4. Provide a unique name to register the singleton instance with, i.e. `MySingleton`.
5. With a reference to your singleton object, connect the reference to the `instance` input pin.

:::info
User-defined singletons are registered dynamically at runtime, and therefore are not accessible using the **Engine Singleton** node.
To access a user-defined singleton, use the **Engine Singleton** node calling the `Call Get Singleton` function to obtain a reference at runtime.

For most cases, it may be simpler to use an **Autoload** node instead, since autoloads are registered in the **Project Settings** and are directly selectable in the **Inspector** view when selecting the **Autoload** node.
You also won't need to worry about unregistering the **Autoload** as Godot will handle this automatically.
:::

To unregister a user-defined singleton using Orchestrator:

1. Place an **Engine Singleton** node that refers to the `Engine` singleton onto the graph.
2. Drag the mouse away from the output pin.
3. In the **All Actions** dialog, search for `unregister` and select `Call Unregister Singleton`.
4. Provide the registered singleton's name in the `name` input pin. 