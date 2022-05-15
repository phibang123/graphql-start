import { GraphQLYogaError } from 'graphql-yoga';
import getUserId from '../utils/getUser';

const Query = {
  

  users(parent, args, { db, prisma }, info) {
    const opArgs = {
      first: args.first, //như cái limit
      skip: args.skip, 
      after: args.after, //bỏ đi ví dụ id 1, 2 nhập 2 thì cả 1 và 2 biến mất, nó loại bỏ từ vị trí đầu đến vị trí của id
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          name_contains: args.query,
        },
        {
          email_contains: args.query,
        },
      ];
    }
    console.log(opArgs)
    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { db, prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy,
      where: {
        published: true,
      },
    };
    if (args.query) {
      //ponit
      // ở trên where là khở tạo
      // nên xuồng đâu phải truyền vào thêm where, chứ ko phải gán = nhưng vạy where sẽ giá trị đầu sẽ bị mất
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  me(parent, args, { db, prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
  comments(parent, args, { db, prisma }, info)
  {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    return prisma.query.comments(opArgs, info);
  },
  async post(parent, args, { db, prisma, request }, info) {
    // người dùng chưa đăng nhập vẫn có thể xem chi tiết bài post
    // logic là người dùng 1 là phải true có thể xem mà không cần userId
    // vậy cần userId khi post đó published fails, mà khi chạy func getUserId lại không bị lỗi
    // custom lại getUserId
    const userId = getUserId(request, false);

    //xem chi tiet post và thỏa id và hoặc là bài dó publish hoặc bạn là người tạo bài đó
    //code hay
    const post = await prisma.query.posts(
      {
        where: {
          id: args.id,
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
        },
      },
      info
    );
    if (post.length === 0) {
      throw new GraphQLYogaError('posts not found ');
    }
    return post[0];
  },
  myPosts(parent, args, { db, prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId,
        },
      },
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }
    return prisma.query.posts(
      opArgs,

      info
    );
  },
};

export default Query;
