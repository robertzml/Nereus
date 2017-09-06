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
    name: 'product',
    data () {
        return {
            msg: '角色管理'
        }       
    }
}
</script>