import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { CustomerEntity } from '../../api/entity/CustomerEntity'

define(CustomerEntity, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)
  const customer = new CustomerEntity()
  customer.firstName = firstName;
  customer.lastName = lastName;
  return customer;
})
