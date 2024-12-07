// Для збереження книг на стороні клієнта (як заміна для MS SQL)
let books = JSON.parse(localStorage.getItem('books')) || [];

// Відображення списку книг на головній сторінці
function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <a href="book.html?id=${index}">${book.title}</a>
            <p>Автор: ${book.author}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

// Зберегти нову книгу
document.getElementById('add-book-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const content = document.getElementById('book-content').value;
    const cover = document.getElementById('book-cover').files[0];

    if (content.length < 100) {
        alert('Контент книги має бути не менше 100 символів!');
        return;
    }

    const newBook = {
        title,
        author,
        content,
        cover: cover ? URL.createObjectURL(cover) : null
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    window.location.href = 'index.html'; // Після додавання повертаємось на головну
});

// Завантаження книги для перегляду
if (window.location.pathname.includes('book.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const book = books[bookId];
    if (book) {
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-content').textContent = book.content;
    }
}

displayBooks();

function displayBooks(books) {
    const booksContainer = document.getElementById('books-list');
    booksContainer.innerHTML = ''; // Очистити попередній контент
  
    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.className = 'book-item';
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <a href="/read/${book.id}">Read</a>
      `;
      booksContainer.appendChild(bookItem);
    });
  }
  function displayBooks(books) {
    const booksContainer = document.getElementById('books-list');
    booksContainer.innerHTML = ''; // Очистити попередній контент
  
    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.className = 'book-item';
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <a href="/read/${book.id}">Read</a>
      `;
      booksContainer.appendChild(bookItem);
    });
  }// Функція для обробки форми додавання книги
document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Запобігає перезавантаженню сторінки при відправці форми
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
  
    const bookData = {
      title: title,
      author: author,
      description: description
    };
  
    // Відправлення даних на сервер за допомогою fetch
    fetch('/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Книга успішно додана!');
        // Очистити форму після успішної відправки
        document.getElementById('add-book-form').reset();
      } else {
        alert('Не вдалося додати книгу.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Сталася помилка при додаванні книги.');
    });
  });
  
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  
  // Налаштування для роботи з JSON
  app.use(bodyParser.json());
  
  // Підключення до бази даних MySQL
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_db'
  });
  
  // Підключення до бази даних
  db.connect(err => {
    if (err) {
      console.log('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });
  
  // Маршрут для додавання книги
  app.post('/addBook', (req, res) => {
    const { title, author, description } = req.body;
  
    const query = 'INSERT INTO Books (title, author, description) VALUES (?, ?, ?)';
    db.query(query, [title, author, description], (err, result) => {
      if (err) {
        console.error(err);
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  });
  
  // Запуск сервера
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  