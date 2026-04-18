// utils/hashPassword.js
import bcrypt from 'bcrypt';

const saltRounds = 10;
const password = 'admin123'; // Change this to your desired password

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});