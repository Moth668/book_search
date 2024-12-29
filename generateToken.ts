import jwt from 'jsonwebtoken';

const secretKey = 'secret'; 
const signToken = (username, email, _id) => {
  const payload = { username, email, _id };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const token = signToken(
  'testuser',               // username
  'testuser@example.com',   // email
  '64a9b3c47c347918c8e6c123' // user _id
);

console.log('Generated JWT:', token);
