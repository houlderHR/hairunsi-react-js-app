const backErrorName: Record<string, string> = { isLength: 'minLength' };

const getErrorKey = (constraints: Record<string, string>) =>
  Object.keys(constraints).filter((_, index) => index === 0)[0];

const getErrorConstraint = (constraints: Record<string, string>) =>
  backErrorName[getErrorKey(constraints)];

const mapError = <T>(
  errors: { property: T; constraints: Record<string, string> }[],
  cb: (property: T, type: string, message: string) => void,
) => {
  errors.map((error) =>
    cb(
      error.property,
      getErrorConstraint(error.constraints),
      error.constraints[getErrorKey(error.constraints)],
    ),
  );
};

export default mapError;
