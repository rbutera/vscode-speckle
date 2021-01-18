# Speckle

![icon](https://github.com/rbutera/vscode-speckle/raw/master/assets/icon/icon-with-background@0.5x.png)

> Work with test files quickly and easily!

Do you work with unit tests and/or spec files? This extension is for you!

This Visual Studio Code extension is designed to make working with TDD and testing in general much more convenient, by allowing you to:

- Switch between implementation and test/spec file quickly
- Open a test/spec file or implementation in a new window.

![Demonstration Gif](./assets/speckle-preview.gif)

### Supported Files and Patterns

- ✅️ All file extensions (eg. `.js`, `.ts`, `.py`) are supported.
- ✅️ File extensions can have prefixes (e.g. `foo.service.ts`)
- ✅️ Test files prefixes are supported (e.g. `foo.spec.ts` or `foo.service.spec.ts`) or can be omitted if the test is in a specific tests directory.
- ✅️ Test files can be contained in a `__tests__` directory, or stored directly next to implementation.

## Usage

Speckle provides two commands that you can access in any of three ways:

- Using the command palette (cmd+P or ctrl+P) and typing in some part of the "action" below
- Using the provided keyboard shortcut
- Using a customized keyboard shortcut, using the command name below.

| Action / Command Palette Description  | Default Keyboard Shortcut                                       | Command Name     |
| ------------------------------------- | --------------------------------------------------------------- | ---------------- |
| Switch between test/implementation    | Mac: `cmd+shift+alt+t` <br /> Windows/Linux: `ctrl+shift+alt+t` | `speckle.switch` |
| Split editor with Test/Implementation | Mac: `cmd+alt+t` <br /> Windows/Linux: `ctrl+alt+t`             | `speckle.open`   |

We recommend you customize the keyboard shortcut as the one provided was chosen to avoid collisions with other extensions and functionality.

### Customizing Keyboard Shortcuts

In keybindings.json:

```json
[
  {
    "command": "speckle.open",
    "key": "ctrl+shift+t"
  },
  {
    "command": "speckle.switch",
    "key": "ctrl+alt+shift+t"
  }
]
```

## Credits

Written and maintained by [rbutera](https://github.com/rbutera).

Something wrong? Please submit an [Issue](https://github.com/rbutera/vscode-speckle/issues/new)!

This project was forked from [Go-To-Test](https://github.com/futantan/go-to-test) and a number of fixes and features were added.

## License

Shield: [![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
