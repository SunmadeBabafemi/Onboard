'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "picture_4" to table "Universities"
 * addColumn "picture_3" to table "Universities"
 *
 **/

var info = {
    "revision": 11,
    "name": "universityEdit",
    "created": "2022-10-30T20:31:44.071Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Universities",
            "picture_4",
            {
                "type": Sequelize.STRING,
                "field": "picture_4"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Universities",
            "picture_3",
            {
                "type": Sequelize.STRING,
                "field": "picture_3"
            }
        ]
    }
];

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
