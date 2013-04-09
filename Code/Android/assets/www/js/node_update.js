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

//Funcion que actualiza la informacion del nodo...
$('#page_node_update').on('pageshow',function(){

  //Trae la informacion del nodo desde el webservice...
  try {

    //Muestra el loader...
    $( '#loader' ).css( 'display', 'block' );
	
    //Mediante una peticion AJAX, usando el metodo GET, trae la informacion del nodo que queremos editar
    $.ajax({
      url: "http://services.kevin-blanco.com/api/node/" + encodeURIComponent(nid) + ".json",
      type: 'get',
      dataType: 'json',

      //En caso de error...
      error: function (XMLHttpRequest, textStatus, errorThrown) {

        //Muestra mensaje al usuario y loggea los errores en consola
    	  $( '#loader' ).css( 'display', 'none' );
        alert('Error al accesar la informacion del Nodo');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },

      //En caso de exito...
      success: function (data) {

        //Agrega la informacion correspondiente al nodo
  	    $( '#loader' ).css( 'display', 'none' );
        console.log(JSON.stringify(data));
        $('#page_node_update_title').val(data.title);
        $('#page_node_update_body').val(data.body.und[0].value);
        $('#page_node_update_country').val(data.field_country.und[0].value);
       
      }

    });

  }

  //En caso de error en el Try muestra el error
  catch (error) { alert("Error - " + error); }
});



/**
* Funcion que maneja la actualizacion del contenido del nodo
*
**/
$( '#page_node_update_submit' ).on('click',function( ){
  
  //Validamos que los campos tengan contenido..
  var title = $( '#page_node_update_title' ).val( );
  if (!title) { alert('Campo Titulo requerido.'); return false; }
  
  var body = $( '#page_node_update_body' ).val( );
  if (!body) { alert( 'Campo Cuerpo es requerido.' ); return false; }
  
  var country = $( '#page_node_update_country' ).val ( );
  if (!country) { alert( 'Campo Pais es requerido.' ); return false; }

  //Mostramos el loader..
  $( '#loader' ).css( 'display', 'block' );
  
  //Mediante una peticion AJAX, usando el metodo PUT actualizamos la informacion
  $.ajax({
      url: "http://services.kevin-blanco.com/api/node/" + encodeURIComponent(nid) + ".json",
      type: 'put',
      data: 'node[type]=mobile&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body) + '&node[field_country][und][0][value]=' + encodeURIComponent(country),
      dataType: 'json',

      //En caso de error...
      error: function(XMLHttpRequest, textStatus, errorThrown) {

        //Oculta el loader y muestra el error...
    	  $( '#loader' ).css( 'display', 'none' );
        alert('Error al actualizar el Nodo');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },

      //En caso de exito en la peticion...
      success: function (data) {

        //Oculta el loader y muestra una notificacion al usuario
    	  $( '#loader' ).css( 'display', 'none' );
    	  alert('Nodo actualizado correctamente');

        //Luego se retorna el usuario a la lista de nodos...
    	  $.mobile.changePage("node_list.html", "slideup");
      }

  });

  return false;
});