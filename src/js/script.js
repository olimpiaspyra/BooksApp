{
  'use strict';

  const select = {

    templateOf: {
      book: '#template-book',
    },

    containerOf: {

      bookContainer: '.books-list',
    }
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

}

