'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "my_account_email" to table "Applications"
 *
 **/

var info = {
    "revision": 3,
    "name": "user_email_account",
    "created": "2022-10-22T09:15:11.497Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Applications",
        "my_account_email",
        {
            "type": Sequelize.STRING,
            "field": "my_account_email"
        }
    ]
}];

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
