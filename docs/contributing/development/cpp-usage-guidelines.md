
# C++ usage guidelines

## Rationale

Since Orchestrator 2.0, Orchestrator was written in C++ and the standard used throughout the code base is **C++20**.
While modern C++ brings a lot of opportunities to write faster, more readable code, we chose to restrict the usage for a number of reasons:

* It makes it easier to review code in online editors.
This is because contributors don't always have access to a full-featured IDE while reviewing code.
* It makes the code easier to grasp for beginner contributors who may not be as proficient in C++.

For your pull request to be merged, it must follow the C++ usage guidelines outlined here.
If you are extending Orchestrator in your own fork, you can use features not allowed in your own code, but any contributions upstream should follow these rules.

## Disallowed features

**Any feature that isn't listed is allowed**.

Using features like `constexpr` variables and `nullptr` is encouraged when possible.
Still, try to keep your use of modern C++ features conservative.
Their use needs to serve a real purpose, such as improving the code's readability or performance.

### Standard Template Library

We do not allow the use of the <ExternalLink href="https://en.wikipedia.org/wiki/Standard_Template_Library">STL</ExternalLink> as Orchestrator utilizes all of Godot's own data types.

This means that pull requests should **not** use `std::string`, `std::vector`, and the like.
Instead, use the Godot data types described below:

* Use `String` rather than `std::string`.
* Use `Vector` rather than `std::vector`. In some cases `LocalVector` can be an alternative.
* Use `Array` rather than `std::array`.

:::important
There are some Godot CPP data structures that do use `std::vector`, such as `MethodInfo`.
For these specific corner cases, the use of `std::vector` is allowed, but it should be minimal.
:::

### `auto` keyword

Please do not use the `auto` keyword for type inference.
While it can avoid repetition, it can also lead to confusing code:

```cpp title="Example"
// Not so confusing...
auto button = memnew(Button);

// ...but what about this?
auto result = EditorNode::get_singleton()->get_complex_result();
```

Keep in mind that intellisense and hover documentation isn't readily available for pull request reviewers.
Most of the time, reviewers will use GitHub's online viewer to review pull requests.

We chose to forbid `auto` instead of allowing it on a case-by-case basis to avoid having to decide on difficult edge cases.

### Lambdas

Lambdas should be used conservatively when they make code effectively faster or simpler, and do not impede readability.
Please ask before using lambdas in a pull request.

### `#pragma once` directives

Please follow the existing style and use standard `#ifdef`-based include directives.
Pull requests that use the `#pragma once` directive will not be merged until changed.