<template>
    <div class="sidebar-menu">
        <Menu active-name="home" theme="dark" width="300px" accordion @on-select="selectMenu">
            <MenuItem name="home">
                <Icon type="home"></Icon>
                主页
            </MenuItem>

            <template v-for="sub in menuList">
                <Submenu :name="sub.name" :key="sub.name">
                    <template slot="title">
                        <Icon :type="sub.icon"></Icon>
                        {{ sub.title }}
                    </template>

                    <template v-for="child in sub.children">
                        <MenuItem :name="child.name" :key="child.name">
                            {{ child.title }}
                        </MenuItem>
                    </template>
                </Submenu>
            </template>
            
        </Menu>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array
    },
    methods: {
        selectMenu (name) {
            this.$router.push({
                name: name
            })
        }
    }
}
</script>

