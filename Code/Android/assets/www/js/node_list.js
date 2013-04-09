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

//Funcion que carga los nodos del sitio
$( '#page_node_list' ).on('pageshow',function(){
	
		//Intenta traer los nodos del sitio
	  try {
		  
		  //Muestra el overlay del loader
		  $( '#loader' ).css( 'display', 'block' );
		  
		  //Mediante una peticion AJAX, usando metodo GET, trae todos los nodos
	    $.ajax({
	      url: "http://services.kevin-blanco.com/mobile-nodes",
	      type: 'get',
	      dataType: 'json',

	      //En caso de error
	      error: function (XMLHttpRequest, textStatus, errorThrown) {

	      	//Oculta el loader y muestra mensaje al usuario, loggea errores en consola
	    		$( '#loader' ).css( 'display', 'none' );
	        alert( 'Error al intentar cargar los nodos' );
	        console.log(JSON.stringify(XMLHttpRequest));
	        console.log(JSON.stringify(textStatus));
	        console.log(JSON.stringify(errorThrown));
	      },

	      //En caso de exito...
	      success: function (data) {
	    	  
	    	  //Oculta el loader
	    		$( '#loader' ).css( 'display', 'none' );

	    		//Limpia la lista en caso de que tenga contenido...
	        $( "#page_node_pages_list" ).html( "" );

	        //Por cada resultado obtenido...
	        $.each( data.nodes, function( node_index,node_value ) {

	        	//Mostramos el JSON en consola (para development)..
	          console.log(JSON.stringify(node_value));

	          //Agregamos el nodo a la lista..
	          $("#page_node_pages_list").append($('<li></li>',{'html':'<a onclick="articleSelected( ' + node_value.node.nid + ' )" href="node_view.html" id="' + node_value.node.nid + '" class="page_node_pages_list_title">' + node_value.node.title + '</a>'}));
	        });

	        //Actualizamos el listview.
	        $("#page_node_pages_list").listview("destroy").listview();
	      }
	    });
	  }

	  //En caso de error en el try..
	  catch (error) { 

	  	//Muestra el error y oculta el loader
	  	alert("Error - " + error); 
	  	$( '#loader' ).css( 'display', 'none' ); 
	  }
	});


//Funcion que recibe el NID del link y lo asigna a la variable global del NID.
function articleSelected( id ){
	nid = id
}