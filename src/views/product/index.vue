<template>
    <div>
        <h2>{{ msg }}</h2>
        <hr />
        <b-button-group>
             <b-button to="/product/list" size="sm" variant="info">产品列表</b-button>
             <b-button to="/product/create" size="sm" variant="primary">新增产品</b-button>
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
    name: 'product',
    data () {
        return {
            msg: '产品管理'
        }       
    }
}
</script>