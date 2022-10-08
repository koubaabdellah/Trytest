$(document).ready(function () {
    var topMenuContainer = $(".menu-top-container"),
          menuClassName = ".stepmenu",
          menu = $(menuClassName),
          stepMenuListItemSelector = menuClassName + " li",
          stepMenuListItem = $(menuClassName + " li"),
          oldMenuLength = stepMenuListItem.length,
          currentActiveListItem = "li.stepmenu-item-active, li.stepmenu-item-activeanswered",
          dotsElements = '<li class="stepmenu-item dots"><span>...</span></li>';

    var   stepMenuArray = [],
          fullSize = 0,
          mediumSize = 0,
          smallSize = 0,
          widthOfDots = 0,
          widthOfChevronLeft = 0,
          widthOfChevronRight = 0,
          positionLeftDots = 0,
          positionLeftDotsArray = 0,
          positionRightDots = 0,
          positionRightDotsArray = 0;

    function hasTopMenu() {    
        return topMenuContainer.children().length > 0 ? true : false;
    }

    //pagination menu
    function arrangePagination() {
        var widthOfContainer = topMenuContainer.width(),
            currentStepIndex = $(currentActiveListItem).index(),
            numberOfSteps = stepMenuArray.length,            
            spaceLeft = widthOfContainer;

        var firstScenarioStep = 0;
        var lastScenarioStep = (numberOfSteps - 1);

        if (widthOfDots == 0) {
            $(dotsElements).insertAfter(stepMenuListItem.last());
            stepMenuListItem = $(menuClassName + " li");

            widthOfDots = stepMenuListItem.last().outerWidth(true);
            stepMenuListItem.last(".dots").remove();
            stepMenuListItem = $(menuClassName + " li");
        }

        spaceLeft -= stepMenuArray[firstScenarioStep].widthNumber;
        spaceLeft -= stepMenuArray[lastScenarioStep].widthNumber;

        if (currentStepIndex !== firstScenarioStep && currentStepIndex !== lastScenarioStep) {
            spaceLeft -= stepMenuArray[currentStepIndex].widthNumber;
        }

        if (!stepMenuListItem.first().hasClass("previous-step") && currentStepIndex !== 0) {
            $("<li class='previous-step'><a href='#'><span class='chevron' aria-hidden='true'><</span></a></li>").insertBefore(stepMenuListItem.first());
            widthOfChevronLeft = $(".previous-step").outerWidth(true);
            spaceLeft -= widthOfChevronLeft;

            firstScenarioStep = firstScenarioStep + 1;
            lastScenarioStep = lastScenarioStep + 1;
            numberOfSteps = numberOfSteps + 1;
            currentStepIndex = $(currentActiveListItem).index();
        }

        if (!stepMenuListItem.last().hasClass("next-step") && currentStepIndex !== (numberOfSteps - 1)) {
            $('<li class="next-step"><a href="#"><span class="chevron" aria-hidden="true">></span></a></li>').insertAfter(stepMenuListItem.last());
            widthOfChevronRight = $(".next-step").outerWidth(true);
            spaceLeft -= widthOfChevronRight;
        }

        var stepsDown = currentStepIndex,
            stepsUp = currentStepIndex,
            arrayStepIndex = currentStepIndex == 0 ? currentStepIndex : currentStepIndex - 1,
            arrayCountDown = arrayStepIndex,
            arrayCountUp = arrayStepIndex,
            leftDots = false,
            rightDots = false;

        for (var index = firstScenarioStep; index < numberOfSteps ; index++) {

            stepsUp++;
            arrayCountUp++;
            if (stepsUp > currentStepIndex && stepsUp < lastScenarioStep) {
                spaceLeft -= spaceLeft > 0 ? stepMenuArray[arrayCountUp].widthNumber : 0;

                if (spaceLeft < 0) {
                    $(stepMenuListItemSelector).eq(stepsUp).hide();

                    if (!rightDots) {
                        positionRightDots = stepsUp;
                        positionRightDotsArray = arrayCountUp;
                        rightDots = true;
                    }
                }
            }

            stepsDown--;
            arrayCountDown--;
            if (stepsDown < currentStepIndex && stepsDown > firstScenarioStep) {
                spaceLeft -= spaceLeft > 0 ? stepMenuArray[arrayCountDown].widthNumber : 0;
                if (spaceLeft < 0) {
                    $(stepMenuListItemSelector).eq(stepsDown).hide();

                    if (!leftDots) {
                        positionLeftDots = stepsDown;
                        positionLeftDotsArray = arrayCountDown;
                        leftDots = true;
                    }
                }
            }
        }

        if (rightDots) {
            spaceLeft += stepMenuArray[positionRightDotsArray].widthNumber;
            spaceLeft -= widthOfDots;
            $(stepMenuListItemSelector).eq(positionRightDots).hide();
            $(dotsElements).insertAfter($(stepMenuListItemSelector).eq(positionRightDots));

            if (spaceLeft < 0) {
                positionRightDotsArray--;
                positionRightDots--;

                if (positionRightDots !== currentStepIndex) {
                    spaceLeft += stepMenuArray[positionRightDotsArray].widthNumber;
                    $(stepMenuListItemSelector).eq(positionRightDots).hide();
                }
            }
        }

        if (leftDots) {
            spaceLeft += stepMenuArray[positionLeftDotsArray].widthNumber;
            spaceLeft -= widthOfDots;
            $(stepMenuListItemSelector).eq(positionLeftDots + 1).hide();
            $(dotsElements).insertBefore($(stepMenuListItemSelector).eq(positionLeftDots));

            if (spaceLeft < 0) {
                positionLeftDotsArray++;
                positionLeftDots++;
                if (positionLeftDots !== currentStepIndex) {
                    spaceLeft += stepMenuArray[positionLeftDotsArray].widthnumber;
                    $(stepMenuListItemSelector).eq(positionLeftDots).hide();
                }
            }
        }
    }

    function stepNameToolTip(currentStepIndex) {
        var stepContent = stepMenuArray[currentStepIndex].content;

        $('<div class="current-step-tooltip"><span>' + stepContent + "</span></div>").insertBefore(menuClassName);
    }

    function checkMenuWidth(containerWidth, currentStepIndex) {

        var fullSizeMenu = fullSize <= containerWidth,
            mediumSizeMenu = mediumSize <= containerWidth && $(window).width() > containerWidth;

        for (var listItemIndex = 0; listItemIndex < stepMenuArray.length; listItemIndex++) {
            var specificMenuListItem = stepMenuListItem.eq(listItemIndex),
                isTextVisible = fullSizeMenu || (mediumSizeMenu && listItemIndex == currentStepIndex);                       

            specificMenuListItem.find(".content-list-item").toggle(isTextVisible);
        }
    
        if (!mediumSizeMenu) {
            stepNameToolTip(currentStepIndex);
            var currentStepToolTip = $(".current-step-tooltip");

            if (smallSize > topMenuContainer.outerWidth(true)) {
                arrangePagination();
            }
            menu.addClass("menu-small");

            menu.css({
                display: "inline-block"
            });

            var menuWidth = Math.ceil(menu.outerWidth(true));
            var menuHeight = menu.outerHeight(true);

            menu.removeAttr("style");
            menu.css({
                width: menuWidth + "px", 
                height: menuHeight + "px"
            });

            currentStepToolTip.removeAttr("style");
            currentStepToolTip.css({
                width: menuWidth + "px"
            });
        }
    }

    function rebuildlistItem(specificMenuListItem) {

        var listItemContent = specificMenuListItem.text(),
            visualListNumber = specificMenuListItem.index() + 1,
            listItemNumberElement = '<span class="number-list-item">' + visualListNumber + ".</span>",
            listItemContentElement = '<span class="content-list-item">&nbsp;' + listItemContent + "</span>";
        
        specificMenuListItem.children().empty();
        specificMenuListItem.children().append(listItemNumberElement);
        var widthNumber = specificMenuListItem.outerWidth(true);

        specificMenuListItem.children().append(listItemContentElement);
        var widthTotal = specificMenuListItem.outerWidth(true);

        return {
            widthNumber: widthNumber,
            widthTotal: widthTotal,
            content: listItemContent
        }
    }

    function arrangeTopMenu(widthOfContainer, currentStepIndex, isLoading) {
        $(currentActiveListItem + " a").removeAttr("href");

        menu.find("li").each(function (index) {
            var stepMenuArrayLength = stepMenuArray.length;
            var specificMenuListItem = stepMenuListItemSelector + ":eq(" + index + ")";

            if (oldMenuLength > stepMenuArrayLength && isLoading === true) {
                stepMenuArray.push(rebuildlistItem($(specificMenuListItem)));
                fullSize += stepMenuArray[index].widthTotal;
                mediumSize += index == currentStepIndex ? stepMenuArray[index].widthTotal : stepMenuArray[index].widthNumber;
                smallSize += stepMenuArray[index].widthNumber;
            }

            if (oldMenuLength === stepMenuArrayLength && isLoading === false) {
                $(specificMenuListItem).removeAttr("style");

                if ($(specificMenuListItem).hasClass("dots") || $(specificMenuListItem).hasClass("previous-step") || $(specificMenuListItem).hasClass("next-step")) {
                    $(specificMenuListItem).remove();
                }

                $(".current-step-tooltip").remove();
                menu.removeAttr("style").removeClass("menu-small");
            }
        });
        checkMenuWidth(widthOfContainer, currentStepIndex);            
    }

    function initPaginationButtons() {
        $(".next-step").click(function () {
            $(".next-question-button, .next-step-button").click();
        });

        $(".previous-step").click(function () {
            $(".previous-question-button, .previous-step-button").click();
        });
    }
    
    //Checking if top menu is present
    if (!hasTopMenu()) {
        topMenuContainer.remove();
    }
    else {
        var widthOfContainer = topMenuContainer.width(),
            currentStepIndex = $(currentActiveListItem).index(),
            rebuildTimeout = null;


        arrangeTopMenu(widthOfContainer, currentStepIndex, true);
        initPaginationButtons();

        $(window).resize(function () {
            if (rebuildTimeout) {
                clearTimeout(rebuildTimeout);
            }
            rebuildTimeout = setTimeout(function () {
                widthOfContainer = topMenuContainer.width(),
                currentStepIndex = $(currentActiveListItem).index();
                arrangeTopMenu(widthOfContainer, currentStepIndex, false);
                initPaginationButtons();
            }, 100);

        });
    }
    $(".next-question-button").removeAttr("style");
});
