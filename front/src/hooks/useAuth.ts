import { useMutation } from '@tanstack/react-query';
import http from '../utils/http-common';

const BASE_PATH = '/auth';
interface InputField {
  email: string;
}

const useSendMail = () =>
  useMutation({
    mutationFn: (data: InputField) =>
      http
        .post(
          `${BASE_PATH}/recovery-password`,
          { email: data.email },
          {
            headers: { Authorization: `email: ${data}`, 'x-user-email': data.email },
          },
        )
        .then((res) => res.data),
  });

export default useSendMail;
