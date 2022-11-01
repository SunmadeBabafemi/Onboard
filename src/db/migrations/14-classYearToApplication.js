'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "class_year" to table "Applications"
 *
 **/

var info = {
    "revision": 14,
    "name": "classYearToApplication",
    "created": "2022-11-01T15:41:28.184Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Applications",
        "class_year",
        {
            "type": Sequelize.INTEGER,
            "field": "class_year"
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
