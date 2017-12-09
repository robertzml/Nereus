<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <Table :data="tableData" :columns="columns" border stripe></Table>
                <div style="margin: 10px;overflow-x: hidden">
                    <div style="float: right;">
                        <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer @on-change="changePage"></Page>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import _ from 'lodash'

export default {
    name: 'equipment',
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序列号',
                    key: 'serial_number'
                },
                {
                    title: '主板序列号',
                    key: 'mainboard_serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '产品类别',
                    key: 'product_type_name'
                },
                {
                    title: '生产厂商',
                    key: 'vendor_company_name'
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
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
        if (from.name === 'equipment-edit' || from.name === 'equipment-create') {
            next(vm => {
                vm.getEquipments()
            })
        } else {
            next()
        }
    },
    methods: {
        getEquipments () {
            let vm = this

            let roleId = this.$store.state.user.roleId
            let companyId = this.$store.state.user.companyId

            if (roleId === 1) {
                equipment.listView().then(res => {
                    vm.items = res.entities
                    vm.itemsCount = res.entities.length
                    vm.currentPage = 1
                    vm.tableData = _.slice(vm.items, 0, vm.pageSize)
                })
            } else {
                equipment.listByCompanyView(companyId).then(res => {
                    vm.items = res.entities
                    vm.itemsCount = res.entities.length
                    vm.currentPage = 1
                    vm.tableData = _.slice(vm.items, 0, vm.pageSize)
                })
            }
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'equipment-details', params: { id: item.id } })
        },
        showCreate () {
            this.$router.push({ name: 'equipment-create' })
        },
        showEdit (item) {
            this.$router.push({ name: 'equipment-edit', params: { id: item.id } })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.getEquipments()
    }
}
</script>

