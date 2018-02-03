<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    待激活设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="getData">
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
import * as nereus from '../../utility/nereus.js'
import _ from 'lodash'

export default {
    name: 'equipment-inactivate',
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
                    title: '申请人',
                    key: 'apply_account_name'
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
                },
                {
                    title: '用户姓名',
                    key: 'owner_name'
                },
                {
                    title: '用户电话',
                    key: 'owner_phone'
                },
                {
                    title: '激活状态',
                    key: 'auditing_state'
                },
                {
                    title: '申请时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
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
                                <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.activate(params.row) } }>激活</i-button>
                                <i-button type="warning" size="small" style="marginRight: 5px" onClick={ () => { this.reject(params.row) } }>驳回</i-button>
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
    methods: {
        init () {
            this.getData()
        },

        getData () {
            let vm = this
            let roleType = this.$store.state.user.roleType

            if (roleType === 0 || roleType === 1) {
                equipment.getInactivate().then(res => {
                    vm.items = res.entities
                    vm.itemsCount = res.entities.length
                    vm.currentPage = 1
                    vm.tableData = _.slice(vm.items, 0, vm.pageSize)
                })
            } else if (roleType === 2 || roleType === 3) {
                let companyId = this.$store.state.user.companyId

                equipment.getInactivate(companyId).then(res => {
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

        activate (item) {
            let act = [{
                serial_number: item.serial_number,
                is_activate: 1
            }]
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '激活成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '激活失败',
                        desc: res.message
                    })
                }
            })
        },

        reject (item) {
            let act = [{
                serial_number: item.serial_number,
                is_activate: 0
            }]
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '激活已驳回',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '驳回失败',
                        desc: res.message
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
