const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SIZE = 4;

const getPermutations = (list, maxLen) => {
  return list.flatMap((v, i) => maxLen > 1
      ? getPermutations([...list.slice(0, i), ...list.slice(i + 1)], maxLen - 1).map(w => [v, ...w])
      : [[v]]
  );
}

const calculatePicasYFijas = (original, apuesta) => {
  let picas = 0, fijas = 0;
  for(let i = 0; i < apuesta.length; i++) {
    for(let j = 0; j < original.length; j++) {
      if (apuesta[i] === original[j] && i === j) {
        fijas++;
      } else if (apuesta[i] === original[j]) {
        picas++;
      }
    }
  }
  return [picas, fijas];
}

const compareArrays = (array1, array2) => {
  return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
}

class Agent {
  agentNumber;
  choices;
  nextAns;
  scores;
  compute(perception) {
    if (perception === 'S') {
      const shuffled = DIGITS.sort(() => 0.5 - Math.random());
      this.agentNumber = shuffled.slice(0, 4).join('');
      this.choices = getPermutations(DIGITS, SIZE);
      this.scores = [];
      this.nextAns = this.choices[0];
      return 'R';
    }
    if (perception === '#') {
      // El caracter # le indica al agente que debe preguntar un número de cuatro dígitos diferentes (puede empezar con cero).
      return this.nextAns.join('');
    }
    if (!isNaN(perception)) {
      // Un número natural de cuatro dígitos diferentes (puede empezar con cero) a lo que debe responder con el número de picas y fijas respecto a su número. Se percibe como cadena de caracteres.
      let cleanPerception = perception;
      if (perception.length > 4) {
        console.log('Tramposo');
      } else if (perception.length < 4) {
        cleanPerception = perception.padStart(4, '0');
      }
      const [picas, fijas] = calculatePicasYFijas(this.agentNumber, cleanPerception);
      return `${picas},${fijas}`;
    }
    if (!isNaN(perception[0]) && perception[1] === ',' && !isNaN(perception[2])) {
      if (Number(perception[0]) + Number(perception[2]) > 4) {
        console.log('Tramposo');
      }
      const picas = Number(perception[0]), fijas = Number(perception[2]);
      const resultado = [picas, fijas];
      this.scores.push(resultado);
      if (compareArrays(resultado, [0, SIZE])) {
        console.log('Ganeeee');
      }
      this.choices = this.choices.filter((choice) => compareArrays(calculatePicasYFijas(choice, this.nextAns), resultado));
      if (this.choices.length <= 0) {
        console.log('humano mentiroso');
        return 'A'
      }
      this.nextAns = this.choices[0];
      // Dos números naturales p y f (separados por una coma) tales que su suma sea menor o igual a cuatro (p+f<=4) y que son el número de picas y fijas respecto al número n que el agente actuó anteriormente. Se percibe como cadena de caracteres.
      return 'A';
    }
  }
}

export default Agent;