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
                <sidebar-menu 
                    :menu-list="menuList">
                </sidebar-menu>
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
import sidebarMenu from '../components/SidebarMenu.vue'

export default {
    components: {
        sidebarMenu
    },
    name: 'home',
    data () {
        return {
            userName: ''
        }
    },
    computed: {
        menuList () {
            return this.$store.state.menuList
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
        this.$store.commit('UpdateMenu')
    }
}
</script>

<style lang="less" scoped>
    @import "./home.less";
</style>
