'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "avatar" to table "Admins"
 * addColumn "avatar" to table "Users"
 *
 **/

var info = {
    "revision": 30,
    "name": "avatars",
    "created": "2022-11-11T00:26:46.086Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Admins",
            "avatar",
            {
                "type": Sequelize.STRING,
                "field": "avatar"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "avatar",
            {
                "type": Sequelize.STRING,
                "field": "avatar"
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
