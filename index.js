let myLibrary = [];

function Book(){
    this.title = "";
    this.author = "";
    this.pages = "";
    this.isRead = false;
}



function addNewBookToLibrary(event){
    event.preventDefault();    
    const newBook = createNewBookFromInput(this);
    myLibrary.push(newBook);
    updateDisplayedBooks();
}

function displayAllBooks(){
    const bookTable = document.getElementById("book-library");
    for (book of myLibrary){
        let bookRow = createBookRow(book);
        bookTable.appendChild(bookRow);
    }
}

function updateDisplayedBooks(){
    const bookTable = document.getElementById("book-library");
    book = myLibrary[myLibrary.length - 1];
    let bookRow = createBookRow(book);
    bookTable.appendChild(bookRow);
}

function createBookRow(book){
    const bookRow = document.createElement("tr");
    for (property in book){
        let col = document.createElement("td");
        if (property === "isRead"){
            let rowCheckBox = isReadRowDisplay(book[property]);
            col.appendChild(rowCheckBox);
        } else {            
            col.textContent = book[property];
        }
        bookRow.appendChild(col);
    }
    return bookRow;        
}

function isReadRowDisplay(isRead){
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = isRead;
    return checkBox;
}

function createNewBookFromInput(form){
    const data = getDataFromInput(form);
    return newBookFromDataObject(data);
}

function getDataFromInput(form){
    const formData = new FormData(form);
    const dataObject = formDataToObject(formData);
    return dataObject;
}

function formDataToObject(formData){
    dataObject = {}
    for (const [inputName, inputValue] of formData) {
        let propName = changeInputDataNames(inputName)
        dataObject[propName] = inputValue;
    }
    return dataObject;
}

function changeInputDataNames(name){
    const newNames = {
        "book-title-input": "title",
        "book-author-input": "author",
        "book-pages-input": "pages",
        "book-read-input": "isRead"
    }
    return newNames[name];
}

function newBookFromDataObject(dataObject){
    const newBook = new Book();
    newBook.author = dataObject.author ? dataObject.author : "";
    newBook.pages = dataObject.pages ? dataObject.pages : "";
    newBook.title = dataObject.title ? dataObject.title : "";
    newBook.isRead = dataObject.isRead ? dataObject.isRead : false;
    return newBook;
}

const newBookForm = document.getElementById("new-book-form");

newBookForm.addEventListener('submit', addNewBookToLibrary);

