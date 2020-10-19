// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static edit_details(row_name){
    // row= document.getElementById(row_name);
    console.log(row_name);


  }
  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.id = book.isbn.toString().replace(' ','_')+'_row';
    row.innerHTML = `
      <td id = "${book.isbn.toString().replace(' ','_')}_title">${book.title}</td>
      <td id = "${book.isbn.toString().replace(' ','_')}_author">${book.author}</td>
      <td id = "${book.isbn.toString().replace(' ','_')}_isbn">${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      <td><a href = '#' class = "${book.isbn.toString().replace(' ','_')}" style="height:25px;width:25px;"><i class="fa fa-pencil update" ></i></a></td>
    `;
    

    list.appendChild(row);
  }
  
  
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      // alert(el.classList);
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static updateBook(el) {
    if(el.classList.contains('update')) {
      // alert(el.classList);
      // alert(el.value)
      // alert(el.parentElement.classList);
      var row_id = el.parentElement.classList[0];
      // alert(row_id)
      // alert(document.getElementById(row_id+'_title').innerHTML)
      document.getElementById('title').value = document.getElementById(row_id+'_title').innerHTML;
      document.getElementById('author').value = document.getElementById(row_id+'_author').innerHTML;
      document.getElementById('isbn').value = parseInt(document.getElementById(row_id+'_isbn').innerHTML);


      el.parentElement.parentElement.parentElement.remove();

    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();

  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  if(e.target.classList.contains('delete')){

    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  }
  else if(e.target.classList.contains('update')){
    
    UI.updateBook(e.target);
    
  }
});
