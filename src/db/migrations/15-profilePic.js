'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "profile_picture" to table "Users"
 *
 **/

var info = {
    "revision": 15,
    "name": "profilePic",
    "created": "2022-11-03T16:38:39.672Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "profile_picture",
        {
            "type": Sequelize.STRING,
            "field": "profile_picture"
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
