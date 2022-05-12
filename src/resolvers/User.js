import getUserId from '../utils/getUser';

const User = {
  posts: {
    fragment: 'fragment  userId on User { id }',
    resolve(parent, args, { prisma, request }, info)
    {
      const userId = getUserId(request, false);
      // chỉ lấy posts published: true,
      // author: trùng với user
      // tức là nó custom lại posts
 
      return prisma.query.posts({
        where: {
          OR: [{
            published: true,
            
          }, {
            author: {
              id: userId
            }
          }],
          author: {
            id: parent.id,
          },
        },
      });
    },
  },
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, agrs, { request }, info) {
      const userId = getUserId(request, false);
      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return '';
      }
      // return parent.email
    },
  },
};

export default User;
