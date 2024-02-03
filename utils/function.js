const jwt = require('jsonwebtoken');


function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const generateToken = (userId) => {
  const secretKey = generateRandomString(32); 

  const payload = {
    user: {
      id: userId,
    },
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = {generateToken}