<template>
    <div>
        son组件
        <Button @click="test">测试</Button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'son',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            test() {
                axios.get('/api/user').then(res => {
                    console.log('user', res);
                }, reason => {
                    console.log(reason);
                });
                axios.get('/api/menu').then(res => {
                    console.log(res);
                }, reason => {
                    console.log(reason);
                });
            },
        },
        components: {},
    };
</script>

<style scoped>

</style>