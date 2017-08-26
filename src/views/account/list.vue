<template>
    <div>
        <h2>{{ msg }}</h2>
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

         <!-- Main table element -->
        <b-table striped hover show-empty
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
        >
            <template slot="loginState" scope="row">{{ row.value == 1 ? '在线':'离线' }}</template>
            <template slot="actions" scope="row">
                <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
                <b-btn size="sm" @click.stop="details(row.item, row.index, $event.target)">Details</b-btn>
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

        <!-- Details modal -->
        <b-modal id="modal1" @hide="resetModal" ok-only>
            <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
            <pre>{{ modalDetails.data }}</pre>
        </b-modal>

    </div>
</template>

<script>
import axios from 'axios'
import { apihost } from '../../config.js'

export default {
    name: 'list',
    data () {
        return {
            items: [],
            msg: '用户列表',
            fields: {
                id: { label: 'id', sortable: true },
                userName: { label: '用户名', sortable: true, 'class': 'text-center' },
                phone: { label: '电话' },
                accountType: { label: '账户类型' },
                imei: { label: 'imei' },
                loginState: { label: '登录状态' },
                actions: { label: 'Actions' }
            },
            currentPage: 1,
            perPage: 5,
            totalRows: 10,
            pageOptions: [{ text: 5, value: 5 }, { text: 10, value: 10 }, { text: 15, value: 15 }],
            sortBy: null,
            sortDesc: false,
            filter: null,
            modalDetails: { index: '', data: '' }
        }
    },
    methods: {
        details (item, index, button) {
            this.modalDetails.data = JSON.stringify(item, null, 2)
            this.modalDetails.index = index
            this.$root.$emit('show::modal', 'modal1', button)
        },
        resetModal () {
            this.modalDetails.data = ''
            this.modalDetails.index = ''
        },
        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getAccounts: function (page, pageSize) {
            var vm = this
            axios.get(apihost + '/account/getAccountDetail', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).then(function (response) {
                 console.log(response)
                 vm.items = response.data
                 vm.totalRows = response.data.length
            })
        }
    },
    created: function () {
        /* 
        var vm = this
        axios.get(apihost + '/account/getAccountCount')
            .then(function (response) {
                console.log(response)
                vm.count = response.data
                // vm.vendors = response.data
                // vm.tableData = response.data
            })
        */
        this.getAccounts(1, 10)
    }
}
</script>
