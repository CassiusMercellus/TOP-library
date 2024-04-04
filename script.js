document.addEventListener("DOMContentLoaded", function() {

    const myLibrary = [];

    let newBookbtn = document.querySelector("#newBook");
    newBookbtn.addEventListener("click", function() {
        let newBookForm = document.querySelector("#newBookForm");
        newBookForm.style.display = "flex";
    })
    document.querySelector("#newBookForm").addEventListener( 'submit', function(event) {
        event.preventDefault();
        addBookToLibrary();
    }); 

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.toggleRead = function() {
        console.log("called")
        this.read = !this.read;
    }
    function toggleRead(index) {
        console.log("toggleRead called with index", index);
        myLibrary[index].toggleRead();
        render();
    }


    function render() {
        let libraryEl = document.querySelector("#library");
        libraryEl.innerHTML = "";
        
        for (let i = 0; i < myLibrary.length; i++) {
            let book = myLibrary[i];
            let bookEl = document.createElement("div");
            bookEl.setAttribute("class", "book-card");
            bookEl.innerHTML = `
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h5 class="author">${book.author}</h5>
            </div>
            <div class="card-body">
                <p class="pages">${book.pages} pages</p>
                <p class="read-status">Status: ${book.read ? "Read" : "Not Read Yet"}</p>
            </div>
            <div class="card-btn">
                <button class="remove-btn">Remove</button>
                <button class="toggle-read-btn">Toggle Read</button>
            </div>
            `;
            
            // Attach event listeners
            let removeBtn = bookEl.querySelector(".remove-btn");
            removeBtn.addEventListener("click", function() {
                removeBook(i);
            });
    
            let toggleReadBtn = bookEl.querySelector(".toggle-read-btn");
            toggleReadBtn.addEventListener("click", function() {
                toggleRead(i);
            });
    
            libraryEl.appendChild(bookEl);
        }
    }

    
    function removeBook(index) {
        console.log("removeBook called with index", index);
        myLibrary.splice(index, 1);
        render();
    }

    function addBookToLibrary() {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let read = document.querySelector("#read").value;
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        render()
    }

})