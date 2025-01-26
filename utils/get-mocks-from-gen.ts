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
 * ```
 */
export const getMocksFromGenerator: TMock = (gen) => (num = 1) => {
	const genRandomObj = () =>
		Object.entries(gen).reduce((obj, [prop, callback]) => {
			obj[prop] = callback()
			return obj
		}, Object.create(null))

	return Array.from({ length: num }, genRandomObj)
}
