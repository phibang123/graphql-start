import Comment from "./Comment"
import Mutation from "./Mutation"
import Post from "./Post"
import Query from "./Query"
import Subscription from "./Subscription"
import User from "./User"
import { extractFragmentReplacements } from "prisma-binding"

const resolvers = {
   Comment,
   Mutation,
   Post,
   Query,
   Subscription,
   User
}
/**
 * !chú ý
 * ? text nó sẽ lấy hết fragment và tự 
 */
const fragmentReplacements = extractFragmentReplacements(resolvers)

export  {resolvers , fragmentReplacements}