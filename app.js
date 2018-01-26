/* global module, require */

var checkSiret = require('siret');
var config = {
  codePays: "FR",
  firmApiBase: "https://firmapi.com/api/v1/",
  firmApiSearch: "companies/",
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
  if (checkSiret.isSIRET(number)) isSiret = true;
  else if (checkSiret.isSIREN(number)) isSiret = false;
  else return false;
  if (isSiret) {
    numero = numero.substring(0, 9);
  }
  var defaultCallback = function (err, data) {
    if (err) {
      console.error(err);
    }
    else {
      console.log(data);
    }
  };
  var cb = callback || defaultCallback;
  var request = require('request');
  var url = config.firmApiBase + config.firmApiSearch;
  request({url: url + numero, json: true}, function (error, response, body) {
    if (error) {
      cb(error.message);
    }
    else if (body && body.status === "error") {
      cb("error api : " + body.message);
    }
    else if (!response || response.statusCode !== 200) {
      cb("error http code : " + response.statusCode);
    }
    else if (!body || body.status !== "success") {
      cb("unknown error api : " + body.status);
    }
    else {
      cb(null, body.company);
    }
  });
}
function getCompanyInfoNom(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.names.best);
    }
  });
}
function getCompanyInfoAdress(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,{add: data.address,cp: data.postal_code,ville: data.city} );
    }
  });
}
function getCompanyInfoCapital(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.capital);
    }
  });
}
function getCompanyInfoLegal(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.legal_form);
    }
  });
}
function getCompanyInfoLastUpdate(number, callback) {
  getCompanyInfo(number,function (err, data) {
    if (err) {
      callback(err);
    }
    else {
      callback(null,data.last_legal_update);
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
module.exports.check = checkSiret;
module.exports.check.isTVA = isTVA;