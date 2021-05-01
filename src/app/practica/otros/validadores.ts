export function validarNumero(numero: string): boolean {
  let numeroValido = false;
  for (let index = 0; index < numero.length; index++) {
    const character = numero[index];
    let x = Number.parseInt(character);
    if (Object.is(x, NaN)) {
      numeroValido = false;
      index = numero.length;
      return numeroValido;
    }
  }
  numeroValido = true;
  return numeroValido;
}