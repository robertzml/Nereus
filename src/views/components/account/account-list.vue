<template>
    <div class="account-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="管理员信息">
            <account-details ref="acc1" width="600"></account-details>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import accountDetails from './account-details.vue'

export default {
    name: 'account-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        listType: { type: Number, default: 0 }, // 0:超级管理员编辑  1: 厂商编辑   2:代理商编辑
        displayEdit: { type: Boolean, default: false }
    },
    components: {
        accountDetails
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
                    title: '用户名',
                    key: 'user_name'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: 'Email',
                    key: 'email'
                },
                {
                    title: '所属角色',
                    key: 'role_name'
                },
                {
                    title: '所属公司',
                    key: 'company_name'
                },
                {
                    title: '公司类型',
                    key: 'company_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayCompanyType(params.row.company_type) }</span>
                        )
                    }
                },
                {
                    title: '账户状态',
                    key: 'status',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayStatus(params.row.status) }</span>
                        )
                    }
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
            
            let pageCount = Math.ceil(temp.length / this.pageSize)

            if (this.currentPage > pageCount) {
                this.changePage(1)
            }
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },
        showDetails (item) {
            // this.$router.push({ name: 'account-details', params: { id: item.id } })
            this.$refs.acc1.getAccount(item.id)
            this.modal1 = true
        },
        showEdit (item) {
            if (this.listType === 0) {
                this.$router.push({ name: 'account-edit', params: { id: item.id, type: this.listType } })
            } else if (this.listType === 1) {
                this.$router.push({ name: 'account-vendor-edit', params: { id: item.id } })
            } else if (this.listType === 2) {
                this.$router.push({ name: 'account-agent-edit', params: { id: item.id } })
            }
        }
    }
}
</script>
