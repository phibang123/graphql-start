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
	}
};

export default Subscription;
