<img src="./assets/icon/icon-transparent@0.5x.png"/>

# Speckle

> Work with test files quickly and easily!

This Visual Studio Code extension is designed to make working with TDD and testing in general much more convenient, by allowing you to:

- Switch between implementation and test/spec file quickly
- Open a test/spec file or implementation in a new window.

![Demonstration Gif](./assets/speckle-preview.gif)

## Usage

- To switch between test/implementation, you can use the command `speckle: Go to Test/Implementation` or using shortcut `cmd + shift + alt + t` (`ctrl+shift+alt+t` on windows/linux)
- To open test/implementation in a new editor alongside your existing, you can use the command `speckle: Split editor with Test/Implementation` or using shortcut `cmd + shift + t` (`ctrl+shift+alt+t` on windows/linux)

## Supported Files and Patterns

All file extensions (eg. `.js`, `.ts`, `.py`) are supported

File extensions can have prefixes (e.g. `foo.service.ts`)

Test files can have prefixes (e.g. `foo.spec.ts` or `foo.service.spec.ts`)

Test files can be contained in a `__tests__` directory, or stored directly next to implementation.

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
