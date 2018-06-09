<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    角色列表
                </p>
                <Table :data="tableData" :columns="columns" stripe border></Table>
                <div style="margin: 10px;overflow-x: hidden">
                    <div style="float: right;">
                        <Page :total="itemsCount" :current="1" :page-size="pageSize" @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import role from '@/controllers/role.js'

export default {
    name: 'role-index',
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '类型',
                    key: 'type'
                }
            ],
            items: [],
            itemsCount: 0,
            tableData: [],
            pageSize: 10,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    methods: {
        getRoles () {
            let vm = this
            role.list().then(res => {
                vm.items = res.entities
                vm.itemsCount = vm.items.length
                vm.tableData = vm.items.slice(0, vm.pageSize)
            })
        },
        changePage (page) {
            this.tableData = this.items.slice((page - 1) * this.pageSize, page * this.pageSize)
        }
    },
    created: function () {
        this.getRoles()
    }
}
</script>
