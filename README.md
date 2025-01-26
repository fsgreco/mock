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
import { getMocksWith } from '@functions/mock'

// Autosuggestion will let you pick the properties you want in your mock objects
const createRandomUsers = getMocksWith(['name', 'age', 'email'])

// Generate 3 users with only those properties
const users = createRandomUsers(3)
```

### Generate Mock Data from a Generator

The `getMocksFromGenerator` function lets you define your own data generation logic. You provide an object where each property is a function that generates values. You can mix and match:

- Faker.js functions
- Your own custom functions
- Random value generators
- Fixed value functions
- Any JavaScript/TypeScript function that returns a value

```typescript
import { getMocksFromGenerator } from '@functions/mock'
import { faker } from '@faker-js/faker'

const yourGenerator = {
	// Use faker functions directly
	id: faker.string.uuid,
	// Your own random logic
	age: () => Math.floor(Math.random() * (100 - 18 + 1)) + 18,
	// Mix calculated and faker values
	username: () => `user_${faker.number.int(1000)}`,
	// Fixed values
	role: () => 'user',
	// Complex custom logic
	status: () => {
		const statuses = ['active', 'inactive', 'pending']
		return statuses[Math.floor(Math.random() * statuses.length)]
	},
}

const createRandomObjects = getMocksFromGenerator(yourGenerator)
// TypeScript should infers return types from your generator functions
const objects = createRandomObjects(5)
// objects is typed as Array<{ id: string; name: string; age: number }>
```

## Contributing

This is a Test-Driven Development (TDD) project. Please read the [Contributing Guidelines](CONTRIBUTING.md) for details on development process and how to submit pull requests.

## License

This project is licensed under the MIT License.
