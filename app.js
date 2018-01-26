/* global module, require */

var checkSiret = require('siret');
var config = {
  firmApiBase: "https://firmapi.com/api/v1/",
  firmApiSearch: "companies/",
  longCode: false
};

function init(conf) {
  if (conf !== undefined)
    config = require('merge').recursive(true, config, conf);
  return module.exports;
}

function convertTva(number) {
  if (isNaN(number)) return false;
  var isSiret = false;
  var numero = cleanSiret(number);
  if (checkSiret.isSIRET(number)) isSiret = true;
  else if (checkSiret.isSIREN(number)) isSiret = false;
  else return false;
  if (isSiret) {
    numero = numero.substring(0, 9);
  }
  var codeP = "FR";
  var k = (12 + (3 * (parseInt(numero) % 97))) % 97;
  var key = new String((k < 10) ? "0" + k : k);
  if (config.longCode === true) {
    return codeP + key + ' ' + numero.substring(0, 3) + ' ' + numero.substring(3, 6) + ' ' + numero.substring(6, 9);
  }
  else {
    return codeP + key + numero;
  }
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

function cleanSiret(number) {
  var numero = new String(number);
  numero = numero.replace(/\s/g, '');
  return numero;
}

module.exports = init;
module.exports.config = config;
module.exports.getTva = convertTva;
module.exports.getInfo = getCompanyInfo;
module.exports.cleanSiret = cleanSiret;
module.exports.check = checkSiret;