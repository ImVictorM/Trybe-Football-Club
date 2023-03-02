class EqualTeamsException extends Error {
  constructor() {
    const errorMessage = 'There is no team with such id!';
    super(errorMessage);
    this.stack = '404';
  }
}

export default EqualTeamsException;
