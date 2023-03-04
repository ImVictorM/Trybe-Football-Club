class InvalidPathException extends Error {
  constructor() {
    const errorMessage = 'this path doesn\'t exist';
    super(errorMessage);
    this.stack = '404';
  }
}

export default InvalidPathException;
