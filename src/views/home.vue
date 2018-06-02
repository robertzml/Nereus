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
                <Sider hide-trigger class="layout-sidebar" :width="sidebarWidth">
                    <sidebar-menu 
                        :menu-list="menuList">
                    </sidebar-menu>
                </Sider>
                <Layout :style="{marginLeft: sidebarWidth + 'px', position: 'fixed', left: '0', right:'0', top:'65px', bottom:'0'}">
                    <Breadcrumb v-if="false" :style="{margin: '20px 15px'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content class="layout-content" :style="{marginLeft: sidebarWidth + 'px'}">
                        <keep-alive>
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </Content>
                    <Footer class="layout-footer-center" :style="{marginLeft: sidebarWidth + 'px'}">
                        2016-2018 &copy; 无锡墨岚科技
                    </Footer>
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
            userName: '',
            sidebarWidth: 240
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
.layout-sidebar {
    position: fixed;
    top: 65px;
    left: 0;
    bottom: 0;
    overflow: auto;
    background: #fff;
}
.layout-content {
    padding: 24px;
    position: fixed;
    left: 0;
    right: 0;
    top: 68px;
    bottom: 50px;
    overflow-y: scroll;    
}
.layout-footer-center{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    text-align: center;
}
</style>
