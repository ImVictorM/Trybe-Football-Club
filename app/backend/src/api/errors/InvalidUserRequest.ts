class InvalidUserRequest extends Error {
  constructor() {
    const errorMessage = 'All fields must be filled';
    super(errorMessage);
    this.stack = '400';
  }
}

export default InvalidUserRequest;
