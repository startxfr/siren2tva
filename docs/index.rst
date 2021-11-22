#########
siren2tva
#########

siren2tva is a NodeJS module to manipulate French SIREN / SIRET or VAT Number in either way.
This module will also retrieve legals informations such as legal form, company name, capital
and adress from valid SIRET, SIREN or VAT numbers using French State OpenData Api.

|siren2tva|_ |last|_ |licence|_

.. |siren2tva| image:: https://img.shields.io/badge/latest-v1.1.5-blue.svg
   :align: middle
   :alt: sxapi release
.. _siren2tva: https://www.npmjs.com/package/siren2tva
.. |last| image:: https://img.shields.io/github/last-commit/startxfr/siren2tva.svg
   :align: middle
   :alt: last commit
.. _last: https://github.com/startxfr/siren2tva
.. |licence| image:: https://img.shields.io/github/license/startxfr/siren2tva.svg
   :align: middle
   :alt: licence
.. _licence: https://github.com/startxfr/siren2tva/blob/master/LICENSE

********
Features
********

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


************
Installation
************

Install siren2tva by running:

.. code-block:: bash

    npm install siren2tva --save


*****
Usage
*****

Load module
===========

load the library into your nodejs code:

.. code-block:: javascript

  var siren2tva = require('siren2tva');


Configure module
================

Create an instance of siren2tva with the given config. This step is optional as default setting are sufficients.

.. code-block:: javascript

  siren2tva({ longCode: true });


Convertion features examples
============================

Convert SIRET into VAT code
---------------------------

.. code-block:: javascript

    console.log(siren2tva.siret2tva('44997052400038'));
    // Return FR26449970524


Convert SIREN into VAT code
---------------------------

.. code-block:: javascript

    console.log(siren2tva.siren2tva('449970524'));
    // Return FR26449970524


Convert VAT code into SIREN
---------------------------

.. code-block:: javascript

    console.log(siren2tva.tva2siren('FR26449970524'));
    // Return 449970524


Verification features examples
==============================

Check if SIRET is valid
-----------------------

.. code-block:: javascript

    console.log(siren2tva.check.isSIRET('44997052400038'));
    // Return true
    console.log(siren2tva.check.isSIRET('01234567890123'));
    // Return false


Check if SIREN is valid
-----------------------

.. code-block:: javascript

    console.log(siren2tva.check.isSIREN('449970524'));
    // Return true
    console.log(siren2tva.check.isSIREN('012345678'));
    // Return false


Check if VAT code is valid
--------------------------

.. code-block:: javascript

    console.log(siren2tva.check.isTVA('FR26449970524'));
    // Return true
    console.log(siren2tva.check.isTVA('FR00012345678'));
    // Return false


Company informations features examples
======================================

Get name of the company coresponding to a SIREN
-----------------------------------------------

.. code-block:: javascript

    siren2tva.getInfoNom('449970524', function (err, name) {
    console.log(name);
    });
    // Return STARTX


Get the adress of the company coresponding to a SIREN
-----------------------------------------------------

.. code-block:: javascript

    siren2tva.getInfoAdress('449970524', function (err, adress) {
    console.info(adress);
    });
    // Return { add: '171 Avenue Georges Clémenceau', cp: '92000', ville: 'Nanterre' }


Get capital amount of the company coresponding to a SIREN
---------------------------------------------------------

.. code-block:: javascript

    siren2tva.getInfoCapital('449970524', function (err, capital) {
    console.log(capital);
    });
    // Return 50005


Get legal form of the company coresponding to a SIREN
-----------------------------------------------------

.. code-block:: javascript

    siren2tva.getInfoLegal('449970524', function (err, legal) {
    console.log(legal);
    });
    // Return SARL


Get last official public registry update of the company coresponding to a SIREN
-------------------------------------------------------------------------------

.. code-block:: javascript

    siren2tva.getInfoLastUpdate('449970524', function (err, date) {
    console.log(date);
    });
    // Return 2013-11-03


Get all legals informations about the company coresponding to a SIREN
---------------------------------------------------------------------

.. code-block:: javascript

    siren2tva.getInfo('449970524', function (err, company) {
    return (err) ? console.error(err) : console.log(company);
    });
    // Return {company}


***************
Troubleshooting
***************

If you run into difficulties installing or running siren2tva, you can [create an issue](https://github.com/startxfr/siren2tva/issues/new).


**********
Built With
**********

- `Node.js`_ - Runtime environement
- `npm`_ - Packet manager
- `siret module`_ - SIRET module by Steeve LEFORT
- `OpenData GovFr`_ - Opendata platform fro the French State database


************
Contributing
************

Read the `contributing guide`_ for details on our code of conduct, and the process for submitting pull requests to us.

- Issue Tracker: github.com/startxfr/siren2tva/issues
- Source Code: github.com/startxfr/siren2tva


*******
Authors
*******

This project is mainly developped by the `startx`_ dev team. You can see the complete list of contributors who participated in this project by reading `CONTRIBUTORS.md`_.


*******
License
*******

This project is licensed under the Apache License Version 2.0 - see the `LICENSE`_ file for details


**********
References
**********

.. target-notes::

.. _`Node.js`: https://nodejs.org
.. _`npm`: https://www.npmjs.com
.. _`siret module`: https://github.com/steevelefort/siret
.. _`OpenData GovFr`: https://entreprise.data.gouv.fr
.. _`contributing guide`: https://github.com/startxfr/sxapi-core/tree/master/docs/5.Contribute.md
.. _`startx`: https://www.startx.fr
.. _`CONTRIBUTORS.md`: https://github.com/startxfr/sxapi-core/tree/master/docs/CONTRIBUTORS.md
.. _`LICENSE`: https://github.com/startxfr/siren2tva/tree/master/LICENSE
