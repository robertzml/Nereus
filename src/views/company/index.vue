<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/company/list" size="sm" variant="info">厂家列表</b-button>
             <b-button to="/company/create" size="sm" variant="primary">新增厂家</b-button>
        </b-button-group>        

        <hr />
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    name: 'company_index',
    data () {
        return {
            msg: '厂家管理'
        }       
    },
    mounted: function () {
        
    }
}
</script>