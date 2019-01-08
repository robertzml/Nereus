<template>
    <div class="agent-district-create-mod">
        <Modal v-model="showModal" :loading="loading" title="新增代理商代理区域"  @on-visible-change="changeVisible" :mask-closable="false" @on-ok="submit()" width="800">
            <Form ref="formTrade" :model="districtInfo" :label-width="150">
                <FormItem label="代理商" prop="agent_company_id">
                    <Select v-model="districtInfo.agent_company_id" style="width:300px">
                        <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="产品" prop="product_id">
                    <Select v-model="districtInfo.product_id" style="width:300px" @on-change="selectProduct">
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="销售规则" prop="product_sale_rule_id">
                    <Select v-model="districtInfo.product_sale_rule_id" style="width:300px">
                        <Option v-for="item in saleRuleList" :value="item.id" :key="item.id">{{ item.another_name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="省" prop="province_id">
                    <Select v-model="districtInfo.province_id" style="width:300px" @on-change="selectProvince">
                        <Option v-for="item in provinceList" :value="item.province_id" :key="item.province_id">{{ item.province_name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="市" prop="city_id">
                    <Select v-model="districtInfo.city_id" style="width:300px" @on-change="selectCity">
                        <Option v-for="item in cityList" :value="item.city_id" :key="item.city_id">{{ item.city_name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="区" prop="district_id">
                    <Select v-model="districtInfo.district_id" style="width:300px">
                        <Option v-for="item in districtList" :value="item.district_id" :key="item.district_id">{{ item.district_name }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import product from '@/controllers/product.js'

export default {
    name: 'agent-district-create-mod',
    data () {
        return {
            companyId: 0,
            districtInfo: {
                agent_company_id: 0,
                product_id: 0,
                product_sale_rule_id: 0,
                province_id: 0,
                city_id: 0,
                district_id: 0
            },
            agentCompanyList: [],
            productList: [],
            saleRuleList: [],
            provinceList: [],
            districtList: [],
            cityList: [],
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.districtInfo.agent_company_id = 0
            this.districtInfo.product_id = 0
            this.districtInfo.product_sale_rule_id = 0
            this.districtInfo.province_id = 0
            this.districtInfo.city_id = 0
            this.districtInfo.district_id = 0

            if (this.companyId !== 0) {
                this.getAgentCompanys()
                this.getProducts()

                this.getProvinces()
            }
        },

        show (companyId) {
            this.companyId = companyId
            this.showModal = true
        },

        changeVisible (val) {
            if (val) {
                this.init()
            }
        },

        modalCancel () {
            this.showModal = false
        },

        getAgentCompanys () {
            let vm = this
            company.listAgentAndSelf(this.companyId).then(res => {
                vm.agentCompanyList = res.entities
            })
        },

        getProducts () {
            let vm = this
            product.listByCompanyView(this.companyId).then(res => {
                vm.productList = res.entities
            })
        },

        getProvinces () {
            let vm = this
            company.findProvince().then(res => {
                vm.provinceList = res.entities
            })
        },

        selectProduct (val) {
            let vm = this
            product.getSaleRules(val).then(res => {
                vm.saleRuleList = res.entities
            })
        },

        selectProvince (val) {
            let vm = this
            company.findCity(val).then(res => {
                vm.cityList = res.entities

                vm.districtInfo.city_id = 0
                vm.districtInfo.district_id = 0
            })
        },

        selectCity (val) {
            let vm = this
            company.findDistrict(val).then(res => {
                vm.districtList = res.entities

                vm.districtInfo.district_id = 0
            })
        },

        submit () {
            let act = {
                district_id: this.districtInfo.district_id,
                agent_company_id: this.districtInfo.agent_company_id,
                product_sale_rule_id: this.districtInfo.product_sale_rule_id
            }

            if (act.agent_company_id === 0 || act.product_sale_rule_id === 0 || act.district_id === 0) {
                this.$Message.warning('请选择信息')
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            company.addAgentDistrict(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.$emit('refresh')
                        this.showModal = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '添加失败',
                        desc: res.message
                    })
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        }
    }
}
</script>
