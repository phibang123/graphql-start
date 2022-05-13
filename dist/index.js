"use strict";

var _prisma = require("./prisma");

var _prisma2 = _interopRequireDefault(_prisma);

require("@babel/polyfill");

var _graphqlYoga = require("graphql-yoga");

var _index = require("./resolvers/index");

var _graphqlFileLoader = require("@graphql-tools/graphql-file-loader");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _schema = require("@graphql-tools/schema");

var _data = require("./data/data");

var _data2 = _interopRequireDefault(_data);

var _path = require("path");

var _load = require("@graphql-tools/load");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = (0, _load.loadSchemaSync)((0, _path.join)(__dirname, 'graphql/schema.graphql'), { loaders: [new _graphqlFileLoader.GraphQLFileLoader()] });

// const schemaWithResolvers = addResolversToSchema({
//   typeDefs,
//   resolvers
// })
var pubsub = new _graphqlSubscriptions.PubSub();

var server = new _graphqlYoga.createServer({
	schema: {
		typeDefs: typeDefs,
		resolvers: _index.resolvers
	},
	//context có thể là obj hoặc là function
	//function thì tham số nhận vào là request
	context: function context(request) {
		return {
			db: _data2.default,
			pubsub: pubsub,
			prisma: _prisma2.default,
			request: request
		};
	},

	fragmentReplacements: _index.fragmentReplacements
});

server.start({
	port: process.env.PORT || 4000
}, function () {
	console.log("The server is up!");
});