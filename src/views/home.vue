<template>
    <div class="layout">
        <Row type="flex">
            <Col span="4" class="layout-menu-left">
                <Menu active-name="home" theme="dark" width="auto" accordion @on-select="changeMenu">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="home">
                        <Icon type="home"></Icon>
                        主页
                    </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            厂商管理
                        </template>
                        <MenuItem name="company">厂商管理</MenuItem>
                        <MenuItem name="1-2">Option 2</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            产品管理
                        </template>
                        <MenuItem name="equipment">设备管理</MenuItem>
                        <MenuItem name="2-2">Option 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="settings"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="account">用户管理</MenuItem>
                        <MenuItem name="product-type">产品分类</MenuItem>
                        <MenuItem name="3-3">Option 3</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                        <BreadcrumbItem>iView</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
                <div class="layout-copy">
                    2017 &copy; 墨岚科技
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                
            }
        },
        methods: {
            changeMenu (name) {
                this.$router.push({
                    name: name
                })
            }
        }
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>