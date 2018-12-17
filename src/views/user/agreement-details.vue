<template>
    <div class="user-agreement-details">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                平台协议
            </p>
            <Form :model="agreementInfo" :label-width="120">
                <Row>
                    <Col span="10" push="2">
                        <FormItem label="购买数量">
                            {{ agreementInfo.apply_equipment_count }}
                        </FormItem>
                        <FormItem label="设备主人省">
                            {{ agreementInfo.owner_address_province }}
                        </FormItem>
                         <FormItem label="设备主人市">
                            {{ agreementInfo.owner_address_city }}
                        </FormItem>
                         <FormItem label="设备主人区">
                            {{ agreementInfo.owner_address_district }}
                        </FormItem>
                         <FormItem label="设备主人详细地址">
                            {{ agreementInfo.owner_address_detail }}
                        </FormItem>
                         <FormItem label="销售大类">
                            {{ agreementInfo.money_type }}
                        </FormItem>
                         <FormItem label="代理商操作日期">
                            {{ agreementInfo.agent_operation_date }}
                        </FormItem>
                    </Col>
                    <Col span="10" push="2">
                        <FormItem label="创建时间">
                            {{ agreementInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="代理商是否同意">
                            {{ agreementInfo.agent_operatier_is_agree }}
                        </FormItem>
                        <FormItem label="代理商操作备注">
                            {{ agreementInfo.agent_operation_remark }}
                        </FormItem>
                        <FormItem label="厂商是否同意">
                            {{ agreementInfo.company_operatier_is_agree }}
                        </FormItem>
                        <FormItem label="厂商操作日期">
                            {{ agreementInfo.company_operation_date }}
                        </FormItem>
                        <FormItem label="厂商操作备注">
                            {{ agreementInfo.company_operation_remark }}
                        </FormItem>
                        <FormItem label="设备是否安装成功">
                            {{ agreementInfo.equipment_install_is_success }}
                        </FormItem>
                        <FormItem label="设备安装确认时间">
                            {{ agreementInfo.equipment_install_result_operation_date }}
                        </FormItem>
                        <FormItem label="设备安装确认备注">
                            {{ agreementInfo.equipment_install_result_operation_remark }}
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
            <div v-html="agreementInfo.owner_protocol_content">
            </div>
        </Card>
      
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import company from '@/controllers/company.js'

export default {
    name: 'user-agreement-details',
    data () {
        return {
            agreementId: 0,
            agreementInfo: {},
            roleType: 0
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.getAgreement()
        },

        getAgreement () {
            let vm = this
           
            user.findUserAgreementInfo(this.agreementId).then(res => {
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
            this.$router.push({ name: 'user-agreement' })
        }
    },
    mounted: function () {
        this.agreementId = this.$route.params.id
        this.init()
    }
}
</script>
