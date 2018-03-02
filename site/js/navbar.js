(function($) {

  $.fn.menumaker = function(options) {

      var navbar = $(this), settings = $.extend({
        title: "Stones Lanes",
        format: "dropdown",
        breakpoint: 768,
        sticky: false
      }, options);

      return this.each(function() {
        navbar.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          navbar.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) {
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            navbar.find(".has-sub").prepend('<span class="submenu-button"></span>');
            navbar.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else navbar.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          navbar.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = navbar.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          navbar.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) navbar.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            navbar.find('ul').show();
            navbar.removeClass('small-screen');
            if (settings.format === 'select') {
              navbar.find('select').hide();
            }
            else {
              navbar.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !navbar.hasClass("small-screen")) {
            navbar.find('ul').hide().removeClass('open');
            navbar.addClass('small-screen');
            if (settings.format === 'select') {
              navbar.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$(document).ready(function() {
  $("#navbar").menumaker({
    title: "Stones Lanes",
    format: "dropdown"
  });

  $("#navbar a").each(function() {
  	var linkTitle = $(this).text();
  	$(this).attr('data-title', linkTitle);
  });
});

});
})(jQuery);
