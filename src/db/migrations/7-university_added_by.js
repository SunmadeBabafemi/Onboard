'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "added_by" to table "Universities"
 *
 **/

var info = {
    "revision": 7,
    "name": "university_added_by",
    "created": "2022-10-22T12:53:55.650Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Universities",
        "added_by",
        {
            "type": Sequelize.STRING,
            "field": "added_by"
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
