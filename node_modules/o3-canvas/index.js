try{
	var o3 = require('./o3.js');
}catch(ex){
	var o3 = require('../o3.js');
}
module.exports = o3.canvas;