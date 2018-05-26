<template>
    <div class="account-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import * as nereus from '../../utility/nereus.js'

export default {
    name: 'account-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        listType: { type: Number, default: 0 }
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
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                            <i-button type="warning" size="small" onClick={ () => { this.showEdit(params.row) } }>编辑</i-button>
                        </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
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
            this.$router.push({ name: 'account-details', params: { id: item.id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'account-edit', params: { id: item.id, type: this.listType } })
        }
    }
}
</script>
