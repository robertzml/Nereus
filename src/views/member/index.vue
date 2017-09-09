<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/member/list" size="sm" variant="info">用户列表</b-button>
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
            msg: '用户管理'
        }       
    }
}
</script>