<script>
    export default {
        props: {
            data: {
                type: String
            }
        },
        render(createElement) {
            return createElement('a', {
                attrs: {
                    href: this.data,
                    target: '_blank',
                    rel: 'noreferrer'
                }
            }, [this.data]);
        }
    }
</script>