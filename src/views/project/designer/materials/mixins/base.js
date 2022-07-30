export default {
    inject: ['env', 'getCurrentNode'],
    props: {
        children: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    computed: {
        currentNode() {
            return this.getCurrentNode();
        },
        currentNodeKey() {
            return this.currentNode.id;
        },
        nodeKey() {
            return this.$vnode.key;
        }
    }
}