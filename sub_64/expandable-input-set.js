var Toeslagen = Toeslagen || {};
Toeslagen.ExpandableInputSet = Toeslagen.ExpandableInputSet || {};
(function() {

	var update = function updateInputSet(inputSet) {
		
		var amount = parseInt( document.getElementById(inputSet.amount).value );
		
		// show/hide rows and remove buttons
		for( var i = 0; i < inputSet.rows.length; ++i )
		{
			var rowElement = document.getElementById( inputSet.rows[i] );
			if( i  < amount ) {
				removeClass_utils( rowElement, "invisible" );
				var removeButton = document.getElementById( inputSet.rows[i] + "-remove" );
				if( i != 0 || amount > 1 )
					removeClass_utils( removeButton, "invisible" );
				else
					addClass_utils( removeButton, "invisible" );
			} else {
				addClass_utils( rowElement, "invisible" );
			}
			
			var addButton = document.getElementById( inputSet.rows[i] + "-add" );
			if( i + 1 !== amount || i + 1 == inputSet.rows.length )
				addClass_utils( addButton, 'hidden' );
			else
				removeClass_utils( addButton, 'hidden' );
		}
		
		// show hide 'add lines' button
		/*if( amount < inputSet.max )
			removeClass_utils( document.getElementById( inputSet.add ), "invisible" );
		else
			addClass_utils( document.getElementById( inputSet.add ), "invisible" );
		*/
	}
	
	var add = function onAdd(inputSet, onchangeCallback ) {
		if( document.getElementById("resultaten").className.indexOf('visible') === -1){
			var amount = parseInt( document.getElementById(inputSet.amount).value );
			if( amount < inputSet.max  ) {
				document.getElementById(inputSet.amount).value = amount + 1;
				update( inputSet );
				onchangeCallback();
			}
		}
	}
	
	var remove = function onRemove( inputSet, rowNumber, onchangeCallback ) {
		if( document.getElementById("resultaten").className.indexOf('visible') === -1){
			var amount = parseInt(document.getElementById(inputSet.amount).value);
			if( amount > 1 ) {
				for( var i = rowNumber; i < inputSet.max; ++i ) {
					if( i < inputSet.max - 1 ) {
						for( var f = 0; f < inputSet.fields.length; ++f ) {
							// copy values of rows below selected row
							document.getElementById("Berekening")[inputSet.fields[f] + "-" + (i+1)].value = document.getElementById("Berekening")[inputSet.fields[f] + "-" + (i+2)].value;
						}
					} else {
						// clear values
						for( var f = 0; f < inputSet.fields.length; ++f ) {
							document.getElementById("Berekening")[inputSet.fields[f] + "-" + (i+1)].value = "";
						}
					}
				}
				// update amount of rows
				document.getElementById(inputSet.amount).value = amount - 1;
				
				update( inputSet );
				onchangeCallback();
			}
		}
	}
	
	var initialize = function initInputSet(inputSet, onchangeCallback ) {
		
		// bind add/remove buttons
		for( var i = 0; i < inputSet.rows.length; ++i )
		{
			var removeButton = document.getElementById( inputSet.rows[i] + "-remove" );
			removeButton.onclick = function( inputSet, row, onchangeCallback ) { 
				return function() { remove( inputSet, row, onchangeCallback ); return false; }
			}( inputSet, i, onchangeCallback );
			
			var addButton = document.getElementById( inputSet.rows[i] + "-add" );
			addButton.onclick = function() {
				return function() { add( inputSet, onchangeCallback );  return false; }
			}( inputSet, onchangeCallback );
		}
		
		/*
		// bind add button
		document.getElementById( inputSet.add ).onclick = function() {
			return function() { add( inputSet, onchangeCallback );  return false; }
		}( inputSet, onchangeCallback );
		*/
		
		update(inputSet);
	}
	
	var getInputs = function() {
		if( Toeslagen.ExpandableInputSet && Toeslagen.ExpandableInputSet.inputs )
			return Toeslagen.ExpandableInputSet.inputs;
		else
			return {};
	}
	
	Toeslagen.ExpandableInputSet.initialize = initialize;
	Toeslagen.ExpandableInputSet.update = update;
	Toeslagen.ExpandableInputSet.getInputs = getInputs;
})();


function initializeExpandableInputSet( onchangeCallback ) {
	var inputs = Toeslagen.ExpandableInputSet.getInputs(); 
	for( var i in inputs ) {
		Toeslagen.ExpandableInputSet.initialize( inputs[i], onchangeCallback );
	}
}

function updateExpandableInputSet() {
	var inputs = Toeslagen.ExpandableInputSet.getInputs(); 
	for( var i in inputs ) {
		Toeslagen.ExpandableInputSet.update( inputs[i] );
	}
}