# Quick Mock Data Generator 

Need test data quickly? This lightweight utility helps you generate realistic mock data in seconds. Choose from common properties like names, emails, and dates, **or define your own generators**. Perfect for prototypes, tests, and demos where you need meaningful data fast.

Built on top of `@faker-js/faker`, it provides a simpler interface while maintaining type safety and full TypeScript support.

Key features:
- 🚀 Quick property selection from common data types
- 🎯 Generate exactly what you need, nothing more
- 📦 Zero configuration required
- 🔍 Full TypeScript support with autocompletion

## Installation

### Using Deno

```sh
deno add @functions/mock
```

### Using npm / pnpm / or others

```sh
npx jsr add @functions/mock
pnpm dlx jsr add @functions/mock
yarn dlx jsr add @functions/mock
bunx jsr add @functions/mock
```

## Usage

### Generate Mock Data with Specific Properties

The `getMocksWith` function allows you to pick from a predefined set of common properties (like name, email, age, avatar, etc.) and quickly generate objects containing just those properties. Perfect for creating test data with exactly what you need in a fast way:

This basically returns a function that will create mock data based on a list of predefined properties.


```typescript
import { getMocksWith } from "@functions/mock";

// Autosuggestion will let you pick the properties you want in your mock objects
const createRandomUsers = getMocksWith(['name', 'age', 'email']);

// Generate 3 users with only those properties
const users = createRandomUsers(3);
```

### Generate Mock Data from a Generator

The `getMocksFromGenerator` function preserves the types of your generator functions:

```typescript
import { getMocksFromGenerator } from "@functions/mock";
import { faker } from "@faker-js/faker";

const yourGenerator = {
  id: faker.string.uuid,
  name: faker.person.firstName,
  age: () => faker.number.int({ min: 18, max: 99 }),
};

const createRandomObjects = getMocksFromGenerator(yourGenerator);
// TypeScript infers exact return types from your generator functions
const objects = createRandomObjects(5);
// objects is typed as Array<{ id: string; name: string; age: number }>
```



### `getMocksFromGenerator`

Type-safe generator that creates mock data from a predefined generator.

**Parameters:**
- `gen`: An object where keys are property names and values are functions that generate the property values. Types are automatically inferred from your generator functions.

**Returns:**
- A strongly-typed function that generates an array of mock objects with exact property types.

## License

This project is licensed under the MIT License.
