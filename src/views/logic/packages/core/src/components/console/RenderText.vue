<script>
    import RenderLink from './RenderLink.vue';

    import {
        linkRegex,
        Helper
    } from './common';

export default {
    components: {
        RenderLink
    },
    props: {
        data: {
            type: [String, Number]
        }
    },
    render(createElement) {
        if (typeof this.data !== 'string') {
            return createElement('span', this.data);
        } else {
            const arr = this.data.split(linkRegex);

            return createElement('span', arr.map((str, index) => {
                return createElement('span', {
                    props: {
                        key: index
                    }
                }, [Helper.isLink(str) ? createElement('render-link', {
                    props: {
                        data: str
                    }
                }) : str]);
            }));
        }
    }
};
</script>