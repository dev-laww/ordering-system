/** @type {import('plop').PlopGeneratorConfig}*/
module.exports = {
    description: "Creates a new controller",
    prompts: [
        {
            type: "input",
            name: "name",
            message: "Controller name: "
        }
    ],
    actions: [
        // controller
        {
            type: "add",
            path: "../src/controller/{{kebabCase name}}.controller.js",
            templateFile: "templates/controller/controller.js.hbs"
        },
        {
            type: "add",
            path: "../src/lib/validator/{{kebabCase name}}.validator.js",
            templateFile: "templates/controller/validator.js.hbs"
        }
    ]
}