//-----------------------------------------------------------------------//
//jquery.subselect V1.0.0.0                                              //
//                                                                       //
//Author: Daniel Kelly, Dargonware Limited                               //
//Details: sub select list jquery add on                                 //
//                                                                       //
//Licensed under the MIT License.                                        //
//-----------------------------------------------------------------------//

//Jquery plugin architecture
(function ($) {
    //this is a jquery object, collection of select lists
    $.fn.initSubSelectSource = function () {
        return this.each(function (index, element) {
            var $select = $(element);//ensure we have a jquery object to work with
            var $source = $select.clone();
            var sourceId = $select.attr('id') + '-source';
            $source.prop('disabled', true).hide();
            $source.prop('required', false).hide();
            $source.attr('aria-required', '');
            $source.attr('data-parent-id', '');
            $source.attr('id', sourceId).attr('name', sourceId);
            $select.after($source);//this means that we have saved a data source with all options to the DOM
        });
    };

    $.fn.onSelectChange = function () {
        return this.each(function (index, element) {
            var $select = $(element);

            if (typeof $select.attr('data-parent-id') !== 'undefined' && $select.attr('data-parent-id') !== '') {
                //used to create reference to DOM element
                var parentId = '#' + $select.attr('data-parent-id');
                var sourceId = '#' + $select.attr('id') + '-source';
                //used to store the select list current options
                var currentValue = $select.val();

                var $parent = $(parentId);
                var $source = $(sourceId);
                var $options = $('option', $source);

                //clear the current select list item
                $select.html('');

                //add a select list item
                $.each($options, function (i, o) {
                    var dataParentKey = $(o).attr('data-parent-value');

                    if (typeof dataParentKey === 'undefined') {
                        $select.append($(o).clone());
                    } else if (dataParentKey == $parent.val()) {
                        $select.append($(o).clone());
                    }
                });

                //if we already have a value reset the value
                $('option[value="' + currentValue + '"]', $select).prop('selected', true);
            }

            //provide class to user to hide the select list if there are no options with data-parent-value
            $('select[data-parent-id]').each(function (index, element) {
                var controlId = $(element).attr('id');
                var optionsAvailable = $('option[data-parent-value]', element).length;
                if (optionsAvailable == 0) {
                    $(element).addClass('no-sub-select-options');//add the class from the select list
                    $('[data-related-sub-select=' + controlId + ']').addClass('no-sub-select-options');//add class to any related DOM elements
                } else {
                    $(element).removeClass('no-sub-select-options');//remove the class from the select list
                    $('[data-related-sub-select=' + controlId + ']').removeClass('no-sub-select-options');//add class to any related DOM elements
                }
            });
        });
    }
}(jQuery));