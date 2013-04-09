
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

	//Al dar click en conectarse
	$( '#page_login_submit' ).on( 'click' ,function( ){ 
		
			//Valida que los campos no esten vacios
		  var name = $( '#page_login_name' ).val( );
		  if ( !name ) {
		   alert('Debe ingresar un nombre de usuario');
	   	 return false; 
	   	}

		  var pass = $('#page_login_pass').val( );
		  if (!pass) { 
		  	alert('Debe ingresar una contraseña.'); 
		  	return false; 
		  }
		  
		  //Luego, muestra el overlay de carga.
		  $( '#loader' ).css( 'display', 'block' );
		  
		  //Intenta loggearse al webservice de Drupal
		  $.ajax({
		      url: "http://services.kevin-blanco.com/api/user/login.json",
		      type: 'post',
		      data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
		      dataType: 'json',

		      //En caso de error
		      error: function(XMLHttpRequest, textStatus, errorThrown) {

		      	//Muestra mensaje, oculta el overlay y loggea los errores en consola
		        alert('Error al intentar iniciar sesion');
		        $( '#loader' ).css( 'display', 'none' );
		        console.log(JSON.stringify(XMLHttpRequest));
		        console.log(JSON.stringify(textStatus));
		        console.log(JSON.stringify(errorThrown));
		      },

		      //En caso de exito...
		      success: function (data) {

		      	//Muestra mensaje y redirige al dashboard de usuario
		    	  alert( "Sesion iniciada correctamente" );
		    	  $( '#loader' ).css( 'display', 'none' );
		    	  $.mobile.changePage("index.html", "slideup");

		      }

		  });

		  return false;
	});

});
