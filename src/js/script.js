{
  'use strict';

  const select = {

    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      bookContainer: '.books-list',
    },

    book: {
      cover: '.books-list .book__image',
    }
  };

  const classNames = {
    book: {
      favorite: 'favorite',
    },
  };

  const template = {

    templateBook: Handlebars.compile (document.querySelector ('#template-book').innerHTML),

  };

  /* Get elements */

  const bookContainer = document.querySelector (select.containerOf.bookContainer);
  console.log ('books container', bookContainer);

  function render () {

    for (let book of dataSource.books) {

      const generatedHTML = template.templateBook (book);

      const bookElement = utils.createDOMFromHTML (generatedHTML);

      bookContainer.appendChild (bookElement);

    }
  }

  render ();

  function initActions () {

    const favoriteBooks = [];

    const bookCover = document.querySelectorAll (select.book.cover);
    console.log ('book cover', bookCover);

    for (let bookItem of bookCover) {

      bookContainer.addEventListener ('dblclick', function (event) {

        console.log ('click');

        event.preventDefault ();
        const clickedElement = event.target.offsetParent;
        console.log ('clicked element', clickedElement);

        const bookId = bookItem.getAttribute ('data-id');

        if (!favoriteBooks.includes(bookId) && !clickedElement.classList.contains ('.book__image')) {

          clickedElement.classList.add (classNames.book.favorite);
          favoriteBooks.push (bookId);

        }

        else {

          clickedElement.classList.remove (classNames.book.favorite);
          const indexOfBook = favoriteBooks.indexOf (bookId);
          favoriteBooks.splice(indexOfBook, 1);

        }
      });
    }
  }

  initActions ();

}

