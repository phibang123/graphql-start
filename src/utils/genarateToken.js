import jwt from 'jsonwebtoken';

const generatedToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    'secret',
    {
      expiresIn: '7days',
    }
  );
};

export default generatedToken;
