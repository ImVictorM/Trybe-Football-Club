class InvalidToken extends Error {
  constructor() {
    const errorMessage = 'Token must be a valid token';
    super(errorMessage);
    this.stack = '401';
  }
}

export default InvalidToken;
