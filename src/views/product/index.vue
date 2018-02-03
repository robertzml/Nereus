<template>
    <div class="product-index">
        <Row style="margin-bottom: 15px;">
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
                    <a href="#" slot="extra" @click.prevent="getProducts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    <product-list :item-list="productData"></product-list>
                </Card>
            </Col>
        </Row>

        <Row v-if="this.roleType === 2">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="getAgentCompanys">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    <Table :data="tableData" :columns="columns" border stripe></Table>
                    <div style="margin: 10px;overflow-x: hidden">
                        <div style="float: right;">
                            <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer placement="top" 
                                @on-change="changePage"
                                @on-page-size-change="changePageSize"></Page>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import product from '../../controllers/product.js'
import productList from '../components/product-list.vue'
import * as nereus from '../../utility/nereus.js'
import company from '../../controllers/company.js'

export default {
    name: 'product-index',
    components: {
        productList
    },
    data () {
        return {
            productData: [],
            roleType: '',
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
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showProductAgent(params.row) } }>产品</i-button>
                        </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            itemsCount: 0,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            tableData: [],
            agentCompanys: []
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'product-edit' || from.name === 'product-create') {
            next(vm => {
                vm.getProducts()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.getProducts()
            this.getAgentCompanys()
        },

        getProducts () {
            let vm = this

            this.roleType = this.$store.state.user.roleType
            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0 || this.roleType === 1) {
                product.listView().then(res => {
                    vm.productData = res.entities
                })
            } else if (this.roleType === 2) {
                product.listByCompanyView(companyId).then(res => {
                    vm.productData = res.entities
                })
            }
        },

        getAgentCompanys () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listByParent(companyId).then(res => {
                vm.agentCompanys = res.entities
                vm.itemsCount = res.entities.length
                vm.currentPage = 1
                vm.tableData = res.entities.slice(0, vm.pageSize)
            })
        },
       
        changePage (page) {
            this.tableData = this.agentCompanys.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
            this.tableData = this.agentCompanys.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },

        showCreate () {
            this.$router.push({ name: 'product-create' })
        },
        showProductAgent (item) {
            this.$router.push({ name: 'product-agent', params: { id: item.id } })
        }
    },
    created: function () {
        console.log('In product index create function')
        this.init()
    }
}
</script>
