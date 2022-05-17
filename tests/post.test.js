import 'cross-fetch/polyfill';

import ApolloBoost, { gql } from 'apollo-boost';
import {createPost, myPost} from "./utils/operation"
import seedDatabase, { postOne, postTwo, userOne } from './utils/SeedDatabase';

import getClient from './utils/getClient';
import prisma from '../src/prisma';

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase);

test('Should expose published posts', async () => {

  const response = await client.query({ query: getPosts });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('Shuold fetch users posts', async () => {
  const client = getClient(userOne.jwt);
 

  const { data } = await client.query({ query: myPost });
  expect(data.myPosts.length).toBe(2);
});

// test('Should be able to update own post', async () => {
//   const client = getClient(userOne.jwt);
//   const variables = {
//     id: postOne.post.id,
//     data: {
//       published: false
//     }
//   }
//   const { data } = await client.mutate({ mutation: updatePost,variables });
//   const exists = await prisma.exists.Post({ id: postOne.post.id });

//   expect(exists).toBe(true);
//   expect(data.updatePost.published).toBe(false);
// });

// test('Should be create new post', async () =>
// {
//   const client = getClient(userOne.jwt);
//   const variables = {
//     title: "con cu nè Chánh",
//     body: "...",
//     published: true
//   }
//   const { data } = await client.mutate({ mutation: createPost , variables})
  
//   expect(data.createPost.body).toBe("...")
//   expect(data.createPost.title).toBe("con cu nè Chánh")
//   expect(data.createPost.published).toBe(true)
// });

// test("Should be delete post", async () =>
// {
//   const client = getClient(userOne.jwt);
//   const variables = {
//     id: postTwo.post.id
//   }
  
//   await client.mutate({ mutation: deletePost, variables })
//   const exists = await prisma.exists.Post({ id: postOne.post.id });

//   expect(exists).toBe(false);
// })