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
            path: "../src/controller/{{kebabCase name}}.controller.ts",
            templateFile: "templates/controller/controller.ts.hbs"
        },
        {
            type: "add",
            path: "../src/lib/validator/{{kebabCase name}}.validator.ts",
            templateFile: "templates/controller/validator.ts.hbs"
        }
    ]
}