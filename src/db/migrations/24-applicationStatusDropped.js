'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "status" from table "Applications"
 *
 **/

var info = {
    "revision": 24,
    "name": "applicationStatusDropped",
    "created": "2022-11-09T17:08:35.710Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Applications", "status"]
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
