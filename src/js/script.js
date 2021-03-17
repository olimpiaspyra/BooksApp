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

  class BooksList {
    constructor () {

      const thisBooksList = this;

      thisBooksList.initData ();
      thisBooksList.getElements ();
      thisBooksList.render ();
      thisBooksList.initActions ();
      thisBooksList.filterBooks ();
      thisBooksList.determineRatingBgc ();

    }

    initData () {

      const thisBooksList = this;

      thisBooksList.data = dataSource.books;

    }

    getElements () {

      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector (select.containerOf.bookContainer);
      console.log ('books container',  thisBooksList.bookContainer);

      thisBooksList.bookForm = document.querySelector (select.book.form);
      console.log ('book form', thisBooksList.bookForm);

      thisBooksList.bookCover = document.querySelectorAll (select.book.cover);
      console.log ('book cover', thisBooksList.bookCover);

    }

    render () {

      const thisBooksList = this;

      for (let book of dataSource.books) {

        const generatedHTML = template.templateBook ({

          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          ratingWidth: book.rating*10,
          ratingBgc: thisBooksList.determineRatingBgc (book.rating),

        });

        const bookElement = utils.createDOMFromHTML (generatedHTML);

        thisBooksList.bookContainer.appendChild (bookElement);

      }
    }

    initActions () {

      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];

      thisBooksList.bookContainer.addEventListener ('dblclick', function (event) {

        console.log ('click');

        event.preventDefault ();
        const clickedElement = event.target.offsetParent;
        console.log ('clicked element', clickedElement);

        const bookId = clickedElement.getAttribute ('data-id');

        if (!thisBooksList.favoriteBooks.includes(bookId) && !clickedElement.classList.contains ('.book__image')) {

          clickedElement.classList.add (classNames.book.favorite);
          thisBooksList.favoriteBooks.push (bookId);

        }

        else {

          clickedElement.classList.remove (classNames.book.favorite);
          const indexOfBook = thisBooksList.favoriteBooks.indexOf (bookId);
          thisBooksList.favoriteBooks.splice(indexOfBook, 1);

        }
      });

      thisBooksList.bookForm.addEventListener ('click', function (event) {

        console.log ('click');

        const clickedElement = event.target;
        console.log ('clicked element', clickedElement);

        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {

          console.log (clickedElement.value);

          if (clickedElement.checked) {

            thisBooksList.filters.push (clickedElement.value);
            console.log (thisBooksList.filters);
          }

          else {

            const indexOfFilters = thisBooksList.filters.indexOf (clickedElement.value);
            thisBooksList.filters.splice (indexOfFilters, 1);
            console.log (thisBooksList.filters);

          }}

        thisBooksList.filterBooks ();

      });
    }

    filterBooks () {

      const thisBooksList = this;

      thisBooksList.filters = [];

      for (let book of thisBooksList.data) {

        let shouldBeHidden = false;

        for (let filter of thisBooksList.filters) {

          if (!book.details[filter]) {

            shouldBeHidden = true;
            break;

          }
        }

        if (shouldBeHidden) {

          const bookItem = document.querySelector ('.book__image[data-id="' + book.id + '"]');
          bookItem.classList.add ('hidden');
          console.log ('book item add', bookItem);

        }

        else {

          const bookItem = document.querySelector ('.book__image[data-id="' + book.id + '"]');
          bookItem.classList.remove ('hidden');
          console.log ('book item remove', bookItem);

        }
      }
    }

    determineRatingBgc (rating) {

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

  const app = {

    init: function () {
      new BooksList ();

    }
  };

  app.init ();

}

