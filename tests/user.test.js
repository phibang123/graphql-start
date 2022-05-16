import 'cross-fetch/polyfill'

import ApolloBoost, { gql } from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase from './utils/SeedDatabase'

jest.setTimeout(30000)


const client = new ApolloBoost({
    uri: 'http://localhost:4000/graphql'
})

beforeEach(seedDatabase)

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Lý Khôi",
                    email: "aa@example.com",
                    password: "11111111"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test("Should expose published author profiles", async () =>
{
    const getUser = gql`
      query{
          users{
              id 
              name
              email
          }
      }
    `
    const reponse = await client.query({ query: getUser })
    expect(reponse.data.users.length).toBe(1)
    expect(reponse.data.users[0].email).toBe("")
    expect(reponse.data.users[0].name).toBe("Chánh")
})

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


test("Should not login with bad crendentials", async () =>
{
 
    const login = gql`
      mutation {
          login(data: {
             email: "c@gmail.com"
             password: "11111"
          }){
            token
          }
      }
    `
    await expect(client.mutate({ mutation: login })).rejects.toThrow()
    //xuất ra lỗi nếu đúng
    // expect(() =>
    // {
    //     throw new Error("con cu")
    // }).toThrow
})

test("Shuold not signup user with valid password", async () =>
{

    const createUser = gql`
      mutation {
          createUser(data: {
              name: "bang",
              email: "22g@gmail.com"
              age: 22,
              password: "bang"
          }){
              token 
          }
      }
    `
    await expect(client.mutate({
        mutation: createUser
    })).rejects.toThrow();
})