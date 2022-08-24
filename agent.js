const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Agent {
  agentNumber;
  compute(perception) {
    if (perception === 'S') {
      const shuffled = DIGITS.sort(() => 0.5 - Math.random());
      this.agentNumber = shuffled.slice(0, 4).join('');
      console.log(this.agentNumber);
      return 'R';
    }
    if (perception === '#') {
      // El caracter # le indica al agente que debe preguntar un número de cuatro dígitos diferentes (puede empezar con cero).
      return '0123';
    }
    if (!isNaN(perception)) {
      // Un número natural de cuatro dígitos diferentes (puede empezar con cero) a lo que debe responder con el número de picas y fijas respecto a su número. Se percibe como cadena de caracteres.
      let cleanPerception = perception;
      if (perception.length > 4) {
        console.log('Tramposo');
      } else if (perception.length < 4) {
        cleanPerception = perception.padStart(4, '0');
      }
      let picas = 0, fijas = 0;
      for(let i = 0; i < cleanPerception.length; i++) {
        for(let j = 0; j < this.agentNumber.length; j++) {
          if (cleanPerception[i] === this.agentNumber[j] && i === j) {
            fijas++;
          } else if (cleanPerception[i] === this.agentNumber[j]) {
            picas++;
          }
        }
      }
      return `${picas},${fijas}`;
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

export default Agent;