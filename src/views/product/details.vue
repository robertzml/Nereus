<template>
    <div>
        <h4>{{ msg }}</h4>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>属性</th>
                    <th>值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>{{ details.id }}</td>
                <tr>
                    <td>名称</td>
                    <td>{{ details.name }}</td>
                </tr>
                <tr>
                    <td>厂商ID</td>
                    <td>{{ details.companyId }}</td>
                </tr>
                <tr>
                    <td>类别ID</td>
                    <td>{{ details.typeId }}</td>
                </tr>
                <tr>
                    <td>信息</td>
                    <td>{{ details.info }}</td>
                </tr>
                <tr>
                    <td>库存</td>
                    <td>{{ details.stock }}</td>
                </tr>
                <tr>
                    <td>价格</td>
                    <td>{{ details.price }}</td>
                </tr>
                <tr>
                    <td>商品描述</td>
                    <td>{{ details.goodsDesc }}</td>
                </tr>
                <tr>
                    <td>创建时间</td>
                    <td>{{ details.createDate }}</td>
                </tr>
                <tr>
                    <td>更新时间</td>
                    <td>{{ details.updateDate }}</td>
                </tr>
            </tbody>
        </table>

        <hr />
    </div>
</template>

<script>
import product from '../../actions/product.js'

export default {
    name: 'product-details',
    data () {
        return {
            msg: '产品信息',
            productId: this.$route.params.id,
            details: {}
        }
    },
    methods: {
        getProduct: function (id) {
            var vm = this

            product.details(id, function (response) {
                vm.details = response
            })
        }
    },
    mounted: function () {
        this.getProduct(this.productId)
    }
}
</script>