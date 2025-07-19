import { requireHelper } from '../util/helper.js';
import axios from 'axios';

const config = requireHelper('config/config.js');

export async function verifyCaptcha(token) {
  const secretKey = config.captchaPrivateToken;
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: secretKey,
      response: token,
    },
  });

  return response.data.success;
}