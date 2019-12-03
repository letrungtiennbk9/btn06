let mongoose = require('mongoose');
let Schema = mongoose.Schema
let schema = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    typeProduct: {type: String, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    imagePath: {type: String, required: true},
});

let products = mongoose.model('Product',schema, 'products');
module.exports = products;

// products.SP_aokhoac = mongoose.model('SP_aokhoac', schema, "AoKhoac");
// products.SP_quantay= mongoose.model('SP_quantay', schema, "QuanTay");
// products.SP_quanthethao = mongoose.model('SP_quanthethao', schema, "QuanTheThao");
// products.SP_quanjogger = mongoose.model('SP_quanjogger', schema, "QuanJogger");
// products.SP_vay = mongoose.model('SP_vayc', schema, "Vay");
// products.SP_dam = mongoose.model('SP_dam', schema, "Dam");

// products.SP_aoLen = mongoose.model('SP_aoLen',schema, 'AoLen');
// products.SP_aoThun = mongoose.model('SP_aoThun',schema, 'AoThun');
// products.SP_aoLot = mongoose.model('SP_aoLot',schema, 'AoLot');
// products.SP_aoSoMi = mongoose.model('SP_aoSoMi',schema, 'AoSoMi');
// products.SP_sneaker = mongoose.model('SP_sneaker',schema, 'Sneaker');
// products.SP_giayCaoCo = mongoose.model('SP_giayCaoCo',schema, 'GiayCaoCo');
// products.SP_giayCaoGot = mongoose.model('SP_giayCaoGot',schema, 'GiayCaoGot');

