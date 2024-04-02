// Function to handle form submission
document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form inputs
    var bookName = document.getElementById('book-name').value;
    var publishDate = document.getElementById('publish-date').value;
    var authorName = document.getElementById('author-name').value;
    var price = document.getElementById('price').value;
    var imageUrl = document.getElementById('imagePreview').style.backgroundImage;

    // Get the existing books from local storage or create an empty array if none exists
    var books = JSON.parse(localStorage.getItem('books')) || [];

    // Increment book id counter
    var bookId = books.length + 1;

    // Create a book object
    var book = {
        id: bookId,
        name: bookName,
        publishDate: publishDate,
        author: authorName,
        price: price,
        imageUrl: imageUrl
    };

    // Add the new book to the array of books
    books.push(book);

    // Store the updated array of books in local storage
    localStorage.setItem('books', JSON.stringify(books));

    // Reset the form fields
    document.getElementById('book-name').value = '';
    document.getElementById('publish-date').value = '';
    document.getElementById('author-name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('imagePreview').style.backgroundImage = '';

    // Optional: Display a message or perform any other actions after adding the book
    alert('Book "' + bookName + '" added successfully!');
});
document.getElementById('imageUpload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var imagePreview = document.getElementById('imagePreview');

    if (file) {
        var reader = new FileReader();
        reader.onload = function() {
            imagePreview.style.backgroundImage = 'url(' + reader.result + ')';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.backgroundImage = '';
    }
});
