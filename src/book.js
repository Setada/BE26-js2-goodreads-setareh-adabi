export class Book {
  #title;
  #author;
  #isRead;
  #score;

  constructor(title, author, isRead = false, score = undefined) {
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get isRead() {
    return this.#isRead;
  }

  get score() {
    return this.#score;
  }

  set isRead(value) {
    this.#isRead = value;

    if (!value) {
      this.#score = undefined;
    }
  }

  set score(value) {
    this.#score = value;
  }

  getStatusText() {
    return this.#isRead ? 'Läst' : 'Ej läst';
  }
}