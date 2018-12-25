<template>
    <div class="agent-district-create-mod">
        <Modal v-model="showModal" :loading="loading" title="新增代理商代理区域"  @on-visible-change="changeVisible" :mask-closable="false" @on-ok="submit()" width="800">
            <Form ref="formTrade" :model="districtInfo" :label-width="150">
                <FormItem label="代理商" prop="district_id">
                    <Select v-model="districtInfo.district_id" style="width:300px">
                        <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="产品" prop="product_id">
                    <Select v-model="districtInfo.product_id" style="width:300px">
                        <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
                district_id: 0,
                agent_company_id: 0,
                product_id: 0
            },
            agentCompanyList: [],
            productList: [],
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.districtInfo.district_id = 0
            this.districtInfo.agent_company_id = 0
            this.districtInfo.product_id = 0

            if (this.companyId !== 0) {
                this.getAgentCompanys()
                this.getProducts()
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
            company.listAgentAndSelf(this.companyId).then(res => {
                this.agentCompanyList = res.entities
            })
        },

        getProducts () {
            product.listByCompanyView(this.companyId).then(res => {
                this.productList = res.entities
            })
        }
    }
}
</script>
