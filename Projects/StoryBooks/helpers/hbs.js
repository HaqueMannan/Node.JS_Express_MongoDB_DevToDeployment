const moment = require('moment');

module.exports = {
   truncate: function(str, len) {
      if(str.length > len && str.length > 0) {
         var new_str = str + " ";
         new_str = str.substr(0, len);
         new_str = str.substr(0, new_str.lastIndexOf(" "));
         new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
         return new_str
      };
      return str;
   },
   stripTags: function(input) {
      return input.replace(/<(?:.|\n)*?>/gm, '');
   },
   formatDate: function(date, format) {
      moment.locale('en-gb').format;
      return moment(date).format(format);
   },
   select: function(selected, options) {
      return options.fn(this).replace(new RegExp(' value=\"'+ selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
   },
   editIcon: function(storyUser, loggedUser, storyId, floating = true) {
      if(storyUser.toString() == loggedUser) {
         if(floating) {
            return `<a class="btn-floating halfway-fab red" href="/stories/edit/${storyId}"><i class="fas fa-pencil-alt"></i></a>`
         } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-pencil-alt"></i></a>`
         };
      } else {
         return '';
      };
   }
};