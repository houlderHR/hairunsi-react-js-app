const REGEX = {
  UID: '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
  EMAIL: /^.+@(hairun-technology)+\.(com)$/,
  MOT_MIN_2: /^\b\w{2,}\b(\s+\b\w{2,}\b)*$/,
};

export default REGEX;
