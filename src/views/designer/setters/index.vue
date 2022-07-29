<template>
    <div class="setters">
        <component v-for="item in currentNodeProps" :key="item" :is="item + '-setter'"
            v-bind.sync="currentNode.props" />
    </div>
</template>

<script>
    import setters from './index.js';

    export default {
        name: 'Setters',
        inject: ['env', 'getCurrentNode'],
        components: {
            ...setters
        },
        computed: {
            currentNode() {
                return this.getCurrentNode() || {};
            },
            currentNodeKey() {
                return this.currentNode.id;
            },
            currentNodeProps() {
                if (!this.currentNode.props) {
                    return [];
                }

                console.log('this.currentNode.props', this.currentNode.props);

                let keys = Object.keys(this.currentNode.props);

                console.log('keys', keys);

                const setterNames = Object.keys(setters);

                console.log('setters', setters);
                console.log('setterNames', setterNames);

                keys = keys.filter((v) => {
                    return setterNames.includes(v + '-setter');
                });

                return keys;
            },
        }
    }
</script>