# siren2tva ![siren2tva](https://img.shields.io/badge/latest-v1.0.1-blue.svg) [![last commit](https://img.shields.io/github/last-commit/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) [![licence](https://img.shields.io/github/license/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) 

NodeJS module to manipulate French SIREN / SIRET or VAT Number in either way.
This module will also retrieve legals informations such as legal form, company name, capital
and adress from valid SIRET, SIREN or VAT numbers using French State OpenData Api.

Features included :

- Convert SIRET to VAT number
- Convert SIREN to VAT number
- Convert VAT number to SIREN
- Clean SIRET / Siret or VAT number form space between numbers
- Check if a number is a valid SIRET
- Check if a number is a valid SIREN
- Check if a number is a valid VAT number
- Return legals informations about the company coresponding to a given SIREN / SIRET or VAT number
- Return the name of the company coresponding to a given SIREN / SIRET or VAT number
- Return the adress of the company coresponding to a given SIREN / SIRET or VAT number
- Return the capital amount of the company coresponding to a given SIREN / SIRET or VAT number
- Return the legal form of the company coresponding to a given SIREN / SIRET or VAT number
- Return the last update recorded for the company coresponding to a given SIREN / SIRET or VAT number

## Installation

```bash
npm install siren2tva --save
```

## Usage

### Load module

```js
var siren2tva = require('siren2tva');
```

### Configure module

```js
siren2tva({ longCode: true });
```

### Convert SIRET into VAT code

```js
console.log(siren2tva.siret2tva('44997052400038'));
// Return FR26449970524
```

### Convert SIREN into VAT code

```js
console.log(siren2tva.siren2tva('449970524'));
// Return FR26449970524
```

### Convert VAT code into SIREN

```js
console.log(siren2tva.tva2siren('FR26449970524'));
// Return 449970524
```

### Check if SIRET is valid

```js
console.log(siren2tva.check.isSIRET('44997052400038'));
// Return true
console.log(siren2tva.check.isSIRET('01234567890123'));
// Return false
```

### Check if SIREN is valid

```js
console.log(siren2tva.check.isSIREN('449970524'));
// Return true
console.log(siren2tva.check.isSIREN('012345678'));
// Return false
```

### Check if VAT code is valid

```js
console.log(siren2tva.check.isTVA('FR26449970524'));
// Return true
console.log(siren2tva.check.isTVA('FR00012345678'));
// Return false
```

### Get name of the company coresponding to a SIREN

```js
siren2tva.getInfoNom('449970524', function (err, name) {
  console.log(name);
});
// Return STARTX
```

### Get the adress of the company coresponding to a SIREN

```js

siren2tva.getInfoAdress('449970524', function (err, adress) {
  console.info(adress);
});
// Return { add: '171 Avenue Georges Clémenceau', cp: '92000', ville: 'Nanterre' }
```

### Get capital amount of the company coresponding to a SIREN

```js
siren2tva.getInfoCapital('449970524', function (err, capital) {
  console.log(capital);
});
// Return 50005
```

### Get legal form of the company coresponding to a SIREN

```js
siren2tva.getInfoLegal('449970524', function (err, legal) {
  console.log(legal);
});
// Return SARL
```

### Get last official public registry update of the company coresponding to a SIREN

```js
siren2tva.getInfoLastUpdate('449970524', function (err, date) {
  console.log(date);
});
// Return 2013-11-03
```

### Get all legals informations about the company coresponding to a SIREN

```js
siren2tva.getInfo('449970524', function (err, company) {
  return (err) ? console.error(err) : console.log(company);
});
// Return {company}
```

## Troubleshooting

If you run into difficulties installing or running siren2tva, you can [create an issue](https://github.com/startxfr/siren2tva/issues/new).

## Built With

- [Node.js](https://nodejs.org/) - Runtime environement
- [npm](https://www.npmjs.com/) - Packet manager
- [siret module](https://github.com/steevelefort/siret) - SIRET module by Steeve LEFORT
- [OpenData GovFr](https://entreprise.data.gouv.fr) - Opendata platform fro the French State database

## Contributing

Read the [contributing guide](https://github.com/startxfr/sxapi-core/tree/master/docs/5.Contribute.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

This project is mainly developped by the [startx](https://www.startx.fr) dev team. You can see the complete list of contributors who participated in this project by reading [CONTRIBUTORS.md](https://github.com/startxfr/sxapi-core/tree/master/docs/CONTRIBUTORS.md).

## License

This project is licensed under the Apache License Version 2.0 - see the [LICENSE](https://github.com/startxfr/siren2tva/tree/master/LICENSE) file for details
