import './prisma'
// import "@babel/polyfill" 
import "@babel/polyfill/noConflict" //điều này tránh xung đột, chỉ cần loadding phiên bản gốc không cần tải thư viện như mấy cái @bebel trong dev -_-  

import {
	GraphQLYogaError,
	createServer
} from "graphql-yoga"
import {fragmentReplacements, resolvers} from "./resolvers/index"

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import {
	PubSub
} from 'graphql-subscriptions'
import { addResolversToSchema } from '@graphql-tools/schema'
import db from "./data/data"
import { join } from 'path'
import { loadSchemaSync } from '@graphql-tools/load'
import prisma from "./prisma"

const typeDefs = loadSchemaSync(join(__dirname, 'graphql/schema.graphql'), { loaders: [new GraphQLFileLoader()] })

// const schemaWithResolvers = addResolversToSchema({
//   typeDefs,
//   resolvers
// })
const pubsub = new PubSub()


const server = new createServer({
	schema: {
		typeDefs,
		resolvers
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
	},
	fragmentReplacements
});

server.start({
	port: process.env.PORT || 4000 
},() => {
	console.log("The server is up!")
});