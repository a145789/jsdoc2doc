# jsdoc2doc

[![GitHub license](https://img.shields.io/github/license/a145789/jsdoc2doc?style=flat-square)](https://github.com/a145789/jsdoc2doc/blob/main/LICENSE)

A tool to generate documentation from JSDoc comments in your TypeScript code.

## Usage

```bash
# Generate documentation to the default output directory (docs)
npx jdoc

# Generate documentation for a specific entry file and output directory
npx jdoc --entry src/index.ts --output my-docs
```

The generated documentation will be in Markdown format, ready to be used with a static site generator like VitePress.

## Example

See the `example/` directory for a working example.

## License

[MIT](LICENSE)
