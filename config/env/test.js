'use strict';

module.exports = {
    db: 'mongodb://localhost/mean-test',
    port: 3001,
    app: {
        name: 'MEAN - A Modern Stack - Test'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    ldap: {
        url: 'ldap://172.28.113.42:389',
        //adminDn: 'uid=admin,ou=administrators,ou=topologymanagement,o=netscaperoot',
        //adminPassword: 'TESTzxcv1234',
        searchBase: 'ou=People,dc=7ticks,dc=intdata,dc=com',
        searchFilter: '(uid={{username}})'
    }
};
