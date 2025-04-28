---
sidebar_position: 5
toc_max_heading_level: 4
---

# Complying with licenses

## What are licenses?

Orchestrator is created and distributed under the <ExternalLink href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</ExternalLink> license.
The project does not have a sole owner, as every contributor that submits code to the project does so under the same license and keeps ownership of their contributions.

The license is the legal requirement for you (or your company) to use and distribute the software (and derivative works, including games made with it).
Your game or project can have a different license, but it still needs to comply with the original one.

:::tip
In your project's credits screen, remember to include third-party notices for assets you're using, such as textures, models, sounds, music, and fonts.
Free assets in particular often come with licenses that require attribution.
Double-check their licenses before using those in public projects.
:::

### Requirements {#requirements}

For derived works that include Orchestrator, but do not modify or change its source, include the following:

```text
  This game uses Orchestrator, which is available under the following license:

  Copyright (c) 2023-present Crater Crash Studios, LLC and it's contributors.
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
```

:::danger[Critical]
For works that not only include Orchestrator, but includes a modified version of the plug-in, be sure you comply with the full <ExternalLink href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</ExternalLink> requirements.
These requirements not only require the inclusion of the above text, but all source files of the original work must retain the original copyright and license preamble.
Additionally, any changes made to the source must be recorded in the headers of the source files.
While changes are not required to be submitted back to the original project, they're welcomed!
:::

:::tip
Your game does not need to be under the same license as Orchestrator.
You are free to release your Godot project under any license, and to create commercial games with this plug-in.
:::

### Inclusion

The license does not specify specifically how it must be included in your game.
There are a number of options that you can freely use depending on how you distribute or wish to share license information with your users.
These are the most common approaches, and you only need to implement one, not all.

#### Credits screen

Include the above [License text](#requirements) somewhere in the credits screen. 
It can be at the bottom after showing the rest of the credits.
Most studios use this approach with open source licenses.

#### Licenses screen

Some games have a special menu (often in the settings) to display licenses.
This menu is typically accessed with a button called `Third-party Licenses` or `Open Source Licenses`.
If your game uses such a style, include the above [License text](#requirements) there.

#### Accompanying file

If the game is distributed on desktop platforms, a file that contains the [License text](#requirements) can be added to the software that is installed on the user's PC.

#### Printed manual

If the game includes printed manuals, [License text](#requirements) can be included there.

### Third-party licenses

Orchestrator is free and open-source, and its built using other free and open-source technologies.
Each of those technologies have their own respective licenses, and thanks to them, Orchestrator is possible.

#### Godot GDExtension (godot-cpp)
```text
Copyright (c) 2017-present Godot Engine contributors.
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

