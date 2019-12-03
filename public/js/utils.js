(function(global){
  let utils = {};

  utils.search = () => {
    let keyWord = $('.nav-item.searchbox .search-txt')[0].value;
    $('a.search').attr("href", "search-result/" + keyWord);
  }

  global.utils = utils;
})(window)