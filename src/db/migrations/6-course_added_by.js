'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "added_by" to table "Courses"
 *
 **/

var info = {
    "revision": 6,
    "name": "course_added_by",
    "created": "2022-10-22T10:48:24.083Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Courses",
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
