import bcrypt from "bcryptjs"
import prisma from "../../src/prisma"

const seedDatabase = async () =>
{
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const userCreateBefore = await prisma.mutation.createUser({
        data: {
            name: "Chánh",
            email: "c@gmail.com",
            password: bcrypt.hashSync("11111111", 10),
            age: 12
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: "Lên công ty",
            body: "làm việc trên công ty",
            published: true,
            author: {
                connect: {
                    id: userCreateBefore.id
                }
            }
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: "đi ăn bò nướng tảng",
            body: "Lợi mời đi ăn bò nướng tảng",
            published: false,
            author: {
                connect: {
                    id: userCreateBefore.id
                }
            }
        }
    })
 }

 export default seedDatabase