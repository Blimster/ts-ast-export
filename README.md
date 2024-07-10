# ts-ast-export

Exports the AST of all TypeScript declaration files of a NPM package to JSON.

## Usage

Run 

`npx ts-ast-export <PACKAGE_NAME> <PACKAGE_VERSION>`

from the command line. `<PACKAGE_VERSION>` is optional. As a result, a JSON file with the AST of all `*.d.ts` files of the package is written to the current folder.

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