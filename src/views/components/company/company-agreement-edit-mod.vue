<template>
    <div class="company-agreement-edit-mod">
        <Modal v-model="showModal" :loading="loading" title="编辑厂商协议"  @on-visible-change="changeVisible" :mask-closable="false" @on-ok="submit()" width="800">
            <Form ref="formTrade" :model="agreementInfo" :label-width="150">
                <FormItem label="名称">
                    <Input v-model="agreementInfo.name"  style="width: 300px;"></Input>
                </FormItem>

                <FormItem label="销售类型">
                    <Select v-model="agreementInfo.money_type" transfer style="width: 300px;">
                        <Option v-for="item in moneyTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="产品类型">
                    <Select v-model="agreementInfo.product_id" transfer style="width: 300px;">
                        <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name">
                            <span>{{ item.name }}</span>
                            <span style="float:right;color:#0cf">{{ item.product_code }}</span>
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="备注">
                    <Input v-model="agreementInfo.remark" style="width: 300px;"></Input>
                </FormItem>
            </Form>

             <div ref="editor" style="text-align:left"></div>
        </Modal>
    </div>
</template>

<script>
import E from 'wangeditor'
import company from '@/controllers/company.js'
import product from '@/controllers/product.js'

export default {
    name: 'company-agreement-edit-mod',
    data () {
        return {
            id: 0,
            companyId: 0,
            agreementInfo: {
                name: '',
                money_type: 0,
                product_id: 0,
                remark: '',
                apply_protocol_template: ''
            },
            moneyTypeList: [
                { id: 1, name: '一次性购买' },
                { id: 2, name: '固定分期' },
                { id: 31, name: '固定租金' },
                { id: 32, name: '混合租金' },
                { id: 33, name: '节能租金' },
                { id: 34, name: '浮动租金' },
                { id: 4, name: '浮动分期' }
            ],
            productList: [],
            editor: null,
            editorContent: '',
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.companyId = this.$store.state.user.companyId
            this.getProducts()

            this.editor = new E(this.$refs.editor)
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            this.editor.create()

            this.getAgreement(this.id)
        },

        getAgreement (id) {
            let vm = this

            company.findCompanyAgreementById(id).then(res => {
                if (res.status === 0) {
                    vm.agreementInfo = res.entity
                    vm.editorContent = res.entity.apply_protocol_template
                    vm.editor.txt.html(res.entity.apply_protocol_template)
                } else {
                    this.$Notice.error({
                        title: '获取协议信息失败',
                        desc: res.message
                    })
                }
            })
        },

        getProducts () {
            product.listByCompanyView(this.companyId).then(res => {
                this.productList = res.entities
            })
        },

        show (id) {
            this.id = id
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
        submit () {
            let act = {
                id: this.agreementInfo.id,
                name: this.agreementInfo.name,
                remark: this.agreementInfo.remark,
                apply_protocol_template: this.editorContent
            }
            
            if (act.name === null || act.name === '') {
                this.$Message.warning('请输入名称')
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }
            
            company.editCompanyAgreement(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '编辑成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.$emit('refresh')
                        this.showModal = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '编辑失败',
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
