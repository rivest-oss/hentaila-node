<div align="center">
	<p>
		<a href="https://hentaila.com/">
			<img src="https://box.lolisbox.xyz/J4DHRa.svg" width="478" title="HentaiLa.com" />
		</a>
	</p>
	<br />
	<p>
		<a href="https://discord.com/invite/mNGKntQH32" alt="Servidor de soporte de hentaila.js">
			<img src="https://img.shields.io/discord/767675922119393301?color=3181b0&logo=discord&logoColor=white"></img>
		</a>
		<a href="https://www.npmjs.com/package/hentaila">
			<img src="https://img.shields.io/npm/v/hentaila.svg?maxAge=3600" alt="npm version"></img>
		</a>
		<a href="https://www.npmjs.com/package/hentaila">
			<img src="https://img.shields.io/npm/dt/hentaila.svg?maxAge=3600" alt="npm downloads"></img>
		</a>
	</p>
</div>

# 馃敒
# Alerta/Warning
## Este m贸dulo contiene informaci贸n que podr铆a no ser apta para menores de edad. Proceder con cautela.
## This module contains information that may not be suitable for minors. Please proceed with caution.

## Acerca de
`hentaila` es un m贸dulo de Node.js para poder interactuar con [HentaiLa](https://hentaila.com/) usando funciones sencillas.

**Advertencia:** Este m贸dulo no est谩 de ninguna manera afiliado a HentaiLa. Todo usuario de este m贸dulo releva de todo cargo a los creadores, desarrolladores y todo aqu茅l involucrado en el desarrollo del m贸dulo.

## Instalaci贸n
**驴C贸mo instalarlo?**

```sh-session
npm install hentaila
```

## Ejemplos de uso

#### Buscar un hentai:
```js
// Requerir el m贸dulo
const HentaiLa = require("hentaila");

// Buscar un hentai
HentaiLa.search("overflow").then(async resultados => {
	console.log(resultados);
}).catch(async err => {
	// Capturas el error
});
```

[![Resultado del "search"](https://i.imgur.com/DbpsyLo.png "Resultado del 'search'")](https://i.imgur.com/DbpsyLo.png)


#### Ver detalles de un hentai
```js
HentaiLa.getHentai("https://hentaila.com/hentai-overflow").then(async info => {
	console.log(info);
}).catch(async err => {
	// Capturas el error
});
```

[![Resultado del "getHentai"](https://i.imgur.com/yT2q5UP.png "Resultado del 'getHentai'")](https://i.imgur.com/yT2q5UP.png)


#### Ver detalles de un episodio
```js
HentaiLa.getEpisode("https://hentaila.com/ver/overflow-1").then(async info => {
	console.log(info);
}).catch(async err => {
	// Capturas el error
});
```

[![Resultado del "getEpisode"](https://i.imgur.com/oFESkzv.png "Resultado del 'getEpisode'")](https://i.imgur.com/oFESkzv.png)


## Soporte

Si no entiendes algo, est谩s experimentando problemas o necesitas ser simplemente guiado, no dudes en unirte a [nuestro servidor de Discord](https://discord.com/invite/mNGKntQH32).
