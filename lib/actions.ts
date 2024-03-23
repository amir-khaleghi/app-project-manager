import axios from 'axios';

/* Registering ---------------------- */

export const register = async (user) => {
  console.log(user);
  return await axios.post('/api/register', { user });
};

/* Sign in --------------------------- */

export const signin = async (user) => {
  return await axios.post('/api/signin', { user });
};
