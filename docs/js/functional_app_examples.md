https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/ch6.html

```javascript

requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
  },
});

require([
    'ramda',
    'jquery',
  ],
  function(_, $) {
    ////////////////////////////////////////////
    // Utils

    const Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),

      setHtml: _.curry(function(sel, html) {
        $(sel).html(html);
      }),
    };

    const img = function(url) {
      return $('<img />', {
        src: url,
      });
    };

    const trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });

    const url = function(t) {
      return 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' +
        t + '&format=json&jsoncallback=?';
    };

    const mediaUrl = _.compose(_.prop('m'), _.prop('media'));
    const mediaToImg = _.compose(img, mediaUrl);
    const images = _.compose(_.map(mediaToImg), _.prop('items'));
    const renderImages = _.compose(Impure.setHtml('body'), images);
    const app = _.compose(Impure.getJSON(renderImages), url);

    app('cats');
  });

```