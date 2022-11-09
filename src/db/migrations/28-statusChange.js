'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "status" from table "Applications"
 * addColumn "application_status" to table "Applications"
 *
 **/

var info = {
    "revision": 28,
    "name": "statusChange",
    "created": "2022-11-09T17:28:31.537Z",
    "comment": ""
};

var migrationCommands = [
        {
        fn: "addColumn",
        params: [
            "Applications",
            "application_status",
            {
                "type": Sequelize.ENUM('pending', 'active', 'accepted', 'rejected', 'canceled'),
                "field": "application_status",
                "defaultValue": "pending"
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
