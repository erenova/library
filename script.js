// !Variable definition
let modalOpenerButton = document.getElementById('activateForm');
let modalForm = document.getElementById('modalForm');
let modalShadow = document.getElementById('modalShadow');
let footer = document.getElementById('footer')
let submitForm = document.getElementById('submitForm')
let formArea = document.getElementById('formArea')
let gridBookList = document.getElementById('grid-book-list')
// grid-card Buttons
let readStatus = document.getElementsByClassName('switch-read-status')
let removeButton = document.getElementsByClassName('remove-button')
// form
let bookTitle = document.getElementById('bookTitle')
let bookAuthor = document.getElementById('bookAuthor')
let bookPage = document.getElementById('bookPage')
let bookRead = document.getElementById('readCheck')
let newBook;
// modalOpener Function
modalOpenerButton.addEventListener('click', () => {
    if( !modalForm.classList.contains('active')) {
        modalForm.classList.add('active')
        modalShadow.classList.add('active')
    }
})




// !Constructor
let myLibrary = [];

class Book {
    constructor(title,author,page, read){
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
        this.index;
    }
}





submitForm.addEventListener('click', (e) => {
    e.preventDefault()  
    if(bookTitle.value !== '' && bookAuthor.value !== '' && bookPage.value !== '') {
        newBook = new Book(bookTitle.value,bookAuthor.value,bookPage.value,bookRead.checked)
        myLibrary.push(newBook)
        modalForm.classList.remove('active')
        modalShadow.classList.remove('active')   

    } else {
        alert('please fill in all the blanks.')
    }
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPage.value = "";
    bookRead.checked = false;
    displayBook()
})

let deleteButton;

function displayBook() {
        gridBookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        book.bookNumber = i;
        
        let gridCard = document.createElement('div');
        let paragraph0 = document.createElement('p')
        let paragraph1 = document.createElement('p')
        let paragraph2 = document.createElement('p')
        let cardButtonsDiv = document.createElement('div')
        let readButtonAdd = document.createElement('button')


        var removeButtonAdd = document.createElement('button')
        removeButtonAdd.classList.add('remove-button')
        removeButtonAdd.setAttribute('bookNumber' , i)
        deleteButton = document.getElementsByClassName('remove-button')

        gridBookList.appendChild(gridCard);
        gridCard.appendChild(paragraph0)
        gridCard.appendChild(paragraph1)
        gridCard.appendChild(paragraph2)
        gridCard.appendChild(cardButtonsDiv)
        cardButtonsDiv.appendChild(readButtonAdd)
        cardButtonsDiv.appendChild(removeButtonAdd)
        gridCard.classList.add('grid-card')
        cardButtonsDiv.classList.add('card-buttons')
        readButtonAdd.classList.add('switch-read-status')
        if(book.read == true) {
            readButtonAdd.classList.add('read-true')
        } else {
            readButtonAdd.classList.add('read-false')

        }

        gridCard.setAttribute('data-remove', `${i}`)
        paragraph0.innerText = book.title;
        paragraph1.innerText = book.author;
        paragraph2.innerText = book.page;
        
        readButtonAdd.addEventListener('click', function() {
            if(readButtonAdd.classList.contains('read-true')) {
               readButtonAdd.classList.remove('read-true')
               readButtonAdd.classList.add('read-false') 
            } else {
                readButtonAdd.classList.add('read-true') 
                readButtonAdd.classList.remove('read-false')
            }
        })

        
      removeButtonAdd.addEventListener('click' , () => {
        
        if (gridCard.getAttribute("data-remove") == i) {
            myLibrary.splice(gridCard.getAttribute("data-remove"),1)
            gridCard.remove()
        }
      })
    }

    
}



window.addEventListener('click', (e) => {
    if (e.target == modalShadow ) {
        modalForm.classList.remove('active')
        modalShadow.classList.remove('active')   

    }
})

