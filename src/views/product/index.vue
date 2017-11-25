<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品列表
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
import product from '../../controllers/product.js'
import _ from 'lodash'

export default {
    name: 'product-index',
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
                    title: '分类名称',
                    key: 'product_type_name'
                },
                {
                    title: '厂商名称',
                    key: 'company_name'
                },
                {
                    title: '型号规格',
                    key: 'specification'
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
        getProducts () {
            let vm = this
            product.listView().then(res => {
                vm.items = res.entities
                vm.itemsCount = vm.items.length
                vm.tableData = _.slice(vm.items, 0, vm.pageSize)
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        }
    },
    created: function () {
        console.log('In product index create function')
        this.getProducts()
    }
}
</script>
