export class Book {
  #title;
  #author;
  #genre;
  #isRead;
  #score;

  constructor(title, author, genre, isRead = false, score = undefined) {
    this.#title = title;
    this.#author = author;
    this.#genre = genre;
    this.#isRead = isRead;
    this.#score = score;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }
  
  get genre() {
    return this.#genre;
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