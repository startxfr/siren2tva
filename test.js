/* global module */

var siren2tva = require('./app');

siren2tva({
  longCode: false
});

console.info('==== TEST CONVERTIONS ==============');
console.info('= Convert SIRET 44997052400038 into VAT code');
console.log(siren2tva.siret2tva('44997052400038'));
// Return FR26449970524
console.info('= Convert SIREN 449970524 into VAT code');
console.log(siren2tva.siren2tva('449970524'));
// Return FR26449970524
console.info('= Convert VAT FR26449970524 into SIREN');
console.log(siren2tva.tva2siren('FR26449970524'));
// Return 449970524

console.info('==== TEST CHECK NUMBERS ============');
console.info('= Check if SIRET 44997052400038 is valid (should return yes)');
console.log(siren2tva.check.isSIRET('44997052400038'));
// Return true

console.info('= Check if SIREN 449970524 is valid (should return yes)');
console.log(siren2tva.check.isSIREN('449970524'));
// Return true

console.info('= Check if VAT FR26449970524 is valid (should return yes)');
console.log(siren2tva.check.isTVA('FR26449970524'));
// Return true

console.info('= Check if SIRET 01234567890123 is valid (should return no)');
console.log(siren2tva.check.isSIRET('01234567890123'));
// Return false

console.info('= Check if SIREN 012345678 is valid (should return no)');
console.log(siren2tva.check.isSIREN('012345678'));
// Return false

console.info('= Check if VAT FR00012345678 is valid (should return no)');
console.log(siren2tva.check.isTVA('FR00012345678'));
// Return false

console.info('==== TEST GET CONPANY INFO =========');
siren2tva.getInfoNom('449970524', function (err, data) {
  console.info('= Get name of the company with SIREN 449970524');
  (err) ? console.error(err) : console.log(data);
});
// Return STARTX

siren2tva.getInfoAdress('449970524', function (err, data) {
  console.info('= Get adress of the company with SIREN 449970524');
  (err) ? console.error(err) : console.log(data);
});
// Return { add: '171 Avenue Georges Clémenceau', cp: '92000', ville: 'Nanterre' }

siren2tva.getInfoCapital('449970524', function (err, data) {
  console.info('= Get capital of the company with SIREN 449970524');
  (err) ? console.error(err) : console.log(data);
});
// Return 50005

siren2tva.getInfoLegal('449970524', function (err, data) {
  console.info('= Get legal form of the company with SIREN 449970524');
  (err) ? console.error(err) : console.log(data);
});
// Return SARL

siren2tva.getInfoLastUpdate('449970524', function (err, data) {
  console.info('= Get last legal update of the company with SIREN 449970524');
  (err) ? console.error(err) : console.log(data);
});
// Return 2013-11-03

siren2tva.getInfo('449970524', function (err, data) {
  console.info('= Return information about company with SIREN 449970524 (exist)');
  (err) ? console.error(err) : console.log(data);
});
// Return {company}

siren2tva.getInfo('123456789', function (err, data) {
  console.info('= Return information about company with SIREN 012345678 (doesn\'t exist)');
  (err) ? console.error(err) : console.log(data);
});
// Return Error