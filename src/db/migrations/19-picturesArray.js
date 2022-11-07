'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "pictures" to table "Universities"
 *
 **/

var info = {
    "revision": 19,
    "name": "picturesArray",
    "created": "2022-11-07T12:16:46.998Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Universities",
        "pictures",
        {
            "type": Sequelize.ARRAY(Sequelize.STRING),
            "field": "pictures"
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
