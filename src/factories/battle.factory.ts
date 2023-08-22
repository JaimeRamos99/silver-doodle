import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Battle } from '../models';

export default Factory.define(Battle.tableName).attrs({
  monsterA: faker.datatype.number({ min: 1, max: 1 }),
  monsterB: faker.datatype.number({ min: 2, max: 2 }),
  winner: faker.datatype.number({ min: 1, max: 2 }),
});