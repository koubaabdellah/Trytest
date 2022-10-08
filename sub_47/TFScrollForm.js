
$(document).ready(function ()
{
  //'Setting' variables defined so they can be easily modified.
  //This can be different depending on TF style configuration.
  //next-quest-button css class used to find the next question button.
  var nextQuestionButtonClass = "next-question-button";
  //jquery selector used to find an element that "overrides" other focus logic.
  var focusOverrideElementSelector = "#setFocusHere";
  //Should skip focus if the current step is the first step in the scenario.
  var skipFocusForFirstStep = false;
  //Should skip focus if the current block is the first block in the current step.
  var skipFocusForFirstBlock = false;

  //Determine if focusing must continue if there is no "focus override" element found.
  var skipSetFocus = (skipFocusForFirstStep && TF.CurrentStep.IsFirstStep)
                    || (skipFocusForFirstBlock && TF.CurrentStep.InFirstBlock);

  //Attempt to override focus with a custom control with id 'setFocusHere'
  var focusOverrideElement = $(focusOverrideElementSelector);
  if (focusOverrideElement.length > 0)
  {
    $(window).scrollTop(focusOverrideElement.first().offset().top);
  }
  else if (!skipSetFocus)
  {
    //Helper variable and function to set focus.  
    var _focusSet = false;
    var TrySetFocus = function (control)
    {
      if (control !== undefined)
      {
        _focusSet = true;
        $(control).focus();
      }
    }

    var ItemValueIsNullOrEmpty = function (item)
    {
      var itemValue = $(item).val();
      return itemValue == null || itemValue.length == 0;
    }

    // Select last visible inputfield. This makes the browser scroll to the bottom of the page.
    //form:input:visible:last not working in chrome. split it up.
    $("form").find("input:visible:last").focus();

    // Select first visible & empty inputfield
    // If no empty inputfield exists, select first inputfield
    var visibleFocusableControls = $("form").find(":input:visible[type!='submit'][type!='button'],select:visible");
    visibleFocusableControls.each(function (index, item)
    {
      var $item = $(item);
      //Input special focus handling per item.
      if ($item.is("input"))
      {
        if ($item.attr("type") == "file")
        {
          var summaryId = "ctlSummary";
          var fieldID = $item.attr("id").toString();
          var lastDelimiterIndex = fieldID.lastIndexOf("_");
          var baseId = fieldID.substring(0, lastDelimiterIndex + 1);
          var summarySpan = $item.parent().find("#" + baseId + summaryId);
          var HasAnswer = summarySpan.find("table").children().length > 0;
          if (HasAnswer)
          {
            //Try to focus the next item.
            return;
          }
        }
        else if ($item.attr("type") == "checkbox" || $item.attr("type") == "radio")
        {
          var hasCheckedItems = $item.parent().find(":checked");
          if (hasCheckedItems.length > 0)
          {
            //try to focus the next item as this radio/checkbox list has an answer.
            return;
          }
        }
        else if ($item.attr("type") == "text")
        {
          // check if text-value is filled. 
          if (!ItemValueIsNullOrEmpty($item))
          {
            // Try to focus the next item as this text-value has an answer already.
            return;
          }
        }
      }
      else if ($item.is('select'))
      {
        // check if item.value is filled.        
        if (!ItemValueIsNullOrEmpty($item))
        {
          //try to focus the next item as this select item has an answer.
          //selection list always has an answer. this is only empty if the current answer has no key value.
          return;
        }
      }

      TrySetFocus($item);
      return false;
    });

    //If focus has not been set, try to focus the next question button.
    if (!_focusSet)
    {
      //No controls, try to find the next question button. (is submit input and visible)
      var nextButton = $("form").find(":input:visible." + nextQuestionButtonClass).last();

      //Try to set focus to the next question button.
      TrySetFocus(nextButton);
    }
  }
});