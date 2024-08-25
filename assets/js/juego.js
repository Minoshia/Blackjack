
const moduloJuego = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencia al HTML.
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
          marcadorJugador = document.querySelectorAll('small'); 

    // Iniciamos el juego.
    const iniciarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        marcadorJugador.forEach(elem => elem.innerText = 0);
        divCartasJugador.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    } 

    // Función para crear una nueva baraja.
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i<= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    }

    // Función para pedir carta.
    const pedirCarta = () => {
        if(deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // Obtener puntuación de la carta.
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1);
    }

    // Turno 0 es el jugador y el último turno es el ordenador.
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta (carta);
        marcadorJugador[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
    }

    // Funcion para derterminar quien gana cada partida.
    const determinarGanador = () => {

        const [puntosMinimos, puntosOrdenador] = puntosJugadores;

        setTimeout(() => {
            if (puntosOrdenador === puntosMinimos) {
                alert('Empate');
            } else if ( puntosMinimos > 21){
                alert('Ordenador gana');
            } else if ( puntosOrdenador > 21){
                alert('Jugador Gana');
            }else {
                alert('Ordenador Gana');
            }
        }, 100);
    }

    // Turno del ordenador.
    const turnoOrdenador = (puntosMinimos) => {
        let puntosOrdenador = 0;
        do {
            const carta = pedirCarta();
            puntosOrdenador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        }while( (puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }

    // Función para pedir carta.
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('21 puntos, !genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        }
    });

    // Funcion para detener la partida.
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugadores[0]);
    });

    // Funcion para empezar un nuevo juego.
    /* btnNuevo.addEventListener('click', () => {
        iniciarJuego();
    }); */

    return {
        nuevoJuego: iniciarJuego
    };

})();





