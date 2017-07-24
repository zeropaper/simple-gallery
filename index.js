$(document).ready(function () {
  var $body = $('body');

  $.getJSON('data.json', function(array) {
    // we create a jQuery h1 element for the title
    var $h1 = $('<h1>Welcome</h1>');
    var $link = $('<a target="_blank" id="author-link"></a>');

    // we create a jQuery list element for the page
    var $ul = $('<ul id="pager"></ul>');

    // for each items in the array
    // for (var index = 0; index < array.length; index++) {}
    array.forEach(function(item, index) {
      // we create a jQuery list item
      var $li = $('<li>' + (index + 1) + '</li>');

      $li.on('click', function() {
        $h1.text(item.title);
        $body.css('background-image', 'url('+item.src+')');
        $link
          .text('Photos by ' + item.author)
          .attr('href', item.link);
        $('#pager li').removeClass('active');
        $(this).addClass('active');
      });

      // that we add to the list ($ul)
      $ul.append($li);

      // if this is the first item,
      // we simulate a "click" on it to show the first image
      if (index === 0) $li.trigger('click');
    });


    var $backButton = $('<div class="big-button back">&laquo;</div>');
    $backButton.on('click', function() {
      var listItemText = $('li.active').text();
      var currentIndex = Number(listItemText) - 1;

      // to go back, we subtract 1 to the current index
      var wantedIndex = currentIndex - 1;
      if (wantedIndex === -1) {
        wantedIndex = array.length - 1;
      }

      $('li').eq(wantedIndex).trigger('click');
    });

    var $nextButton = $('<div class="big-button next">&raquo;</div>');
    $nextButton.on('click', function() {
      var listItemText = $('li.active').text();
      var currentIndex = Number(listItemText) - 1;

      var wantedIndex = currentIndex + 1;
      if (wantedIndex === array.length) {
        wantedIndex = 0;
      }

      $('li').eq(wantedIndex).trigger('click');
    });

    $('body').append($h1, $ul, $link, $backButton, $nextButton);
  });
});
