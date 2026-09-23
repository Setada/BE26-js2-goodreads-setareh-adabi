const FIREBASE_URL =
  'https://goodread-setareh-default-rtdb.firebaseio.com';

export async function getBooks() {
  const response = await fetch(`${FIREBASE_URL}/books.json`);
  const data = await response.json();

  if (!data) {
    return {};
  }

  return data;
}

export async function addBook(book) {
  await fetch(`${FIREBASE_URL}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  });
}

export async function updateBook(id, book) {
  await fetch(`${FIREBASE_URL}/books/${id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  });
}

export async function deleteBook(id) {
  await fetch(`${FIREBASE_URL}/books/${id}.json`, {
    method: 'DELETE'
  });
}