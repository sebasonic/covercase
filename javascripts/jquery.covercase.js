(function($) {
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this);
                var settings = $this.data('covercase');

                if(typeof(settings) == 'undefined') {
                    var defaults = {
                        'width': "",
                        'height': "",
                        'scroll_orientation': "y"
                    }
                    settings = $.extend({}, defaults, options);
                    $this.data('covercase', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }
                var cc = $(this).addClass( "covercase" ).wrap( "<div class='covercase-wrap'></div>" ),
                    cc_wrap = cc.parent(".covercase-wrap"),
                    list_wrap = cc.wrap( "<div class='covercase-list-wrap'></div>" ).parent(".covercase-list-wrap"),
                    cover_list_top_pos = 0,
                    cover_list_left_pos = 0,
                    cover_case_height = 0,
                    cover_case_width = 0,
                    check_x_limits = function(event) {
                        cover_case_width = cc_wrap.outerWidth();
                        if(cover_list_left_pos >= 0 ){
                            cover_list_left_pos = 0;
                            cc_wrap.find(".left").hide();
                            cc_wrap.find(".right").show();
                        }else if (cover_list_left_pos <= (cover_case_width - cc.width())){
                            cover_list_left_pos = cover_case_width - cc.width();
                            cc_wrap.find(".right").hide();
                            cc_wrap.find(".left").show();
                        }else {
                            cc_wrap.find(".right").show();
                            cc_wrap.find(".left").show();
                        }
                    },
                    check_y_limits = function(event) {
                        cover_case_height = cc_wrap.outerHeight();
                        if (cover_list_top_pos >= 0) {
                            cover_list_top_pos = 0;
                            cc_wrap.find(".up").hide();
                            cc_wrap.find(".down").show();
                        } else if (cc.height() <= (cover_case_height-cover_list_top_pos)){
                            cover_list_top_pos = cover_case_height-cc.height();
                            cc_wrap.find(".down").hide();
                            cc_wrap.find(".up").show();
                        } else {
                            cc_wrap.find(".down").show();
                            cc_wrap.find(".up").show();
                        }
                    },
                    display_orientation = function( JQuery ) {
                        if (settings.scroll_orientation === "x"){
                            cc_wrap.addClass("covercase-x");
                            if (cc_wrap.width() > cc.width()){
                                cc_wrap.innerWidth(cc.width());
                            }else {
                                cc_wrap.append('<div class="arrow left"></div><div class="arrow right"></div>').find(".left").hide();
                                cc_wrap.find(".arrow").on('click', function(event){
                                    cover_list_left_pos = cc.position().left;
                                    if ($( this ).hasClass( "right" )) {
                                        cover_list_left_pos -= 200;
                                    } else if ($( this ).hasClass( "left" )) {
                                        cover_list_left_pos += 200;
                                    }
                                    check_x_limits.call();
                                    list_wrap.animate({scrollLeft: Math.abs(cover_list_left_pos)}, 500);
                                });
                                list_wrap.on('mousewheel', function(event) {
                                    event.preventDefault();
                                    cover_list_left_pos += event.deltaY * event.deltaFactor;
                                    check_x_limits.call();
                                    $(this).scrollLeft(Math.abs(cover_list_left_pos));
                                });
                                list_wrap.on('touchmove', function(e) {
                                    cover_list_left_pos = cc.position().left;
                                    check_x_limits.call();
                                });
                            }
                        }
                        if (settings.scroll_orientation === "y"){
                            cc_wrap.addClass("covercase-y" );
                            if (cc_wrap.height() > cc.height()){
                                cc_wrap.innerHeight(cc.height());
                            }else {
                                cc_wrap.append('<div class="arrow up"></div><div class="arrow down"></div>').find(".up").hide();
                                cc_wrap.find(".arrow").on('click', function(event){
                                    cover_list_top_pos = cc.position().top;
                                    if ($( this ).hasClass( "down" )) {
                                        cover_list_top_pos -= 200;
                                    } else if ($( this ).hasClass( "up" )) {
                                        cover_list_top_pos += 200;
                                    }
                                    check_y_limits.call();
                                    list_wrap.animate({scrollTop: Math.abs(cover_list_top_pos)}, 500);
                                });
                                list_wrap.scroll(function() {
                                    cover_list_top_pos = cc.position().top;
                                    check_y_limits.call();
                                });
                            }
                        }
                    };
                    
                if (settings.height) {cc_wrap.innerHeight(settings.height)}
                if (settings.width) {cc_wrap.innerWidth(settings.width)}

                display_orientation();

                cc.trigger("cc_init", [{
                    "scroll_orientation": settings.scroll_orientation,
                    "width": cc_wrap.outerWidth(),
                    "height": cc_wrap.outerHeight()
                }]);
            });
        },
        destroy: function(options) {
            return $(this).each(function() {
                if(typeof($(this).data("covercase")) != 'undefined') {
                    var $this = $(this);
                    $this.off('covercase');
                    $this.off('mousewheel');
                    $('.covercase-wrap .arrow').remove();
                    $this.unwrap().unwrap();
                    $this.removeClass("covercase");
                    $this.removeAttr( "style" );
                    $this.removeData('covercase');
                    $(this).trigger("cc_destroyed", true);
                }
            });
        },
        resize_to: function(new_size) {
            return $(this).each(function() {
                if(typeof($(this).data("covercase")) != 'undefined') {
                    var     settings = $(this).data("covercase"),
                            list_wrap = $(this).parent(),
                            cc_wrap = list_wrap.parent();

                    if (new_size.height>=0) { cc_wrap.css('height', new_size.height)}
                    if (new_size.width>=0 ) {cc_wrap.css('width', new_size.width)}

                    if (settings.scroll_orientation === "x") {
                        if (new_size.height>=0) { list_wrap.css('height', new_size.height+20)}
                    } else if (settings.scroll_orientation === "y") {
                        if (new_size.width>=0 ) {list_wrap.css('width', new_size.width)}
                    }

                    $.extend($(this).data("covercase"), {
                        'width': cc_wrap.outerWidth(),
                        'height': cc_wrap.outerHeight()
                    });
                    $(this).trigger("cc_resize", [{
                        "width": cc_wrap.outerWidth(),
                        "height": cc_wrap.outerHeight()
                    }]);
                }
            });
        },
        add_first_elem: function(elem_id) {
            return $(this).each(function() {
            });
        },
        add_last_elem: function(elem_id) {
            return $(this).each(function() {
            });
        },
        update_elem: function(elem_id) {
            return $(this).each(function() {
            });
        },
        remove_elem: function(elem_id) {
            return $(this).each(function() {
            });
        },
        toggle_orientation: function(elem_id) {
            return $(this).each(function() {
            });
        }
    };

    $.fn.covercase = function() {
        var method = arguments[0];
 
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.covercase' );
            return this;
        }
 
        return method.apply(this, arguments);
 
    }
 
})(jQuery);
