# ts-ast-export

Exports the AST of all TypeScript declaration files of a NPM package to JSON.

## Usage

### NPM as source

Run 

`npx ts-ast-export npm <PACKAGE_NAME> -v <PACKAGE_VERSION>`

from the command line. `<PACKAGE_VERSION>` is optional. As a result, a JSON file with the AST of all `*.d.ts` files of the package is written to the current folder. By adding the `-k` options, the downloaded package source will not be deleted after the JSON was generated.

### Typescript Libs as source

Run 

`npx ts-ast-export ts <ROOT> -v <TAG>`

from the command line. `<TAG>` is optional. As a result, a JSON file with the AST of all `*.d.ts` files of the lib is written to the current folder. By adding the `-k` options, the downloaded lib source will not be deleted after the JSON was generated.

### Output

If some syntax is not supported, a warning is printed out to the console. Report an issue at GitHub or create a pull request, if you require the unsupported syntax.


The JSON file looks like this:

```json
{
    "name": "<PACKAGE_NAME>",
    "version": "<PACKAGE_VERSION>",
    "sourceFiles": [{
        {
            "kind": "SourceFile",
            "baseName": "<NAME_OF_SOURCE_FILE>",
            "statements": [
                // statements of the source file
            ]
        }
    }]
}
```

## Status

Currently, it successfully creates a JSON file for the `babylonjs/core@7.14.0` package.