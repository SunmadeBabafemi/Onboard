'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "picture_4" from table "Universities"
 * removeColumn "picture_3" from table "Universities"
 * removeColumn "picture_2" from table "Universities"
 * removeColumn "picture" from table "Universities"
 *
 **/

var info = {
    "revision": 21,
    "name": "removePictureColumn",
    "created": "2022-11-07T16:21:47.028Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Universities", "picture_4"]
    },
    {
        fn: "removeColumn",
        params: ["Universities", "picture_3"]
    },
    {
        fn: "removeColumn",
        params: ["Universities", "picture_2"]
    },
    {
        fn: "removeColumn",
        params: ["Universities", "picture"]
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
