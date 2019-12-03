(function(global){
  let utils = {};

  utils.search = () => {
    let keyWord = $('.nav-item.searchbox .search-txt')[0].value;
    $('a.search').attr("href", "search-result/" + keyWord);
    console.log($('a.search').attr("href"));
  }

  global.utils = utils;
})(window)