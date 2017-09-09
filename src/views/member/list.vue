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
            @filtered="onFiltered">
        </b-table>

        <div class="row my-1">
            <div class="col-sm-8">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
            </div>
        </div>
    </div>
</template>


<script>
import member from '../../actions/member.js'

export default {
    name: 'member-list',
    data () {
        return {
            msg: '管理员列表',
            items: [],
            fields: {
                id: { label: 'id' },
                name: { label: '名称' },
                type: { label: '类型' },
                status: { label: '状态' }
            },            
            totalRows: 0,
            currentPage: 1,
            perPage: 5,
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
        getMembers () {
            var vm = this
         
            vm.items = member.list(function (response) {
                vm.items = response
                vm.totalRows = response.length
            })
        }
    },
    created: function () {
        this.getMembers()
    }
}
</script>

