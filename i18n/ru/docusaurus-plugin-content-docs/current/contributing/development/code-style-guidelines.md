# Руководство по стилю кода

При внесении вклада в исходный код Orchestrator от вас ожидается соблюдение приведенных ниже рекомендаций по стилю.
Некоторые из них проверяются с помощью непрерывной интеграции, и рецензенты могут попросить вас исправить потенциальные проблемы, поэтому, в общем, хорошей идеей будет настроить вашу систему, как указано ниже, чтобы уменьшить количество проблем с вашими коммитами на раннем этапе.

## C++ и Objective-C

Письменных рекомендаций нет, но общий стиль кода согласован с основными разработчиками и применяется с помощью beautifier `clang-format`.
Это делает следующее для вас:

* Отступы и выравнивание основаны на табуляциях (соответственно один и два таба)
* Один пробел вокруг операторов соответствия и присваивания, а также после запятых
* Операторы указателей и ссылок присоединяются к имени типа, а не к идентификатору переменной
* См. ниже для включений заголовков

Правила для clang-format изложены в файле `.clang-format` в репозитории Orchestrator на Git.

Пока ваш стиль соответствует окружающему коду и вы не вводите конечные пробелы или пробелы-отступы, все должно быть в порядке.
Однако, если вы планируете регулярно вносить вклад, настоятельно рекомендуем настроить clang-format для проверки и исправления всех ваших коммитов.

:::warning
Руководство по стилю кода Orchestrator не должно применяться к коду сторонних или внешних подмодулей git.
Другими словами, оно должно применяться только к файлам, находящимся в каталоге `/src`.
:::

## Имена файлов

Используйте `snake_case` для имен файлов.
Избегайте использования заглавных букв, так как они обрабатываются по-разному в разных операционных системах.

## Включения заголовков

При добавлении новых файлов C++ или Objective-C или включении новых заголовков в существующие файлы, должны соблюдаться следующие правила:

* Первые строки в файле должны содержать заголовок авторских прав Orchestrator и лицензию Apache 2.0, скопированные из другого файла.
* В заголовке `.h` должны использоваться охранители включения в форме `ORCHESTRATOR_FILENAME_H` или `OSCRIPT_FILENAME_H`.
* В файле `.cpp` (например, `filename.cpp`) первым должно быть включение, где объявлен класс (например, `#include "filename.h"`), за которым следует пустая строка для разделения.
* Затем идут заголовки из базы кода Orchestrator, включенные в алфавитном порядке, с путями относительно корневого каталога. Включения должны быть окружены кавычками, например, `#include "core/object.h"`.
Блок включений Orchestrator должен быть отделен пустой строкой.
* Затем идут заголовки из библиотеки `godot-cpp` Godot, включенные в алфавитном порядке. Включения должны быть окружены скобками, например, `#include <godot_cpp/classes/control.hpp>`, за которыми следует пустая строка для разделения.
* Наконец, должны быть включены все оставшиеся заголовки, опять же используя скобки, перечисленные в алфавитном порядке.

```text title="Пример заголовка"
// Этот файл является частью проекта Godot Orchestrator.
//
// Copyright (c) 2023-настоящее время Crater Crash Studios LLC и его участники.
//
// Лицензировано по Apache License, версия 2.0 (далее "Лицензия");
// вы не можете использовать этот файл, кроме как в соответствии с Лицензией.
// Вы можете получить копию Лицензии по адресу
//
//		http://www.apache.org/licenses/LICENSE-2.0
//
// Если это не требуется по применимому законодательству или письменно согласовано, программное
// обеспечение, распространяемое по Лицензии, предоставляется "КАК ЕСТЬ",
// БЕЗ ГАРАНТИЙ ИЛИ УСЛОВИЙ ЛЮБОГО РОДА, явных или подразумеваемых.
// См. Лицензию для получения конкретных управляющих прав и ограничений.
//
#ifndef ORCHESTRATOR_ABOUT_DIALOG_H
...
#endif ORCHESTRATOR_ABOUT_DIALOG_H


// Этот файл является частью проекта Godot Orchestrator.
//
// Copyright (c) 2023-настоящее время Crater Crash Studios LLC и его участники.
//
// Лицензировано по Apache License, версия 2.0 (далее "Лицензия");
// вы не можете использовать этот файл, кроме как в соответствии с Лицензией.
// Вы можете получить копию Лицензии по адресу
//
//		http://www.apache.org/licenses/LICENSE-2.0
//
// Если это не требуется по применимому законодательству или письменно согласовано, программное
// обеспечение, распространяемое по Лицензии, предоставляется "КАК ЕСТЬ",
// БЕЗ ГАРАНТИЙ ИЛИ УСЛОВИЙ ЛЮБОГО РОДА, явных или подразумеваемых.
// См. Лицензию для получения конкретных управляющих прав и ограничений.
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

## Имена классов

Все имена классов C++ должны использовать **Pascal Case**.

Кроме того, существуют два соглашения об именах, которых следует придерживаться в зависимости от контекста класса.
Классы, связанные с функциональностью редактора, должны иметь префикс `Orchestrator`.
Классы, связанные с функциональностью скриптов во время выполнения, должны иметь префикс `OScript`.

* **Пример для редактора**: `OrchestratorMainView` или `OrchestratorPlugin`.
* **Пример для скрипта**: `OScriptNodeConstant` или `OScriptNodeInitContext`.

Как правило, мы предпочитаем один класс на файл, но есть случаи, когда имеет смысл включать несколько классов в один файл.
Пожалуйста, делайте это редко, предпочтительно один класс на файл.

## Имена функций и переменных

Все функции и переменные должны быть определены с использованием `snake_case`.
Если функция или переменная не является публичной, она должна иметь префикс подчеркивания (`_`).

Кроме того, все аргументы функций должны иметь префикс `p_`, если значение не возвращается вызывающему, в этом случае оно должно иметь префикс `r_`.

```cpp title="Пример"
class MyClass : public Resource
{
  GDCLASS(MyClass, Resource)
  
protected:
  String _the_name;
  
  void _set_the_name(const String& p_name);
  
public:
  String get_the_name() const;
};


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