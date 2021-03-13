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

  function render () {

    for (let book of dataSource.books) {

      const generatedHTML = template.templateBook (book);

      const bookElement = utils.createDOMFromHTML (generatedHTML);

      const bookContainer = document.querySelector (select.containerOf.bookContainer);
      console.log ('books container', bookContainer);

      bookContainer.appendChild (bookElement);

    }
  }

  render ();

  function initActions () {

    const favoriteBooks = [];

    const bookCover = document.querySelectorAll (select.book.cover);
    console.log ('book cover', bookCover);

    for (let bookItem of bookCover) {

      bookItem.addEventListener ('dblclick', function (event) {

        console.log ('click');
        event.preventDefault ();
        bookItem.classList.add (classNames.book.favorite);
        const bookId = bookItem.getAttribute ('data-id');
        favoriteBooks.push (bookId);

      });
    }
  }

  initActions ();

}

