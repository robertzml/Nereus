<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    库存列表
                </p>
                <a href="#" slot="extra" @click.prevent="getStores">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <div class="filter-panel">
                    <span v-if="roleType === 0 || roleType ===1">所属厂商</span>
                    <Select v-if="roleType === 0 || roleType ===1" v-model="sCompany" style="width:200px" @on-change="selectCompany" placeholder="选择厂商" clearable>
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>所属代理商</span>
                    <Select v-model="sAgent" style="width:200px" placeholder="选择代理商" clearable>
                        <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>产品名称</span>
                    <Select v-model="sProduct" style="width:200px" placeholder="选择产品" clearable>
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>

                    <span>搜索</span>
                    <Input v-model="filterKey" style="width: 200px"></Input>
                </div>

                <store-list :item-list="filterData"></store-list>
            </Card>
        </Col>
    </Row>
</template>


<script>
import equipment from '@/controllers/equipment.js'
import storeList from '../components/equipment/store-list.vue'
import company from '@/controllers/company.js'
import product from '@/controllers/product.js'

export default {
    name: 'equipment-store',
    components: {
        storeList
    },
    data () {
        return {
            roleType: 0,
            storeData: [],
            companyList: [],
            sCompany: '',
            productList: [],
            sProduct: '',
            agentList: [],
            sAgent: '',
            filterKey: ''
        }
    },
    computed: {
        filterData () {
            let temp = this.storeData

            if (this.sCompany) {
                temp = temp.filter(r => r.company_id === this.sCompany)
            }

            if (this.sAgent) {
                temp = temp.filter(r => r.agent_id === this.sAgent)
            }

            if (this.sProduct) {
                temp = temp.filter(r => r.product_id === this.sProduct)
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
            this.getStores()
            this.loadAgents()

            if (this.roleType === 0 || this.roleType === 1) {
                this.loadCompanys()
            } else if (this.roleType === 2) {
                let companyId = this.$store.state.user.companyId

                this.loadProducts(companyId)
            }
        },

        getStores () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0 || this.roleType === 1) {
                equipment.getStores().then(res => {
                    if (res.status === 0) {
                        vm.storeData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取库存信息失败',
                            desc: res.message
                        })
                    }
                })
            } else if (this.roleType === 2) {
                equipment.getStoresByCompany(companyId).then(res => {
                    if (res.status === 0) {
                        vm.storeData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取库存信息失败',
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

        loadProducts (companyId) {
            let vm = this

            product.listByCompanyView(companyId).then(res => {
                if (res.status === 0) {
                    vm.productList = res.entities
                }
            })
        },

        selectCompany (val) {
            this.loadProducts(val)
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
