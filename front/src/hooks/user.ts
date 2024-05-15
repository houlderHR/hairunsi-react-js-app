import { DEPARTMENT, USER } from '../routes/endpoints';
import http from '../utils/http-common';

const updateUser = async (data: FormData, id: string) => {
  const user = await http.put(`${USER}/${id}`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return user;
};

export const createUser = async (data: FormData) => {
  const user = await http.post(`${USER}`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return user;
};

export const deleteUserById = async (id: string | null) => {
  const user = await http.delete(`${USER}/${id}`);
  return user;
};

export const getAllUsers = async () => http.get(USER);

export const getAllUsersByDepartment = async (department: string | undefined) => {
  const users = http.get(`${USER}${DEPARTMENT}`, {
    params: { department },
  });
  return users;
};

export default updateUser;
