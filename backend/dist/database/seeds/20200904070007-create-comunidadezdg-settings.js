"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("Settings", [
            {
                key: "groups",
                value: "enabled",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebot",
                value: "disabled",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebotUrl",
                value: "https://botzdgtype.comunidadezdg.com.br",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebotName",
                value: "teste",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebotRestart",
                value: "reiniciar",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebotOff",
                value: "sair",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "typebotTime",
                value: 10000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "emailUser",
                value: "zdgads@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "emailPass",
                value: "pvxftkwhfeomwgls",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "emailFrom",
                value: "zdgads@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "emailTo",
                value: "comunidadezdg@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "vonageApiKey",
                value: "4542a449",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "vonageApiSecret",
                value: "Tb2yD2lq9y6kP0Dg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: "vonageApiId",
                value: "d72e7e96-2f75-46a3-8e13-e11b9d239856",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete("Settings", {});
    }
};
