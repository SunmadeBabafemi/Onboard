'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "class_diet" to table "Applications"
 *
 **/

var info = {
    "revision": 10,
    "name": "class_diet_option",
    "created": "2022-10-27T12:42:05.037Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Applications",
        "class_diet",
        {
            "type": Sequelize.STRING,
            "field": "class_diet"
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
