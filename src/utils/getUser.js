import {
	GraphQLYogaError
} from "graphql-yoga";
import jwt from "jsonwebtoken"

const getUserId = (request,requereAutth = true) =>
{

  const header = request.request.headers.get('authorization')

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