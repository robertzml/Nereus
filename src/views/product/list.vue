<template>
    <div>
        <h4>{{ msg }}</h4>
        <div class="my-1 row">
            <div class="col-md-6">
                <b-form-fieldset horizontal label="每页记录" :label-cols="6">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="搜索" :label-cols="3">
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                </b-form-fieldset>
            </div>
        </div>

        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>


<script>
import product from '../../actions/product.js'

export default {
    name: 'product-list',
    data () {
        return {
            items: [],
            fields: {
                id: { label: 'id' },
                name: { label: '名称' },
                info: { label: '信息' },
                companyId: { label: '厂家ID' },
                price: { label: '单价' },
                stock: { label: '库存' }
            },            
            totalRows: 0
        }
    },
    methods: {
        getProductss () {
            var vm = this
         
            vm.items = product.list(function (response) {
                vm.items = response
                vm.totalRows = response.length
            })
        }
    },
    created: function () {
        this.getProductss()
    }
}
</script>

