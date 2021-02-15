const path = require('path');

module.exports = function(app) {

  // display notes.html when /notes is accessed
  app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  // display index.html when any other route is accessed
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};