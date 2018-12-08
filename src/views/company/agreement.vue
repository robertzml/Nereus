<template>
    <div class="agreement">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                平台协议
            </p>

            <a href="#" v-if="this.roleType === 0 || this.roleType === 1" slot="extra" @click.prevent="showCreate">
                <Icon type="plus-round"></Icon>
                新增
            </a>

            <agreement-list :item-list="agreementData"></agreement-list>

            <agreement-edit-mod ref="addMod" @refresh="getAgreements"></agreement-edit-mod>
        </Card>

        <br />

        <Card v-if="this.roleType === 2">
            <p slot="title">
                <Icon type="grid"></Icon>
                厂商协议
            </p>

            <company-agreement-list :item-list="companyAgreementData"></company-agreement-list>
        </Card>
    </div>
</template>

<script>
// 协议管理
import company from '@/controllers/company.js'
import agreementList from '../components/company/agreement-list.vue'
import agreementEditMod from '../components/company/agreement-edit-mod.vue'
import companyAgreementList from '../components/company/company-agreement-list.vue'

export default {
    name: 'agreement',
    components: {
        agreementList,
        agreementEditMod,
        companyAgreementList
    },
    data () {
        return {
            name: '标准协议',
            agreementData: [],
            companyAgreementData: [],
            roleType: 0
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.getAgreements()

            if (this.roleType === 2) {
                this.getCompanyAgreements()
            }
        },

        // 获取所有协议模版
        getAgreements () {
            let vm = this

            company.findAllAgreement().then(res => {
                if (res.status === 0) {
                    vm.agreementData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取协议信息失败',
                        desc: res.message
                    })
                }
            })
        },

        getCompanyAgreements () {
            let vm = this

            company.findCompanyAgreement().then(res => {
                if (res.status === 0) {
                    vm.companyAgreementData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取厂商协议信息失败',
                        desc: res.message
                    })
                }
            })
        },

        showCreate () {
            this.$refs.addMod.show(0)
        }
    },
    mounted () {
        this.init()
    }
}
</script>
