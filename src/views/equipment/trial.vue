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
            companyList: [],
            agentList: [],
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
            // this.loadProductType()
            // this.loadAgents()

            if (this.roleType === 0 || this.roleType === 1) {
                // this.loadCompanys()
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
