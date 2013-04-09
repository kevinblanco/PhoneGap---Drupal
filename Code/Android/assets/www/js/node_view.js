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

//Funcion que maneja la carga de datos del nodo
	$('#page_node_view').on('pageshow',function(){

		//Intenta realizar la llamada
		  try {

		  	//Muestra el loader
			  $( '#loader' ).css( 'display', 'block' );
			  

			  //Mediante una peticion AJAX, de tipo GET llama al contenido del nodo y lo muestra
		    $.ajax({
		      url: "http://services.kevin-blanco.com/api/node/" + encodeURIComponent(nid) + ".json",
		      type: 'get',
		      dataType: 'json',

		      //En caso de error
		      error: function (XMLHttpRequest, textStatus, errorThrown) {

		      	//Oculta el loader y muestra el error al usuario, looggea errores en consola
		    	 	$( '#loader' ).css( 'display', 'none' );
		        alert('Fallo al cargar el contenido del nodo');
		        console.log(JSON.stringify(XMLHttpRequest));
		        console.log(JSON.stringify(textStatus));
		        console.log(JSON.stringify(errorThrown));
		      },

		      //En caso de exito...
		      success: function (data) {

		      	//Oculta el loader y agrega el contenido respectivo al nodo
		    	  $( '#loader' ).css( 'display', 'none' );
		        console.log(JSON.stringify(data));
		        $('#page_node_view h1').html(data.title); 
		        $('#page_node_view .content').html(data.body.und[0].safe_value + "<br /><h3>Pais:</h3> " + data.field_country.und[0].safe_value ); 
		      }

		    });

		  }
		  catch (error) { alert("Error - " + error); }
		});
		
	
/**
*	Funcion que maneja el borrado del nodo
**/
	$('#button_node_delete').on("click",function( ){

		//En caso de que el usuario acepte elimirlo...
		  if (confirm("Estas seguro de que deseas eliminar este nodo?")) {

		  	//Intenta eliminar el nodo
		    try {
		      $.ajax({
		        url: "http://services.kevin-blanco.com/api/node/" + encodeURIComponent(nid) + ".json",
		        type: 'delete',
		        dataType: 'json',

		        //En caso de error...
		        error: function (XMLHttpRequest, textStatus, errorThrown) {

		        	//Muestra mensaje al usuario y los muestra en consola
		          alert('Error al intentar borrar el nodo');
		          console.log(JSON.stringify(XMLHttpRequest));
		          console.log(JSON.stringify(textStatus));
		          console.log(JSON.stringify(errorThrown));
		        },

		        //En caso de exito..
		        success: function (data) {

		        	//Muestra el resultado en consola y redirecciona a la lista de nodos
		          console.log(JSON.stringify(data));
		          $.mobile.changePage("node_list.html", "slideup");
		        }

		      });

		    }
		    
		    catch (error) { alert("Error - " + error); }
		  }
		  else {
		    return false;
		  }
		});