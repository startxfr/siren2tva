/* global module, require */

/* backport of the https://github.com/steevelefort/siret code */
var checkSiret = {
  isSIRET: function(siret){
    return this.verify(siret,14);
  },
  isSIREN: function(siren){
    return this.verify(siren,9)
  },
  verify: function (number, size){
    if (isNaN(number) || number.length!=size) return false;
    var bal = 0;
    var total = 0;
    for (var i=size-1; i>=0; i--){
        var step = (number.charCodeAt(i)-48)*(bal+1);
        /*if (step>9) { step -= 9; }
         total += step;*/
        total += (step>9)?step-9:step;
        bal = 1-bal;
    }
    return (total%10==0)?true:false;
  }
};

var config = {
  codePays: "FR",
  // Deprecated and should mode to https://data.inpi.fr/
  inseeApiBase: "https://entreprise.data.gouv.fr/api/sirene/v3/",
  inseeApiSearchSiren: "unites_legales/",
  inseeApiSearchSiret: "etablissements/",
  longCode: false
};

function init(conf) {
  if (conf !== undefined)
    config = require('merge').recursive(true, config, conf);
  return module.exports;
}

function isTVA(number) {
  var numero = cleanSiret(number);
  if (numero.substring(0, 2) !== config.codePays) return false;
  var keyFound = numero.substring(2, 4);
  var siren = numero.substring(4, 13);
  if (!checkSiret.isSIREN(siren)) return false;
  if (getTvaKeyFromSiren(siren) !== keyFound) return false;
  else return true;
}

function convertTva2Siren(number) {
  var numero = cleanSiret(number);
  return numero.substring(4, 13);
}

function convertSiren2Tva(number) {
  if (isNaN(number)) return false;
  var isSiret = false;
  var numero = cleanSiret(number);
  if (checkSiret.isSIREN(number)) isSiret = false;
  else if (checkSiret.isSIRET(number)) isSiret = true;
  else return false;
  if (isSiret) {
    numero = numero.substring(0, 9);
  }
  var codeP = config.codePays;
  var key = getTvaKeyFromSiren(numero);
  if (config.longCode === true) {
    return codeP + key + ' ' + numero.substring(0, 3) + ' ' + numero.substring(3, 6) + ' ' + numero.substring(6, 9);
  }
  else {
    return codeP + key + numero;
  }
}

function getTvaKeyFromSiren(number) {
  var k = (12 + (3 * (parseInt(number) % 97))) % 97;
  var key = (k < 10) ? "0" + k : "" + k;
  return key;
}

function getCompanyInfo(number, callback) {
  if (isNaN(number)) return false;
  var isSiret = false;
  var numero = cleanSiret(number);
  var defaultCallback = function (err, data) {
    (err) ? console.error(err) : console.log(data);
  };
  var cb = callback || defaultCallback;
  config.apiPath = config.inseeApiSearchSiren + numero;
  if (checkSiret.isSIRET(number)) isSiret = true;
  else if (checkSiret.isSIREN(number)) isSiret = false;
  else return cb(number +" is not a valid siret or siren number");
  if (isSiret) {
    config.apiPath = config.inseeApiSearchSiret + numero;
  }
  var urllib = require('urllib');
  var url = config.inseeApiBase + config.apiPath;
  var options = {
    dataType : "json"
  }
  if (config.inseeToken != "") {
    options.headers = {
          Authorization: 'Bearer ' + config.inseeToken
       }
  }
  urllib.request( url, options, function (error, body, response) {
    if (error) {
      cb(error.message);
    }
    else if (!response || response.statusCode !== 200) {
      cb("error http code : " + response.statusCode);
    }
    else {
      cb(null, isSiret ? body.etablissement : body.unite_legale.etablissement_siege);
    }
  });
}
function getCompanyInfoNom(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.denomination_usuelle);
    }
  });
}
function getCompanyInfoAdress(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      var add = data.numero_voie + ' '
      add += data.indice_repetition != '' ? data.indice_repetition + ' ' : '';
      add += data.type_voie != '' ? data.type_voie + ' ' : '';
      add += data.libelle_voie != '' ? data.libelle_voie + ' ' : '';
      callback(null,{add: add,cp: data.code_postal,ville: data.libelle_commune} );
    }
  });
}
function getCompanyInfoCapital(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.nomenclature_activite_principale);
    }
  });
}
function getCompanyInfoLegal(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.nomenclature_activite_principale);
    }
  });
}
function getCompanyInfoLastUpdate(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.date_dernier_traitement);
    }
  });
}

function cleanSiret(number) {
  var numero = new String(number);
  numero = numero.replace(/\s/g, '');
  return numero;
}

module.exports = init;
module.exports.config = config;
module.exports.siret2tva = convertSiren2Tva;
module.exports.siren2tva = convertSiren2Tva;
module.exports.tva2siren = convertTva2Siren;
module.exports.getInfo = getCompanyInfo;
module.exports.getInfoNom = getCompanyInfoNom;
module.exports.getInfoAdress = getCompanyInfoAdress;
module.exports.getInfoCapital = getCompanyInfoCapital;
module.exports.getInfoLegal = getCompanyInfoLegal;
module.exports.getInfoLastUpdate = getCompanyInfoLastUpdate;
module.exports.cleanSiret = cleanSiret;
module.exports.cleanSiren = cleanSiret;
module.exports.cleanTva = cleanSiret;
module.exports.check = checkSiret;
module.exports.check.isTVA = isTVA;