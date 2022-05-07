import './prisma'

import {
	GraphQLYogaError,
	createServer
} from "graphql-yoga"

import Comment from "./resolvers/Comment"
import Mutation from "./resolvers/Mutation"
import Post from "./resolvers/Post"
import {
	PubSub
} from 'graphql-subscriptions'
import Query from "./resolvers/Query"
import Subscription from "./resolvers/Subscription"
import User from "./resolvers/User"
import db from "./data/data"
import fs from "fs"
import prisma from "./prisma"

const typeDefs = fs.readFileSync('./src/graphql/schema.graphql', 'utf8');

const pubsub = new PubSub()



const server = new createServer({
	schema: {
		typeDefs,
		resolvers: {
			Query,
			Mutation,
			Subscription,
			User,
			Post,
			Comment
		},
	},
	//context có thể là obj hoặc là function
	//function thì tham số nhận vào là request
	context(request)
	{
		return {
			db,
			pubsub,
			prisma,
			request
		}
	}
});

server.start(() => {
	console.log("The server is up!")
});