'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var posts = locals.posts.sort(config.index_generator.order_by);

  posts.data = posts.data.sort(function(a, b) {
      if(a.sticky && b.sticky) {
          if(a.sticky == b.sticky) return b.updated - a.updated;
          else return b.sticky - a.sticky;
      }
      else if(a.sticky && !b.sticky) {
          return -1;
      }
      else if(!a.sticky && b.sticky) {
          return 1;
      }
      else return b.updated - a.updated;
  });

  var paginationDir = config.pagination_dir || 'page';
  var path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
