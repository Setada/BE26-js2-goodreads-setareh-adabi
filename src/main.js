import './style.css';
import { Book } from './book.js';
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from './firebase.js';

let books = [];

async function loadBooks() {
  const data = await getBooks();

  books = Object.entries(data).map(([id, bookData]) => {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.genre,
      bookData.isRead,
      bookData.score
    );

    book.id = id;

    return book;
  });

  renderBooks();
}

function renderBooks() {
  let booksHTML = '';

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    let scoreHTML = '';

    if (book.isRead) {
      scoreHTML = `
        <label>
          Betyg:
          <select data-score-index="${i}">
            <option value="" ${book.score === undefined ? 'selected' : ''}>
              Ej betygsatt
            </option>
            <option value="1" ${book.score === 1 ? 'selected' : ''}>1</option>
            <option value="2" ${book.score === 2 ? 'selected' : ''}>2</option>
            <option value="3" ${book.score === 3 ? 'selected' : ''}>3</option>
            <option value="4" ${book.score === 4 ? 'selected' : ''}>4</option>
            <option value="5" ${book.score === 5 ? 'selected' : ''}>5</option>
          </select>
        </label>
      `;
    }

    const scoreText =
      book.score !== undefined ? book.score : 'Ej betygsatt';

    booksHTML += `
      <article class="book">
        <h2>${book.title}</h2>

        <p>Författare: ${book.author}</p>

        <p>Genre: ${book.genre}</p>

        <p>Status: ${book.getStatusText()}</p>

        <p>Betyg: ${scoreText}</p>

        <label>
          <input
            type="checkbox"
            data-read-index="${i}"
            ${book.isRead ? 'checked' : ''}
          >
          Läst
        </label>

        ${scoreHTML}

        <button data-delete-index="${i}">
          Radera
        </button>
      </article>
    `;
  }

  document.querySelector('#app').innerHTML = `
    <h1>Goodreads</h1>
    <p>Min boklista</p>

    <form id="bookForm">
      <input
        type="text"
        id="title"
        placeholder="Titel"
        required
      >

      <input
        type="text"
        id="author"
        placeholder="Författare"
        required
      >

      <input
        type="text"
        id="genre"
        placeholder="Genre"
        required
      >

      <button type="submit">
        Lägg till bok
      </button>
    </form>

    <section>
      ${booksHTML}
    </section>
  `;

  addEventListeners();
}

function addEventListeners() {
  const form = document.querySelector('#bookForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;

    const newBook = new Book(title, author, genre);

    await addBook({
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      isRead: newBook.isRead,
      score: newBook.score
    });

    await loadBooks();
  });

  const checkboxes = document.querySelectorAll(
    'input[data-read-index]'
  );

  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', async function () {
      const index = checkbox.dataset.readIndex;
      const book = books[index];

      book.isRead = checkbox.checked;

      await updateBook(book.id, {
        title:  book.title,
        author: book.author,
        genre:  book.genre,
        isRead: book.isRead,
        score:  book.score
      });

      await loadBooks();
    });
  }

  const scoreSelects = document.querySelectorAll(
    'select[data-score-index]'
  );

  for (const select of scoreSelects) {
    select.addEventListener('change', async function () {
      const index = select.dataset.scoreIndex;
      const book = books[index];

      if (select.value === '') {
        book.score = undefined;
      } else {
        book.score = Number(select.value);
      }

      await updateBook(book.id, {
        title: book.title,
        author: book.author,
        genre: book.genre,
        isRead: book.isRead,
        score: book.score
      });

      await loadBooks();
    });
  }

  const deleteButtons = document.querySelectorAll(
    'button[data-delete-index]'
  );

  for (const button of deleteButtons) {
    button.addEventListener('click', async function () {
      const index = button.dataset.deleteIndex;
      const book = books[index];

      await deleteBook(book.id);

      await loadBooks();
    });
  }
}

loadBooks();