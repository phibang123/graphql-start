import 'cross-fetch/polyfill';

import ApolloBoost, { gql } from 'apollo-boost';
import {createUser, deletePost, getProfile, getUser, login} from "./utils/operation"
import seedDatabase, { userOne } from './utils/SeedDatabase';

import getClient from './utils/getClient';
import prisma from '../src/prisma';

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase);

//{ name: "temmm", email: "temmm@example.com", password: "1111111111Bang" }


test('Should create a new user', async () => {
  const variables = {
    data: { name: 'temmm', email: 'temmm@example.com', password: '1111111111Bang' },
  };

  const response = await client.mutate({
    mutation: createUser,
    variables,
  });

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
  expect(exists).toBe(true);
});

test('Should expose published author profiles', async () => {
  const reponse = await client.query({ query: getUser });
  expect(reponse.data.users.length).toBe(1);
  expect(reponse.data.users[0].email).toBe('');
  expect(reponse.data.users[0].name).toBe('Jen');
});

test('Should not login with bad crendentials', async () => {
  const variables = {
    data: { email: 'c@gmail.com', password: '11111' },
  };

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
  //xuất ra lỗi nếu đúng
  // expect(() =>
  // {
  //     throw new Error("con cu")
  // }).toThrow
});

test('Should not signup user with invalid password', async () => {
  const variables = {
    data: { name: 'Andrew', email: 'andrew@example.com', password: 'pass' },
  };

  await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);
   
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
