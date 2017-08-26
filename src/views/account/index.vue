<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/account/list" size="sm" variant="info">用户列表</b-button>
             <b-button to="/account/create" size="sm" variant="primary">新增用户</b-button>
        </b-button-group>
       
        
        <router-link to="/account/list">Go to list</router-link>
        <router-link to="/account/create">Go to Create</router-link>
        <router-link to="/account/details/2">Go to Details</router-link>

        <hr />
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    name: 'account',
    data () {
        return {
            msg: '用户主页'
        }       
    },
    mounted: function () {
        // this.$router.push('/account/list')
    }
}
</script>
