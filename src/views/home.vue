<template>
    <div class="layout">
        <Layout>
            <Header>
                <div class="layout-logo"></div>
                <div class="layout-top-menu">
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
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto', background: '#fff'}">
                    <sidebar-menu 
                        :menu-list="menuList">
                    </sidebar-menu>
                </Sider>
                <Layout :style="{marginLeft: '200px', position: 'fixed', height: '100vh', left: '0', right:'0', top:'65px', bottom:'0'}">
                    <Breadcrumb :style="{margin: '24px 15px'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', height: '100%', minHeight: '280px' }">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
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
        handleClickUserDropdown (name) {
            if (name === 'ownSpace') {
                this.$router.push({ name: 'account-info' })
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

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 400px;
    height: 40px;
    background: url('../assets/logo.png') no-repeat;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 0px;
}
.layout-top-menu{
    width: 150px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
