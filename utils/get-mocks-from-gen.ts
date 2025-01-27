type TMock = <T extends Record<string, () => any>>(g: T) => (n?: number) => { [K in keyof T]: ReturnType<T[K]> }[]
/**
 * Generate an array of random objects from your generator:
 * Fake objects will have every key as a prop, its value will be the result of its callback
 *
 * @example Basic Usage:
 * ```ts
 * import { faker } from '@faker-js/faker'
 * const yourGenerator = { name: faker.string.firstName, age: () => Math.floor(Math.random() * 100 ) }
 * const yourObjects = getMocksFromGenerator(yourGenerator, 5)
 * // [ { name: 'John', age: 23 }, etc... ]
 * ```
 */
export const getMocksFromGenerator: TMock = gen => (num = 1) => {
	if (num < 0 || !Number.isInteger(num)) {
		throw new Error('Number of mocks must be a non-negative integer')
	}

	const genRandomObj = () =>
		Object.entries(gen).reduce((obj, [prop, callback]) => {
			try {
				obj[prop] = callback()
			} catch (error: any) {
				let message = `Failed to generate value for property "${prop}": ${error.message}`
				console.error(message)
				throw new Error(message)
			}
			return obj
		}, Object.create(null))

	return new Array(num).fill(null).map(() => genRandomObj())
}
