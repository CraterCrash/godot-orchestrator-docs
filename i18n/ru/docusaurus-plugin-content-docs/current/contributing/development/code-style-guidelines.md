
# Code style guidelines

When contributing to Orchestrator's source ode, you will be expected to follow the style guidelines outlined below.
Some of them are checked via Continuous Integration and reviewers will ask that you fix potential issues, so it's generally a godo ide to set up your system as outlined below to mitigate issues with your commits early.

## C++ and Objective-C

There are no written guidelines, but the code's general style is agreed upon by the core developers, and is enforced via the `clang-format` code beautifier.
This takes care of the following for you:

* Indentation and alignment are both tab based (respectively one and two tabs)
* One space around match and assignment operators, as well as after commas
* Pointer and reference operators are affixed to the type name, not the variable identifier
* See further down for header includes

The rules for the clang-format are outlined in the `.clang-format` file in the Orchestrator Git repository.

As long as your style matches the surrounding code and that you are not introducing trailing whitespaces or space-indentation, you should be fine.
If you plan to contribute regularly, however, we strongly advise that you set up clang-format to check and fix all your commits.

:::warning
Orchestrator's code style guidelines should not be applied to third-party or external git submodule code.
In other words, it should only be applied to the files contained within the `/src` directory.
:::

## File names

Use `snake_case` for file names.
Avoid using capital letters, as these are handled slightly differently across operating systems.

## Header includes

When adding new C++ or Objective-C files, or including new headers in existing ones, the following rules should be followed:

* The first lines in the file should be Orchestrator's copyright header and Apache License 2.0, copy-pasted from another file.
* In a `.h` header, include guards should be used with the form `ORCHESTRATOR_FILENAME_H` or `OSCRIPT_FILENAME_H`.
* In a `.cpp` file (e.g. `filename.cpp`), the first include should be the one where the class is declared (e.g. `#include "filename.h"`), followed by an empty line for separation.
* Then come headers from Orchestrator's code base, included in alphabetical order, with paths relative to the root folder. The includes should be surrounded using quotes, e.g. `#include "core/object.h"`. 
The block of Orchestrator includes should then be followed by an empty line for separation.
* Then come headers from Godot's `godot-cpp` library, included in alphabetical order. The includes should be surrounded with brackets, e.g. `#include <godot_cpp/classes/control.hpp>`, followed by an empty line for separation.
* Finally, any remaining includes should be included, again using the brackets, listed in alphabetical order.

```text title="Example Header"
// This file is part of the Godot Orchestrator project.
//
// Copyright (c) 2023-present Crater Crash Studios LLC and its contributors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//		http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
#ifndef ORCHESTRATOR_ABOUT_DIALOG_H
...
#endif ORCHESTRATOR_ABOUT_DIALOG_H
```

```text title="Example Implementation (cpp)"
// This file is part of the Godot Orchestrator project.
//
// Copyright (c) 2023-present Crater Crash Studios LLC and its contributors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//		http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
#include "about_dialog.h"

#include "authors.gen.h"
#include "donors.gen.h"
#include "license.gen.h"
#include "common/version.h"
#include "plugin/plugin.h"

#include <godot_cpp/classes/display_server.hpp>
#include <godot_cpp/classes/editor_interface.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/h_box_container.hpp>
#include <godot_cpp/classes/h_separator.hpp>
#include <godot_cpp/classes/label.hpp>
#include <godot_cpp/classes/os.hpp>
#include <godot_cpp/classes/scroll_container.hpp>
#include <godot_cpp/classes/style_box_empty.hpp>
#include <godot_cpp/classes/style_box_flat.hpp>
#include <godot_cpp/classes/tab_container.hpp>
#include <godot_cpp/classes/texture_rect.hpp>
#include <godot_cpp/classes/theme.hpp>
#include <godot_cpp/classes/v_box_container.hpp>
```
## Class names

All C++ class names should use **Pascal Case**.

Additionally, there are two naming conventions that should be followed, depending on the context of the class.
Editor functionality related classes should be prefixed with `Orchestrator`.
Runtime script functionality related classes should be prefixed with `OScript`.

* **Editor Example**: `OrchestratorMainView` or `OrchestratorPlugin`.
* **Script Example**: `OScriptNodeConstant` or `OScriptNodeInitContext`.

As a rule of thumb, we prefer one class per file, but there are some instances where it may make sense to include multiple classes within a single file.
Please do so sparsely, preferring one class per file ideally.

## Function and variable names

All functions and variables should be defined using `snake_case`.
If a function or variable is not public, it should be prefixed with an underscore (`_`).

Additionally, all function arguments should be prefixed with `p_` unless the value is being returned to the caller, in which case it should be prefixed with `r_`.

```cpp title="Example"
class MyClass : public Resource
{
  GDCLASS(MyClass, Resource)
  
protected:
  String _the_name;
  
  void _set_the_name(const String& p_name);
  
public:
  String get_the_name() const;
};
```

Additionally, function and variables of like scope should be grouped together.
Lastly, all functions that do not override a parent class method should be documented.
See the [Comment style guide](#comment-style-guide) for more details.

## Constants and enums

Constants should use `CONSTANT_CASE` (also called screaming snake case), that is all caps with an underscore (`_`) to separate words.

```cpp title="Example constant"
const MAX_SPEED = 10;
```

Define enums using `PascalCase`, with a prefix of `E`:

```cpp title="Example enum"
enum EDataType 
{
  EDT_ANY,
  EDT_NUMERIC
};
```

## Comment style guide {#comment-style-guide}

This comment style guide applies to all languages within the Orchestrator code base.

* Begin comments with a space character to distinguish them from disabled code.
* Use sentence case for comments, beginning with an uppercase character and ending with a period.
* Reference variables/functions using backticks
* Wrap comments to ~120 characters.
* Use `TODO:`, `FIXME:`, `NOTE:`, or `HACK:` as admonitions as needed.

```cpp title="Example"
// Compute the first 10,000 decimals of Pi.
// FIXME: Don't crash when computing due to `increment` being negative.
```

Don't repeat what the code says in comments, explain *why* rather than *how*.

```cpp title="Poor example"
// Draws loading screen.
draw_loading_screen();
```

Ideally all methods should be documented, using doxygen style comments.

```cpp title="C++ method documentation example
/// Returns the number of nodes in the universe.
/// @param p_root the root node, should not be <code>null</code>
/// @return the number of nodes
uint64_t Universe::get_nodes_from_root(Node* p_root) {
  // ...
}
```

For member variables, use single-line comments at the end of the variable declarations:

```cpp title="C++ member variable documentation"
public:
  boolean _is_visible;  //! Specifies whether this object is visible
```