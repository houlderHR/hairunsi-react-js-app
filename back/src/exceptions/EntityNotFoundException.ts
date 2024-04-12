class EntityNotFoundException extends Error {
  constructor(data: string, private errors: object) {
    super(data);
  }
}

export default EntityNotFoundException;
