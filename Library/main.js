/** 
 * Web programming - Frontend 
 * Design patterns and OOP
 * Project assignment
 * Library
 */

const authorSearch = document.getElementById('search-author'); // author search input
      bookSearch = document.getElementById('search-book'); // book search input
      authorList = document.getElementById('author-list'); // getting tbody of author table
      bookList = document.getElementById('book-list');  // getting tbody of books table
      authorForm = document.getElementById('author-form') // getting author form 
      bookForm = document.getElementById('book-form') // getting book form 

/* Person class used to initialize 
objects with 'name' property */
class Person {
    constructor(name) {
        this.name = name;
    }
}

/* Author class that inherits the Person class 
with additional properties 'book' 
and 'genre' */
class Author extends Person {
    constructor(name, book, genre) {
        super(name);
        this.book = book;
        this.genre = genre;
    }
}

/* Books class used to initialize objects
with 'title', 'genre' and 'author' 
properties */
class Books {
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author;
    }
}

/** 
 * IIFE function - Library
 * Module revealing pattern
 */
const Library = (() => {
    let _authors = [], _books = []; // private storage for books and authors

    // adding authors
    function addAuthor(author) {
        _authors.push(author); // adding newly created author to private array  
        authorList.innerHTML = '';
        fillAuthorList(_authors);
    }

    // filling author list 
    function fillAuthorList(author) {  
        author.forEach(val => {
            const row = document.createElement('tr'); // create row for new author 

            // filling a row with author data
            row.innerHTML = `
            <td>${val.name}</td>
            <td>${val.genre}</td>
            <td>${val.book}</td>
            `

            authorList.appendChild(row);
        });  
    }

    // searching for authors based on passed value 
    function searchAuthors(value) {
        let reg = new RegExp(value, 'i');

        let filtered = _authors.filter(row => reg.test(row.name));
        authorList.innerHTML = '';
        fillAuthorList(filtered);
    }

    // adding books 
    function addBook(book) {
        _books.push(book); // adding newly created book to private array  
        bookList.innerHTML = '';
        fillBookList(_books);
    }

    // filling author list 
    function fillBookList(books) {  
        books.forEach(val => {
            const row = document.createElement('tr'); // create row for new book 

            // filling a row with book data
            row.innerHTML = `
            <td>${val.title}</td>
            <td>${val.genre}</td>
            <td>${val.author}</td>
            `

            bookList.appendChild(row);
        });  
    }

    // searching for books based on passed value 
    function searchBooks(value) {
        let reg = new RegExp(value, 'i');

        let filtered = _books.filter(row => reg.test(row.title));
        bookList.innerHTML = '';
        fillBookList(filtered);
    }

    return {
        addAuthor: addAuthor,
        addBook: addBook,
        searchAuthors: searchAuthors,
        searchBooks: searchBooks,
    }
})();

// passing a value of user input to searchAuthors 
authorSearch.addEventListener('keyup', function() {
    Library.searchAuthors(authorSearch.value);
}, false);

// passing a value of user input to searchBooks
bookSearch.addEventListener('keyup', function() {
    Library.searchBooks(bookSearch.value);
}, false);

// adding a submit event to authorForm
authorForm.addEventListener('submit', (e) => {
    // getting a value of input fields
    const name = document.getElementById('name').value,
          genre = document.getElementById('author-genre').value,
          book = document.getElementById('book').value;

    Library.addAuthor(new Author(name, genre, book));

    e.preventDefault();
}, false);

// adding a submit event to bookForm
bookForm.addEventListener('submit', (e) => {
    // getting a value of input fields 
    const title = document.getElementById('title').value,
          genre = document.getElementById('book-genre').value,
          author = document.getElementById('author').value;

    Library.addBook(new Books(title, genre, author));

    e.preventDefault();
}, false);
