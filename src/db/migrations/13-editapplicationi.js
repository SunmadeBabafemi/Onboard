'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "school_name" to table "Applications"
 * addColumn "course_name" to table "Applications"
 *
 **/

var info = {
    "revision": 13,
    "name": "editapplicationi",
    "created": "2022-10-31T10:36:58.167Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Applications",
            "school_name",
            {
                "type": Sequelize.STRING,
                "field": "school_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Applications",
            "course_name",
            {
                "type": Sequelize.STRING,
                "field": "course_name"
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
