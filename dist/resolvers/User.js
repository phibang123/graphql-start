'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUser = require('../utils/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  posts: {
    fragment: 'fragment  userId on User { id }',
    resolve: function resolve(parent, args, _ref, info) {
      var prisma = _ref.prisma,
          request = _ref.request;

      var userId = (0, _getUser2.default)(request, false);
      // chỉ lấy posts published: true,
      // author: trùng với user
      // tức là nó custom lại posts

      return prisma.query.posts({
        where: {
          OR: [{
            published: true

          }, {
            author: {
              id: userId
            }
          }],
          author: {
            id: parent.id
          }
        }
      });
    }
  },
  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, agrs, _ref2, info) {
      var request = _ref2.request;

      var userId = (0, _getUser2.default)(request, false);
      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return '';
      }
      // return parent.email
    }
  }
};

exports.default = User;