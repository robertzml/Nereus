<template>
    <div class="main">
        <div class="main-header-con">
            <div class="layout-logo-left">
            </div>
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
       
        <div class="body-wrapper">
            <div class="main-sidebar-con">
                 <Menu active-name="home" theme="dark" width="300px" accordion @on-select="changeMenu">
                    <MenuItem name="home">
                        <Icon type="home"></Icon>
                        主页
                    </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            厂商管理
                        </template>
                        <MenuItem name="company-index">厂商管理</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            产品管理
                        </template>
                        <MenuItem name="product-index">产品管理</MenuItem>
                        <MenuItem name="equipment-index">设备管理</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="settings"></Icon>
                            系统管理
                        </template>
                        <MenuItem name="role-index">角色管理</MenuItem>
                        <MenuItem name="account-index">用户管理</MenuItem>
                        <MenuItem name="product-type-index">产品分类</MenuItem>
                    </Submenu>
                </Menu>
            </div>

            <div class="page-wrapper">
                <div class="main-breadcrumb-con">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">主页</BreadcrumbItem>
                        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                        <BreadcrumbItem>iView</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div class="main-content-con">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-footer-con">
            2017 &copy; 墨岚科技
        </div>
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

<style lang="less" scoped>
    @import "./home.less";
</style>
