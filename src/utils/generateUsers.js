import { faker } from "@faker-js/faker";

const ROLES = [
  "Developer",
  "Designer",
  "Manager",
  "Analyst",
  "Engineer",
  "Consultant",
];

export const generateUsers = (count = 10000) => {
  const users = new Array(count);

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const role = faker.helpers.arrayElement(ROLES);

    users[i] = {
      id: `user-${i + 1}`,
      numericId: i + 1,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      age: faker.number.int({ min: 20, max: 65 }),
      role,
      status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      salary: faker.number.int({ min: 40000, max: 150000 }),
      score: faker.number.int({ min: 0, max: 100 }),
    };
  }

  return users;
};
