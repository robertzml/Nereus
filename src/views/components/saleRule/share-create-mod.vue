<template>
    <div class="share-create-mod">
        <Modal v-model="showModal" :loading="loading" title="添加代理商分成"  @on-visible-change="changeVisible" @on-ok="handleSubmit('formShare')">
            <Form ref="formShare" :model="shareInfo" :rules="ruleShareInfo" :label-width="150">
                <FormItem label="消费规则">
                    {{ saleRuleName }}
                </FormItem>

                <FormItem label="代理商" prop="agent_id">
                    <Select v-model="shareInfo.agent_id" style="width: 200px" :transfer="true">           
                        <Option v-for="item in agentList" :value="item.id" :key="item.id" :label="item.name">
                            <span>{{ item.name }}</span>
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="2" v-model="shareInfo.wealth_sharing" style="width: 250px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>


<script>
import product from '@/controllers/product.js'
import company from '@/controllers/company.js'

export default {
    name: 'share-create-mod',
    props: {
        saleRuleId: { type: Number }
    },
    data () {
        return {
            shareInfo: {
                agent_id: 0,
                sale_rule_id: 0,
                wealth_sharing: 0
            },
            showModal: false,
            loading: true,
            saleRuleName: '',
            agentList: [],
            ruleShareInfo: {
                agent_id: [
                    { required: true, message: '请选择代理商', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        init () {
            this.shareInfo.agent_id = null
            this.shareInfo.sale_rule_id = this.saleRuleId
            this.shareInfo.wealth_sharing = 0

            let vm = this
            product.findSaleRule(this.saleRuleId).then(res => {
                if (res.status === 0) {
                    vm.saleRuleName = res.entity.another_name
                }
            })
            this.loadAgent()
        },
        show () {
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

        // 载入代理商
        loadAgent () {
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

        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    product.addShare(this.shareInfo).then(res => {
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
                } else {
                    this.$Message.error('输入数据有误')
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

