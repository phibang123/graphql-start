import { Prisma } from 'prisma-binding'
import fs from "fs"
const typeDefs = fs.readFileSync('./src/generated/prisma.graphql', 'utf8');

const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: 'http://localhost:4466',
    secret:"bang"
})

export default prisma


// prisma.query.users(null, '{ id name email comments {id  } }').then((result) =>
// {
//     console.log(JSON.stringify(result, undefined , 2))
// })

// prisma.query.comments(null, '{id text author {id name email } }').then((result) =>
// {
//     console.log(JSON.stringify(result, undefined, 2))
// })


// prisma.mutation.createPost({
//     data: {
//         title: "promise thì phải coi chừng ",
//         body: "promise nó sẻ có data từ thằng sao nó nếu return nó sẻ ra ở then tiếp theo",
//         published: true,
//         author: {
//             connect: {
//                 id: "cl2ovez1y00j40d84hzuq6s2p"
//             }
//         }
//     }
// }, '{id title body published}').then((result) =>
// {
//     console.log(JSON.stringify(result, undefined, 2))
//     return prisma.query.users(null, '{ id name email posts {id title } }')
// }).then((result) =>
// {
//     console.log(JSON.stringify(result, undefined , 2))
// })


// prisma.mutation.updatePost({
//     where: {
//         id: "cl2p5ffdm00pj0d84n7q5hzfn"
//     },
//     data: {
//         body: "promise nó sẻ có data từ thằng sao nó nếu return nó sẻ ra ở then tiếp theo, học nhanh nghỉ",  
//     }
// }, '{id title body}').then((data) =>
// {
//     return prisma.query.posts(null, '{id title body published}')
// }).then((data) =>
// {
//     console.log(data)
// })



// const createPostForUser = async (authorId,data) =>
// {
//     const userExists = await prisma.exists.User({ id: authorId })
    
//     if (!userExists)
//     {
//         throw new Error("User not Found")
//     }
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, "{author { id name email age posts { id title body published}}}")
//     // const user = await prisma.query.users({
//     //     where: {
//     //         id: authorId
//     //     }
//     // }, "{id name posts { id title body published }}")
//     return post.author
// }


// createPostForUser("cl2ot8r23008p", {
//     title: "Hông Đức nợ tao 500k",
//     body: "Nó mượn tiền thằng Bằng xong éo trả",
//     published: true
// }).then((data) =>
// {
//     console.log(JSON.stringify(data, undefined,2))
// }).catch((error) =>
// {
//     console.log(error.message)
// })


// const updatePostForUser = async (postId, data) =>
// {
//     const postExists = prisma.exists.Post({ id: postId })
    
//     if (!postExists)
//     {
//         throw new Error("post not found")
//     }
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{author {id name email age posts {id title body published}}}')
//     // const user = await prisma.query.user({
//     //     where: {
//     //         id: post.author.id
//     //     }
//     // }, '{id name email posts {id title published}}')
//     return post.author
// }

// updatePostForUser("cl2p65dgp00pv0d8498fgsqcq", { published: false }).then((user) =>
// {
//     console.log(JSON.stringify(user,undefined,2))
// })