<template>
    <div classs="user-apply">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        申请更换设备主人电话列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadUsers">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                     <div class="filter-panel" style="margin-bottom:15px;">
                        <span>厂商</span>
                        <Select v-model="sCompany" style="width:300px" placeholder="厂商">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                       
                        <Button type="primary" @click="getApplyList">查询</Button>
                    </div>

                    <br />
                    <apply-phone-list :item-list="applyData" @refresh="getApplyList"></apply-phone-list>
                   
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import company from '@/controllers/company.js'
import applyPhoneList from '../components/user/apply-phone-list.vue'

export default {
    name: 'user-apply',
    components: {
        applyPhoneList
    },
    data () {
        return {
            sCompany: 0,
            companyList: [],
            applyData: []
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

        getApplyList () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            let vm = this
            user.getApplyUpdatePhoneList(this.sCompany).then(res => {
                if (res.status === 0) {
                    vm.applyData = res.entities
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
