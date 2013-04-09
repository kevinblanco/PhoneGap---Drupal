
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

//Variable global , para el ID del nodo
var nid; 

//Al cargar la pagina...
$('#page_dashboard').on('pageshow',function(){
	
  //Intenta conectarse al webservice de Drupal
  try {
    $.ajax({
      url: "http://services.kevin-blanco.com/api/system/connect.json",
      type: 'post',
      dataType: 'json',

      //En caso de error
      error: function(XMLHttpRequest, textStatus, errorThrown){

        //Muestra mensaje y crea logs de los errores.
        alert('Error al intentar conectarse al servidor Drupal');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },

      //En caso de exito
      success: function(data){


        //Asigna el nombre de usuario a una variable
        var drupal_user = data.user;
        	
        //Si el usuario no se ha loogeado en el sistema
        if (drupal_user.uid == 0) { 

          //Muestra boton de login
          $('#not-loggedin').show();
          $('#loggedin').hide();
        }

        //Si el usuario ya esta loggeado en el sistema
        else { 

          //Muestra el dashboard para el usuario.
          $('#not-loggedin').hide();
          $('#loggedin').show();
        }

      }

    });
  }

  //En caso de error en el Try...
  catch (error) { 

    //Muestra el error.
    alert("Error - " + error); 
  }

});


/**
* Funcion para deslogearse del sistema
* 
**/
function logOut( ){

  //Intenta desloggearse del sistema 
	try {

    //Muestra el loader 
    $( '#loader' ).css( 'display', 'block' );

	 $.ajax({
	     url: "http://services.kevin-blanco.com/api/user/logout.json",
	     type: 'post',
	     dataType: 'json',

       //En caso de error...
	     error: function(XMLHttpRequest, textStatus, errorThrown){

        //Muestra mensaje al usuario y loggea los errores en consola 
	       alert('Error al intentar cerrar sesion');
         $( '#loader' ).css( 'display', 'none' );
	       console.log(JSON.stringify(XMLHttpRequest));
	       console.log(JSON.stringify(textStatus));
	       console.log(JSON.stringify(errorThrown));
	     },

       //En caso de exito
	     success: function( data ) {

	       //Muestra mensaje al usuario y recarga la pagina
         $( '#loader' ).css( 'display', 'none' );
	       alert("Sesion cerrada");
	       $.mobile.changePage("index.html",
          {reloadPage:true},
          {allowSamePageTranstion:true},
          {transition:'none'});
	     }

	 });

	}

  //En caso de error en el Try, muestra el error
	catch (error) { alert("Error " + error); }
	
		return false;
	
	}