let Product = require('../models/product');
const mobgodb = require('mongodb');

exports.loadSingleProduct = function(req,res,next){
  Product.findOne({"_id": mobgodb.ObjectID(req.params.id)}, function(err,doc){   
          if(err){
            console.log(err);
          }else{
            res.render('single-product', {product: doc});
          }
  });
}

exports.loadHomePage= function (req,res,next){
  Product.find(function(err,docs){
    if(err)
    {
      console.log ("Render product error!");
    }else
    {
    let tenProduct = [];
    for(let i =0 ; i < 10; ++i ){
      tenProduct.push(docs[i]);
    }
     res.render('index',{products:tenProduct, user: req.user})
    }
  });
}

exports.loadCategoryPage = function (req,res,next){
  Product.find(function(err,docs){
    if(err)
    {
      console.log ("Render product error!");
    }else
    {
    let twelveProduct = [];
    for(let i =0 ; i < 12; ++i ){
      twelveProduct.push(docs[i]);
    }
     res.render('category',{products:twelveProduct})
    }
  });
}

exports.loadSearchResult = function(req, res, next){
  let a = req.params.title;
  Product.find({ title: { $regex: a, $options: "i" } }, (err, ret) => {
    if(err){
      console.log(err);
    }
    else{
      console.log(ret.length);
      res.render('search-result', {aa:ret});
    }
  });
}
