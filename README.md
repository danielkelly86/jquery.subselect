# jquery.subselect
jquery add on for sub select lists

To use sub select, your sub select list will need the following markup

<div class="form-group">
  <label for="ID1">Category</label>
  <select class="form-control" id="ID1" name="ID1">
    <option selected="selected" value="">Please select..</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </select>
</div>
<div class="form-group" data-related-sub-select="ID2">
  <label for="ID2" data-related-sub-select="ID2">Sub Category</label>
  <select class="form-control" id="ID2" name="ID2" data-parent-id="ID1">
    <option selected="selected" value="">Please select..</option>
    <option data-parent-value="1" value="1">Option 1_1</option>
    <option data-parent-value="1" value="2">Option 1_2</option>
    <option data-parent-value="2" value="3">Option 2_1</option>
    <option data-parent-value="2" value="4">Option 2_2</option>
    <option data-parent-value="3" value="5">Option 3_1</option>
    <option data-parent-value="3" value="6">Option 3_2</option>
  </select>
</div>

Parameters

1. data-related-sub-select="ID2" this data attribute allows the plugin to add the class no-sub-select-options

The '.no-sub-select-options' css class can be used to hide sub select lists if they contain no options, alternativley if you do not wish to hide your sub select list then this class can be ignored.

2. data-parent-id="ID1"

This is how the plugin knows that the select list is a sub select list, this is used to determine which parent value has been selected so the relavant options of the sub select list can be displayed.

3. data-parent-value="1"

This is used to determine the option to display and is dependant on the parent select list value.

Init

To use the sub select list the following javascript will be needed to bind the events

$('select[data-parent-id]').initSubSelectSource();
$('select').onSelectChange();

$('select').change(function () {
  $('select').onSelectChange();
});

1. initSubSelectSource() is used to create data sources for each of the sub select lists. This is in the form of a hidden disabled select list inserted into the DOM directly after the sub select list.

2. onSelectChange() is used to determine changes to parent select lists and changes the values of the sub select lists. 
