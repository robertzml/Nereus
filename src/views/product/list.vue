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

        <b-table striped hover 
            :items="items" 
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @filtered="onFiltered">

            <template slot="actions" scope="row">
                <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
                <b-btn size="sm" variant="primary" @click.stop="details(row.item, row.index, $event.target)">信息</b-btn>
                <b-btn size="sm" variant="warning" @click.stop="edit(row.item, $event.target)">编辑</b-btn>
                <b-btn size="sm" variant="danger" @click.stop="remove(row.item, row.index, $event.target)">删除</b-btn>
            </template>
        </b-table>

        <p>
            Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
        </p>

        <div class="row my-1">
            <div class="col-sm-8">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
            </div>
            <div class="col-sm-4 text-md-right">
                <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
            </div>
        </div>
    </div>
</template>


<script>
import product from '../../actions/product.js'

export default {
    name: 'product-list',
    data () {
        return {
            msg: '产品列表',
            companyId: 0,
            items: [],
            fields: {
                id: { label: 'id' },
                name: { label: '名称' },
                info: { label: '信息' },
                companyId: { label: '厂家ID' },
                typeId: { label: '类型ID' },
                price: { label: '单价' },
                stock: { label: '库存' },
                actions: { label: '操作' }
            }, 
            totalRows: 0,
            currentPage: 1,
            perPage: 10,
            pageOptions: [{ text: 5, value: 5 }, { text: 10, value: 10 }, { text: 15, value: 15 }],
            sortBy: null,
            sortDesc: false,
            filter: null
        }
    },
    methods: {
        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        details (item, index, button) {
            this.$router.push({ name: 'product_details', params: { id: item.id } })
        },
        getProducts () {
            var vm = this
         
            vm.items = product.list(function (response) {
                vm.items = response
                vm.totalRows = response.length
            })
        }
    },
    created: function () {
        this.companyId = this.$store.state.user.companyId
        console.log(this.companyId)
        this.getProducts()
    }
}
</script>

