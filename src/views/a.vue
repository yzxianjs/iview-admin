<template>
    <div>

        <Divider>分割线</Divider>
        <Divider>分割线</Divider>

        <i-switch v-model="flag">
            <Icon type="md-checkmark" slot="open"></Icon>
            <Icon type="md-close" slot="close"></Icon>
        </i-switch>
        <br><br>
        <i-switch  size="large" v-model="flag">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
        </i-switch>

        <Divider>分割线</Divider>
        <input type="password">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <Button type="primary">Primary</Button>
        <el-button type="primary">buttonCont</el-button>
        <Button type="primary">Primary</Button>
        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        <el-input v-model="value" placeholder="placeholder"></el-input>
        <Button type="success">Primary</Button>


        <Page
                :current="2" :total="100"
                show-sizer show-elevator show-total size="small"
                prev-text="Previous"
                next-text="Next"
                transfer
                class-name="myPage"/>

        <Input v-model="value" placeholder="large default small" size="large" icon="ios-clock-outline" clearable
               style="width: 300px"/>
        <Radio v-model="value2" disabled>Radio</Radio>
        <RadioGroup v-model="value2" vertical size="large" type="button">
            <Radio label="金斑蝶" disabled></Radio>
            <Radio label="爪哇犀牛"></Radio>
            <Radio label="印度黑羚"></Radio>
        </RadioGroup>
        <Divider>分割线</Divider>
        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
            <TabPane label="macOS" icon="logo-apple">标签一的内容</TabPane>
            <TabPane label="Windows" icon="logo-windows">标签二的内容</TabPane>
            <TabPane label="Linux" icon="logo-tux">标签三的内容</TabPane>
            <TabPane label="Centos" icon="logo-tux" disabled>Centos</TabPane>
        </Tabs>
        <Divider></Divider>
        <hr>

    </div>
</template>

<script>
    export default {
        name: 'A',
        data() {
            return {
                flag:true,
                value: '沙和尚',
                value2: '',
                value3: [],
                data: [
                    {
                        name: '一级 1',
                        children: [{
                            name: '二级 1-1',
                            children: [{
                                name: '三级 1-1-1',
                            }],
                        }],
                    }, {
                        name: '一级 2',
                        children: [{
                            name: '二级 2-1',
                            children: [{
                                name: '三级 2-1-1',
                            }],
                        }, {
                            name: '二级 2-2',
                            children: [{
                                name: '三级 2-2-1',
                            }],
                        }],
                    }, {
                        name: '一级 3',
                        children: [{
                            name: '二级 3-1',
                            children: [{
                                name: '三级 3-1-1',
                            }],
                        }, {
                            name: '二级 3-2',
                            children: [{
                                name: '三级 3-2-1',
                            }],
                        }],
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
            };
        },
        methods: {
            handleTabRemove(name) {
                console.log(name);
            },
            handleNodeClick(data) {
                console.log(data);
                for (let i = 0; i < 100; i++) {
                }
            },
        },
    };
</script>

<style scoped>

</style>