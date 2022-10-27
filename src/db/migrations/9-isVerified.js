'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "isVerified" to table "Users"
 *
 **/

var info = {
    "revision": 9,
    "name": "isVerified",
    "created": "2022-10-26T07:41:56.859Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "isVerified",
        {
            "type": Sequelize.BOOLEAN,
            "field": "isVerified",
            "defaultValue": false
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
