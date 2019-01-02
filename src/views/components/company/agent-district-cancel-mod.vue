<template>
    <div class="agent-district-cancel-mod">
        <Modal v-model="showModal" :loading="loading" title="取消代理商代理区域"  @on-visible-change="changeVisible" :mask-closable="false" @on-ok="submit()" width="800">
            <Form ref="formTrade" :model="districtInfo" :label-width="150">
                <FormItem label="备注">
                    <Input v-model="districtInfo.remark" style="width: 300px;"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import company from '@/controllers/company.js'

export default {
    name: 'agent-district-cancel-mod',
    data () {
        return {
            districtId: 0,
            districtInfo: {
                remark: ''
            },
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.districtInfo.remark = ''
        },

        show (districtId) {
            this.districtId = districtId
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
                id: this.districtId,
                remark: this.districtInfo.remark
            }

            company.cancelAgentDistrict(act).then(res => {
                if (act.remark === '') {
                    this.$Message.warning('请输入备注')
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                    return
                }

                if (res.status === 0) {
                    this.$Notice.success({
                        title: '取消成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.$emit('refresh')
                        this.showModal = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '取消失败',
                        duration: 0,
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
