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
       
    </div>
</template>

<script>
import company from '@/controllers/company.js'

export default {
    name: 'agreement-details',
    props: {
    },
    data () {
        return {
            agreementId: 0,
            agreementInfo: {}
        }
    },
    methods: {
        init () {
            this.getAgreement(this.agreementId)
        },

        getAgreement (id) {
            let vm = this
            this.agreementId = id
           
            company.findAgreementById(id).then(res => {
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
        }
    },
    mounted: function () {
        this.agreementId = this.$route.params.id
        this.init()
    }
}
</script>
