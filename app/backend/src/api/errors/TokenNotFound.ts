class TokenNotFound extends Error {
  constructor() {
    const errorMessage = 'Token not found';
    super(errorMessage);
    this.stack = '401';
  }
}

export default TokenNotFound;
