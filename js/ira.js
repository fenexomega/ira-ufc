

function loadJson(name)
{
	if(localStorage.disciplinas != undefined)
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
	// formula tirada de
	// http://www.prograd.ufc.br/perguntas-frequentes/384-perguntas-frequentes-ira
	var A1 = 0,B1 = 0;
	var C  = calCargaTotal(obj);
	var CT = 0;
	var coefTrancamento = 0;
	for(semestre of obj.semestres)
	{
		for(d of semestre.disciplinas)
			if(d.trancada == true)
				CT += d.carga;
			else
			{
				B1 += Math.min(6,v.semestre) * v.carga
				A1 += Math.min(6,v.semestre) * v.carga * v.nota
			}
		if(coefTrancamento != coefTrancamento)
			coefTrancamento = 0
		console.log(coefTrancamento)
		if(!B1)
			B1 = 1
	}
	coefTrancamento = 1.0 - (CT/(2.0*C))

	return coefTrancamento*(A1/B1)
}
