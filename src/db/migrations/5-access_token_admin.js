'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "accessTokens" from table "Admins"
 * removeColumn "fullName" from table "Admins"
 * addColumn "access_tokens" to table "Admins"
 * addColumn "full_name" to table "Admins"
 *
 **/

var info = {
    "revision": 5,
    "name": "access_token_admin",
    "created": "2022-10-22T10:05:49.508Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Admins", "accessTokens"]
    },
    {
        fn: "removeColumn",
        params: ["Admins", "fullName"]
    },
    {
        fn: "addColumn",
        params: [
            "Admins",
            "access_tokens",
            {
                "type": Sequelize.STRING,
                "field": "access_tokens"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Admins",
            "full_name",
            {
                "type": Sequelize.STRING,
                "field": "full_name"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
