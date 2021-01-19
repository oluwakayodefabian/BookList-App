// represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Represents localStorage
class Store 
{
    static AddBookToLocalStorage(book) {
        const books = Store.getBookFromLocalStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static getBookFromLocalStorage() {
        let books;
        if (localStorage.getItem('books') === null || localStorage.length === 0) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static RemoveBookFromLocalStorage(isbn) {
        const books = this.getBookFromLocalStorage();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
         localStorage.setItem('books', JSON.stringify(books));
    }
}

// Handles UI Tasks
class UI 
{
    static addBookToUi(book) {
        const tableBody = document.querySelector('#books');
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger delete">X</a></td>`;
        tableBody.appendChild(tableRow);
    }

    static DisplayBooks() {
        const books = Store.getBookFromLocalStorage();
        console.log(books)
        books.forEach((book) => UI.addBookToUi(book))
    }

    static removeBookFromUi(targetedElement) {
        if (targetedElement.classList.contains('delete')) {
            targetedElement.parentElement.parentElement.remove();
        }
    }

    static showAlertMessage(msg, class_name) {
        const newElement = document.createElement('div');
        newElement.className = `alert alert-${class_name}`;
        newElement.innerHTML = `<p>${msg}</p>`;

        const form = document.querySelector('#bookList-form');
        document.querySelector(".form-container").insertBefore(newElement, form);

        setTimeout(() => {
            if (newElement.classList.contains('alert')) {
                newElement.remove();
            }
        }, 5000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

// Display Books
document.addEventListener('DOMContentLoaded', UI.DisplayBooks);

// Add Book on submit event
const form = document.querySelector('#bookList-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = `345${Math.floor(Math.random() * 10) + new Date().getMilliseconds()}`;

    // Instantiate Book class
    const book = new Book(title, author, isbn);

    // Validation
    if (title === '' || author === '') {
        UI.showAlertMessage('All fields are required', 'danger');
    } else {
        // Add book to UI
        UI.addBookToUi(book);

        // Store book in localStorage
        Store.AddBookToLocalStorage(book);

        // Success message
        UI.showAlertMessage('Book Added', 'success');
        
        // clear fields
        UI.clearFields();
    }
});

// Delete a book
document.querySelector("#books").addEventListener('click', (e) => {
    // Remove book form Ui
    UI.removeBookFromUi(e.target);

    // Remove book from localStorage
    const isbn = e.target.parentElement.previousElementSibling.innerText;
    Store.RemoveBookFromLocalStorage(isbn);

    // Show message
    UI.showAlertMessage('Book removed', 'success');
})



