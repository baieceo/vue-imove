export default {
    "version": "1.0.0",
    "componentsMap": [{
            "package": "./materials/Button/index.vue",
            "componentName": "Button"
        },
        {
            "package": "./materials/Page/index.vue",
            "componentName": "Page"
        }
    ],
    "componentsTree": [{
        "componentName": "Page",
        "id": "node_dockcviv8fo1",
        "props": {
            "style": {
                "height": "100%"
            }
        },
        "children": [{
            "id": "node_i3l127o34ad84235b",
            "props": {
                "schema": {
                    "text": "按钮",
                    "type": "object",
                    "required": [],
                    "properties": {
                        "text": {
                            "title": "文本",
                            "type": "string",
                            "default": "按钮",
                            "apiAutoFetch": false,
                            "ui:options": {
                                "placeholder": "请输入"
                            }
                        }
                    },
                    "ui:order": [
                        "text"
                    ]
                }
            },
            "events": [],
            "logicFlows": [],
            "children": [],
            "componentName": "Button"
        }]
    }]
};