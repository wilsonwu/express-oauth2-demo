var oauthserver = require('oauth2-server');
var memorystore = require('./memoryModel.js');

var oauth = oauthserver({
    model: memorystore,
    grants: ['password','refresh_token'],
    accessTokenLifetime: 1209600,
    refreshTokenLifetime: 2419200
});

module.exports = oauth;
