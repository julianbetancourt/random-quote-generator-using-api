//Get quote when page loads
getQuote();

function getQuote() {

  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/',
    jsonp: 'jsonp',
    dataType: 'jsonp',
    data: {
      method: 'getQuote',
      lang: 'en',
      format: 'jsonp'
    }
  })
  .always(function(data) {
    $('.quote').text(data.quoteText);
    $('.guy').text(data.quoteAuthor);

    var $quote = $('.quote');
    var $author = $('.author');
    var $text = $quote.text() + $author.text();
    $text = $text.split('');
    $('.tweet').attr('target', '_blank');
    for (var i = 0; i < $text.length; i++) {
      if ($text[i] === ';') {
        $text[i] = $text[i].replace($text[i], '');
      }
    }
    $text = $text.join('');
    if ($text.length > 140) {
      $text = $text.slice(0, 140 - 4 - $author.text().length) + '... ' + $author.text();
    }
    $('.tweet').attr('href', 'https://twitter.com/intent/tweet?text=' + $text);
  });
}

$('.next').click(getQuote);
