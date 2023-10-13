/** @type {import('plop').PlopGeneratorConfig}*/
module.exports = {
    description: 'Creates a new repository',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Repository name: '
        }
    ],
    actions: [
        // repository
        {
            type: 'add',
            path: '../src/repository/{{kebabCase name}}.repo.js',
            templateFile: 'templates/repository/repository.js.hbs'
        },
        // tests
        {
            type: 'add',
            path: '../__test__/unit/repository/{{kebabCase name}}.repo.test.js',
            templateFile: 'templates/repository/test.repository.js.hbs'
        }
    ]
}