<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import RenderJson from './RenderJson.vue';
    import RenderText from './RenderText.vue';

    import {
        Helper,
        hijackMap
    } from './common';

    export default {
        components: {
            RenderJson,
            RenderText
        },
        props: {
            data: {
                type: [String, Array]
            },
            type: {
                type: String
            }
        },
        computed: {
            hijack() {
                return hijackMap[this.type];
            },
            icon() {
                return this.hijack.icon;
            },
            textColor() {
                return this.hijack.textColor;
            },
            bgColor() {
                return this.hijack.bgColor;
            },
            borderColor() {
                return this.hijack.borderColor;
            },
            logLineStyle() {
                const logLineStyle = {
                    color: this.textColor,
                    backgroundColor: this.bgColor,
                    borderTopColor: this.borderColor,
                    borderBottomColor: this.borderColor,
                };

                return logLineStyle;
            }
        },
        render(createElement) {
            return createElement('div', {
                class: 'logLine',
                style: this.logLineStyle
            }, [
                createElement('i', {
                    class: this.icon
                }),
                createElement('div', {
                    class: 'logContent',
                }, this.data.map((item, index) => {
                    let content = null;

                    if (Helper.isPlainObject(item)) {
                        content = createElement('render-json', {
                            props: {
                                data: item
                            }
                        });
                    } else {
                        content = createElement('render-text', {
                            props: {
                                data: item
                            }
                        });
                    }

                    const marginLeft = index === 0 ? 0 : 6;

                    return createElement('span', {
                        style: {
                            marginLeft
                        },
                        props: {
                            key: index
                        }
                    }, [content]);
                }))
            ]);
        }
    }
</script>