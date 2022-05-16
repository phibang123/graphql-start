import 'cross-fetch/polyfill'

import ApolloBoost, { gql } from 'apollo-boost'

import getClient from './utils/getClient'
import prisma from '../src/prisma'
import seedDatabase from './utils/SeedDatabase'

jest.setTimeout(30000)


const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
    const getPosts = gql`
        query {
            posts {
                id
                title
                body
                published
            }
        }
    `
    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})
