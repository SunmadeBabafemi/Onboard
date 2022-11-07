'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "images" to table "Universities"
 *
 **/

var info = {
    "revision": 18,
    "name": "imagesUniversity",
    "created": "2022-11-07T11:18:40.722Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Universities",
        "images",
        {
            "type": Sequelize.STRING,
            "field": "images"
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
