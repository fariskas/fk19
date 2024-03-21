// check for ios
var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

var style = document.createElement('style');
style.type = 'text/css';

var style_to_add = '';
for (var ii = 0; ii < data_cat.length; ii++) {
    style_to_add += '.has-cat_' + data_cat[ii].code.toLowerCase() + ' .cat_' + data_cat[ii].code.toLowerCase() + ' { visibility: visible; }';
    style_to_add += '.filtered.filtered_' + data_cat[ii].code.toLowerCase() + ' .cat_' + data_cat[ii].code.toLowerCase() + ' { opacity:1; }';
    style_to_add += '.filtered.filtered_' + data_cat[ii].code.toLowerCase() + ' .filter_' + data_cat[ii].code.toLowerCase() + ' { opacity:1; }';

    $('.filter ul').append(
        '\
				<li class="filter_' +
            data_cat[ii].code.toLowerCase() +
            '" data-type="' +
            data_cat[ii].code +
            '"><span class="code">' +
            data_cat[ii].code +
            '</span><span class="cat">' +
            data_cat[ii].title +
            '</span></li>\
			'
    );
}
style.innerHTML = style_to_add;

document.getElementsByTagName('head')[0].appendChild(style);

for (var i = 0; i < data_work.length; i++) {
    $('.section-right').append(
        '\
			<div class="grid grid-' +
            i +
            '">\
			</div>\
		'
    );

    if (data_work[i].title) {
        $('.grid-' + i).append(
            '\
				<span class="plus">\
					<img src="assets/icn/plus.svg">\
				</span>\
				<span class="work-title">' +
                data_work[i].title +
                '</span>\
				<ul class="work-graph">\
				</ul>\
			'
        );

        $('.grid-' + i).addClass('grid-with-work');
        $('.grid-' + i).attr('data-index', i);

        for (var z = 0; z < data_work[i].cat.length; z++) {
            $('.grid-' + i + ' .work-graph').addClass('has-cat_' + data_work[i].cat[z]);
        }

        for (var y = 0; y < data_cat.length; y++) {
            $('.grid-' + i + ' .work-graph').append(
                '\
					<li class="cat_dot cat_' +
                    data_cat[y].code.toLowerCase() +
                    '">\
						<div class="inner">\
							<span class="dot"></span><span class="cat_title">' +
                    data_cat[y].code +
                    '</span>\
						</div>\
					</li>\
				'
            );
        }
    } else {
        $('.grid-' + i).addClass('empty-grid empty-grid-' + i);
    }
}

$('.filter li').click(function () {
    var to_filter = $(this).attr('data-type').toLowerCase();

    if (!$('body').hasClass('filtered_' + to_filter)) {
        $('body').addClass('filtered filtered_' + to_filter);
    } else {
        $('body').removeClass('filtered_' + to_filter);
    }

    if ($('body').attr('class').indexOf('filtered_') == -1) {
        $('body').removeClass('filtered');
        $('.reset-filter, .filter-divider').removeClass('show');
    } else {
        $('.reset-filter, .filter-divider').addClass('show');
    }
});

$('.reset-filter').click(function () {
    $('body').attr('class', 'show-menu');
    $('.reset-filter, .filter-divider').removeClass('show');
});

$('.about-a').click(function () {
    if (!$('body').hasClass('show-about')) {
        $('.about-a').html('BACK TO FILTERS');
    } else {
        $('.about-a').html('ABOUT');
    }
    $('body').toggleClass('show-about');
});

$('.toggle-menu').click(function () {
    $('body').toggleClass('show-menu');
    if (!$('body').hasClass('show-menu')) {
        $('.toggle-menu').html('MENU & FILTERS');
    } else {
        $('.toggle-menu').html('CLOSE MENU & FILTERS');
    }
});

$('.grid-with-work').click(function () {
    $(this).addClass('active');
    $('body').addClass('show-work');
    $('body').removeClass('show-about');

    setTimeout(function () {
        $('.work-description').scrollTop(0);
    }, 100);

    var work_index = $(this).attr('data-index');

    $('.overlay-container').append(
        '\
			<div class="overlay-bg"></div>\
			<div class="overlay">\
				<span class="loading">LOADING</span>\
				<!--<img class="loading" src="assets/icn/loading.svg">-->\
			</div>\
		'
    );

    if (data_work[work_index].vimeo) {
        timed_video_append(data_work[work_index].vimeo);
    } else {
        timed_image_append(data_work[work_index]);
    }

    // <video src="assets/works/'+data_work[work_index].path+'/0.mp4" controls autoplay loop playsinline>\

    var work_desc = data_work[work_index].description + (data_work[work_index].url ? '<br><br><a target="_blank" href="' + data_work[work_index].url + '">VIEW SITE</a>' : '');

    $('.work-description').html(work_desc);

    $('.overlay-container, .work-description, .close-overlay').fadeIn('fast');
});

$('.overlay-container, .close-overlay').click(function () {
    $('.overlay-container').fadeOut('fast', function () {
        setTimeout(function () {
            $('.overlay-container').empty();
        }, 200);
    });
    $('.work-description, .close-overlay').fadeOut('fast');
    $('.grid-with-work').removeClass('active');
    $('body').removeClass('show-work');
});

function timed_video_append(vid_index) {
    setTimeout(function () {
        $('.overlay').append(
            '\
			<div style="padding:70.28% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/' +
                vid_index +
                '?autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>\
		'
        );
    }, 300);
}
function timed_image_append(workdata) {
    setTimeout(function () {
        $('.overlay').append(
            '\
			<div class="work-img" style="position:relative;"><img src="/assets/works/' +
                workdata.path +
                '/' +
                workdata.media[0] +
                '"></div>\
		'
        );
    }, 300);
}

//////// custom scrollbars for non ios only
var wrapper_all = document.querySelector('.wrapper');
if (!iOS) {
    new SimpleBar(wrapper_all);
} else {
    $('body').addClass('ios');
}
