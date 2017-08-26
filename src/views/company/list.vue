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
            msg: '厂家列表',
            fields: {
                id: { label: 'id' },
                name: { label: '名称' },
                address: { label: '地址' },
                contacts: { label: '联系人' },
                phone: { label: '电话' },
                updateDate: { label: '更新时间', sortable: true },
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
            this.$router.push({ name: 'company_details', params: { id: item.id } })
            // this.$router.push('/account/list')
            /*
            this.modalDetails.data = JSON.stringify(item, null, 2)
            this.modalDetails.index = index
            this.$root.$emit('show::modal', 'modal1', button)
            */
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
        getCompanys: function () {
            var vm = this
            axios.get(apihost + '/company/getAllCompanyDetail').then(function (response) {
                console.log(response)
                vm.items = response.data
                vm.totalRows = response.data.length
            })
        }
    },
    created: function () {     
        this.getCompanys()
    }
}
</script>
