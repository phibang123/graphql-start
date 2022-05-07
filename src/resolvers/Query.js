import { GraphQLYogaError } from 'graphql-yoga';
import getUserId from "../utils/getUser";

const Query = {
	// title()
	// {
	//   return "The war of Art"
	// },
	// price()
	// {
	//   return 12.90
	// },
	// releaseYear()
	// {
	//   return null
	// },
	// rating()
	// {
	//   return 1
	// },
	// inStock()
	// {
	//   return true
	// }

	users(parent, args, { db, prisma }, info) {
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query,
					},
					{
						email_contains: args.query,
					},
				],
			};
		}
		return prisma.query.users(opArgs, info);
	},
	posts(parent, args, { db, prisma }, info) {
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [
					{
						title_contains: args.query,
					},
					{
						body_contains: args.query,
					},
				],
			};
		}
		return prisma.query.posts(opArgs, info);
	},
	me() {
		return {
			id: "123",
			name: "Khoi",
			email: "Exmapp@gmail.com",
			age: 123,
			post() {
				return {
					id: "123",
					title: "bang",
					body: "laaaaaaa",
					published: true,
				};
			},
		};
	},
  comments(parent, args, { db, prisma }, info)
  {
      return prisma.query.comments(null,info);
	},
	async post(parent, args, { db, prisma, request }, info)
	{
		// người dùng chưa đăng nhập vẫn có thể xem chi tiết bài post
		const userId = getUserId(request, false)
		
		//xem chi tiet post và thỏa id và hoặc là bài dó publish hoặc bạn là người tạo bài đó
		//code hay
		const post = await prisma.query.posts({
			where: {
				id: args.id,
				OR: [{
					published: true
				}, {
					author: {
						id: userId
					}
				}]
			}
		}, info)
		if (post.length === 0)
		{
			throw new GraphQLYogaError("posts not found ")
		}
		return post[0]
	},
};

export default Query;
