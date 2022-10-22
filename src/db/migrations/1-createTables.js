'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Admins", deps: []
 * createTable "OneTimePasswords", deps: []
 * createTable "Universities", deps: []
 * createTable "Users", deps: []
 * createTable "Programs", deps: [Universities]
 * createTable "Courses", deps: [Universities, Programs]
 * createTable "Classes", deps: [Courses]
 * createTable "Applications", deps: [Courses, Classes]
 * createTable "Reviews", deps: [Universities]
 *
 **/

var info = {
    "revision": 1,
    "name": "createTables",
    "created": "2022-10-22T07:28:35.733Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Admins",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "role": {
                    "type": Sequelize.ENUM('super', 'admin'),
                    "field": "role",
                    "defaultValue": "admin"
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "accessTokens": {
                    "type": Sequelize.STRING,
                    "field": "accessTokens"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OneTimePasswords",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "otp": {
                    "type": Sequelize.STRING,
                    "field": "otp"
                },
                "signedToken": {
                    "type": Sequelize.STRING,
                    "field": "signedToken"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Universities",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "picture_2": {
                    "type": Sequelize.STRING,
                    "field": "picture_2"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "country": {
                    "type": Sequelize.STRING,
                    "field": "country"
                },
                "ratings": {
                    "type": Sequelize.INTEGER,
                    "field": "ratings"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "accessTokens": {
                    "type": Sequelize.STRING,
                    "field": "accessTokens"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Programs",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "duration": {
                    "type": Sequelize.INTEGER,
                    "field": "duration"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "UniversityId": {
                    "type": Sequelize.UUID,
                    "field": "UniversityId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Universities",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Courses",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "UniversityId": {
                    "type": Sequelize.UUID,
                    "field": "UniversityId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Universities",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "ProgramId": {
                    "type": Sequelize.UUID,
                    "field": "ProgramId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Programs",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Classes",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "class_year": {
                    "type": Sequelize.INTEGER,
                    "field": "class_year"
                },
                "class_diet": {
                    "type": Sequelize.ENUM('Winter', 'Summer', 'Spring'),
                    "field": "class_diet",
                    "defaultValue": "Winter"
                },
                "start_date": {
                    "type": Sequelize.DATE,
                    "field": "start_date"
                },
                "end_date": {
                    "type": Sequelize.DATE,
                    "field": "end_date"
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active",
                    "defaultValue": true
                },
                "application_opening": {
                    "type": Sequelize.DATE,
                    "field": "application_opening"
                },
                "application_closing": {
                    "type": Sequelize.DATE,
                    "field": "application_closing"
                },
                "application_fees": {
                    "type": Sequelize.INTEGER,
                    "field": "application_fees",
                    "defaultValue": 0
                },
                "course_tuition": {
                    "type": Sequelize.INTEGER,
                    "field": "course_tuition",
                    "defaultValue": 0
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "CourseId": {
                    "type": Sequelize.UUID,
                    "field": "CourseId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Courses",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Applications",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "middle_name": {
                    "type": Sequelize.STRING,
                    "field": "middle_name"
                },
                "gender": {
                    "type": Sequelize.ENUM('male', 'female', 'other'),
                    "field": "gender",
                    "allowNull": true
                },
                "nationality": {
                    "type": Sequelize.STRING,
                    "field": "nationality"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "status": {
                    "type": Sequelize.ENUM('in review', 'pending', 'granted', 'denied'),
                    "field": "status",
                    "defaultValue": "pending"
                },
                "application_fees": {
                    "type": Sequelize.INTEGER,
                    "field": "application_fees"
                },
                "tracking_id": {
                    "type": Sequelize.STRING,
                    "field": "tracking_id",
                    "unique": true
                },
                "result": {
                    "type": Sequelize.STRING,
                    "field": "result"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "CourseId": {
                    "type": Sequelize.UUID,
                    "field": "CourseId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Courses",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "ClassId": {
                    "type": Sequelize.UUID,
                    "field": "ClassId",
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Classes",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Reviews",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "text": {
                    "type": Sequelize.STRING,
                    "field": "text"
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating",
                    "defaultValue": 3
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "field": "created_at",
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "field": "updated_at",
                    "allowNull": false
                },
                "UniversityId": {
                    "type": Sequelize.UUID,
                    "field": "UniversityId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Universities",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
