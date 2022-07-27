export default {
    version: '1.0.0',
    componentsMap: [{
            package: './materials/Button/index.vue',
            componentName: 'Button',
        },
        {
            package: './materials/Page/index.vue',
            componentName: 'Page',
        },
    ],
    componentsTree: [{
        componentName: 'Page',
        // id: 'node_dockcviv8fo1',
        id: 'node_1',
        props: {
            style: {
                height: '100%',
            },
        },
        children: [{
            componentName: 'Button',
            id: 'node_ocl1oeo2z9m',
            props: {
                title: '按钮',
                size: 'mini',
            },
        }, ],
    }, ],
};