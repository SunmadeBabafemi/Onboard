'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "images" from table "Universities"
 *
 **/

var info = {
    "revision": 20,
    "name": "removeImageFromUniversity",
    "created": "2022-11-07T16:11:05.472Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Universities", "images"]
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
