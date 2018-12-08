<template>
    <div class="agreement-details">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                标准协议
            </p>
            <Form :model="agreementInfo" :label-width="80">
                <Row>
                    <Col span="10" push="2">
                        <FormItem label="名称">
                            {{ agreementInfo.name }}
                        </FormItem>
                        <FormItem label="备注">
                            {{ agreementInfo.remark }}
                        </FormItem>
                    </Col>
                    <Col span="10" push="2">
                        <FormItem label="创建时间">
                            {{ agreementInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="编辑时间">
                            {{ agreementInfo.update_date | displayDateTime }}
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <br />
            <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
            <Button type="warning" @click="showEdit" style="margin-left: 8px">编辑</Button>
        </Card>

        <br />

        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                协议内容
            </p>
            <div v-html="agreementInfo.apply_protocol_template">
            </div>
        </Card>
       
        <agreement-edit-mod ref="agreementMod" @refresh="getAgreement"></agreement-edit-mod>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import agreementEditMod from '../components/company/agreement-edit-mod.vue'

export default {
    name: 'agreement-details',
    components: {
        agreementEditMod
    },
    data () {
        return {
            agreementId: 0,
            agreementInfo: {}
        }
    },
    methods: {
        init () {
            this.getAgreement()
        },

        getAgreement () {
            let vm = this
           
            company.findAgreementById(this.agreementId).then(res => {
                if (res.status === 0) {
                    vm.agreementInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取协议信息失败',
                        desc: res.message
                    })
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'agreement-index' })
        },

        showEdit () {
            this.$refs.agreementMod.show(this.agreementId)
        }
    },
    mounted: function () {
        this.agreementId = this.$route.params.id
        this.init()
    }
}
</script>
