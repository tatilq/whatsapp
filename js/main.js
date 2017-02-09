/*********************************************+------------------PARTE LOGICA-----------------*////////////////////////77
////////////////////////////CONSTRUCTOR CHAT DE CUAL SE INSTANCIARAN OBJETOS///////////////////////////////////7
function Chat(_nombre, _imagen,_ultimoMensaje,_horaUltimoMensaje )
{
	this.nombre =  _nombre;
	this.imagenURL = _imagen;
	this.ultimoMensaje = _ultimoMensaje;
	this.horaUltimoMensaje = _horaUltimoMensaje;
	this.misChats= [];
	this.mishoras=[];
}
///////////////////////////7SE CREA UN ARREGLO DE INSTANCIAS DE OBJETOS///////////////////////////////////7
var dataListaChats = [
	new Chat("Lisbeth", 'http://facebookportadas.com/imagenes/notodoloquesedice.jpg', "Bien tu¿","11:45 p.m"),
	new Chat("Mariana", 'http://k37.kn3.net/DCCE035AA.jpg', "masosmenos ,ya estare mejor","10:15 p.m"),
	new Chat("Paola Toro", 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQCqFSpK15Y4JE3wEE2S-Kk15qgvFRH2wsArboFL895vfLVx9Ot',"en clases tu¿","23/01/2017"),
	new Chat("Lisstte Aguilar", 'http://facebookportadas.com/imagenes/notodoloquesedice.jpg',"¿que ha pasado me llamaste?","17/02/2017"),
	new Chat("Yoliset", 'image/logocodeacademy.png',"¿sabes cuanto cuesta una pizza?","12/02/2017"),
	new Chat("Henry Howard", 'image/katy.jpg',"¿Estas de acuerdo con todo?","28/01/2017"),
	new Chat("Liliana Muñoz", 'image/jose.jpg',"jajajajaj que graciosaa","05/02/2017"),
	new Chat("Yolanda Daza", 'image/andrea.jpg',"Nada, masomenos tu??","01/02/2017"),
	new Chat("Lupita Chavez", 'http://facebookportadas.com/imagenes/notodoloquesedice.jpg',"jje sera para la otraa","06/02/2017")];


/**********************************//////////////////////-------------PARTE VISUAL------/////////////////////7/////////////////////////////

var liListItem=null;
var srcImagen=document.getElementById('img_profile');
/////////////////////////////////////////////////////FUNCION QUE SE INICIA APENAS SE CARGUE LA PAGINA/////////////////////////////////////////7
function init() {

	initChatList();
}
/////////////////////////////////////////7/funcion que inicia todos los chats 'los crea'/////////////////////////////////77/////////////////
function initChatList(ultMensaje) {
	var elListaChats = document.getElementById("lista-chats");//ul con los chats
	for (var i in dataListaChats) {
		var htmlChatItem = '<li class="lista"><div class="avatar">' +
								'<img src="' + dataListaChats[i].imagenURL +  '" alt="" class="wh-44">' +
								'<h4 class="w-contact-name">' + dataListaChats[i].nombre + '</h4>' +
								'<p class="w-last-message" id="mensaje">' + dataListaChats[i].ultimoMensaje + '</p>' +
								'</div>' +'<div class="time" id="hora">' + dataListaChats[i].horaUltimoMensaje + '</div>'+
							'</li>';
		elListaChats.innerHTML += htmlChatItem;
	}
	setEventsChatList();
}
///////////////////////////////////////funcion que actualiza los eventos de los chats/////////////////////////////////////////////////////7///
function setEventsChatList() {
	var listaChats = document.getElementById('lista-chats');//ul de los chats
	var arrListItems = listaChats.getElementsByTagName('li');
	for (var i = 0; i < arrListItems.length; i++) {
		arrListItems[i].addEventListener('click', onChatItemClick);
	}
}
///////////////////////////////////////funcion que recibe los datos del chat al hacer click y llama a la funcion actualizarcabecera/////////////////////////////////////////
function onChatItemClick(evt) {
	/*currentTarget:- Devuelve el elemento del DOM que está disparando el evento actualmente (no nesariamente 
	el elemento que disparó el evento, ya que puede ser un disparo debido a burbujeo)*/
	console.log(evt.currentTarget);
	var contactName = evt.currentTarget.getElementsByClassName('w-contact-name')[0].textContent;//acesso al contenido del h4
	var imgURL = evt.currentTarget.getElementsByClassName('wh-44')[0].src;//acceso a la direccion de la imagen img
	
	var ultMensaje = evt.currentTarget.getElementsByClassName('w-last-message')[0].textContent;//acceso a la direccion del ultMensaje p
	var ultVez = evt.currentTarget.getElementsByClassName('time')[0].textContent;//acceso a la direccion de la ultima Coneccion div time
	
	
	actualizarCabeceraChat(contactName, imgURL, "Conectado");
	//crearMensajeIn(contactName, ultMensaje , ultVez);
}
////////////////////////////////////funcion que recibe como parametro la infor de cada lista de chats y actualiza la cabecera///////////////////////////
function actualizarCabeceraChat(_contactName, _imageURL, _estado) {
	var chatHeader = document.getElementById("chat-header");//es la cabecera del chats
	chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML = _contactName;
	chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML = _estado;
	chatHeader.getElementsByTagName('img')[0].src = _imageURL;
	var divChat=document.getElementById('chat');//limpia el contenedor de chats
	divChat.innerHTML="";

	for(i in dataListaChats)
	{
		if(dataListaChats[i].nombre==_contactName)
		{
			for(j in dataListaChats[i].misChats)
			{
				mensajesChat(dataListaChats[i].misChats[j],_contactName,dataListaChats[i].mishoras[j]);
			}
		
		}
	}
}
/////////////////////////////////////////////////////////////FUNCION QUE CREA MENSAJES DE TIPO IN///////////////////////////////////////////////7
function crearMensajeIn(_contactName , _ultMensaje , _ultVez)
{
	//mensajes que me nandan 
	var htmlMensajeIn='<div class="w-message w-message-in">'+
  							'<div class="w-message-text">'+
  								'<h5 class="green-1">'+_contactName+'</h5>'+
  								'<p>'+_ultMensaje+'</p>'+
  								'<div class="time">'+_ultVez+'</div>'+
  							'</div>'+
	  					'</div>';

	var elChat=document.getElementById("chat");
	elChat.innerHTML+=htmlMensajeIn;
	elChat.scrollTop =elChat.scrollHeight;//para que el scroll se baje hasta el ultimo mensaje
}
////////////////////////////////////////////////////////////FUNCION QUE CREA UN MENSJES DE TIPO OUT///////////////////////////////////////////////7
function crearMensajeOut(_mensaje , _nombreChat)
{
	//mensajes que mando yo
	var htmlMensajeOut='<div class="w-message w-message-out">'+
	  						'<div class="w-message-text">'+
	  								'<p>'+_mensaje+'</p>'+
	  								'<div class="time">'+getDateMessage()+'</div>'+
	  						'</div>'+
	  					'</div>';
	
	var elChat=document.getElementById("chat");
	elChat.innerHTML+=htmlMensajeOut;
	elChat.scrollTop =elChat.scrollHeight;//para que el scroll se baje hasta el ultimo mensaje
	
	for (i in dataListaChats)
	{
		if(dataListaChats[i].nombre==_nombreChat)
		{
			dataListaChats[i].misChats.push(_mensaje);//agrega los mensajes al arreglo
			dataListaChats[i].mishoras.push(getDateMessage());//agrega 
		}
	}

	actualizarUltimoChat(_nombreChat , _mensaje);

}
////////////////////////////////////////77//////////////7FUNCION QUE DIBUJA LOS MENSAJES DEL CHAT////////////////////////////////////////////77
function mensajesChat(_mensajesIn,_name,_horas)
{
	var divchat= document.getElementById("chat");
	var htmlMensajeIn = '<div class="w-message w-message-out">' +
		'<div class="w-message-text">' +
		'<p>'+_mensajesIn+'</p>' +
		'<div class="time">'+_horas+'</div>' +
		'</div>' +
		'</div>';
		divchat.innerHTML += htmlMensajeIn;
}
///////////////////////////////////////////////////////////FUNCION QUE CAMBIAR LA FOTO D EPERFIL///////////////////////////////////////////7
function cambiarFotoPerfil()
{
	var divCargaImagen=document.getElementById("divCargaImagen");
	divCargaImagen.innerHTML=
		  				 '<input type="file" name="" id="file">';
	//he creado un evento change al file(input)
	document.getElementById('file').addEventListener('change',fileSelect);
	
}
/////////////////////////////////////////////////7777//FUNCION QUE ME PERMITE SELECCIONAR UN ARCHIVO MEDIANTE UN OBJ FILE///////////////////777
function fileSelect(evt)
{
	var files = evt.target.files; // hace referencia  a lo archivos cargados desde mi input
	var contImg=document.getElementById("contImg");
    // recorre toda la lista buscando archivos
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
	  reader.onload = (function(theFile) {
        return function(e) {
          contImg.innerHTML="";
          contImg.innerHTML = ['<img  onclick="cambiarFotoPerfil()" id="img_profile" onmouseover="cambiarFotoPerfil()" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
        };
      })(f);
      reader.readAsDataURL(f);
      divCargaImagen.innerHTML='';
    }
}
/////////////////////////////////////////////////////7FUNCION QUE BUSCA EN LA LISTA DE CONTACTOS UN CHAT EN ESPECIFICO////////77///////////////////////7
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
//////////////////////////////////////////////////////////////////FUNCION QUE RETORNA LA HORA EN UN FORMATO CORRECTO//77//////////////////////////////////77
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
/////////////////////////////////////////FUNCION QUE MANDA MENSAJES CADA VEZ QUE PRESIONAMOS ENTER//////////////////////////////////7
function onMensajeKey(evt)
{
	if(evt.keyCode == 13)
	{
		var _mensajeInput=document.getElementById("mensajes");
		var header= document.getElementById("chat-header");
		var nombreChat= header.childNodes[1].childNodes[3].textContent;
		//crearChat(_mensajeInput.value);
		crearMensajeOut(_mensajeInput.value,nombreChat);

		_mensajeInput.value='';
	}
}
///////////////////////////////////////////////FUNCION QUE ACTUALIZA EL ULTIMO CHAT ////////////////////////////////////////////
function actualizarUltimoChat(_contactName, _mensaje)
{
	var listaChats= document.getElementById("lista-chats");
	//console.log(listaChats.getElementsByTagName("h4")[0].textContent);
	//console.log(listaChats.getElementsByTagName("p")[0].textContent);
	//console.log(listaChats.getElementsByClassName("time")[0].textContent)
		
		var ps = listaChats.getElementsByTagName("p");
		var h4s = listaChats.getElementsByTagName("h4");
	
		for (var i=0; i< ps.length;i++)
		{
			if(h4s[i].textContent==_contactName)
			{
				for(x in dataListaChats)
				{
					if(dataListaChats[x].nombre==listaChats.getElementsByTagName("h4")[i].textContent)
					{
						listaChats.getElementsByTagName("p")[x].textContent=_mensaje;
						listaChats.getElementsByClassName("time")[x].textContent=getDateMessage();
						//listaChats.childNodes[i].childNodes[1].textContent= dataListaChats[x].getUltimaHora();
					}
				}
			}
	
		}
}
/*****************************************************-----FIN----------************************************************************/