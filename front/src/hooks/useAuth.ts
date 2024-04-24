import { useMutation } from '@tanstack/react-query';
import { InputField } from '../pages/ForgotPassword/ForgotPassword';
import http from '../utils/http-common';

const BASE_PATH = '/auth';

const useSendMail = (data: InputField) => {
  useMutation({
    mutationFn: () => http.post(BASE_PATH, { email: data.email }).then((res) => res.data),
  });
};

export default useSendMail;
