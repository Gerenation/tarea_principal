// Este bloque obtiene los elementos del HTML que vamos a usar.
const palabraOculta = document.getElementById("palabraOculta");
const intentosRestantesTexto = document.getElementById("intentosRestantes");
const letrasAcertadasTexto = document.getElementById("letrasAcertadas");
const letrasFallidasTexto = document.getElementById("letrasFallidas");
const entradaLetra = document.getElementById("entradaLetra");
const botonProbar = document.getElementById("botonProbar");
const botonReiniciar = document.getElementById("botonReiniciar");
const dibujoAhorcado = document.getElementById("dibujoAhorcado");
const mensajeJuego = document.getElementById("mensajeJuego");

// Este arreglo tiene palabras predefinidas(nombres de mismascotas incluidos) para cumplir la actividad.
const palabrasDelJuego = [
  "panda",
  "nala",
  "milo",
  "mia",
  "maya",
  "nemo",
  "unac",
];

// Este bloque guarda el estado del juego.
let palabraSecreta = "";
let intentosRestantes = 6;
let letrasAcertadas = [];
let letrasFallidas = [];
let juegoFinalizado = false;

// Esta función elige una palabra aleatoria del arreglo.
const obtenerPalabraAleatoria = () => {
  const indicePalabra = Math.floor(Math.random() * palabrasDelJuego.length);
  return palabrasDelJuego[indicePalabra];
};

// Esta función dibuja el ahorcado según la cantidad de errores.
const obtenerDibujo = (cantidadErrores) => {
  const dibujos = [
` +---+
 |   |
     |
     |
     |
     |
=======`,
` +---+
 |   |
 O   |
     |
     |
     |
=======`,
` +---+
 |   |
 O   |
 |   |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|   |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
     |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
/    |
     |
=======`,
` +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=======`
  ];

  return dibujos[cantidadErrores];
};

// Esta función muestra la palabra con guiones y letras acertadas.
const mostrarPalabra = () => {
  let palabraMostrada = "";

  // Este bloque recorre cada letra de la palabra secreta.
  for (let indiceLetra = 0; indiceLetra < palabraSecreta.length; indiceLetra += 1) {
    const letraActual = palabraSecreta[indiceLetra];  

        if (letrasAcertadas.includes(letraActual)) {
      palabraMostrada += `${letraActual} `;
    } else {
      palabraMostrada += "_ ";
    }
  }

    palabraOculta.textContent = palabraMostrada.trim();
};

// Esta función actualiza textos y dibujo en la interfaz.
const actualizarPantalla = () => {
  mostrarPalabra();
  intentosRestantesTexto.textContent = `${intentosRestantes}`;
  letrasAcertadasTexto.textContent = letrasAcertadas.length > 0 ? letrasAcertadas.join(", ") : "-";
  letrasFallidasTexto.textContent = letrasFallidas.length > 0 ? letrasFallidas.join(", ") : "-";
  dibujoAhorcado.textContent = obtenerDibujo(6 - intentosRestantes);
};

// Esta función revisa si el jugador completó toda la palabra.
const jugadorGano = () => {
  for (let indiceLetra = 0; indiceLetra < palabraSecreta.length; indiceLetra += 1) {
    const letraActual = palabraSecreta[indiceLetra];

        if (!letrasAcertadas.includes(letraActual)) {
      return false;
    }
  }
  return true;
};
// Esta función inicia una nueva partida.
const iniciarJuego = () => {
  // Este bloque reinicia todas las variables del juego.
  palabraSecreta = obtenerPalabraAleatoria();
  intentosRestantes = 6;
  letrasAcertadas = [];
  letrasFallidas = [];
  juegoFinalizado = false;  

    // Este bloque limpia input y mensaje.
  entradaLetra.value = "";
  mensajeJuego.textContent = "Escribe una letra y presiona Probar.";

    actualizarPantalla();
};

// Esta función procesa la letra que escribe el jugador.
const probarLetra = () => {
  // Este bloque evita seguir jugando cuando ya terminó la partida.
  if (juegoFinalizado) {
    mensajeJuego.textContent = "La partida terminó. Presiona Nueva palabra.";
    return;
  }

    const letraIngresada = entradaLetra.value.toLowerCase().trim();

  // Este bloque valida que sea una sola letra.
  if (!/^[a-zñ]$/.test(letraIngresada)) {
    mensajeJuego.textContent = "Debes escribir solo una letra.";
    return;
  }

  // Este bloque evita repetir letras.
  if (letrasAcertadas.includes(letraIngresada) || letrasFallidas.includes(letraIngresada)) {
    mensajeJuego.textContent = `La letra ${letraIngresada} ya fue usada.`;
    return;
  }
  // Este bloque revisa si la letra existe en la palabra.
  if (palabraSecreta.includes(letraIngresada)) {
    letrasAcertadas.push(letraIngresada);
    mensajeJuego.textContent = `Bien, la letra ${letraIngresada} sí está.`;
  } else {
    letrasFallidas.push(letraIngresada);
    intentosRestantes -= 1;
    mensajeJuego.textContent = `Lo siento, la letra ${letraIngresada} no está.`;
  }

  // Limpia el campo de entrada después de probar la letra.
  entradaLetra.value = "";
  entradaLetra.focus();

  actualizarPantalla();

  // Este bloque revisa condiciones de fin de juego.
  if (jugadorGano()) {
    juegoFinalizado = true;
    mensajeJuego.textContent = `Ganaste. La palabra era ${palabraSecreta}.`;
    return;
  }
  
    if (intentosRestantes === 0) {
    juegoFinalizado = true;
    mensajeJuego.textContent = `Perdiste. La palabra era ${palabraSecreta}.`;
  }
};

// Este bloque conecta el botón Probar con la función principal.
botonProbar.addEventListener("click", () => {
  probarLetra();
});


// Este bloque conecta el botón Nueva palabra.
botonReiniciar.addEventListener("click", () => {
  iniciarJuego();
});

// Este bloque permite usar la tecla Enter en el input.
entradaLetra.addEventListener("keydown", (eventoTecla) => {
  if (eventoTecla.key === "Enter") {
    probarLetra();
  }
});

// Este bloque inicia la primera partida al cargar la página.
iniciarJuego();