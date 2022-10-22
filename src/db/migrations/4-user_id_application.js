'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "my_account_email" from table "Applications"
 * addColumn "user_id" to table "Applications"
 *
 **/

var info = {
    "revision": 4,
    "name": "user_id_application",
    "created": "2022-10-22T09:16:23.894Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Applications", "my_account_email"]
    },
    {
        fn: "addColumn",
        params: [
            "Applications",
            "user_id",
            {
                "type": Sequelize.STRING,
                "field": "user_id"
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
