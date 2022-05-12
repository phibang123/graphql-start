import {
	GraphQLYogaError
} from "graphql-yoga";
import jwt from "jsonwebtoken"

const getUserId = (request,requereAutth = true) =>
{
  // request.connection.context.Authorization khi getUserId từ Subscription
  const header = request.request ? request.request.headers.get('authorization') : request.connection.context.Authorization

  if (header)
  { 
    const token = header.replace("Bearer ", "")
    const decoded = jwt.verify(token, "secret")
    return decoded.userId
  }
  if (requereAutth)
  {
    throw new GraphQLYogaError("Token not exsist, please login")
  }
  
  return null 
  

}


export default getUserId