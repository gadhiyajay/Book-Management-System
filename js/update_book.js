document.addEventListener('DOMContentLoaded', function() {
    // Retrieve books from local storage
    var books = JSON.parse(localStorage.getItem('books')) || [];

    // Get the container where the books will be displayed
    var kanbanContainer = document.querySelector('.kanban-container');

    // Loop through each book and create a card for it
    books.forEach(function(book) {
        var kanbanCard = document.createElement('div');
        kanbanCard.classList.add('kanban-card');

        var bookImage = document.createElement('img');
        bookImage.classList.add('book-image');
        bookImage.src = book.imageUrl.replace('url("', '').replace('")', ''); // Extracting URL from style attribute
        bookImage.alt = book.name;

        var bookDetails = document.createElement('div');
        bookDetails.classList.add('book-details');

        var bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.name;

        var bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        var bookAuthor = document.createElement('div');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        var bookPrice = document.createElement('div');
        bookPrice.classList.add('book-price');
        bookPrice.textContent = '₹ ' + book.price;

        // Append elements to book details
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPrice);

        bookDetails.appendChild(bookTitle);
        bookDetails.appendChild(bookInfo);

        // Append book image and details to kanban card
        kanbanCard.appendChild(bookImage);
        kanbanCard.appendChild(bookDetails);

        // Append kanban card to container
        kanbanContainer.appendChild(kanbanCard);
    });
});
