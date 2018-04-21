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
                    <Select v-model="sProductType" style="width:200px" placeholder="选择产品类型" clearable @on-change="selectedProductType">
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
                    vm.equipmentData = res.entities
                })
            } else {
                equipment.listByCompanyView(companyId).then(res => {
                    vm.equipmentData = res.entities
                })
            }
        },

        loadCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        loadAgents () {
            let vm = this

            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0 || this.roleType === 1) {
                company.list().then(res => {
                    vm.agentList = res.entities.filter(r => r.type !== 1)
                })
            } else {
                company.listByParent(companyId).then(res => {
                    vm.agentList = res.entities
                })
            }
        },
     
        loadProductType () {
            let vm = this

            productType.list().then(res => {
                vm.productTypeList = res.entities
            })
        },

        selectedProductType (val) {
            console.log('type is: ' + val)
            console.log('s type is:' + this.sProductType)
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
