'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "access_code" to table "Applications"
 *
 **/

var info = {
    "revision": 17,
    "name": "accessCode",
    "created": "2022-11-07T10:05:39.354Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Applications",
        "access_code",
        {
            "type": Sequelize.STRING,
            "field": "access_code"
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
