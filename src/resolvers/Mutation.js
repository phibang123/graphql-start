// import { GraphQLYogaError } from 'graphql-yoga';
import bcrypt from 'bcryptjs';
import generatedToken from '../utils/genarateToken';
import getUserId from '../utils/getUser';
import hashPassword from '../utils/hashPassword';
import jwt from 'jsonwebtoken';

const Mutation = {
  async createUser(parent, args, { db, prisma }, info) {
   
    args.data.password =  hashPassword(args.data.password);
    //do có token nên info nó không hiểu, nếu không để info nó sẽ lấy hết

    const user = await prisma.mutation.createUser({
      data: args.data,
    });
    return {
      user,
      token: generatedToken(user.id),
    };
  },

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });
    if (!user) {
      throw new Error('Unable login');
    }

    const isMatch = bcrypt.compareSync(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Unable login');
    }

    return {
      user,
      token: generatedToken(user.id),
    };
  },

  createPost(parent, args, { db, pubsub, prisma, request }, info) {
    //get the header value , parse out the token, verify  ...

    const userId = getUserId(request);

    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async createComment(parent, args, { db, pubsub, prisma, request }, info) {
    const userId = getUserId(request);
    const postsExist = await prisma.exists.Post({
      id: args.data.post,
      OR: [
        {
          published: true,
        },
        {
          author: {
            id: userId,
          },
        },
      ],
    });
    console.log(postsExist);
    if (!postsExist) {
      throw new Error('Post not found');
    }

    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },
  async deleteUser(parent, args, { db, prisma, request }, info) {
    const userId = getUserId(request);
    const commentExsist = prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!commentExsist) {
      throw new Error('Comment not exists');
    }
    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async deletePost(parents, args, { db, pubsub, prisma, request }, info) {
    const userId = getUserId(request);
    const postsExist = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });
    if (!postsExist) {
      throw new Error('Posts not exists');
    }
    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
          author: {
            id: userId,
          },
        },
      },
      info
    );
  },
  async deleteComment(parents, args, { db, pubsub, prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    });
    if (!commentExists) {
      throw new Error('Comment not exsits');
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { db, prisma, request }, info) {
    const userId = getUserId(request);
    if (typeof args.data.password === 'string')
    {
      args.data.password = hashPassword(args.data.password)
    }
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async updatePost(parent, args, { db, pubsub, prisma, request }, info) {
    const userId = getUserId(request);
    const postExsist = await prisma.exists.Post({
        id: args.id,
        author: {
          id: userId,
        },
    });

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true,
    });
    console.log(isPublished)
    
    if (!postExsist) {
      throw new Error('Post not exists');
    }
    if (isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id,
          },
        },
      });
    }
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async updateComment(parent, args, { db, pubsub, prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      where: {
        id: args.id,
        author: {
          id: userId,
        },
      },
    });
    if (!commentExists) {
      throw new Error('Comment not exsits');
    }
    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
};

export default Mutation;
