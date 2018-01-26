# 
# siren2tva ![siren2tva](https://img.shields.io/badge/latest-v0.0.3-blue.svg)

Node module to convert siren /siret code into French VAT Number. Check if a french company is recorded and 
return detailled information about a french company. Include toolkit for checking if a SIREN or SIRET number is accurate

[![last commit](https://img.shields.io/github/last-commit/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) [![licence](https://img.shields.io/github/license/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) 

#### Installation

```bash
npm install siren2tva --save
```

#### Usage

```js
var siren2tva = require('siren2tva');

// Set configuration to display long VAT numbers (with space)
siren2tva({ longCode: true });

console.log(siren2tva.getTva('79465211500013'));
// Return FR72 794 652 115 : long VAT number

// Set configuration to display short VAT numbers (default)
siren2tva({ longCode: false });

console.log(siren2tva.getTva('79465211500013'));
// Return FR72794652115 : short VAT number

console.log(siren2tva.check.isSIRET('79465211500013'));
// Return true : this is a SIRET number

console.log(siren2tva.check.isSIREN('794652115'));
// Return true : this is a SIREN number

console.log(siren2tva.check.isSIRET('01234567890123'));
// Return false : this is NOT a SIRET number

console.log(siren2tva.check.isSIREN('012345678'));
// Return false :  : this is NOT a SIREN number
```

siren2tva.getInfo('79465211500013',function(error, data) {
   console.log(error, data);
});
// Return Json information : detailled information about a french company

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
