'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefsPrisma = fs.readFileSync('./src/generated/prisma.graphql', 'utf8');

exports.default = typeDefsPrisma;