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
      form: '.filters form',
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

  const filters = [];


  function render () {

    for (let book of dataSource.books) {

      let rating = book.rating;
      const ratingWidth = rating*10;
      const ratingBgc = determineRatingBgc (rating);

      const generatedHTML = template.templateBook (book, ratingBgc, ratingWidth);

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

    const bookForm = document.querySelector (select.book.form);
    console.log ('book form', bookForm);

    bookForm.addEventListener ('click', function (event) {

      console.log ('click');

      const clickedElement = event.target;
      console.log ('clicked element', clickedElement);

      if (clickedElement.tagName === 'input' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {

        console.log (clickedElement.value);

      } if (clickedElement.checked) {

        filters.push (clickedElement.value);
        console.log (filters);
      }

      else {

        const indexOfFilters = filters.indexOf (clickedElement.value);
        filters.splice (indexOfFilters, 1);
        console.log (filters);

      }

      filterBooks ();

    });
  }

  initActions ();


  function filterBooks () {

    for (let book of dataSource.books) {

      let shouldBeHidden = false;

      for (let filter of filters) {

        if (!book.details[filter]) {

          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden) {

        book = document.querySelector ('.book__image[data-id="' + book.id + '"]').classList.add ('hidden');

      }

      else {

        book = document.querySelector ('.book__image[data-id="' + book.id + '"]').classList.remove ('hidden');

      }
    }
  }

  function determineRatingBgc (rating) {

    let background = '';

    if (rating < 6) {

      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

    } else if (rating > 6 && rating <= 8) {

      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

    } else if (rating > 8 && rating <= 9) {

      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

    } else if (rating > 9) {

      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;

  }
}

