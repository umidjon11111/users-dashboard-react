import { faker } from "@faker-js/faker";

export const generateUsers = (count = 10000) => {
  const users = new Array(count);

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users[i] = {
      id: `user-${i + 1}`,
      numericId: i + 1, // sort uchun
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      age: faker.number.int({ min: 20, max: 65 }),
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      salary: faker.number.int({ min: 40000, max: 150000 }),
      score: faker.number.int({ min: 0, max: 100 }),
    };
  }

  return users;
};
