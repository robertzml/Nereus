<template>
    <div class="equipment-real">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备实时数据列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="search">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel" style="margin-bottom:15px;">
                        <span>产品类型</span>
                        <Select v-model="sProductType" style="width:200px" placeholder="选择产品类型">
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        
                        <span v-if="this.roleType === 0 || this.roleType === 1">所属厂商</span>
                        <Select v-if="this.roleType === 0 || this.roleType === 1" v-model="sCompany" style="width:200px" placeholder="选择厂商">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <Button type="primary" @click="search">查询</Button>
                    </div>

                    <div class="filter-panel">
                        <span>在线状态: </span>
                        <Select v-model="sPower" style="width:200px" placeholder="选择在线状态" clearable>
                            <Option v-for="item in powerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>搜索</span>
                        <Input v-model="filterKey" style="width: 200px"></Input>
                    </div>

                    <div v-if="this.sProductType === 1">
                        <water-heater-real-list :item-list="waterHeaterfilterData"></water-heater-real-list>
                    </div>
                    <div v-else-if="this.sProductType === 2">
                        <water-cleaner-real-list :item-list="waterCleanerfilterData"></water-cleaner-real-list>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import equipment from '@/controllers/equipment.js'
import waterHeaterRealList from '../components/equipment/water-heater-real-list.vue'
import waterCleanerRealList from '../components/equipment/water-cleaner-real-list.vue'

export default {
    name: 'equipment-real',
    components: {
        waterHeaterRealList,
        waterCleanerRealList
    },
    data () {
        return {
            productTypeList: [
                { id: 1, name: '热水器' },
                { id: 2, name: '直饮机' }
            ],
            roleType: 0,
            companyList: [],
            sProductType: 0,
            sCompany: 0,
            waterHeaterData: [],
            waterCleanerData: [],
            filterKey: '',
            powerList: [
                { id: '0', name: '关机' },
                { id: '1', name: '开机' }
            ],
            sPower: 0
        }
    },
    computed: {
        waterHeaterfilterData () {
            let temp = this.waterHeaterData

            if (this.sProductType !== 1) {
                return temp
            }

            if (this.sPower) {
                temp = temp.filter(r => r.power === this.sPower)
            }
            
            let filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            return temp
        },
        waterCleanerfilterData () {
            let temp = this.waterCleanerData

            if (this.sProductType !== 2) {
                return temp
            }

            if (this.sPower !== -1) {
                temp = temp.filter(r => r.power === this.sPower)
            }
            
            let filterKey = this.filterKey && this.filterKey.toLowerCase()
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

            if (this.roleType === 0 || this.roleType === 1) {
                this.loadCompanys()
            } else {
                this.sCompany = this.$store.state.user.companyId
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

        search () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            if (this.sProductType === 0) {
                this.$Message.warning({
                    content: '请选择产品类型',
                    duration: 2
                })
                return
            }

            let vm = this

            if (this.sProductType === 1) {
                equipment.getWaterHeaterRealByCompany(this.sCompany).then(res => {
                    if (res.status === 0) {
                        vm.waterHeaterData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message,
                            duration: 5
                        })
                    }
                })
            } else if (this.sProductType === 2) {
                equipment.getWaterCleanerRealByCompany(this.sCompany).then(res => {
                    if (res.status === 0) {
                        vm.waterCleanerData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message,
                            duration: 5
                        })
                    }
                })
            }
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 15px;
}
</style>
