<template>
    <div class="agreement">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                标准协议
            </p>

            <agreement-list :item-list="agreementData"></agreement-list>
        </Card>
    </div>
</template>

<script>
// 协议管理
import company from '@/controllers/company.js'
import agreementList from '../components/company/agreement-list.vue'

export default {
    name: 'agreement',
    components: {
        agreementList
    },
    data () {
        return {
            name: '标准协议',
            agreementData: []
        }
    },
    methods: {
        init () {
            this.getAgreements()
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
        }
    },
    mounted () {
        this.init()
    }
}
</script>
