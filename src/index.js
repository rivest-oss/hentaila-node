var axios = require(`axios`);
var baseURL = `https://hentaila.com`

// Clases
class SearchItem {
	constructor(obj) {
		for(var key of Object.keys(obj)) {
			switch(key) {
				case `id`: case `type`: {
					this[key] = Number(obj[key]);
					break;
				};

				default: {
					this[key] = obj[key];
					break;
				};
			}
		}

		this.cover = `${baseURL}/uploads/portadas/${this.id}.jpg`;
		this.thumb = `${baseURL}/uploads/thumbs/${this.id}.jpg`;
		this.background = `${baseURL}/uploads/fondos/${this.id}.jpg`;
		this.url = `${baseURL}/hentai-${this.slug}`;

		this.fetch = async() => {
			return getHentai(this.url);
		};
	}
}

class Hentai {
	constructor(htmlText) {
		var title = htmlText.match(/"h-title">[\w ]+/g);
		if(title) this.title = title[0].slice(`"h-title">`.length);

		var type = htmlText.match(/"type-hentai">[\w ]+/g);
		if(type) this.type = type[0].slice(`"type-hentai">`.length);

		var status = htmlText.match(/estado<\/i> [\wáéíóú]+/gi);
		if(status) this.status = status[0].slice(`estado<\/i> `.length);

		var thumb = htmlText.match(/uploads\/thumbs\/[\d]+\.[\w]+/g);
		if(thumb) this.thumb = `${baseURL}/${thumb[0]}`;

		var cover = htmlText.match(/uploads\/portadas\/[\d]+\.[\w]+/g);
		if(cover) this.cover = `${baseURL}/${cover[0]}`;

		var background = htmlText.match(/uploads\/fondos\/[\d]+\.[\w]+/g);
		if(background) this.background = `${baseURL}/${background[0]}`;

		var score = htmlText.match(/width: [\d\.]+%/g);
		if(score) this.score = parseFloat(score[0].slice(`width: `.length, -1));

		var about = htmlText.match(/De que va">[\w ]+<\/h2>\n<p>.+/gi);
		if(about) this.about = about[0].split(/\n/g)[1].slice(`<p>`.length, `</p>`.length * -1);

		var genres = htmlText.match(/\/genero\/[\w]+/g);
		if(genres) this.genres = genres.map(x => x.slice(`/genero/`.length).toLowerCase());

		var slug = htmlText.match(/<meta property="og:url" content="https:\/\/hentaila.com\/hentai-[\w\-]+/g);
		if(slug) this.slug = slug[0].slice(`<meta property="og:url" content="https://hentaila.com/hentai-`.length);

		var episodesCount = htmlText.match(/"num-episode"><span>[\d]+/gi);
		if(episodesCount) {
			this.episodesCount = parseInt(episodesCount[0].slice(`"num-episode"><span>`.length));
		}

		if(episodesCount && slug) {
			this.episodes = [];

			for(var i=0; i<this.episodesCount; i++) {
				this.episodes.push(`${baseURL}/ver/${this.slug}-${i + 1}`);
			}
		}

		var halfSplit = htmlText.split(/Hentais Similares/gi);
		if(halfSplit && halfSplit[1]) {
			var similars = halfSplit[1].match(/alt=".+"/gi);
			if(similars) {
				this.similars = similars.map(x => x.slice(`alt="`.length, -1).trim());
			}
		}
	}
}

class Episode {
	constructor(htmlText) {
		var title = (htmlText.match(/<a href="\/hentai-(.+)">(.+)<\/a>/g) || []).filter(x => x.includes(`Hentai sin Censura`) == false);
		if(title) this.title = title[0].replace(/<a href="\/hentai-(.+)">/g, ``).slice(0, `</a>`.length * -1);

		var episode = htmlText.match(/Episodio [\d]+/g);
		if(episode) this.episode = parseInt(episode[0].match(/\d+/g)[0]);

		var slug = htmlText.match(/<meta property="og:url" content="https:\/\/hentaila.com\/ver\/.+/g);
		if(slug) this.slug = slug[0].slice(`<meta property="og:url" content="https://hentaila.com/ver/`.length).replace(/\-\d" \/>/g, ``).trim();

		var cover = htmlText.match(/uploads\/portadas\/[\d]+\.\w+/g);
		if(cover) {
			var id = cover[0].match(/\d+/g)[0];
			this.thumb = `${baseURL}/uploads/thumbs/${id}.jpg`;
			this.cover = `${baseURL}/uploads/portadas/${id}.jpg`;
			this.background = `${baseURL}/uploads/fondos/${id}.jpg`;
		}

		var similars = htmlText.match(/alt=".+"/gi);
		if(similars) {
			this.similars = similars.map(x => x.slice(`alt="Thumb `.length, -1).trim());
		}

		var videosText = htmlText.match(/videos = (.)+/g);
		if(videosText) {
			var videosArray = JSON.parse(videosText[0].slice(`videos = `.length, -1))
			this.videos = new Map(videosArray);

			if(this.videos.has(`Arc`)) {
				this.videos.set(`Arc`, this.videos.get(`Arc`).split(/#/g).slice(1).join(`#`));
			}
		}

		var downloadsText = htmlText.match(/(.)+Descargar/g);
		if(downloadsText) {
			this.downloads = [];

			downloadsText
				.map(x => x.match(/http(s?):\/\/(.+)" /g))
				.filter(x => !x == false)
				.forEach(downloadURL => this.downloads.push(downloadURL[0].slice(0, `" '`.length * -1)));
		}
	}
}

// Funciones
async function search(query) {
	return new Promise(async(resolve, reject) => {
		if(!query) {
			return reject(`Especifica un argumento para el método "search".`);
		}

		if(typeof query !== `string`) {
			return reject(`El argumento para el método "search" debe ser un String.`);
		}

		if(query.length < 3) {
			return reject(`El argumento para el método "search" debe ser igual o mayor a tres caracteres.`);
		}

		axios.post(`${baseURL}/api/search`, `value=${encodeURIComponent(query.slice(0, 64))}`, {
			responseType: `json`,
		}).then(async res => {
			var results = [];

			for(var item of res.data) {
				results.push(new SearchItem(item));
			}

			return resolve(results);
		}).catch(reject);
	});
}

async function getHentai(url) {
	return new Promise(async(resolve, reject) => {
		if(!url) {
			return reject(`Especifica un argumento para el método "getHentai".`);
		}

		if(typeof url !== `string`) {
			return reject(`El argumento para el método "getHentai" debe ser un String.`);
		}

		if(url.slice(0, `${baseURL}/hentai-`.length) !== `${baseURL}/hentai-`) {
			return reject(`La URL ingresada en el método "getHentai" no es válida.`);
		}

		axios.get(url, {
			responseType: `text`,
		}).then(async res => {
			return resolve(new Hentai(res.data));
		}).catch(reject);
	});
}

async function getEpisode(url) {
	return new Promise(async(resolve, reject) => {
		if(!url) {
			return reject(`Especifica un argumento para el método "getEpisode".`);
		}

		if(typeof url !== `string`) {
			return reject(`El argumento para el método "getEpisode" debe ser un String.`);
		}

		if(url.slice(0, `${baseURL}/ver/`.length) !== `${baseURL}/ver/`) {
			return reject(`La URL ingresada en el método "getEpisode" no es válida.`);
		}

		axios.get(url, {
			responseType: `text`,
		}).then(async res => {
			return resolve(new Episode(res.data));
		}).catch(reject);
	});
}

// Exportar
module.exports = {
	SearchItem,
	Hentai,
	Episode,

	search,
	getHentai,
	getEpisode,
};
