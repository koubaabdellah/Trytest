$( document ).ready(function() {

	$('.navbar-toggle').click(function() {
		$('ul.navbar-nav').slideToggle();
	});

	$('.btn-advanced').click(function() {
		$(this).toggleClass('active');
		$('.advanced').slideToggle();
	});

    $('.btn-advanced').click(function() {
        $(this).toggleClass('results-hidden');
        $('.resultswrapper').slideToggle();
    });

    $('.btn-advanced').click(function() {
        $(this).toggleClass('results-hidden');
        $('.detailwrapper').slideToggle();
    });

	$('#table-one').click(function() {
		$('.table-not-show-one').slideToggle();
		$('#table-one').toggleClass('active');
	});

    $('#table-two').click(function() {
        $('.table-not-show-two').slideToggle();
        $('#table-two').toggleClass('active');
    });

    $('#table-three').click(function() {
        $('.table-not-show-three').slideToggle();
        $('#table-three').toggleClass('active');
    });

	$('.list-item').click(function() {
		$('.list-item > .content').slideToggle();
		$(this).toggleClass('active');
	});

    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);
});