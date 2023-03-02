class EqualTeamsException extends Error {
  constructor() {
    const errorMessage = 'It is not possible to create a match with two equal teams';
    super(errorMessage);
    this.stack = '422';
  }
}

export default EqualTeamsException;
