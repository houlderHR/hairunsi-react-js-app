import { AxiosError } from 'axios';

type ErrorLoginWithConstraints = {
  status: number;
  error: { property: string; constraints: Record<string, string> }[];
};
type ErrorLoginWithoutConstraints = {
  status: number;
  error: string;
};

const manageErrorMessage = (errors: AxiosError) => {
  const returnedErrors: string[] = [];
  let errorLoginWithConstraints: ErrorLoginWithConstraints;
  let errorLoginWithoutConstraints: ErrorLoginWithoutConstraints;
  switch (errors?.response?.status) {
    case 422:
      errorLoginWithConstraints = errors.response?.data as ErrorLoginWithConstraints;
      for (let i = 0; i < errorLoginWithConstraints.error.length; i += 1) {
        const element = errorLoginWithConstraints.error[i];
        if (element.constraints.isDefined) {
          returnedErrors.push(element.constraints.isDefined);
        }
      }
      break;
    default:
      errorLoginWithoutConstraints = errors.response?.data as ErrorLoginWithoutConstraints;
      returnedErrors.push(errorLoginWithoutConstraints.error);
      break;
  }
  return returnedErrors;
};

export default manageErrorMessage;
