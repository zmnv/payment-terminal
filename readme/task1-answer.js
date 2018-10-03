/*
  Если я правильно понял, то этот код
  — функция отделения рублей от копеек в числе типа «цена».

  Воспринимает одинаково: 1.000,00 и 1,000.00, выдает только «границу» рублевой части в виде индекса.
  func('1.000,00', ',', '.')
*/

function func(s, a, b) {

	if (s.match(/^$/)) {
		return -1;
	}

	var i = s.length -1;
	var aIndex =     -1;
	var bIndex =     -1;

	while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
    const subs = s.substring(i, i +1);
	    if (subs == a) {
	    	aIndex = i;
    	}
	    if (subs == b) {
	    	bIndex = i;
      }

      i = i - 1;
	}

	if (aIndex != -1) {
	    if (bIndex == -1) {
	        return aIndex;
	    }
	    else {
	        return Math.max(aIndex, bIndex);
	    }
	}

	if (bIndex != -1) {
	    return bIndex;
	}
	else {
	    return -1;
	}
}

const goGog = (input, a, b) => {
  const fun = func(input, a, b);
  return fun !== -1 ? input.slice(0, fun) : input;
}

console.log('1000: ', goGog('1000', '.', ','));
console.log('45.400,40: ', goGog('45.400,40', ',', '.'));
console.log('45 400,40: ', goGog('45,400.40', '.', ','));
console.log('45,400.40: ', goGog('45,400.40', ',', '.'));
