/**
 * Namespace "nav"
 * @class nav
 */
Base.Nav = function() {
	// Variables & functions defined here are private
	/**
		* function navFade,  for the fading effect in the navigation
		*/
	function navExpand() {
	// Collapse everything but the first menu:
	$('#submenu li:not(.active) > ul').hide(0);
	// Expand or collapse
	$('#submenu li:has(ul) > a').click(function() {
		if( $(this).find('+ ul').is(':hidden') == true ){
			$(this).find('+ ul').slideDown();
		}	else {
			$(this).closest('li').find('ul').slideUp();
		}	
		return false;
	});
};

// $('.tabs').infoTabs( {cancelLinkAction:true} );
// De tab funtionaliteit is door Avanade gewijzigd

	return {
  	// Variables & functions defined here are public
		
		
		/**
		 * Initialize this Class
		 */
		init: function() {
			 navExpand();
		}
	};
}();

/* Initialize this class */
Base.register(Base.Nav.init);
