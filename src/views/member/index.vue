<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/role/list" size="sm" variant="info">角色列表</b-button>
        </b-button-group>        

        <hr />
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    name: 'member',
    data () {
        return {
            msg: '系统用户管理'
        }       
    }
}
</script>