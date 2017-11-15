<template>
    <Row>
        <Col span="24">
            <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                用户列表
            </p>
            <Table :data="tableData" :columns="columns" stripe></Table>
            <div style="margin: 10px;overflow-x: hidden">
                <div style="float: right;">
                    <Page :total="itemsCount" :current="1" :page-size="pageSize" show-sizer @on-change="changePage"></Page>
                </div>
            </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import account from '../../controllers/account.js'
import _ from 'lodash'

export default {
    name: 'account_index',
    data () {
        return {
            columns: [
                {
                    title: '用户名',
                    key: 'user_name'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: '公司',
                    key: 'company_id'
                }
            ],
            items: [],
            itemsCount: 0,
            tableData: [],
            pageSize: 5,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    methods: {
        getAccounts () {
            let vm = this
            account.list().then(res => {
                console.log(res)
                vm.items = res.admins
                vm.itemsCount = vm.items.length
                vm.tableData = _.slice(vm.items, 0, vm.pageSize)
                // vm.tableData = res.admins
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        }
    },
    created: function () {
        console.log('In account index create function')
        this.getAccounts()
    }
}
</script>

