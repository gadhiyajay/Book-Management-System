document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookList').addEventListener('submit', function(event) {
        event.preventDefault();
        var bookName = document.getElementById('bookName').value;
        var bookAuthor = document.getElementById('bookAuthor').value;
        var bookPrice = document.getElementById('bookPrice').value;
        var bookImage = document.getElementById('bookImage').files[0];
        var publishDate = document.getElementById('publishDate').value;
        var bookId = Date.now();
        var formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('bookAuthor', bookAuthor);
        formData.append('bookPrice', bookPrice);
        formData.append('bookImage', bookImage);
        formData.append('publishDate', publishDate);
        var books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({
            id: bookId,
            name: bookName,
            author: bookAuthor,
            price: bookPrice,
            imageUrl: URL.createObjectURL(bookImage),
            publishDate: publishDate
        });
        localStorage.setItem('books', JSON.stringify(books));
        document.getElementById('bookForm').reset();
        alert('Book added successfully!');
    });

    function displayBooks() {
        var bookList = document.getElementById('bookList');
        var books = JSON.parse(localStorage.getItem('books')) || [];
        bookList.innerHTML = '';
        books.forEach(function(book) {
            var row = `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate}</td>
                </tr>
            `;
            bookList.innerHTML += row;
        });
    }

    displayBooks();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookList').addEventListener('submit', function(event) {
        event.preventDefault();
        var bookName = document.getElementById('bookName').value;
        var bookAuthor = document.getElementById('bookAuthor').value;
        var bookPrice = document.getElementById('bookPrice').value;
        var bookImage = document.getElementById('bookImage').files[0];
        var publishDate = document.getElementById('publishDate').value;
        var bookId = books.length + 1
        var formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('bookAuthor', bookAuthor);
        formData.append('bookPrice', bookPrice);
        formData.append('bookImage', bookImage);
        formData.append('publishDate', publishDate);
        var books = JSON.parse(localStorage.getItem('books')) || [];
        books.push({
            id: bookId,
            name: bookName,
            author: bookAuthor,
            price: bookPrice,
            imageUrl: URL.createObjectURL(bookImage),
            publishDate: publishDate
        });
        localStorage.setItem('books', JSON.stringify(books));
        document.getElementById('bookForm').reset();
        alert('Book added successfully!');
        displayBooks();
    });

    function displayBooks() {
        var bookList = document.getElementById('bookList');
        var books = JSON.parse(localStorage.getItem('books')) || [];
        bookList.innerHTML = '';
        books.forEach(function(book) {
            var row = `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate}</td>
                    <td>
                        <button id="editBookForm" class="btn btn-primary btn-sm edit-btn" data-book-id="${book.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-book-id="${book.id}">Delete</button>
                    </td>
                </tr>
            `;
            bookList.innerHTML += row;
        });
        // attachEditButtonListeners();
        attachDeleteButtonListeners();
    }


    document.addEventListener('DOMContentLoaded', function() {
        // Function to attach event listeners to edit buttons
        function attachEditButtonListeners() {
            var editButtons = document.querySelectorAll('.edit-btn');
            editButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    var bookId = button.getAttribute('data-book-id');
                    var books = JSON.parse(localStorage.getItem('books')) || [];
                    var book = books.find(function(book) {
                        return book.id == bookId;
                    });
                    if (book) {
                        // Set values only if the elements exist in the DOM
                        var bookNameElement = document.getElementById('bookName');
                        var bookAuthorElement = document.getElementById('bookAuthor');
                        var bookPriceElement = document.getElementById('bookPrice');
                        if (bookNameElement && bookAuthorElement && bookPriceElement) {
                            bookNameElement.value = book.name;
                            bookAuthorElement.value = book.author;
                            bookPriceElement.value = book.price;
                        } else {
                            alert('One or more input elements not found!');
                        }
                        alert('Edit book with ID: ' + bookId);
                    } else {
                        alert('Book not found!');
                    }
                });
            });
        }
        
        attachEditButtonListeners();
    });
    

    function attachDeleteButtonListeners() {
        var deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var bookId = button.getAttribute('data-book-id');
                var books = JSON.parse(localStorage.getItem('books')) || [];
                var bookToDelete = books.find(function(book) {
                    return book.id == bookId;
                });
                if (confirm(`Are you sure you want to delete "${bookToDelete.name}"?`)) {
                    var updatedBooks = books.filter(function(book) {
                        return book.id != bookId;
                    });
                    localStorage.setItem('books', JSON.stringify(updatedBooks));
                    displayBooks();
                    alert('Book deleted successfully!');
                } else {
                    alert('Deletion canceled!');
                }
            });
        });
    }

    displayBooks();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('editBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var bookId = document.getElementById('editBookId').value;
        var bookName = document.getElementById('editBookName').value;
        var bookAuthor = document.getElementById('editBookAuthor').value;
        var bookPrice = document.getElementById('editBookPrice').value;
        var bookImage = document.getElementById('editBookImage').files[0];
        var publishDate = document.getElementById('editPublishDate').value;
        var books = JSON.parse(localStorage.getItem('books')) || [];
        var bookIndex = books.findIndex(function(book) {
            return book.id == bookId;
        });
        if (bookIndex !== -1) {
            books[bookIndex] = {
                id: bookId,
                name: bookName,
                author: bookAuthor,
                price: bookPrice,
                imageUrl: bookImage ? URL.createObjectURL(bookImage) : books[bookIndex].imageUrl,
                publishDate: publishDate
            };
            localStorage.setItem('books', JSON.stringify(books));
            $('#editBookForm').modal('hide');
            displayBooks();
            alert('Book edited successfully!');
        } else {
            alert('Book not found!');
        }
    });
    
    function populateEditBookModal(bookId) {
        var books = JSON.parse(localStorage.getItem('books')) || [];
        var book = books.find(function(book) {
            return book.id == bookId;
        });
        if (book) {
            document.getElementById('modal_img').src = book.imageUrl.replace('url("', '').replace('")', '');
            document.getElementById('editBookId').value = book.id;
            document.getElementById('editBookName').value = book.name;
            document.getElementById('editBookAuthor').value = book.author;
            document.getElementById('editBookPrice').value = book.price;
            document.getElementById('editPublishDate').value = book.publishDate;
        } else {
            alert('Book not found!');
        }
        
}

    function attachEditButtonListeners() {
        var editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var bookId = button.getAttribute('data-book-id');
                populateEditBookModal(bookId);
                jQuery(document).ready(function ($) {
                    $('#editBookForm').modal('toggle');
                });
            });
        });
    }
    attachEditButtonListeners();
});

function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td1, td2, td3, i, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("myInput");
    filter = input.value.trim().toUpperCase();

    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[0];
        td3 = tr[i].getElementsByTagName("td")[4];
        if (td1 && td2 && td3) {
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td3.innerText;

            txtValue1 = txtValue1.trim().toUpperCase();
            txtValue2 = txtValue2.trim().toUpperCase();
            txtValue3 = txtValue3.trim().toUpperCase();
            if (txtValue1.indexOf(filter) > -1 || txtValue2.indexOf(filter) > -1 || txtValue3.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.getElementById("myInput").addEventListener("input", searchFunction);