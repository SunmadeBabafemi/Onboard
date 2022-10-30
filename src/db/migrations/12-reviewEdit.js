'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "author" to table "Reviews"
 *
 **/

var info = {
    "revision": 12,
    "name": "reviewEdit",
    "created": "2022-10-30T20:32:16.682Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Reviews",
        "author",
        {
            "type": Sequelize.STRING,
            "field": "author"
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
