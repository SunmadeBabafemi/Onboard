'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "program_name" to table "Applications"
 * addColumn "course_name" to table "Classes"
 * addColumn "program_name" to table "Courses"
 * addColumn "school_name" to table "Courses"
 * addColumn "university_name" to table "Programs"
 *
 **/

var info = {
    "revision": 16,
    "name": "extraColumns",
    "created": "2022-11-05T19:55:09.468Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Applications",
            "program_name",
            {
                "type": Sequelize.STRING,
                "field": "program_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Classes",
            "course_name",
            {
                "type": Sequelize.STRING,
                "field": "course_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Courses",
            "program_name",
            {
                "type": Sequelize.STRING,
                "field": "program_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Courses",
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
            "Programs",
            "university_name",
            {
                "type": Sequelize.STRING,
                "field": "university_name"
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
