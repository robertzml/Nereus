<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    试用设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <div class="filter-panel">
                    <span>产品类型</span>
                    <Select v-model="sProductType" style="width:200px" placeholder="选择产品类型" @on-change="selectProductType" clearable>
                        <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>产品名称</span>
                    <Select v-model="sProduct" style="width:200px" placeholder="选择产品" clearable>
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }} <span style="float:right;color:#fcc">{{ item.product_code }}</span></Option>
                    </Select>

                    <span v-if="roleType === 0 || roleType ===1">所属厂商</span>
                    <Select v-if="roleType === 0 || roleType ===1" v-model="sCompany" style="width:300px" placeholder="选择厂商" clearable>
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>所属代理商</span>
                    <Select v-model="sAgent" style="width:300px" placeholder="选择代理商" clearable>
                        <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <br /><br />

                    <span>解锁状态</span>
                    <Select v-model="sLock" style="width:150px" clearable>
                        <Option value="1">已解锁</Option>
                        <Option value="0">未解锁</Option>
                    </Select>


                    <span>搜索</span>
                    <Input v-model="filterKey" style="width: 200px"></Input>
                </div>
                
                <trial-list :item-list="filterData" @refresh="getEquipments"></trial-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import trialList from '../components/equipment/trial-list.vue'
import productType from '@/controllers/product-type.js'
import product from '@/controllers/product.js'
import company from '@/controllers/company.js'

export default {
    name: 'equipment-trial',
    components: {
        trialList
    },
    data () {
        return {
            roleType: 0,
            equipmentData: [],
            productTypeList: [],
            productList: [],
            companyList: [],
            agentList: [],
            sProductType: '',
            sProduct: '',
            sCompany: '',
            sAgent: '',
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
                temp = temp.filter(r => r.product_type_id === this.sProductType)
            }

            if (this.sProduct) {
                temp = temp.filter(r => r.product_id === this.sProduct)
            }

            if (this.sCompany) {
                temp = temp.filter(r => r.company_id === this.sCompany)
            }

            if (this.sAgent) {
                temp = temp.filter(r => r.agent_id === this.sAgent)
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
                equipment.getTrial().then(res => {
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
                equipment.getTrial(companyId).then(res => {
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
        },

        selectProductType (val) {
            this.sProduct = ''
            if (val === undefined) {
                this.productList = []
                return
            }

            let companyId = this.$store.state.user.companyId
            let vm = this
            if (this.roleType === 0 || this.roleType === 1) {
                product.listByType(val).then(res => {
                    vm.productList = res.entities
                })
            } else {
                product.listByTypeAndCompany(val, companyId).then(res => {
                    vm.productList = res.entities
                })
            }
        }
    },
    created: function () {
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
