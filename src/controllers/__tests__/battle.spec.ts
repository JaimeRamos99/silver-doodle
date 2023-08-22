import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from '../../factories';
import { Battle } from '../../models';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Get', () => {
    test('should get a battle correctly', async () => {
      const battle = factories.battle.build();
      const { id } = await Battle.query().insert(battle);

      const response = await request(server).get(`/battle/${id}`);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test("should return 404 if monster doesn't exists", async () => {
      const response = await request(server).get(`/battle/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      // @TODO
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      // @TODO
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      // @TODO
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      // @TODO
    });
  });

  describe('Delete Battle', () => {
    test('should delete a battle successfully', async () => {
      const battle = factories.battle.build();
      const { id } = await Battle.query().insert(battle);

      const getResponse = await request(server).get(`/battle/${id}`);
      expect(getResponse.body.id).toBe(id);

      const deleteResponse = await request(server).delete(`/battle/${id}`);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });

    test("should return 404 if the battle doesn't exists", async () => {
      const response = await request(server).delete(`/battle/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
