<template>
    <div class="agreement-edit-mod">
        <Modal v-model="showModal" :loading="loading" title="编辑协议"  @on-visible-change="changeVisible" @on-ok="submit()" width="800">
            <Form ref="formTrade" :model="agreementInfo" :label-width="150">
                <FormItem label="名称">
                    <Input v-model="agreementInfo.name"  style="width: 300px;"></Input>
                </FormItem>

                <FormItem label="备注">
                    <Input v-model="agreementInfo.remark" style="width: 300px;"></Input>
                </FormItem>
                
                <div ref="editor" style="text-align:left"></div>
            </Form>
        </Modal>
    </div>
</template>

<script>
import E from 'wangeditor'
import company from '@/controllers/company.js'

export default {
    name: 'agreement-edit-mod',
    data () {
        return {
            id: 0,
            agreementInfo: {
                name: '',
                remark: '',
                apply_protocol_template: ''
            },
            editor: null,
            editorContent: '',
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.agreementInfo.tradeInMoney = 0
            this.agreementInfo.tradeInCoupon = 0
            this.agreementInfo.remark = ''

            this.editor = new E(this.$refs.editor)
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            this.editor.create()

            if (this.id !== 0) {
                this.getAgreement(this.id)
            }
        },

        getAgreement (id) {
            let vm = this

            company.findAgreementById(id).then(res => {
                if (res.status === 0) {
                    vm.agreementInfo = res.entity
                    vm.editor.txt.html(res.entity.apply_protocol_template)
                } else {
                    this.$Notice.error({
                        title: '获取协议信息失败',
                        desc: res.message
                    })
                }
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

            if (this.id === 0) {
                company.addAgreement(act).then(res => {
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
            } else {
                company.editAgreement(act).then(res => {
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
}
</script>
