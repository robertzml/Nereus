<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
                    <sidebar-menu 
                        :menu-list="menuList">
                    </sidebar-menu>
                </Sider>
                <Layout :style="{marginLeft: '200px', position: 'fixed', height: '100vh', left: '0', right:'0', top:'64px', bottom:'0'}">
                    <Breadcrumb :style="{margin: '24px 15px'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content theme="dark" :style="{padding: '24px', height: '100%', minHeight: '280px', background: '#fff'}">
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
    left: 5px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
