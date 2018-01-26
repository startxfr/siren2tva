# siren2tva ![siren2tva](https://img.shields.io/badge/latest-v0.0.6-blue.svg) [![last commit](https://img.shields.io/github/last-commit/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) [![licence](https://img.shields.io/github/license/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) 


NodeJS module to manipulate French SIREN / SIRET or VAT Number in either way. 
This module will also retrieve usefuls informations such as legal form, company name, capital 
and adress from valid SIRET, SIREN or VAT numbers.

Features included :
- Convert SIRET to VAT number
- Convert SIREN to VAT number
- Convert VAT number to SIREN
- Clean SIRET / Siret or VAT number form space between numbers
- Check if a number is a valid SIRET
- Check if a number is a valid SIREN
- Check if a number is a valid VAT number
- Return detailed informations about the company coresponding to a given SIREN / SIRET or VAT number
- Return the name of the company coresponding to a given SIREN / SIRET or VAT number
- Return the adress of the company coresponding to a given SIREN / SIRET or VAT number
- Return the capital amount of the company coresponding to a given SIREN / SIRET or VAT number
- Return the legal form of the company coresponding to a given SIREN / SIRET or VAT number
- Return the last update recorded for the company coresponding to a given SIREN / SIRET or VAT number


#### Installation

```bash
npm install siren2tva --save
```

#### Usage

```js
var siren2tva = require('siren2tva');

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
  console.log(data);
});
// Return STARTX

siren2tva.getInfoAdress('449970524', function (err, data) {
  console.info('= Get adress of the company with SIREN 449970524');
  console.info(data);
});
// Return { add: '171 Avenue Georges Clémenceau', cp: '92000', ville: 'Nanterre' }

siren2tva.getInfoCapital('449970524', function (err, data) {
  console.info('= Get capital of the company with SIREN 449970524');
  console.log(data);
});
// Return 50005

siren2tva.getInfoLegal('449970524', function (err, data) {
  console.info('= Get legal form of the company with SIREN 449970524');
  console.log(data);
});
// Return SARL

siren2tva.getInfoLastUpdate('449970524', function (err, data) {
  console.info('= Get last legal update of the company with SIREN 449970524');
  console.log(data);
});
// Return 2013-11-03

siren2tva.getInfo('449970524', function (err, data) {
  console.info('= Return information about company with SIREN 449970524 (exist)');
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
  }
});
// Return {company}

siren2tva.getInfo('123456789', function (err, data) {
  console.info('= Return information about company with SIREN 012345678 (doesn\'t exist)');
  console.error(err);
});
// Return Error
```

## Troubleshooting

If you run into difficulties installing or running siren2tva, you can [create an issue](https://github.com/startxfr/siren2tva/issues/new).

## Built With

* [Node.js](https://nodejs.org/) - Runtime environement
* [npm](https://www.npmjs.com/) - Packet manager
* [siret module](https://github.com/steevelefort/siret) - SIRET module by Steeve LEFORT
* [firmAPI](https://firmapi.com/documentation#introduction) - French company information API

## Contributing

Read the [contributing guide](https://github.com/startxfr/sxapi-core/tree/master/docs/5.Contribute.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

This project is mainly developped by the [startx](https://www.startx.fr) dev team. You can see the complete list of contributors who participated in this project by reading [CONTRIBUTORS.md](https://github.com/startxfr/sxapi-core/tree/master/docs/CONTRIBUTORS.md).

## License

This project is licensed under the Apache License Version 2.0 - see the [LICENSE](https://github.com/startxfr/siren2tva/tree/master/LICENSE) file for details
