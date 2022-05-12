import getUserId from "../utils/getUser";

const Subscription = {

	comment: {
		subscribe(parent, { postId }, { db, pubsub , prisma}, info) {
			return prisma.subscription.comment({
				where: {
					node: {
						post: {
							 id: postId
						 }
					 }
				 }
			 }, info)
     
		},
	},
	post: {	
		subscribe(parent, age, { pubsub,prisma }, info)
		{
			return prisma.subscription.post({
				where: {
					node: {
						published: true
					}
				}
			},info)
		}
	},
	myPost: {
		subscribe(parent, { postId }, { db, pubsub, prisma }, info)
		{ 
			//thông báo post của người dùng khi người dùng thay đổi, tạo hoặc xóa
			const userId = getUserId(require);

			return prisma.subscription.post({
				where: {
					node: {
						author: {
							id: userId
						}
					}
				}
			},info)
		}
	}
};

export default Subscription;
