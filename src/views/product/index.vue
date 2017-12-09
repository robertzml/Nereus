<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate" style="margin-right: 5px">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="showAgent" style="margin-right: 5px">
                    <Icon type="shuffle"></Icon>
                    代理产品
                </a>
                <a href="#" slot="extra" @click.prevent="getProducts">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
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
            pageSize: 10,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'product-edit' || from.name === 'product-create') {
            next(vm => {
                vm.getAccounts()
            })
        } else {
            next()
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
        },
        showDetails (item) {
            this.$router.push({ name: 'product-details', params: { id: item.id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'product-edit', params: { id: item.id } })
        },
        showCreate () {
            this.$router.push({ name: 'product-create' })
        },
        showAgent () {
            this.$router.push({ name: 'product-agent' })
        }
    },
    created: function () {
        console.log('In product index create function')
        this.getProducts()
    }
}
</script>
