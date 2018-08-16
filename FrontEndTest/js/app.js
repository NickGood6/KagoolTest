var accordionItems = document.getElementsByClassName('beer-accordion__item'),
    accordionHeadings = document.getElementsByClassName('beer-accordion__item__header'),
    heroCarousel = $('.hero-slideshow'),
    controlledCarousel = $('.cycle-slideshow--controlled');

$.get('https://api.punkapi.com/v2/beers', function (data) {

    var beers = [],
        beersList = document.getElementById('beer-accordion');

    for (var i = 0; i < 18; i++) {
        beers.push(data[i]);
    }

    for (var i = 0; i < 6; i++) {
        var beer = $('<li>', { class: 'beer-accordion__item closed' }),
            beerHeader = $('<a>', { href: '#', class: 'beer-accordion__item__header' }),
            beerHeaderTitle = $('<span>' + data[i].name + '</span>'),
            beerContent = $('<div>', { class: 'beer-accordion__item__content'}),
            beerContentCopy = $('<p>' + data[i].description + '</p>');

        beerHeaderTitle.appendTo(beerHeader);
        beerContentCopy.appendTo(beerContent)
        beer.appendTo(beersList);
        beerHeader.appendTo(beer);
        beerContent.appendTo(beer);
    }

    for (var i = 6; i < 18; i++) {
        var beerCTAContainer = $('.cta-beer-grid'),
            beerCTA = $('<a>', { class: 'cta-beer-grid__item', style: 'background-image: url("' + data[i].image_url + '")' }),
            beerCTATitle = $('<h3>' + data[i].name + '</h3>');

        beerCTATitle.appendTo(beerCTA);

        beerCTA.appendTo(beerCTAContainer);

    }
});

$(document).on('click', '.beer-accordion__item__header', function (e) {
    e.preventDefault();
    var thisItemContentClass = this.parentNode.className;
    for (i = 0; i < accordionItems.length; i++) {
        accordionItems[i].className = 'beer-accordion__item closed';
    }
    if (thisItemContentClass = 'beer-accordion__item closed') {
        this.parentNode.className = 'beer-accordion__item open';
    }
});

$(heroCarousel).cycle({
    speed: 500,
    manualSpeed: 200
});

$('.cycle-slideshow-controls__prev').click(function (e) {
    $(controlledCarousel).cycle('prev');
    e.preventDefault();
});

$('.cycle-slideshow-controls__next').click(function (e) {
    $(controlledCarousel).cycle('next');
    e.preventDefault();
});

$('.cycle-slideshow-controls__add').click(function (e) {
    $(controlledCarousel).cycle('add', '<img src="dist/img/carousel-images/img1.png" />');
    e.preventDefault();
});
