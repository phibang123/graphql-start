import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('Red098!@#$'),
  },
  user: undefined,
  jwt: undefined,
};

const postOne = {
  input: {
    title: 'My second worx',
    body: 'asasasasa',
    published: true,
  },
  post: undefined,
};

const postTwo = {
  input: {
    title: 'My draft post',
    body: '',
    published: false,
  },
  post: undefined,
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
};

const updatePost = gql`
mutation($id: ID!, $data: UpdatePostInput!){ 
   updatePost(
     id: $id
     data: $data
   ){
     id
     title
     body
     published
   }
}
`;

export { seedDatabase as default, userOne, postOne ,postTwo};
