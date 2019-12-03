// // const express = require('express');
// const express = require("express");
// let app = express();
// app.use(express.static('views'));
(function(global){
  let dc = {};

  let productsDbUrl = "https://still-plateau-02404.herokuapp.com/products";
  let categorySingleProductHtmlUrl = '/snippets/category-single-product.hbs';

  insertHtml = (querySelector, htmlToInsert) => {
    let tmp = document.querySelector(querySelector);
    tmp.innerHTML = htmlToInsert;
  }

  insertProperty = (snippet, key, value) => {
    var pattern = "{{" + key + "}}";
    snippet = snippet.replace(new RegExp(pattern, "g"), value);
    return snippet;
  }

  ascendingNameSort = (a, b) => {
    let tmp1 = a.getElementsByClassName('f_p_item_title')[0].innerText.toLowerCase();
    let tmp2 = b.getElementsByClassName('f_p_item_title')[0].innerText.toLowerCase();
    return tmp1.localeCompare(tmp2);
  }

  dc.sortNameAscending = () => {
    $('.f_p_item').sort(ascendingNameSort).appendTo('#category-single-product-section');
  }

  descendingNameSort = (a, b) => {
    let tmp1 = a.getElementsByClassName('f_p_item_title')[0].innerText.toLowerCase();
    let tmp2 = b.getElementsByClassName('f_p_item_title')[0].innerText.toLowerCase();
    return tmp2.localeCompare(tmp1);
  }

  dc.sortNameDescending = () => {
    $('.f_p_item').sort(descendingNameSort).appendTo('#category-single-product-section');
  }

  ascendingPriceSort = (a, b) => {
    let tmp1 = a.getElementsByClassName('f_p_item_price')[0].innerText.toLowerCase();
    let tmp2 = b.getElementsByClassName('f_p_item_price')[0].innerText.toLowerCase();
    return parseInt(tmp1) > parseInt(tmp2) ? 1 : -1;
  }

  dc.sortPriceAscending = () => {
    $('.f_p_item').sort(ascendingPriceSort).appendTo('#category-single-product-section');
  }

  descendingPriceSort = (a, b) => {
    let tmp1 = a.getElementsByClassName('f_p_item_price')[0].innerText.toLowerCase();
    let tmp2 = b.getElementsByClassName('f_p_item_price')[0].innerText.toLowerCase();
    return parseInt(tmp1) < parseInt(tmp2) ? 1 : -1;
  }

  dc.sortPriceDescending = () => {
    console.log($('.f_p_item'));
    $('.f_p_item').sort(descendingPriceSort).appendTo('#category-single-product-section');
  }

  dc.showLimitedProducts = () => {
    $('.f_p_item').each(function(i){
      $(this)[0].style.display = 'none';
    });
    setTimeout(() => {
      let nShownProducts = $('.nice-select.show .option.selected')[0].innerText;
      console.log(nShownProducts);
      nShownProducts = parseInt(nShownProducts);
      for(let i=0; i<nShownProducts; i++){
        $('.f_p_item')[i].style.display = 'block';
      }
    },10);
  }

  $('.nice-select.show .option').attr("onclick", "dc.showLimitedProducts();");
  $('.nice-select.sorting .option').attr("onclick", "dc.showLimitedProducts();");
  $('.nice-select.sorting .option').each(function() {    
    if($(this).attr('data-value') == 1){
      // $(this).attr("onclick", "dc.sortDefault();");
    }
    else if($(this).attr('data-value') == 2){
      $(this).attr("onclick", "dc.sortPriceAscending();");
    }
    else if($(this).attr('data-value') == 3){
      $(this).attr("onclick", "dc.sortPriceDescending();");
    }
    else if($(this).attr('data-value') == 4){
      $(this).attr("onclick", "dc.sortNameAscending();");
    }
    else {
      $(this).attr("onclick", "dc.sortNameDescending();");
    }
  });


  dc.showProducts = function(){
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsView, true);
  }
  

  /**
   * What we will do here is replacing all the place holders with the values of the received json response
   * by creating a right code snippet
   * then add it to the right place in the document
   * see line 260 of category.html
   */
  buildProductsView = (productsJSON) => {
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        let s = categorySingleProductHtml;

        s = insertProperty(s, "title", productsJSON[i].title);
        s = insertProperty(s, "price", productsJSON[i].price);
        s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
        s = insertProperty(s, "_id", productsJSON[i]._id);

        finalHtml += s;
        finalHtml += '\n';


      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }



  dc.showProductsAoKhoac = function(){
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewAoKhoac, true);
  }

  buildProductsViewAoKhoac = (productsJSON) => {
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo khoác"){
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }

  ////
  // len
  dc.showProductsAoLen = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewAoLen, true);//
  }

  buildProductsViewAoLen = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo len"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }
  
  // thun
  dc.showProductsAoThun = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewAoThun, true);//
  }

  buildProductsViewAoThun = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo thun"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }

  // lot
  dc.showProductsAoLot = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewAoLot, true);//
  }

  buildProductsViewAoLot = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo lót"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }



  // somi
  dc.showProductsSoMi = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewSoMi, true);//
  }

  buildProductsViewSoMi = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Áo sơ mi"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }


  // tay
  dc.showProductsQuanTay = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewQuanTay, true);//
  }

  buildProductsViewQuanTay = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Quần tây"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }


  // the thao
  dc.showProductsTheThao = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewTheThao, true);//
  }

  buildProductsViewTheThao = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Quần thể thao"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }


  // jogger
  dc.showProductsQuanJogger = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewQuanJogger, true);//
  }

  buildProductsViewQuanJogger = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Quần jogger"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }

  // vay
  dc.showProductsVay = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewVay, true);//
  }

  buildProductsViewVay = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Váy"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }

  // dam
  dc.showProductsDam = function(){//
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewDam, true);//
  }

  buildProductsViewDam = (productsJSON) => {//
    ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
      let finalHtml = "";

      /**
       * Deal with the filter condition 
       */
      for(let i = 0; i<productsJSON.length; i++){
        if(productsJSON[i].typeProduct == "Đầm"){//
          let s = categorySingleProductHtml;

          s = insertProperty(s, "title", productsJSON[i].title);
          s = insertProperty(s, "price", productsJSON[i].price);
          s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
          s = insertProperty(s, "_id", productsJSON[i]._id);

          finalHtml += s;
          finalHtml += '\n';

          
        }
      }
      insertHtml("#category-single-product-section", finalHtml);
      dc.showLimitedProducts();
    }, false);
  }
  


    // sneaker
    dc.showProductsSneaker = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewSneaker, true);//
    }
  
    buildProductsViewSneaker = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].typeProduct == "Sneaker"){//
            let s = categorySingleProductHtml;
  
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


    // giay cao co
    dc.showProductsGiayCaoCo = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewGiayCaoCo, true);//
    }
  
    buildProductsViewGiayCaoCo = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].typeProduct == "Giày cao cổ"){//
            let s = categorySingleProductHtml;
  
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     // giay cao got
     dc.showProductsGiayCaoGot = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewGiayCaoGot, true);//
    }
  
    buildProductsViewGiayCaoGot = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].typeProduct == "Giày cao gót"){//
            let s = categorySingleProductHtml;
  
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }



    //================Do Gucci=========================

    dc.showProductsGucci = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewGucci, true);//
    }
  
    buildProductsViewGucci = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].brand == "Gucci"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     //================Do H&M=========================

     dc.showProductsHM = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewHM, true);//
    }
  
    buildProductsViewHM = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].brand == "H&M"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     //================Do Pull&Bear=========================

     dc.showProductsPullBear = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewPullBear, true);//
    }
  
    buildProductsViewPullBear = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].brand == "Pull&Bear"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     //================Mango=========================

     dc.showProductsMango = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewMango, true);//
    }
  
    buildProductsViewMango = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].brand == "Mango"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     //================Do Routine=========================

     dc.showProductsRoutine = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewRoutine, true);//
    }
  
    buildProductsViewRoutine = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].brand == "Routine"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }



    //=========================Color Area=======================================

    //==============Mau den===========================
    dc.showProductsBlack = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewBlack, true);//
    }
  
    buildProductsViewBlack = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].color == "Đen"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }
    

    //==============Mau Trang===========================
    dc.showProductsWhite = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewWhite, true);//
    }
  
    buildProductsViewWhite = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].color == "Trắng"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


     //==============Mau xanh da troi===========================
     dc.showProductsBlue = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewBlue, true);//
    }
  
    buildProductsViewBlue = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].color == "Xanh da trời"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


    //==============Mau vang gold===========================
    dc.showProductsGold = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewGold, true);//
    }
  
    buildProductsViewGold = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].color == "Vàng gold"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }


    //==============Mau hong manh me===========================
    dc.showProductsPink = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewPink, true);//
    }
  
    buildProductsViewPink = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].color == "Hồng mạnh mẽ"){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }
    



    // Price search
    dc.showProductsPrice = function(){//
      ajaxUtils.sendGetRequest(productsDbUrl, buildProductsViewPrice, true);//
    }
  
    buildProductsViewPrice = (productsJSON) => {//
      ajaxUtils.sendGetRequest(categorySingleProductHtmlUrl, (categorySingleProductHtml) => {
        let finalHtml = "";
  
        /**
         * Deal with the filter condition 
         */
        
        let price = document.getElementById('amount').value;
        //console.log(Number(price) + 20000);
        for(let i = 0; i<productsJSON.length; i++){
          if(productsJSON[i].price <= Number(price) + 20000 &&  productsJSON[i].price >= Number(price) - 20000){//
            let s = categorySingleProductHtml;
            s = insertProperty(s, "title", productsJSON[i].title);
            s = insertProperty(s, "price", productsJSON[i].price);
            s = insertProperty(s, "imagePath", productsJSON[i].imagePath);
            s = insertProperty(s, "_id", productsJSON[i]._id);
  
            finalHtml += s;
            finalHtml += '\n';
  
            
          }
        }
        insertHtml("#category-single-product-section", finalHtml);
        dc.showLimitedProducts();
      }, false);
    }














  global.dc = dc;
})(window);