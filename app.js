/* global module */

var checkSiret = require('siret');

function convertTva(number) {
  if (isNaN(number)) return false;
  var isSiret = false;
  var numero = cleanSiret(number);
  if (checkSiret.isSIRET(number)) isSiret = true;
  else if (checkSiret.isSIREN(number)) isSiret = false;
  else return false;
  if (isSiret) {
    numero = numero.substring(0, 9);
  }
  var codeP = "FR";
  var k = (12 + (3 * (parseInt(numero) % 97))) % 97;
  var key = new String((k < 10) ? "0" + k : k);
  return codeP + key + numero;
}

function cleanSiret(number) {
  var numero = new String(number);
  numero = numero.replace(/\s/g, '');
  return numero;
}

module.exports = convertTva;
module.exports.getTva = convertTva;
module.exports.check = checkSiret;