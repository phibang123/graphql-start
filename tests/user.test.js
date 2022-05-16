import 'cross-fetch/polyfill';

import ApolloBoost, { gql } from 'apollo-boost';

import getClient from './utils/getClient';
import prisma from '../src/prisma';
import seedDatabase from './utils/SeedDatabase';

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
    const createUser = gql`
    mutation {
      createUser(data: { name: "temmm", email: "temmm@example.com", password: "1111111111Bang" }) {
        user{
            id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser,
  });

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
  expect(exists).toBe(true);
});

test('Should expose published author profiles', async () => {
  const getUser = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;
  const reponse = await client.query({ query: getUser });
  expect(reponse.data.users.length).toBe(1);
  expect(reponse.data.users[0].email).toBe('');
  expect(reponse.data.users[0].name).toBe('Jen');
});

test('Should not login with bad crendentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "c@gmail.com", password: "11111" }) {
        token
      }
    }
  `;
  await expect(client.mutate({ mutation: login })).rejects.toThrow();
  //xuất ra lỗi nếu đúng
  // expect(() =>
  // {
  //     throw new Error("con cu")
  // }).toThrow
});

test('Should not signup user with invalid password', async () => {
  const createUser = gql`
    mutation {
      createUser(data: { name: "Andrew", email: "andrew@example.com", password: "pass" }) {
        token
      }
    }
  `;

  await expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});
