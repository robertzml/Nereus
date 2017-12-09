<template>
    <div class="layout">
        <Row type="flex">
            <Col span="4" class="layout-menu-left">
                <Menu active-name="home" theme="dark" width="auto" accordion @on-select="changeMenu">
                    <div class="layout-logo-left">
                        
                    </div>
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
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            产品管理
                        </template>
                        <MenuItem name="product">产品管理</MenuItem>
                        <MenuItem name="equipment">设备管理</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="settings"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="role">角色管理</MenuItem>
                        <MenuItem name="account">用户管理</MenuItem>
                        <MenuItem name="product-type">产品分类</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20">
                <div class="layout-header">
                    <div class="header-avator-con">
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">当前用户: {{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                        <DropdownItem name="logout" divided>退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Row>
                        </div>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">主页</BreadcrumbItem>
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
                userName: ''
            }
        },
        methods: {
            changeMenu (name) {
                this.$router.push({
                    name: name
                })
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {

                } else if (name === 'logout') {
                    // 退出登录
                    this.$store.commit('LOGOUT')
                    this.$router.push({
                        name: 'login'
                    })
                }
            }
        },
        mounted () {
            this.userName = this.$store.state.user.userName
        }
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        height: 100%;
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
        height: 40px;
        background: url('../assets/logo.png') no-repeat;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>

<style lang="less" scoped>
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,.1);
    position: relative;
    z-index: 11;
    .navicon-con{
        margin: 6px;
        display: inline-block;
    }
    .header-middle-con{
        position: absolute;
        left: 60px;
        top: 0;
        right: 340px;
        bottom: 0;
        padding: 10px;
        overflow: hidden;
    }
    .header-avator-con{
        position: absolute;
        right: 10px;
        top: 0;
        height: 100%;
        width: 300px;
        .message-con{
            display: inline-block;
            width: 30px;
            padding: 18px 0;
            text-align: center;
            cursor: pointer;
            i{
                vertical-align: middle;
            }
        }
        .user-dropdown{
            &-menu-con{
                position: absolute;
                right: 0;
                top: 0;
                width: 150px;
                height: 100%;
                .main-user-name{
                    display: inline-block;
                    width: 80px;
                    word-break: keep-all;
                    white-space: nowrap;
                    vertical-align: top;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: right;
                }
            }
            &-innercon{
                height: 100%;
                padding-right: 14px;
            }
        }
        .full-screen-btn-con{
            display: inline-block;
            width: 30px;
            padding: 18px 0;
            text-align: center;
            cursor: pointer;
            i{
                vertical-align: middle;
            }
        }
        .lock-screen-btn-con{
            display: inline-block;
            width: 30px;
            padding: 18px 0;
            text-align: center;
            cursor: pointer;
            i{
                vertical-align: middle;
            }
        }
    }
}
</style>
