'use strict';

const https = require('https');

const value = process.argv[2];
const coin = process.argv[3];
const usage = "\nNão foram passados os argumentos\nModelo de Comando:\nnode main.js {valor a ser convertido} {nº moeda para a conversão}\nEx: node main.js 5.00 1\n";
const listOfCoins = ["Dolar", "Euro", "Libra-Esterlina", "Peso-Argentino", "Bitcoin"];

if(!value|| !coin){
	console.log(usage);
	listOfCoins.forEach((element, index)=>{
		console.log(`${index+1} - ${element}`);
	});
}

https.get('https://api.hgbrasil.com/finance?format=json', (res)=>{
	let text = "";
	res.on('data', (chunck)=>{
		text += chunck;
	});
	res.on('end', ()=>{
		let valObj = (JSON.parse(text)); 

		switch(coin){
			case '1':
				console.log(convert("Dólar", "dolares", value, valObj.results.currencies.USD.buy));
				break;
			case '2':
				console.log(convert("Euro", "euros", value, valObj.results.currencies.EUR.buy));
				break;
			case '3':
				console.log(convert("Libra Esterlina", "libras esterlinas", value, valObj.results.currencies.GBP.buy));
				break;
			case '4':
				console.log(convert("Peso Argentino", "pesos",value, valObj.results.currencies.ARS.buy));
				break;
			case '5':
				console.log(convert("Bitcoin", "bitcoins", value, valObj.results.currencies.BTC.buy));
				break;
		}

	});
});

function convert(coin, unit, value, price){
	return `\nR$ ${value} Reais convertido(s) para ${coin} é: ${(parseFloat(value)*price).toFixed(2)} ${unit}`;
}