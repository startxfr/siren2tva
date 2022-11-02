# siren2tva ![siren2tva](https://img.shields.io/badge/latest-v1.2.0-blue.svg) [![last commit](https://img.shields.io/github/last-commit/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) [![licence](https://img.shields.io/github/license/startxfr/siren2tva.svg)](https://github.com/startxfr/siren2tva) [![Doc](https://readthedocs.org/projects/siren2tva/badge)](https://siren2tva.readthedocs.io)

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

## Usage example

```js
var siren2tva = require('siren2tva');
siren2tva({ longCode: true });
console.log(siren2tva.siret2tva('44997052400038'));
// Return FR26449970524
```

## Documentation

You can find example of all siren2tva function like siren2tva, tva2siren, check.isSIRET, check.isSIREN, check.isTVA, getInfoNom
, getInfoAdress, getInfoCapital, getInfoLegal, getInfoLastUpdate, getInfo in the [siren2tva full documentation](https://siren2tva.readthedocs.io/).

## Troubleshooting

If you run into difficulties installing or running siren2tva, you can [create an issue](https://github.com/startxfr/siren2tva/issues/new).

## Built With

- [Node.js](https://nodejs.org/) - Runtime environement
- [npm](https://www.npmjs.com/) - Packet manager
- [siret module](https://github.com/steevelefort/siret) - SIRET module by Steeve LEFORT
- [OpenData GovFr](https://entreprise.data.gouv.fr) - Opendata platform fro the French State database

## Contributing

Read the [contributing guide](https://github.com/startxfr/sxapi-core/tree/1.2.0/docs/5.Contribute.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

This project is mainly developped by the [startx](https://www.startx.fr) dev team. You can see the complete list of contributors who participated in this project by reading [CONTRIBUTORS.md](https://github.com/startxfr/sxapi-core/tree/1.2.0/docs/CONTRIBUTORS.md).

## License

This project is licensed under the Apache License Version 2.0 - see the [LICENSE](https://github.com/startxfr/siren2tva/tree/1.2.0/LICENSE) file for details
