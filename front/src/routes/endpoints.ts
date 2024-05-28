const UNAUTHENTICATED = {
  login: '/auth/login',
  decode_token: '/auth/decode-token',
};
export const ROLE = {
  BASE_PATH: '/role',
};

export const AUTH = {
  BASE_PATH: '/auth',
};
export const USER = '/user';
export const DEPARTMENT = {
  departmentWithoutAnonymous: '/department',
  departmentWithAnonymous: '/department/anonymous',
};
export const POST = '/post';

export const endpoint = {
  department: {
    get: 'department',
    create: 'department',
    delete: 'department',
    update: 'department',
    search: '/department/search',
  },
  role: {
    search: '/role/search',
  },
  user: {
    search: '/user/search',
  },
};

export default UNAUTHENTICATED;
