
type MockType = <T extends Record<string,() => any> >(gen: T) => ( num?: number) => Array<{ [K in keyof T]: ReturnType<T[K]> }>
/**
 * Generate an array of random objects from your generator: 
 * Fake objects will have every key as a prop, its value will be the result of its callback
 * 
 * USAGE:  
 * import { faker } from '@faker-js/faker'  
 * const yourGenerator = { id: faker.number.int, name: faker.string.firstName, age: Math.random // TODO }  
 * const yourObjects = getMocksFromGenerator(yourGenerator, 5)  
*/
export const getMocksFromGenerator: MockType = gen => ( num = 1 ) => {

	const genRandomObj = () => Object.entries(gen).reduce((obj, [prop, callback]) => {
		obj[prop] = callback()
		return obj 
	}, Object.create(null))

	return Array.from({ length: num }, genRandomObj)
}
