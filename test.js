/* global module */

var siren2tva = require('./app');

siren2tva({
  longCode: false
});

console.log(siren2tva.getTva('702002221'));
// Return FR72794652115 : this is a VAT number

console.log(siren2tva.getInfo('702002221', function (err, data) {
  if (err) {
    console.info(err);
  }
  else {
    console.info(data);
  }
}));

console.log(siren2tva.check.isSIRET('79465211500013'));
// Return true : this is a SIRET number

console.log(siren2tva.check.isSIREN('794652115'));
// Return true : this is a SIREN number

console.log(siren2tva.check.isSIRET('01234567890123'));
// Return false : this is NOT a SIRET number

console.log(siren2tva.check.isSIREN('012345678'));
// Return false :  : this is NOT a SIREN number