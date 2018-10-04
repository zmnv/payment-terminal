/* --------------------------------------------------------
  Вместо переменных aIndex и bIndex можно
  было бы определить объект position = { aIndex, bIndex }.

  Сделал константы, чтобы красивее читалось.
---------------------------------------------------------- */

function funcNew(input, a, b) {

  const aIndex = input.lastIndexOf(a);
  const bIndex = input.lastIndexOf(b);

  // повторяем игнор первого символа
  if (aIndex != -1 && aIndex != 0) return bIndex == -1 ? aIndex : Math.max(aIndex, bIndex);

  if (bIndex != -1 && bIndex != 0) return bIndex;

  return -1;
}

module.exports = funcNew;
