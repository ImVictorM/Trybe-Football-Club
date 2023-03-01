import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const VALID_PASSWORD = '1234567';
const VALID_EMAIL = 'email@email.com';
const INVALID_EMAIL = 'invalidone.com';
const INVALID_PASSWORD = '123';

const salt = bcrypt.genSaltSync(10);
const HASH_VALID_PASSWORD = bcrypt.hashSync(VALID_PASSWORD, salt);

export const TEST_JWT_TOKEN = 'testsecret';

export const VALID_USER_FROM_REQUEST = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD,
};

export const VALID_USER_FROM_DB = {
  email: VALID_EMAIL,
  password: HASH_VALID_PASSWORD,
  role: 'user',
  username: 'username',
};

export const INVALID_EMAIL_USER_FROM_REQUEST = {
  email: INVALID_EMAIL,
  password: VALID_PASSWORD
}

export const INVALID_PASSWORD_USER_FROM_REQUEST = {
  email: VALID_EMAIL,
  password: INVALID_PASSWORD,
}

export const VALID_USER_TOKEN = jwt.sign(VALID_USER_FROM_DB, TEST_JWT_TOKEN as jwt.Secret);
