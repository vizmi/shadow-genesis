import dotenv from 'dotenv'
dotenv.config()

import { OAuth2Client }  from 'google-auth-library';
const client = new OAuth2Client();

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw Error('No Bearer token provided in the Authorization header');
    const token = authHeader.substring(7, authHeader.length);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    req.user = { id: payload.sub, givenName: payload.given_name }
    next();
  } catch (error) {
    console.error('Error logging in: ', error)
    res.status(401).send(error);
  }
};

export { checkToken };