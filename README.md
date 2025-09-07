# create-mordoc-app

Create Mordoc documentation sites with a single command.

## Usage

```bash
npx create-mordoc-app my-docs
```

This will create a new Mordoc documentation site in a directory called `my-docs`.


## Examples

### Create a new project

```bash
npx create-mordoc-app my-docs
```

### Create a new project without installing dependencies

```bash
npx create-mordoc-app my-docs --skip-install
```

### Create a new project with git initialization

```bash
npx create-mordoc-app my-docs --git
```

## What's included

The generated project will have:

- A `content` directory with sample markdown files
- A `config` directory with site configuration
- A minimal `package.json` with Mordoc as a dependency
- Scripts for development and building

## Getting started after creation

After creating your project:

```bash
cd my-docs
npm run dev
```

This will start a development server at http://localhost:3000.

To build your site for production:

```bash
npm run build
```

## Requirements

- Node.js 14 or later

## License

MIT