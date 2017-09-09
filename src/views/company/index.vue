<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/company/list" size="sm" variant="info">厂家列表</b-button>
             <b-button to="/company/create" size="sm" variant="primary">新增厂家</b-button>
        </b-button-group>        

        <hr />
        <transition name="fade">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>


<script>
export default {
    name: 'company',
    data () {
        return {
            msg: '厂家管理'
        }       
    }
}
</script>