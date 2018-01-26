/* global module */

var checkSiret = require('siret');

function convertTva(number){
    if (isNaN(number)) return false;
    var isSiret = false;
    var isSiren = false;
    if (checkSiret.isSIRET(number)) isSiret = true;
    else if (checkSiret.isSIREN(number)) isSiren = true;
    else return false;
    
//    var bal = 0;
//    var total = 0;
//    for (var i=size-1; i>=0; i--){
//        var step = (number.charCodeAt(i)-48)*(bal+1);
//        /*if (step>9) { step -= 9; }
//         total += step;*/
//        total += (step>9)?step-9:step;
//        bal = 1-bal;
//    }
    return number;
}

module.exports = convertTva;
module.exports.getTva = convertTva;
module.exports.check = checkSiret;