// Clear console
console.clear();

// Require HentaiLa-node
var HentaiLa = require(`${__dirname}/index.js`);

/*
// Search
HentaiLa.search(`boku no`).then(async results => {
	console.log(`Resultados de la búsqueda:`, results);
}).catch(async err => {
	console.error(`Error en la búsqueda:`, err);
});
*/

/*
// Get hentai
HentaiLa.getHentai(`https://hentaila.com/hentai-boku-no-pico`).then(async res => {
	console.log(`Información del H:`, res);
}).catch(async err => {
	console.error(`Error en la obtención de datos de H:`, err);
});
*/

/*
// Get Episode
HentaiLa.getEpisode(`https://hentaila.com/ver/boku-no-pico-1`).then(async res => {
	console.log(`Información del episodio:`, res);
}).catch(async err => {
	console.error(`Error en la obtención de datos del episodio:`, err);
});
*/

/*
HentaiLa.getEpisode(`https://hentaila.com/ver/overflow-1`).then(async results => {
	console.log(`Información del episodio:`, results);
}).catch(async err => {
	console.error(`Error en la búsqueda:`, err);
});
*/

HentaiLa.getEpisode(`https://hentaila.com/ver/overflow-1`).then(async results => {
	//console.log(`Resultados de la búsqueda:`, results);
	console.log(results);
}).catch(async err => {
	console.error(`Error en la búsqueda:`, err);
});
