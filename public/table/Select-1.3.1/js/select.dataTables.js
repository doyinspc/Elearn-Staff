/*! DataTables styling wrapper for Select
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-select'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('../build1/table/FixedColumns-3.3.1/js/node_modules/datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.select ) {
				require('../build1/table/Select-1.3.1/js/node_modules/datatables.net-select')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));