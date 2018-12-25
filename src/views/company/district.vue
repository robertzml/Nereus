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
            <a href="#" v-if="this.roleType === 0 || this.roleType === 1" slot="extra" @click.prevent="showCreate">
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

            <agent-district-list :item-list="districtData"></agent-district-list>
        </Card>

        <agent-district-create-mod ref="districtMod"></agent-district-create-mod>
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
            districtData: []
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
