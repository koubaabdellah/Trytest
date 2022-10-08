function nb_write(data){document.write(nb_get(data))}
function nb_get(data){return decodeURIComponent(Array.prototype.map.call(window.atob(data.replace(/[A=]/g,function(c){return c==='A'?'=':'A'})),function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
window.define && define('js2/nobot/decode', { nb_get: nb_get, nb_write: nb_write });
