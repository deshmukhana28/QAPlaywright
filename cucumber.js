module.exports = {
    default: {
        paths: ['features/**/*.feature'],

        requireModule: ['tsx/cjs'],

        require: [
            'features/step_definitions/**/*.ts'
        ],

        format: ['progress']
    }
};