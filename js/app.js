
// Create a Book class: represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn + Math.floor(Math.random() * (20 - 5 + 1) + 5);
    }
}

// Store Class: Handles Storage
class Store {
    static addBookToLocalStorage(book) {
        const books = Store.getBooksFromLocalStorage('books');
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static getBooksFromLocalStorage(key) {
        let books;
        if(localStorage.getItem(key) === null || localStorage.length === 0) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(key));
        }
        return books;
    }

    static removeBookFromLocalStorage(isbn) {
        const books = Store.getBooksFromLocalStorage('books');
        books.forEach((book, index) => {
             if (book.isbn === isbn) {
                 books.splice(index, 1);
             }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// UI Class: Handles Ui Tasks
class UI {
    static displayBooks() {
        // Create a variable to hold books;
        const books = Store.getBooksFromLocalStorage('books');
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const bookList = document.querySelector('#books');
        // Create a tr element
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete">X</a></td>`;
        bookList.appendChild(row);
    }

    static removeBook(targetedElement) {
        if(targetedElement.classList.contains('delete'))
        {
            targetedElement.parentElement.parentElement.remove();
        }
    }

    static messageAlert(message, class_name) {
        const newElement = document.createElement('p');
        newElement.className = `alert alert-${class_name}`
        newElement.style.textAlign = 'center';
        newElement.appendChild(document.createTextNode(message));
        const form = document.querySelector('#bookList-form');
        const container = document.querySelector('.form-container');
        container.insertBefore(newElement, form);
        setTimeout(() =>{
            newElement.remove();
        }, 3000);
    }

    static clearInputFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)


// Event: Add a Book
const form = document.querySelector('#bookList-form');

// Get form input values
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validation
    if (title === '' || author === '' || isbn === '') {
        UI.messageAlert('All fields are required', 'danger')
    } else {
        // Instatiate Book class
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to Store
        Store.addBookToLocalStorage(book);
        // Success message
        UI.messageAlert('Book Added', 'success')

        // Clear Fields
        UI.clearInputFields();
    }
});



// Event: Remove a Book
document.querySelector('#books').addEventListener('click', (e) => {
    // Remove book from UI
    UI.removeBook(e.target);

    // Remove Book from Store
    const isbn = e.target.parentElement.previousElementSibling.innerText;
    Store.removeBookFromLocalStorage(isbn);
    UI.messageAlert('Book removed', 'success');
})