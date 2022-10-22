'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "fullName" from table "Users"
 * addColumn "full_name" to table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "full_name_user",
    "created": "2022-10-22T08:18:54.536Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Users", "fullName"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
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
