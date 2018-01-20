<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <Table :data="equipmentData" :columns="columns" border stripe></Table>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import moment from 'moment'

export default {
    name: 'equipment-online',
    data () {
        return {
            equipmentData: [],
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
                    title: '激活状态',
                    key: 'is_activate',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <span>{ params.row.is_activation === '1' ? '已激活' : '未激活' }</span>
                        )
                    }
                },
                {
                    title: '解锁状态',
                    key: 'is_unlock',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <span>{ params.row.is_lock === '1' ? '已解锁' : '未解锁' }</span>
                        )
                    }
                },
                {
                    title: '使用截至时间',
                    key: 'device_deadline_date',
                    render: (h, params) => {
                        return (
                            <span>{ this.displayDateTime(params.row.device_deadline_date) }</span>
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
            ]
        }
    },
    methods: {
        init () {
            this.getEquipments()
        },

        getEquipments () {
            let vm = this

            equipment.getOnline().then(res => {
                vm.equipmentData = res.entities    
            })
        },

        displayDateTime: function (date) {
            if (date === null || date === '') {
                return ''
            } else {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    },
    created: function () {
        console.log('In equipment online create function')
        this.init()
    }
}
</script>

