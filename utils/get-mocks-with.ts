import { faker } from '@faker-js/faker'
import { getMocksFromGenerator } from './get-mocks-from-gen.ts'

const uniGenerator = {
	id: faker.string.uuid,
	owner_id: faker.string.uuid,
	name: faker.person.firstName,
	age: (): number => faker.number.int({ min: 18, max: 99 }),
	username: faker.internet.username,
	email: faker.internet.email,
	avatar: faker.image.avatar,
	password: faker.internet.password,
	birthdate: faker.date.birthdate,
	registeredAt: faker.date.past,
	last_modified: faker.date.recent,
	timestamp: faker.date.past,
}

type Generator = typeof uniGenerator
type GenKeys = keyof Generator
type GetGenCallableFn = <T extends GenKeys>(props: Array<T>) => { [K in T]: Generator[K] }

const getGenerator: GetGenCallableFn = (props) => {
	return props.reduce((acc, curr) => ({ ...acc, [curr]: uniGenerator[curr] }), Object.create(null))
}

type GetMocksCallableFn = <T extends GenKeys>(p: T[]) => (n: number) => Array<{ [K in T]: ReturnType<Generator[K]> }>
/**
 * Generate the random function to create your mock object/s based on a list of properties
 * It preserves type safety and autocompletion.
 *
 * @example Basic Usage:
 * ```ts
 * const props = ['name', 'age', 'email']
 * const createRandomUsers = generateMocksFrom(props)
 * console.log( createRandomUsers(3) ) 
 * // [ {name:string, age:number, email: string}, etc...]
 * ```
 */
export const getMocksWith: GetMocksCallableFn = (properties) => getMocksFromGenerator(getGenerator(properties))

/* OLD Implementation with Map
// @ts-ignore
const generator = new Map([
  ['id', faker.string.uuid], // or faker.number.int
  ['owner_id', faker.string.uuid],
  ['name', faker.person.firstName],
  ['userName', faker.internet.userName],
  ['email', faker.internet.email],
  ['avatar', faker.image.avatar],
  ['password', faker.internet.password],
  ['birthdate', faker.date.birthdate],
  ['registeredAt', faker.date.past],
  ['last_modified', faker.date.recent],
  ['timestamp', faker.date.past]
] as const)

type GenKeys = typeof generator extends Map<infer K, any> ? K : never
type GenValues = typeof generator extends Map<GenKeys, infer V> ? V : never
const objFromGen = Object.fromEntries(generator)

const createGenerator = <T extends GenKeys>(properties: Array<T> ): {[K in T]:typeof objFromGen[K] }=> {
	return properties.reduce((acc, curr) => ({...acc, [curr]: generator.get(curr)}), {} as {[K in T]:typeof objFromGen[K] })
}

export const getMocksWith = (props: Array<GenKeys>) => getMocksFromGenerator( createGenerator(props) ) */
