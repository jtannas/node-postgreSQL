// Update with your config settings.
const settings = require('./settings.json');

module.exports = {

  development: {
    client: 'postgresql',
    connection: settings
  }

};
