class InvalidUserData extends Error {
  constructor() {
    const errorMessage = 'Invalid email or password';
    super(errorMessage);
    this.stack = '401';
  }
}

export default InvalidUserData;
