class Agent {
  compute(perception) {
    if (perception === 'S') {
      // El caracter S le indica al agente que debe iniciar un nuevo juego.
      return 'R';
    }
    if (perception === '#') {
      // El caracter # le indica al agente que debe preguntar un número de cuatro dígitos diferentes (puede empezar con cero).
      return '0123';
    }
    if (!isNaN(perception)) {
      // Un número natural de cuatro dígitos diferentes (puede empezar con cero) a lo que debe responder con el número de picas y fijas respecto a su número. Se percibe como cadena de caracteres.
      return '0,0';
    }
    if (!isNaN(perception[0]) && perception[1] === ',' && !isNaN(perception[2])) {
      if (Number(perception[0]) + Number(perception[2]) > 4) {
        console.log('Tramposo');
      }
      // Dos números naturales p y f (separados por una coma) tales que su suma sea menor o igual a cuatro (p+f<=4) y que son el número de picas y fijas respecto al número n que el agente actuó anteriormente. Se percibe como cadena de caracteres.
      return 'A';
    }
  }
}