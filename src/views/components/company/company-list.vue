<template>
    <div class="company-list">
        <Table :data="tableData" :columns="columns" border stripe></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="厂商信息"
            width="600">
            <company-details ref="com1"></company-details>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import companyDetails from './company-details.vue'

export default {
    name: 'company-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        displayEdit: { type: Boolean, default: false },
        agentView: { type: Boolean, default: false }
    },
    components: {
        companyDetails
    },
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '编码',
                    key: 'code'
                },
                {
                    title: '类型',
                    key: 'type',
                    render: (h, params) => {
                        return h('div', [
                            h('span', nereus.displayCompanyType(params.row.type))
                        ])
                    }
                },
                {
                    title: '联系人',
                    key: 'contact'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: '售后电话',
                    key: 'aftersale_phone'
                },
                {
                    title: '地址',
                    key: 'address'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        let edit = null
                        if (this.displayEdit) {
                            edit = <i-button type="warning" size="small" onClick={ () => { this.showEdit(params.row) } }>编辑</i-button>
                        } else {
                            edit = <span></span>
                        }
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                            { edit }
                        </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            modal1: false
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        },
        tableData () {
            let temp = this.itemList
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },
        showDetails (item) {
            this.$refs.com1.getCompany(item.id)
            this.modal1 = true
        },
        showEdit (item) {
            if (this.agentView) {
                this.$router.push({ name: 'company-agent-edit', params: { id: item.id } })
            } else {
                this.$router.push({ name: 'company-edit', params: { id: item.id } })
            }
        }
    }
}
</script>
