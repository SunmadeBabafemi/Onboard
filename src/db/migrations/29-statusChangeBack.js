'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "application_status" from table "Applications"
 * addColumn "status" to table "Applications"
 *
 **/

var info = {
    "revision": 29,
    "name": "statusChangeBack",
    "created": "2022-11-09T17:34:04.570Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Applications", "application_status"]
    },
    {
        fn: "addColumn",
        params: [
            "Applications",
            "status",
            {
                "type": Sequelize.ENUM('pending', 'active', 'accepted', 'rejected', 'canceled'),
                "field": "status",
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
