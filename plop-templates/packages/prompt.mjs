export default {
  description: 'generate a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name:',
      validate(value) {
        if (!value || value.trim === '') {
          return 'name is required';
        }
        return true;
      },
    },
  ],
  actions: (data) => {
    const name = data.name
    const dir = `${process.cwd()}/src/packages/components/${name}`;
    const actions = [
      {
        type: 'add',
        path: `${dir}/default.ts`,
        templateFile: './packages/default.hbs',
        data: {
          name
        },
      },
      {
        type: 'add',
        path: `${dir}/index.tsx`,
        templateFile: './packages/index.hbs',
        data: {
          name
        },
      },
      {
        type: 'add',
        path: `${dir}/config.tsx`,
        templateFile: './packages/config.hbs',
        data: {
          name
        },
      },
    ];
    return actions;
  },
};
