$(document).ready(function ()
{
	$(".customDropDown").customDropDown();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function ()
		{
			$(".customDropDown").customDropDown();
		});
	}
});

$.fn.customDropDown = function ()
{
	$(this).each(function ()
	{
		var theReturnObject =
		{
			mObject: null,
			mAnimateObject: null,
			mButton: null,
			mItems: null,
			mValue: null,
			mPrefix: null,
			mInitialButtonValue: null,
			mMapsViewport: null,
			mMultiSelect: false,
			mAssociatedControl: null,
			mMouseControlled: false,
			mCollapseTimeout: 0,
			mValueOnOpen: null,

			initialized: false,

			onchange: null,
			onCloseAfterChange: null,

			getValue: function ()
			{
				return this.mValue;
			},

			setValue: function (aValue)
			{
				var theThis = this;
				var theItemFound = false;

				if(aValue != null)
				{
					this.mItems.each(function ()
					{
						if($(this).attr("data-value") == aValue)
						{
							theThis.onItemClick($(this));

							theItemFound = true;
						}
					});
				}

				if(aValue == null || !theItemFound)
					this.resetValue();
			},

			init: function (aObject)
			{
				var theThis = this;

				this.mObject = aObject;
				this.mAnimateObject = this.mObject.find("div").first();
				this.mItems = this.mAnimateObject.children("span");

				if(this.mItems.length == 0)
					return;

				this.mButton = this.mObject.find("button").first();
				this.mInitialButtonValue = this.mButton.html();

				this.mAnimateObject.css("opacity", 0);

				//this.mObject.mouseenter(function () { theThis.onMouseOver() });
				this.mObject.mouseleave(function () { if (theThis.mMouseControlled) theThis.onMouseOut(); });
				this.mButton.click(function () { theThis.mMouseControlled = true; theThis.onMouseOver(); return false; });

				this.mObject.focusin(function () { if (!theThis.mMouseControlled) theThis.onMouseOver(); });
				this.mObject.focusout(function () { if (!theThis.mMouseControlled) theThis.onFocusOut(); });

				if(this.mObject.attr("data-onchange") != undefined)
				{
					this.onchange = "var theThis = this; \r\n" + this.mObject.attr("data-onchange").replace(/(\W+)(this\.value)(\W+)/gi, "$1theThis.mValue$3")
																	.replace(/(\W+)(this\.mapsViewport)(\W+)/gi, "$1theThis.mMapsViewport$3")
																	.replace(/(\W+)(this)(\W+)/gi, "$1theThis.mObject.get(0)$3");
				}

				if(typeof this.mObject.attr("data-prefix") != "undefined" && this.mObject.attr("data-prefix") != "" && this.mObject.attr("data-prefix") != null)
					this.mPrefix = this.mObject.attr("data-prefix");

				if(typeof this.mObject.attr("data-multi-select") != "undefined" && this.mObject.attr("data-multi-select").toLowerCase() == "true")
					this.mMultiSelect = true;

				if(typeof this.mObject.attr("data-associated-control") != "undefined" && this.mObject.attr("data-associated-control") != null && $.trim(this.mObject.attr("data-associated-control")) != "")
				{
					var theAssociatedControlID = $.trim(this.mObject.attr("data-associated-control"));

					if($("[id$='" + theAssociatedControlID + "']").length > 0)
						this.mAssociatedControl = $("[id$='" + theAssociatedControlID + "']");
				}

				this.mItems.each(function () { theThis.initItem($(this)) });
			},

			onFocusOut: function ()
			{
				var theThis = this;

				setTimeout(function ()
				{
					if ($(":focus").length == 0 || !$.contains(theThis.mObject[0], $(":focus")[0]))
						theThis.onMouseOut();
				});
			},

			collapse: function ()
			{
				var theThis = this;

				this.mAnimateObject.stop(true, false);
				this.mAnimateObject.animate({opacity: 0}, 200, function ()
				{
					$(this).css("display", "none");

					if(typeof theThis.onCloseAfterChange == "function" && theThis.mValueOnOpen != theThis.getValue())
						theThis.onCloseAfterChange();

					theThis.mMouseControlled = false;
				});
			},

			onMouseOver: function ()
			{
				var theThis = this;

				this.mValueOnOpen = this.getValue();

				this.mAnimateObject.stop(true, false);

				this.mAnimateObject.css("display", "block");
				this.mAnimateObject.animate({ opacity: 1 }, 200);

				$("body").keydown(function (e) { theThis.onKeyDown(e); });
			},

			onMouseOut: function ()
			{
				var theThis = this;

				this.mAnimateObject.stop(true, false);

				clearTimeout(this.mCollapseTimeout);
				this.mCollapseTimeout = setTimeout(function () { theThis.collapse(); }, 200);
			},

			onKeyDown: function (e) {
				if (e.keyCode == 27) {
					this.collapse();
				}
			},

			initItem: function (aObject)
			{
				var theThis = this;

				aObject.css("cursor", "pointer");

				if(this.mMultiSelect)
				{
					var theUniqueId = new Date().getTime().toString() + Math.round(Math.random() * 10000);

					aObject.html('<input type="checkbox" id="checkbox_' + theUniqueId + '"><label for="checkbox_' + theUniqueId + '">' + aObject.html() + '</label><div class="clear"></div>');

					if(this.mAssociatedControl != null && $.trim(this.mAssociatedControl.val()) != "")
					{
						var theAssociatedValues = this.mAssociatedControl.val().split(",");

						if(aObject.attr("data-value") != null && theAssociatedValues.indexOf($.trim(aObject.attr("data-value"))) > -1)
							aObject.find("input").prop("checked", true);

						this.loopSelectedValues();
					}
				}
				else
				{
					if(this.mAssociatedControl != null)
						this.setValue(this.mAssociatedControl.val());
				}

				if(typeof aObject.attr("data-selected") != "undefined")
					this.onItemClick(aObject);

				aObject.click(function ()
				{
					var theOldValue = theThis.mValue;

					theThis.onItemClick(aObject);

					if (theThis.onchange != null/* && theOldValue != theThis.mValue*/)
					{
						var myFunction = function ()
						{
							eval(theThis.onchange);
						};

						myFunction.call(theThis);
					}

					if(theThis.mAssociatedControl != null)
						theThis.mAssociatedControl.val(theThis.getValue());
				});

				this.initialized = true;
			},

			onItemClick: function (aObject)
			{
				var theThis = this;
				var theButtonValue = ((this.mPrefix != null) ? this.mPrefix : "");

				theThis.mButton.html(this.mInitialButtonValue);

				if(this.mMultiSelect)
				{
					this.loopSelectedValues();
				}
				else
				{
					this.mValue = aObject.attr("data-value");
					this.mMapsViewport = (typeof aObject.attr("data-mapsViewport") == "undefined" || aObject.attr("data-mapsViewport") == "") ? null : aObject.attr("data-mapsViewport");

					this.mButton.html(theButtonValue + aObject.text());

					this.mItems.removeClass("selected");

					aObject.addClass("selected");

					this.collapse();
				}
			},

			loopSelectedValues: function ()
			{
				var theThis = this;
				var theButtonValue = ((this.mPrefix != null) ? this.mPrefix : "");

				this.mValue = null;

				this.mItems.removeClass("selected");

				this.mItems.find("input[type='checkbox']:checked").parents(".customDropDown > div > span").each(function ()
				{
					var theCurrentSelectedItem = $(this);

					if(theThis.mValue != null)
					{
						theThis.mValue += ",";

						theThis.mButton.html(theButtonValue + theThis.mValue.split(",").length + " " + settings.various.itemsSelectedText);
					}
					else
					{
						theThis.mValue = "";

						theThis.mButton.html(theButtonValue + theCurrentSelectedItem.text());
					}

					if(typeof theCurrentSelectedItem.attr("data-value") != "undefined")
						theThis.mValue += theCurrentSelectedItem.attr("data-value");

					theCurrentSelectedItem.addClass("selected");
				});
			},

			resetValue: function ()
			{
				this.mValue = null;
				this.mButton.html(this.mInitialButtonValue);

				this.mItems.removeClass("selected");
			}
		}

		if (typeof $(this).data("customDropDown") == 'undefined' || $(this).data("customDropDown") == null || !$(this).data("customDropDown").initialized)
		{
			theReturnObject.init($(this));
			$(this).data("customDropDown", theReturnObject);
		}
	});

	return $(this);
}