const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');
const btnbuscar = document.getElementById('formulario');


//Eventos
btnReaccion.addEventListener('click', likear);
menuMusic.addEventListener('click', cargarInfo);
contenedorListaMusic.addEventListener('click', reproducirMusica);
controles.addEventListener('click', controlar)
btnbuscar.addEventListener('click',buscar);
    //Funciones
let estado = 0;

function likear() {
    if (estado === 0) {
        btnReaccion.classList.add('reaccion-activa');
        estado = 1;
    } else if (estado === 1) {
        btnReaccion.classList.remove('reaccion-activa');
        estado = 0;
    }
}


function cargarInfo(e) {
    let jsonurl = '';
    let titlePlay = '';
    let descripcionPlay = '';
    let srcImg = '';

    if (e.target.classList.contains('playConcentracion')) {
        jsonurl = 'assets/musicJSON/concentracion.json';
        titlePlay = 'Playlist para concentrar';
        descripcionPlay = 'La mejor playlist para concentrar';
        srcImg = 'assets/img/concentracion.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/concentracion1.jpg)";
    
    } else if (e.target.classList.contains('playRock')) {
        jsonurl = 'assets/musicJSON/rock.json';
        titlePlay = 'Playlist para rock and roll';
        descripcionPlay = 'La mejor playlist de rock and roll';
        srcImg = 'assets/img/rock1.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondorock.jpg)";
    
    }else if (e.target.classList.contains('playElectronica')) {
        jsonurl = 'assets/musicJSON/electronica.json';
        titlePlay = 'Playlist para electronica';
        descripcionPlay = 'La mejor playlist para electronica';
        srcImg = 'assets/img/electronica.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondoelectronica.jpg)";
    
    }else if (e.target.classList.contains('playDormir')) {
        jsonurl = 'assets/musicJSON/dormir.json';
        titlePlay = 'Playlist para dormir';
        descripcionPlay = 'La mejor playlist para dormir';
        srcImg = 'assets/img/dormir.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondodormir.jpg)";
    
    }else if (e.target.classList.contains('playPop')) {
        jsonurl = 'assets/musicJSON/pop.json';
        titlePlay = 'Playlist para musica pop';
        descripcionPlay = 'La mejor playlist musica pop';
        srcImg = 'assets/img/pop.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondopop.jpeg)";
    
    }else if (e.target.classList.contains('playSoundtrack')) {
        jsonurl = 'assets/musicJSON/soundtrack.json';
        titlePlay = 'Playlist para escuchar soundtrack';
        descripcionPlay = 'La mejor playlist de soundtrack';
        srcImg = 'assets/img/soundtrack.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondosoundtrack.jpg)";
    
    }else if (e.target.classList.contains('playJazz')) {
        jsonurl = 'assets/musicJSON/jazz.json';
        titlePlay = 'Playlist para escuchar jazz';
        descripcionPlay = 'La mejor playlist musica jazz';
        srcImg = 'assets/img/jazzfondo.jpeg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondojazz.jpg)";
   
    }else if (e.target.classList.contains('playCumbia')) {
        jsonurl = 'assets/musicJSON/cumbia.json';
        titlePlay = 'Playlist para escuchar cumbia';
        descripcionPlay = 'La mejor playlist musica cumbia';
        srcImg = 'assets/img/cumbia.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondocumbia.jpg)";
    
    }else if (e.target.classList.contains('playEnfoque')) {
        jsonurl = 'assets/musicJSON/enfoque.json';
        titlePlay = 'Playlist para escuchar musica de enfoque';
        descripcionPlay = 'La mejor playlist musica para enfoque';
        srcImg = 'assets/img/enfoque.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/fondoenfoque.jpg)";
    
    }
    
        titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcionPlay;
    imgAlbum.src = srcImg;
    cargarMusica(jsonurl);
}

function cargarMusica(url) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let html = '';
            data.forEach(music => {
                html += `
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
                    <h3>${music.artista}</h3> 
                    <h3 class="name" id="name">${music.nombre}</h3> 
                    <h3 class="time">- -</h3>
                </li>
                `
                contenedorListaMusic.innerHTML = html;
            });
        });
}

function reproducirMusica(e) {
    if (e.target.parentElement.classList.contains('play-music')) {
        let urlM = e.target.parentElement.previousElementSibling.value;
        controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
        <audio src="${urlM}" style="width: 50vw;" controls autoplay><input type="text" value="${urlM}" style="display: none;"></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;

        e.target.parentElement.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
    }
}

function controlar(e) {
    let audio = e.target.parentElement.parentElement.children[1].children[0];
    let audioUrl = audio.value;

    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) { 
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    }
    if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let musicaAtras = limusic.previousElementSibling.children[0].value;

                let elementoParaReproducido = limusic.previousElementSibling.children[1];
                siguienteAtras(musicaAtras, elementoParaReproducido)
            }
        });
    }
}

function siguienteAtras(musica, reproducida) {
    controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${musica}" style="width: 50vw;" controls autoplay><input type="text" value="${musica}" style="display: none;"></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
    reproducida.classList.add('reaccion-activa-reproducida');

    siguienteAutomatico();
}

function siguienteAutomatico() {
    let audioEtiqueta = controles.children[1];
    audioEtiqueta.addEventListener('ended', () => {
        let audioUrl = audioEtiqueta.children[0].value;
        let musicArray = Array.from(contenedorListaMusic.children);
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    })
}
function buscar(e){

    const musicas = [
        {nombre: '', artista: ''},
        {nombre: 'With me', artista: 'Martin Garrix'},
        {nombre: 'I Feel It Coming', artista: 'The weenkd'},
        {nombre: 'Memories',  artista: 'David Guetta'},
        {nombre: 'Titanium',  artista: 'Sia'},
        {nombre: 'I Feel So Bad',  artista: 'David'},
    ]


    const formulario = document.querySelector('#formulario');
    const boton = document.querySelector('#boton');
    const resultado = document.querySelector('#resultado');


    const filtrar = ()=>{

        // resultado.innerHTML = '';
        // console.log(formulario.value);
        const texto = formulario.value.toLowerCase();
        for(let musica of musicas){
          let nombre = musica.nombre.toLowerCase();
          if(nombre.indexOf(texto) !== -1 ){
              resultado.innerHTML += `
              <li class="music">
                <input type="text" value="${musica.url}" style="display: none;">
                <a href="#" id="${musica.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
                <h3>${musica.artista}</h3> 
                <h3 class="name" id="name">${musica.nombre}</h3> 
                <h3 class="time">--</h3>
             </li>
              `;
              reproducirMusica(e);
              e.target.parentElement.classList.add('reaccion-activa-reproducida');
              contenedorListaMusic.innerHTML = html;
          }
             
        }

        if(resultado.innerHTML === ''){
            resultado.innerHTML += `
            <li>Musica no encontrada</li>
            `
        }

    }
    boton.addEventListener('click', filtrar)
    contenedorListaMusic.addEventListener('click',reproducirMusica)
    // formulario.addEventListener('keyup', filtrar)



    
    // filtrar();
    

               
    

}


