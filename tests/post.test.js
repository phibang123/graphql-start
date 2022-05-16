import 'cross-fetch/polyfill'

import ApolloBoost, { gql } from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase from './utils/SeedDatabase'

const client = new ApolloBoost({
  uri: 'http://localhost:4000/graphql'
})

beforeEach(seedDatabase)  

test("Should expose published posts", async () =>
{
    const getPost = gql`
      query {
          posts {
             id
             title
             body
             published
          }
      }
    `

    const reponse = await client.query({
        query: getPost
    })
    expect(reponse.data.posts.length).toBe(1)
    expect(reponse.data.posts[0].published).toBe(true)
})
