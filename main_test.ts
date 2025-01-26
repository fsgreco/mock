import { assertEquals, assertExists, assertGreater, assertInstanceOf, assertLess } from "@std/assert";

import { getMocksFromGenerator } from "./utils/get-mocks-from-gen.ts";
import { getMocksWith } from "./utils/get-mocks-with.ts"
import { faker } from '@faker-js/faker'


Deno.test("Get Mocks from custom generator", () => {

	let generator = {
		name: faker.person.firstName,
		surname: faker.person.lastName,
		bio: faker.person.bio,
		email: faker.internet.email,
		age: () => faker.helpers.rangeToNumber({min:18,max:99}),
		birthday: faker.date.birthdate
	}

	let generateUser = getMocksFromGenerator( generator )
	let user = generateUser(1)

	assertInstanceOf(user, Array)

	assertInstanceOf(user[0].birthday, Date)

	assertExists(user[0].age)
	assertGreater(user[0].age, 17)
});

Deno.test("Get Mocks from specific list", () => {
	let generateUser = getMocksWith(['name','email','birthdate','id', 'age'])
	let user = generateUser(1)[0]
	// user has 5 props
	assertEquals(Object.keys(user).length, 5 )

	// age is a number
	assertGreater(user.age, 17)
	assertLess(user.age,100)
	
	// birthday is a Date
	assertInstanceOf(user.birthdate, Date)
})
