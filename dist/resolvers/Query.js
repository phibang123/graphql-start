'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlYoga = require('graphql-yoga');

var _getUser = require('../utils/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  // title()
  // {
  //   return "The war of Art"
  // },
  // price()
  // {
  //   return 12.90
  // },
  // releaseYear()
  // {
  //   return null
  // },
  // rating()
  // {
  //   return 1
  // },
  // inStock()
  // {
  //   return true
  // }

  users: function users(parent, args, _ref, info) {
    var db = _ref.db,
        prisma = _ref.prisma;

    var opArgs = {
      first: args.first, //như cái limit
      skip: args.skip,
      after: args.after, //bỏ đi ví dụ id 1, 2 nhập 2 thì cả 1 và 2 biến mất, nó loại bỏ từ vị trí đầu đến vị trí của id
      orderBy: args.orderBy
    };
    if (args.query) {
      opArgs.where.OR = [{
        name_contains: args.query
      }, {
        email_contains: args.query
      }];
    }
    return prisma.query.users(opArgs, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var db = _ref2.db,
        prisma = _ref2.prisma;

    var opArgs = {
      where: {
        first: args.first,
        skip: args.skip,
        published: true,
        orderBy: args.orderBy
      }
    };
    if (args.query) {
      //ponit
      // ở trên where là khở tạo
      // nên xuồng đâu phải truyền vào thêm where, chứ ko phải gán = nhưng vạy where sẽ giá trị đầu sẽ bị mất
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }
    return prisma.query.posts(opArgs, info);
  },
  me: function me(parent, args, _ref3, info) {
    var db = _ref3.db,
        prisma = _ref3.prisma,
        request = _ref3.request;

    var userId = (0, _getUser2.default)(request);

    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  comments: function comments(parent, args, _ref4, info) {
    var db = _ref4.db,
        prisma = _ref4.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    return prisma.query.comments(opArgs, info);
  },
  post: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref5, info) {
      var db = _ref5.db,
          prisma = _ref5.prisma,
          request = _ref5.request;
      var userId, post;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // người dùng chưa đăng nhập vẫn có thể xem chi tiết bài post
              // logic là người dùng 1 là phải true có thể xem mà không cần userId
              // vậy cần userId khi post đó published fails, mà khi chạy func getUserId lại không bị lỗi
              // custom lại getUserId
              userId = (0, _getUser2.default)(request, false);

              //xem chi tiet post và thỏa id và hoặc là bài dó publish hoặc bạn là người tạo bài đó
              //code hay

              _context.next = 3;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 3:
              post = _context.sent;

              if (!(post.length === 0)) {
                _context.next = 6;
                break;
              }

              throw new _graphqlYoga.GraphQLYogaError('posts not found ');

            case 6:
              return _context.abrupt('return', post[0]);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function post(_x, _x2, _x3, _x4) {
      return _ref6.apply(this, arguments);
    }

    return post;
  }(),
  myPosts: function myPosts(parent, args, _ref7, info) {
    var db = _ref7.db,
        prisma = _ref7.prisma,
        request = _ref7.request;

    var userId = (0, _getUser2.default)(request);
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };
    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }
    return prisma.query.posts(opArgs, info);
  }
};

exports.default = Query;