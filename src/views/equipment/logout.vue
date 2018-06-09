<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    待注销设备列表
                </p>
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
import equipment from '@/controllers/equipment.js'
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'equipment-logout',
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
                    key: 'agent_account_apply_inactivate_name'
                },
                {
                    title: '使用截至时间',
                    key: 'device_deadline_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.device_deadline_date) }</span>
                        )
                    }
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
                                <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.agree(params.row) } }>同意</i-button>
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
        init () {
            this.getEquipments()
        },

        getEquipments () {
            let vm = this
            let roleType = this.$store.state.user.roleType

            if (roleType === 0 || roleType === 1) {
                equipment.getLogout().then(res => {
                    if (res.status === 0) {
                        vm.items = res.entities
                        vm.itemsCount = res.entities.length
                        vm.currentPage = 1
                        vm.tableData = vm.items.slice(0, vm.pageSize)
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            } else {
                let companyId = this.$store.state.user.companyId
                equipment.getLogout(companyId).then(res => {
                    if (res.status === 0) {
                        vm.items = res.entities
                        vm.itemsCount = res.entities.length
                        vm.currentPage = 1
                        vm.tableData = vm.items.slice(0, vm.pageSize)
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            }
        },

        changePage (page) {
            this.tableData = this.items.slice((page - 1) * this.pageSize, page * this.pageSize)
        },

        agree (item) {
            let act = [{
                serial_number: item.serial_number,
                apply_state: 1
            }]
       
            equipment.inactivate(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '注销成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '注销失败',
                        desc: res.message
                    })
                }
            })
        },

        reject (item) {
            let act = [{
                serial_number: item.serial_number,
                apply_state: 2
            }]
       
            equipment.inactivate(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '注销已驳回',
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
    created: function () {
        console.log('In equipment logout create function')
        this.init()
    }
}
</script>
