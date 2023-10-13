/** @type {import('plop').PlopGeneratorConfig}*/
module.exports = {
    description: 'Creates a new component',
    prompts: [
        {
            type: 'list',
            name: 'componentType',
            message: 'Component type: ',
            choices: [
                'admin',
                'common',
                'layout',
                'store'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'Component name: '
        }
    ],
    actions: [
        // component
        {
            type: 'add',
            path: '../src/components/{{componentType}}/{{pascalCase name}}.jsx',
            templateFile: 'templates/component/component.jsx.hbs'
        }
    ]
};