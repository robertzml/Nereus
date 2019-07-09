<template>
    <div class="district">
         <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                代理公司代理区域
            </p>
            <a href="#" slot="extra" @click.prevent="getDistrictList">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>
            <a href="#" v-if="this.roleType === 0 || this.roleType === 1 || this.roleType === 2" slot="extra" @click.prevent="showCreate">
                <Icon type="plus-round"></Icon>
                新增
            </a>

            <div class="filter-panel" style="margin-bottom:15px;" v-if="this.roleType === 0 || this.roleType === 1">
                <span>厂商</span>
                <Select v-model="sCompany" style="width:300px" placeholder="厂商">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                
                <Button type="primary" @click="getDistrictList">查询</Button>
            </div>

            <div class="filter-panel" style="margin-bottom:15px;">
                <h3>筛选</h3>
                <span>省</span>
                <Select v-model="sProvince" style="width:200px" placeholder="选择省份" @on-change="selectProvince" clearable>
                    <Option v-for="item in provinceList" :value="item.province_id" :key="item.province_id">{{ item.province_name }}</Option>
                </Select>

                <span>市</span>
                <Select v-model="sCity" style="width:200px" placeholder="选择城市" @on-change="selectCity" clearable>
                    <Option v-for="item in cityList" :value="item.city_id" :key="item.city_id">{{ item.city_name }}</Option>
                </Select>

                <span>区</span>
                <Select v-model="sDistrict" style="width:200px" placeholder="选择区" clearable>
                    <Option v-for="item in districtList" :value="item.district_id" :key="item.district_id">{{ item.district_name }}</Option>
                </Select>
            </div>

            <agent-district-list :item-list="filterData" @refresh="getDistrictList"></agent-district-list>
        </Card>

        <agent-district-create-mod ref="districtMod" @refresh="getDistrictList"></agent-district-create-mod>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import agentDistrictList from '../components/company/agent-district-list.vue'
import agentDistrictCreateMod from '../components/company/agent-district-create-mod.vue'

export default {
    name: 'district',
    components: {
        agentDistrictList,
        agentDistrictCreateMod
    },
    data () {
        return {
            roleType: 0,
            sCompany: 0,
            companyList: [],
            districtData: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            sProvince: '',
            sCity: '',
            sDistrict: ''
        }
    },
    computed: {
        filterData () {
            let temp = this.districtData

            if (this.sProvince) {
                temp = temp.filter(r => r.province_id === this.sProvince)
            }

            if (this.sCity) {
                temp = temp.filter(r => r.city_id === this.sCity)
            }

            if (this.sDistrict) {
                temp = temp.filter(r => r.district_id === this.sDistrict)
            }
            /*
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            */
            return temp
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.sCompany = this.$store.state.user.companyId
                this.getDistrictList()
            }

            this.getProvinces()
        },

        getCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        showCreate () {
            if (this.sCompany === 0) {
                return
            }

            this.$refs.districtMod.show(this.sCompany)
        },

        getProvinces () {
            let vm = this
            company.findProvince().then(res => {
                vm.provinceList = res.entities
            })
        },

        selectProvince (val) {
            let vm = this
            company.findCity(val).then(res => {
                vm.cityList = res.entities

                vm.sCity = 0
            })
        },

        selectCity (val) {
            let vm = this
            company.findDistrict(val).then(res => {
                vm.districtList = res.entities

                vm.sDistrict = 0
            })
        },

        getDistrictList () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            let vm = this
            company.getDistrictList(this.sCompany).then(res => {
                if (res.status === 0) {
                    vm.districtData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
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
