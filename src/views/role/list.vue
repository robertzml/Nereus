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
import role from '../../actions/role.js'

export default {
    name: 'product-list',
    data () {
        return {
            items: [],
            fields: {
                id: { label: 'id' },
                name: { label: '名称' }
            },            
            totalRows: 0
        }
    },
    methods: {
        getRoles () {
            var vm = this
         
            vm.items = role.list(function (response) {
                vm.items = response
                vm.totalRows = response.length
            })
        }
    },
    created: function () {
        this.getRoles()
    }
}
</script>

