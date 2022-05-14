import jwt from 'jsonwebtoken';

const generatedToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7days',
    }
  );
};

export default generatedToken;
