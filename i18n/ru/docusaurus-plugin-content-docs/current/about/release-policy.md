---
sidebar_position: 5
---

# Release policy

Orchestrator's release policy is constantly evolving.
The description below provides a general idea of what to expect, but what may actually happen depends on multiple factors, including the needs of the community at any given moment.

## Versioning

Orchestrator loosely follows <a href="https://semver.org/" class="external-link">Semantic Versioning</a> with a `major.minor.patch` version system.

* The `major` version is incremented when major compatibility breakages happen which imply significant porting work to move projects from one major version to another.
  
  For example, porting Orchestrator-based projects from Orchestrator v2.x to Orchestrator v3.x requires running the project through a conversion tool, and then performing potentially a number of further adjustments manually for what the tool could not do automatically.

* The `minor` version is incremented for feature releases that do not break compatibility in a major way.
Minor compatibility breakage in very specific circumstances *may* happen in minor versions, but the vast majority of projects should not be affected or require significant porting work.

  This is because Orchestrator provides features that cover a vast array of Godot game engine features, like rendering, physics, and scripting.
Fixing bugs or implementing new features in one area could require changes to a feature's behavior or modifying some code aspect, even if the change remains mostly backward compatible.

  :::tip
  Upgrading to a new minor version is recommended for all users, but some testing should be done to ensure that your projects behave as expected.
  :::

* The `patch`, or often referred to as maintenance or bugfix, version is incremented for maintenance releases which focus on fixing bugs, security issues, implementing new requirements, and backporting safe usable enhancements.
Patch releases are backwards compatible.
 
  Patch versions may include minor new features which do not impact the existing API, and thus have no risk of impacting existing projects.

  :::tip
  Updating to new patch versions is therefore considered safe and strongly recommended to all users.
  :::

We call `major.minor` combinations _stable branches_.
Each stable branch starts with a `major.minor` release without the `0` for `patch`) and is further developed for maintenance releases in a Git branch of the same name (for example patch updates for the 2.0 stable branch are developed in the `2.0` Git branch).

## Release support timeline

Stable branches are supported *at least* until the next stable branch is released and has received its first patch update.
In practice, we support stable branches on a *best effort* basis for as long as they have active users who need maintenance updates.

Whenever a new major version is released, we make the previous stable branch a long-term supported release, and do our best to provide fixes for issues encountered by users of that branch who cannot port complex projects to the new major version.

In a given minor release series, only the latest patch releases receives support.
If you experience an issue using an older patch release, please upgrade to the latest patch release of that series and test again before reporting issues on GitHub.

| Version                 | Release Date             | Support Level                                                                                                                |
|:------------------------|:-------------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| Orchestrator 2.1 (main) | June 2024<br/>(estimate) | *Development.* Receives new features, usability and performance improvements, as well as bug fixes, while under development. |
| Orchestrator 2.0        | March 2024               | Receives fixes for bugs and security issues, as well as patches that enable platform support and other minor features.       |
| Orchestrator 1.1        | December 2023            | No longer supported.                                                                                                         |
| Orchestrator 1.0        | August 2023              | No longer supported (last update: 1.0.5).                                                                                    |

Pre-release Orchestrator plug-in versions aren't intended to be used in production and are provided for testing purposes only.

## Which version should I use for a new project?

We recommend using Orchestrator 2.0 for all new projects, as the Orchestrator 1.x series has been discontinued.

## When is the next release out?

The Orchestrator contributors do not work under any strict deadlines, but we strive to publish minor releases relatively frequently.
We generally try and focus on a three-month cadence for a minor release, starting at the first month of the calendar quarter and releasing a stable version of that minor release toward the end of the quarter.

For example, Orchestrator 2.0 entered pre-release review for testing at the start of January 2024, was released stable in March 2024.
In addition, Orchestrator 2.1 entered development in early April and is planned for a stable release toward the end of June 2024.

## What are the criteria for compatibility across versions?

:::info
This section is intended to be used by contributors to determine which changes are safe for a given release.
This list is in no way exhaustive; it only outlines the most common situations seen during development.
:::

The following are acceptable changes in patch releases:

* Fixing a bug in a way that has no major negative impact on most projects, such as a visual or physics bug.
If fixing a bug has a negative impact that could jeopardize a lot of projects, it should be made optional (using a project setting).
* Adding a new optional parameter to a method.
* Small-scale editor usability tweaks.

:::info
Note that maintainers may be more conservative with fixes in subsequent patch releases.
For instance, 2.0.1 may receive more impactful fixes than 2.0.2.
:::

The following changes are acceptable in minor releases, but not patch releases:

* Significant new features.
* Renaming of method parameters due to integration limitations with C# and GDScript.
* Deprecating methods, variables, or classes.
This is done by adding a deprecated flag to the class reference, which should show in the editor.
When a method is marked deprecated, it's slated to be removed in the next *major* release.
* Changes that affect the default visuals.
* Bug fixes that significantly change the behavior or output, with the aim to meet user expectations better.
In comparison, in patch releases, we favor keeping buggy behavior to avoid breaking existing projects who may rely on that wrong behavior or use workarounds.
* Performance optimizations that result in visual changes.

The following changes are considered **compatibility-breaking** and can only occur in new major releases:

* Renaming or removing methods, variables, or classes.
* Modifying a node's inheritance or behavior to where the node acts entirely different.
* Changing the default value of a setting in a way that affects existing projects.

As Orchestrator 3.0 hasn't been branched off yet, we strongly discourage any compatibility breaking changes.
