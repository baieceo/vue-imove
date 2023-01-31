/**
 * Created by Liu.Jun on 2020/5/13 9:18 下午.
 */

export default {
    schema: {
        title: 'A list of tasks',
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                title: 'Task list title',
            },
            tasks: {
                type: 'array',
                title: 'Tasks',
                items: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            type: 'string',
                            title: 'Title',
                            description: 'A sample title',
                        },
                        details: {
                            type: 'string',
                            title: 'Task details',
                            description: 'Enter the task details',
                        },
                        done: {
                            type: 'boolean',
                            title: 'Done?',
                            default: false,
                        },
                    },
                },
            },
        },
    },
    uiSchema: {
        title: {
            'err:required': '请输入title'
        },
        tasks: {
            items: {
                details: {
                    'ui:options': {
                        type: 'textarea'
                    },
                },
            },
        },
    },
    formData: {
        title: 'My current tasks',
        tasks: [
            {
                title: 'My first task',
                details:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                done: true,
            },
            {
                title: 'My second task',
                details:
                    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
                done: false,
            },
        ],
    },
};
