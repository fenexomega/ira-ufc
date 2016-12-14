var fs = require('fs')

function loadJson(name)
{
	if(fs.existsSync(name))
		return JSON.parse(fs.readFileSync(name,'utf8'))
	return { trancadas: [], completas: [], simuladas: []};
}

function saveJson(json)
{
	var string = JSON.stringify(json)
	localStorage.disciplinas = json;
}
function calCargaTotal(obj)
{
	var total = 0
	for(d of obj.trancadas)
		total += d.carga
	for(d of obj.completas)
		total += d.carga
	return total

}

function calcIra(obj)
{
	var A1 = 0,B1 = 0
	var C  = calCargaTotal(obj)
	var CT = 0
	for(d of obj.trancadas)
		CT += d.carga
	console.log("CT = " + CT)
	var coefTrancamento = 1.0 - (CT/(2.0*C))
	if(coefTrancamento != coefTrancamento)
		coefTrancamento = 0
	console.log(coefTrancamento)
	for(var v of obj.completas)
		B1 += Math.min(6,v.semestre) * v.carga
	for(var v of obj.completas)
		A1 += Math.min(6,v.semestre) * v.carga * v.nota
	if(!B1)
		B1 = 1
	return coefTrancamento*(A1/B1)
}

var x = calcIra(loadJson("modelo.json"))
