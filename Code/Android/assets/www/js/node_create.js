
/*! ------------------------------------------
*
*   Drupal + PhoneGap Scripts
*   
*   @leng JavaScript
*   @autor Kevin Blanco
*   @fecha 8 de Abril, 2013
*   @correo me@kevin-blanco.com
*
*   ------------------------------------------
*/

$( document ).ready( function( ){

	//Funcion que maneja la creacion de nodos
	$( '#page_node_create_submit' ).on( 'click' ,function( ){

			//Validamos que los campos no esten vacios
		  var title = $( '#page_node_title' ).val( );
		  if ( !title ) { alert( 'El titulo es un campo obligatorio' ); return false; }

		  var body = $('#page_node_body').val();
		  if (!body) { alert('El cuerpo es un campo obligatorio'); return false; }
		  
		  var country = $('#page_node_country').val();
		  if (!country) { alert('Pais es un campo obligatorio'); return false; }

		  //Muestra el overlay del loader
		  $( '#loader' ).css( 'display', 'block' );
		  
		  //Mediante una peticion AJAX, de tipo POST creamos el nodo....
		  $.ajax({
		      url: "http://services.kevin-blanco.com/api/node.json",
		      type: 'post',
		      data: 'node[type]=mobile&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body) + '&node[field_country][und][0][value]=' + encodeURIComponent(country),
		      dataType: 'json',

		      //En caso de error
		      error: function(XMLHttpRequest, textStatus, errorThrown) {

		      	//Muestra mensaje al usuario y loggea los errores en consola
		        alert('Fallo al intentar crear nodo');
		        $( '#loader' ).css( 'display', 'none' );
		        console.log(JSON.stringify(XMLHttpRequest));
		        console.log(JSON.stringify(textStatus));
		        console.log(JSON.stringify(errorThrown));
		      },

		      //En caso de exito...
		      success: function (data) {

		      	//Muestra mensaje al usuario y redirecciona al dashboard
		    	  alert( "Nodo Creado Exitosamente" );
		    	  $( '#loader' ).css( 'display', 'none' );
		    	  $.mobile.changePage("index.html", "slideup");
		      }
		  });
		  

		  return false;

		});
});
