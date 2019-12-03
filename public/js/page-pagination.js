$('#page-pagination .page-item').attr('onclick', function(i, val){
  let a = $(this)[0].innerText;
  if(a != "" && a != "..."){
    return 'pp.loadMore(' + a + ')';
  }
  return "";
});

activePageNum = (pageNum) => {
  $('#page-pagination .page-item').each(function() {
    if($(this).hasClass("active")){
      $(this).removeClass("active");
    }

    if(parseInt($(this)[0].innerText) == pageNum){
      $(this).addClass("active");
    }
  });
}



(function(global){
  pp = {};

  pp.loadMore = () => {
    let j;
    $('.f_p_item').each(function(i){
      if($(this)[0].style.display == 'none'){
        // console.log($(this)[0].style.display)
        return;
      }
      j = i+1;
    });
    console.log(j);
  
    setTimeout(() => {
      let nShownProducts = $('.nice-select.show .option.selected')[0].innerText;
      // console.log(nShownProducts);
      nShownProducts = parseInt(nShownProducts);
      
      for(let i=j-nShownProducts; i<nShownProducts; i++){
        $('.f_p_item')[i].style.display = 'none';
      }
      // console.log(j);
      for(let i=j; i<nShownProducts+j; i++){
        $('.f_p_item')[i].style.display = 'block';
        // console.log($('.f_p_item')[i]);
      }
    },10);
  }


  pp.loadMore = (nPage) => {
    setTimeout(() => {
      activePageNum(nPage);

      let nShownProducts = $('.nice-select.show .option.selected')[0].innerText;
      nShownProducts = parseInt(nShownProducts);
      
      $('.f_p_item').each(function(i){
        // if(i<nShownProducts*(nPage-1)){
          if($(this)[0].style.display == 'block'){
            $(this)[0].style.display = 'none';
          }
        // }
      });
  
      $('.f_p_item').each(function(i){
        if(i>=nShownProducts*(nPage-1) && (i<nShownProducts*nPage)){
          if($(this)[0].style.display == 'none'){
            $(this)[0].style.display = 'block';
          }
        }
      });
  
    },10);
  }

  global.pp = pp;
})(window);
