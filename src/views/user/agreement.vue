<template>
    <div class="user-agreement">
         <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                用户协议
            </p>
            <a href="#" slot="extra" @click.prevent="getAgreementList">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel">
                <span>厂商</span>
                <Select v-model="sCompany" style="width:300px" placeholder="厂商">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <span>状态</span>
                <Select v-model="sStatus" style="width:300px" placeholder="状态">
                    <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <Button type="primary" @click="getAgreementList">查询</Button>
            </div>
            
            <user-agreement-list :item-list="agreementData"></user-agreement-list>
        </Card>
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import company from '@/controllers/company.js'
import userAgreementList from '../components/user/user-agreement-list.vue'

export default {
    name: 'user-agreement',
    components: {
        userAgreementList
    },
    data () {
        return {
            sCompany: 0,
            companyList: [],
            sStatus: 0,
            statusList: [
                { id: 0, name: '正常' },
                { id: 1, name: '删除' },
                { id: 3, name: '隐藏' }
            ],
            agreementData: []
        }
    },
    methods: {
        init () {
            this.getCompanys()
        },

        getCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        getAgreementList () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            let vm = this
            user.findUserAgreement(this.sCompany, this.sStatus).then(res => {
                if (res.status === 0) {
                    vm.agreementData = res.entities
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

<style scoped>
.filter-panel {
    margin-bottom:15px;
}
</style>
