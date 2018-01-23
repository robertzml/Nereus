<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate" style="margin-right: 5px">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="showAgent" style="margin-right: 5px">
                    <Icon type="shuffle"></Icon>
                    代理产品
                </a>
                <a href="#" slot="extra" @click.prevent="getProducts">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <product-list :item-list="productData"></product-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import product from '../../controllers/product.js'
import productList from '../components/product-list.vue'

export default {
    name: 'product-index',
    components: {
        productList
    },
    data () {
        return {
            productData: []
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'product-edit' || from.name === 'product-create') {
            next(vm => {
                vm.getProducts()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.getProducts()
        },
        getProducts () {
            let vm = this
            product.listView().then(res => {
                vm.productData = res.entities
            })
        },
        showCreate () {
            this.$router.push({ name: 'product-create' })
        },
        showAgent () {
            this.$router.push({ name: 'product-agent' })
        }
    },
    created: function () {
        console.log('In product index create function')
        this.init()
    }
}
</script>
