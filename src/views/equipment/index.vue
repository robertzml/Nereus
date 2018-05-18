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
                
                <div class="filter-panel">
                    <span>产品类型</span>
                    <Select v-model="sProductType" style="width:200px" placeholder="选择产品类型" clearable>
                        <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span v-if="roleType === 0 || roleType ===1">所属厂商</span>
                    <Select v-if="roleType === 0 || roleType ===1" v-model="sCompany" style="width:200px" placeholder="选择厂商" clearable>
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>所属代理商</span>
                    <Select v-model="sAgent" style="width:200px" placeholder="选择代理商" clearable>
                        <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>激活状态</span>
                    <Select v-model="sActivate" style="width:150px" clearable>
                        <Option value="1">已激活</Option>
                        <Option value="0">未激活</Option>
                    </Select>

                    <span>解锁状态</span>
                    <Select v-model="sLock" style="width:150px" clearable>
                        <Option value="1">已解锁</Option>
                        <Option value="0">未解锁</Option>
                    </Select>

                    <br /><br />

                    <span>搜索</span>
                    <Input v-model="filterKey" style="width: 200px"></Input>
                </div>

                <equipment-list :item-list="filterData"></equipment-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import equipmentList from '../components/equipment-list.vue'
import productType from '../../controllers/product-type.js'
import company from '../../controllers/company.js'

export default {
    name: 'equipment-index',
    components: {
        equipmentList
    },
    data () {
        return {
            roleType: 0,
            equipmentData: [],
            productTypeList: [],
            companyList: [],
            agentList: [],
            sProductType: '',
            sCompany: '',
            sAgent: '',
            sActivate: '',
            sLock: '',
            filterKey: ''
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
    computed: {
        filterData () {
            let temp = this.equipmentData
            if (this.sProductType) {
                temp = temp.filter(r => r.type_id === this.sProductType)
            }

            if (this.sCompany) {
                temp = temp.filter(r => r.company_id === this.sCompany)
            }

            if (this.sAgent) {
                temp = temp.filter(r => r.agent_id === this.sAgent)
            }
           
            if (this.sActivate === '1') {
                temp = temp.filter(r => r.is_activate === true)
            } else if (this.sActivate === '0') {
                temp = temp.filter(r => r.is_activate === false)
            }

            if (this.sLock === '1') {
                temp = temp.filter(r => r.is_unlock === true)
            } else if (this.sLock === '0') {
                temp = temp.filter(r => r.is_unlock === false)
            }

            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }

            return temp
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.getEquipments()
            this.loadProductType()
            this.loadAgents()

            if (this.roleType === 0 || this.roleType === 1) {
                this.loadCompanys()
            }
        },

        getEquipments () {
            let vm = this

            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0 || this.roleType === 1) {
                equipment.listView().then(res => {
                    if (res.status === 0) {
                        vm.equipmentData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            } else {
                equipment.listByCompanyView(companyId).then(res => {
                    if (res.status === 0) {
                        vm.equipmentData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            }
        },

        loadCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                if (res.status === 0) {
                    vm.companyList = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取公司信息失败',
                        desc: res.message
                    })
                }
            })
        },

        loadAgents () {
            let vm = this

            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0 || this.roleType === 1) {
                company.list().then(res => {
                    if (res.status === 0) {
                        vm.agentList = res.entities.filter(r => r.type !== 1)
                    } else {
                        this.$Notice.error({
                            title: '获取代理商信息失败',
                            desc: res.message
                        })
                    }
                })
            } else {
                company.listByParent(companyId).then(res => {
                    if (res.status === 0) {
                        vm.agentList = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取代理商信息失败',
                            desc: res.message
                        })
                    }
                })
            }
        },
     
        loadProductType () {
            let vm = this

            productType.list().then(res => {
                vm.productTypeList = res.entities
            })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 10px;
}

.filter-panel .ivu-select {
    margin-right: 15px;
}
</style>
