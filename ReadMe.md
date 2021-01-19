# Mini BookList App

This is a mini booklist created with --Vanilla javascipt, The functionalities are straight forward, The App is all about creating an interface where a user can add a book and it gets listed below. the data(book) been added is persistent, meaning even when you refresh the webpage the book added will remain because the book been added is been stored in localStorage object in your users browser.
ES6 classes was used for making the application.

## STEPS

- Create the HTML markups for the application and style with CSS. We will also have a table which will be generated dynamically with java-script.
- Create an External Javascript file for your JS, where we will create different classes and methods.
  - Create a Book class, which will have constructor. The class will represent a book.
    - Create a Store class which will handle storage for localStorage. All Methods used in this class will be static so as to not instantiate the class be calling the method.
      - The first method is the method that will handle adding an item to the LocalStorage
      - The second method is the method that will handle getting the items from localStorage, converting it from an array to a JS object.
      - The third method is the method that will handle deleting an item permanently from localStorage.
    - Create a UI class that handles user interface tasks. This class will also have static methods.
      - A method that add Book To List or Table, By creating a "tr" element dynamically in JS and pass in the respective "td"s to it.
      - A method that displays Books; as you might have guessed it calls the method from the Store Class that get books from localStorage and the loops through and displays it on the webpage.
      - A method that deletes book from the UI or webpage using the javascript remove method. some traversing will be done though before removing it.
      * A method that shows a message whenever a book is added, deleted or when some kind of validation is triggered.
      * A method that clears all fields from the input fields
    * Create event handlers for submission, click, when the page finish loading etc.
