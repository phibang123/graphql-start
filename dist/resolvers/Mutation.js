'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _genarateToken = require('../utils/genarateToken');

var _genarateToken2 = _interopRequireDefault(_genarateToken);

var _getUser = require('../utils/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

var _hashPassword = require('../utils/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import { GraphQLYogaError } from 'graphql-yoga';


var Mutation = {
  createUser: function createUser(parent, args, _ref, info) {
    var _this = this;

    var db = _ref.db,
        prisma = _ref.prisma;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              args.data.password = (0, _hashPassword2.default)(args.data.password);
              //do có token nên info nó không hiểu, nếu không để info nó sẽ lấy hết

              _context.next = 3;
              return prisma.mutation.createUser({
                data: args.data
              });

            case 3:
              user = _context.sent;
              return _context.abrupt('return', {
                user: user,
                token: (0, _genarateToken2.default)(user.id)
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  login: function login(parent, args, _ref2, info) {
    var _this2 = this;

    var prisma = _ref2.prisma;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var user, isMatch;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return prisma.query.user({
                where: {
                  email: args.data.email
                }
              });

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 5;
                break;
              }

              throw new Error('Unable login');

            case 5:
              isMatch = _bcryptjs2.default.compareSync(args.data.password, user.password);

              if (isMatch) {
                _context2.next = 8;
                break;
              }

              throw new Error('Unable login');

            case 8:
              return _context2.abrupt('return', {
                user: user,
                token: (0, _genarateToken2.default)(user.id)
              });

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  createPost: function createPost(parent, args, _ref3, info) {
    var db = _ref3.db,
        pubsub = _ref3.pubsub,
        prisma = _ref3.prisma,
        request = _ref3.request;

    //get the header value , parse out the token, verify  ...

    var userId = (0, _getUser2.default)(request);

    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info);
  },
  createComment: function createComment(parent, args, _ref4, info) {
    var _this3 = this;

    var db = _ref4.db,
        pubsub = _ref4.pubsub,
        prisma = _ref4.prisma,
        request = _ref4.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var userId, postsExist;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              _context3.next = 3;
              return prisma.exists.Post({
                id: args.data.post,
                OR: [{
                  published: true
                }, {
                  author: {
                    id: userId
                  }
                }]
              });

            case 3:
              postsExist = _context3.sent;

              console.log(postsExist);

              if (postsExist) {
                _context3.next = 7;
                break;
              }

              throw new Error('Post not found');

            case 7:
              return _context3.abrupt('return', prisma.mutation.createComment({
                data: {
                  text: args.data.text,
                  author: {
                    connect: {
                      id: userId
                    }
                  },
                  post: {
                    connect: {
                      id: args.data.post
                    }
                  }
                }
              }, info));

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  deleteUser: function deleteUser(parent, args, _ref5, info) {
    var _this4 = this;

    var db = _ref5.db,
        prisma = _ref5.prisma,
        request = _ref5.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var userId, commentExsist;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              commentExsist = prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

              if (commentExsist) {
                _context4.next = 4;
                break;
              }

              throw new Error('Comment not exists');

            case 4:
              return _context4.abrupt('return', prisma.mutation.deleteUser({
                where: {
                  id: userId
                }
              }, info));

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  deletePost: function deletePost(parents, args, _ref6, info) {
    var _this5 = this;

    var db = _ref6.db,
        pubsub = _ref6.pubsub,
        prisma = _ref6.prisma,
        request = _ref6.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var userId, postsExist;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              _context5.next = 3;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              postsExist = _context5.sent;

              if (postsExist) {
                _context5.next = 6;
                break;
              }

              throw new Error('Posts not exists');

            case 6:
              return _context5.abrupt('return', prisma.mutation.deletePost({
                where: {
                  id: args.id,
                  author: {
                    id: userId
                  }
                }
              }, info));

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  },
  deleteComment: function deleteComment(parents, args, _ref7, info) {
    var _this6 = this;

    var db = _ref7.db,
        pubsub = _ref7.pubsub,
        prisma = _ref7.prisma,
        request = _ref7.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              _context6.next = 3;
              return prisma.exists.Comment({
                where: {
                  id: args.id,
                  author: {
                    id: userId
                  }
                }
              });

            case 3:
              commentExists = _context6.sent;

              if (commentExists) {
                _context6.next = 6;
                break;
              }

              throw new Error('Comment not exsits');

            case 6:
              return _context6.abrupt('return', prisma.mutation.deleteComment({
                where: {
                  id: args.id
                }
              }, info));

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6);
    }))();
  },
  updateUser: function updateUser(parent, args, _ref8, info) {
    var _this7 = this;

    var db = _ref8.db,
        prisma = _ref8.prisma,
        request = _ref8.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var userId;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = (0, _getUser2.default)(request);

              if (typeof args.data.password === 'string') {
                args.data.password = (0, _hashPassword2.default)(args.data.password);
              }
              return _context7.abrupt('return', prisma.mutation.updateUser({
                where: {
                  id: userId
                },
                data: args.data
              }, info));

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this7);
    }))();
  },
  updatePost: function updatePost(parent, args, _ref9, info) {
    var _this8 = this;

    var db = _ref9.db,
        pubsub = _ref9.pubsub,
        prisma = _ref9.prisma,
        request = _ref9.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var userId, postExsist, isPublished;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              _context8.next = 3;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 3:
              postExsist = _context8.sent;
              _context8.next = 6;
              return prisma.exists.Post({
                id: args.id,
                published: true
              });

            case 6:
              isPublished = _context8.sent;

              console.log(isPublished);

              if (postExsist) {
                _context8.next = 10;
                break;
              }

              throw new Error('Post not exists');

            case 10:
              if (!(isPublished && args.data.published === false)) {
                _context8.next = 13;
                break;
              }

              _context8.next = 13;
              return prisma.mutation.deleteManyComments({
                where: {
                  post: {
                    id: args.id
                  }
                }
              });

            case 13:
              return _context8.abrupt('return', prisma.mutation.updatePost({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this8);
    }))();
  },
  updateComment: function updateComment(parent, args, _ref10, info) {
    var _this9 = this;

    var db = _ref10.db,
        pubsub = _ref10.pubsub,
        prisma = _ref10.prisma,
        request = _ref10.request;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var userId, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = (0, _getUser2.default)(request);
              _context9.next = 3;
              return prisma.exists.Comment({
                where: {
                  id: args.id,
                  author: {
                    id: userId
                  }
                }
              });

            case 3:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 6;
                break;
              }

              throw new Error('Comment not exsits');

            case 6:
              return _context9.abrupt('return', prisma.mutation.updateComment({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 7:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this9);
    }))();
  }
};

exports.default = Mutation;