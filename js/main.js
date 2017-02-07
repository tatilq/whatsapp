//Parte Lógica

//Parte Visual
var liListItem=null;
var srcImagen=document.getElementById('img_profile');
//funcion para cambiar la foto de perfil
function cambiarFotoPerfil()
{
	var divCargaImagen=document.getElementById("divCargaImagen");
	divCargaImagen.innerHTML='<button onclick="actualizarImagen()" style="color:white; background-color:green; border:none;" >Cargar URL</button> '+
		  				 '<input type="" name="" placeholder="Pega tu URL aqui" id="url">';
}
function actualizarImagen()
{
	var url=document.getElementById('url').value;
	if(url.length>0){
		srcImagen.src=url;
	}
	divCargaImagen.innerHTML='';
}
//funcion para buscar en la lista de contactos algun chat
function searchChat()
{
	var chatsList=document.getElementsByClassName("lista");
	var search = document.getElementById("search");
	var forEach = Array.prototype.forEach;
	search.addEventListener("keyup", function(e){
	    var choice = this.value;
	  
	    forEach.call(chatsList, function(f){
	        if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1 )
	            f.style.display = "none";        
	        else
	            f.style.display = "block";        
	    });
	}, false);
};
//funcion que retorna la hora
function getDateMessage()
{
	var horaActual;
	var date= new Date();
	var hour= date.getHours();
	var minute= date.getMinutes();
	if(minute<10){
		minute='0'+minute;
	}
	if(hour<10){
		hour='0'+hour;
	}
	if(hour<12){
		horaActual= hour+":"+minute+" am";
	}
	if(hour>=12)
	{
		horaActual= hour+":"+minute+" pm";
	}
	return horaActual;
}
////FUNCION QUE MANDA MENSAJES CADA VEZ QUE PRESIONAMOS ENTER
function onMensajeKey(evt)
{
	if(evt.keyCode == 13)
	{
		var _mensajeInput=document.getElementById("mensajes");
			
		crearChat(_mensajeInput.value);
	
		crearMensaje(_mensajeInput.value);

		_mensajeInput.value='';
	}
}
//FUNCION QUE CREA MENSAJES
function crearMensaje(_mensaje)
{
	var htmlMensajeIn='<div class="w-message w-message-in">'+
  							'<div class="w-message-text">'+
  								'<h5 class="green-1">Maria Paula Rivarola</h5>'+
  								'<p>Jajaja Sii finalmente se corto!!</p>'+
  								'<div class="time">11:13</div>'+
  							'</div>'+
	  					'</div>';
	var htmlMensajeOut='<div class="w-message w-message-out">'+
	  						'<div class="w-message-text">'+
	  								'<p>'+_mensaje+'</p>'+
	  								'<div class="time">'+getDateMessage()+'</div>'+
	  						'</div>'+
	  					'</div>';
	var mensaje = liListItem.getElementsByClassName("w-last-message")[0];
	mensaje.innerHTML = _mensaje;
	console.log(liListItem.getElementsByClassName("w-last-message")[0]);

	var elChat=document.getElementById("chat");
	elChat.innerHTML+=htmlMensajeOut;
	elChat.scrollTop =elChat.scrollHeight;//para que el scroll se baje hasta el ultimo mensaje
}
//FUNCION QUE CREA CHATS
function crearChat(_mensaje)
{
	var elListaChats=document.getElementById("listaChats");//ul donde se enlistan los chats 
	if(liListItem==null)
	{
		liListItem=document.createElement('li');
		liListItem.className="lista";
		//creamos elementos de tipo li para las listas 
		var htmlChatItem='<div class="avatar">'+
							'<img src="image/logocodeacademy.png" alt="" class="wh-44">'+
							'<h4 class="w-contact-name">Laboratoria Perú</h4>'+
							'<p class="w-last-message" id="mensaje">'+_mensaje+'</p>'+
						'</div>'+
						'<div class="time" id="hora">'+getDateMessage()+'</div>';
		liListItem.innerHTML = htmlChatItem;
		elListaChats.insertBefore(liListItem,elListaChats.childNodes[0]);//Inserta hijos al inicio en este caso chats
	}
}
function crearListaChats()
{

}
function  actualizarCabeceraChat()
{

}