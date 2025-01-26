# Contributing to Mock Data Generator

I'd love your input or feedback! I want to make contributing to this project as easy and transparent as possible.

## Development Process

I've tried to set a minumum Test-Driven Development (TDD) flow. Before making any changes:

1. Clone the repository
2. Install dependencies:
   ```sh
   deno install
   ```
3. Run the test suite to ensure everything works:
   ```sh
   deno test --watch
   ```

### TDD Workflow

1. Write a failing test first
2. Run tests to verify it fails (`deno test --watch`)
3. Implement the minimum code to make it pass
5. Refactor if needed

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Ensure tests pass and add new ones for your changes
3. Update documentation if needed
4. Create a Pull Request with a clear description

## Code Style

- Use TypeScript
- Follow existing code formatting (but don't worry too much, in the future I will set a CI to run `deno fmt` automatically).
- Keep functions small and focused
- Add JSDoc comments for public APIs

## Running Tests

Tests are essential in this project. Always run:

```sh
deno test --watch        # Run tests in watch mode during development
```

## Questions?

Feel free to open an issue for any questions or concerns.
