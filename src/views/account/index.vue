<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    用户列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getAccounts">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <Table :data="tableData" :columns="columns" stripe border></Table>
                <div style="margin: 10px;overflow-x: hidden">
                    <div style="float: right;">
                        <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import account from '../../controllers/account.js'
import * as nereus from '../../utility/nereus.js'
import _ from 'lodash'

export default {
    name: 'account-index',
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
            items: [],
            itemsCount: 0,
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'account-edit' || from.name === 'account-create') {
            next(vm => {
                vm.getAccounts()
            })
        } else {
            next()
        }
    },
    methods: {
        getAccounts () {
            let vm = this
            account.listView().then(res => {
                if (res.status === 0) {
                    vm.items = res.admins
                    vm.itemsCount = vm.items.length
                    vm.currentPage = 1
                    vm.tableData = _.slice(vm.items, 0, vm.pageSize)
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'account-details', params: { id: item.id } })
        },
        showCreate () {
            this.$router.push({ name: 'account-create' })
        },
        showEdit (item) {
            this.$router.push({ name: 'account-edit', params: { id: item.id } })
        }
    },
    created: function () {
        console.log('In account index create function')
        this.getAccounts()
    }
}
</script>
