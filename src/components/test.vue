<template>
    <div class="_dialog" :style="{'z-index':zIndex}" v-if="dialogShow">
        <div class="_content" :style="{width: width,'z-index':zIndex}">

            <div class="_header">
                <div class="_title">
                    <slot name="title"></slot>
                </div>
                <a class="_close"><i class="el-icon-close"></i></a>
            </div>
            <div class="_body">_body</div>
            <div class="_footer">
                <el-button type="primary" size="small">保存</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: '50%',
            },
            zIndex: {
                type: Number,
                default: 1024,
            },
            dialogShow: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {};
        },

        mounted() {

        },
        methods: {},
    };
</script>

<style scoped lang="scss">
    ._dialog {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        ._content {
            border: 0;
            box-sizing: border-box;
            border-radius: 6px;
            background-clip: padding-box;
            box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
            background: #fff;
            ._header {
                border-bottom: 1px solid #e8eaec;
                padding: 14px 16px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                ._title {
                    display: flex;
                    justify-content: flex-start;
                }
                ._close {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.5s ease-in-out;
                    color: #99dbff;
                    border-radius: 5px;
                    &:hover {
                        color: #ffffff;
                        background: rgba(0, 0, 0, .2);
                    }
                }
            }
            ._body {
                padding: 16px;
                font-size: 12px;
                line-height: 1.5;
            }
            ._footer {
                border-top: 1px solid #e8eaec;
                padding: 12px 18px;
                text-align: right;
            }
        }
    }

</style>