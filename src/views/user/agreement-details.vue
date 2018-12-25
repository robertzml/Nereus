<template>
    <div class="user-agreement-details">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                平台协议
            </p>
            <Form :model="agreementInfo" :label-width="120">
                <Row>
                    <Col span="7" push="1">
                        <FormItem label="产品名称">
                            {{ agreementInfo.product_name }}
                        </FormItem>
                        <FormItem label="代理公司名称">
                            {{ agreementInfo.agent_company_name }}
                        </FormItem>

                        <FormItem label="app注册电话号码">
                            {{ agreementInfo.consumer_phone }}
                        </FormItem>
                        <FormItem label="是否实名认证通过">
                            {{ agreementInfo.is_realname_auth }}
                        </FormItem>

                        <FormItem label="购买数量">
                            {{ agreementInfo.apply_equipment_count }}
                        </FormItem>
                       
                        <FormItem label="销售大类">
                            {{ agreementInfo.money_type }}
                        </FormItem>

                        <FormItem label="状态">
                            {{ agreementInfo.status | agreementStatus }}
                        </FormItem>
                    </Col>
                    <Col span="8">
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
                        <FormItem label="设备是否安装成功">
                            {{ agreementInfo.equipment_install_is_success | isAgree }}
                        </FormItem>
                        <FormItem label="设备安装确认时间">
                            {{ agreementInfo.equipment_install_result_operation_date }}
                        </FormItem>
                        <FormItem label="设备安装确认备注">
                            {{ agreementInfo.equipment_install_result_operation_remark }}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="厂商是否同意">
                            {{ agreementInfo.company_operatier_is_agree | isAgree }}
                        </FormItem>
                        <FormItem label="厂商操作日期">
                            {{ agreementInfo.company_operation_date }}
                        </FormItem>
                        <FormItem label="厂商操作备注">
                            {{ agreementInfo.company_operation_remark }}
                        </FormItem>

                        <FormItem label="代理商是否同意">
                            {{ agreementInfo.agent_operatier_is_agree | isAgree }}
                        </FormItem>
                        <FormItem label="代理商操作备注">
                            {{ agreementInfo.agent_operation_remark }}
                        </FormItem>
                        <FormItem label="代理商操作日期">
                            {{ agreementInfo.agent_operation_date }}
                        </FormItem>

                        <FormItem label="创建时间">
                            {{ agreementInfo.create_date | displayDateTime }}
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <br />
            <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>

            <Button type="success" v-if="agreementInfo.equipment_install_is_success === 0" @click="showInstallMod" style="margin-left: 8px">安装确认</Button>

            <Button type="success" v-if="agreementInfo.company_operatier_is_agree === 0" @click="showCompanyMod" style="margin-left: 8px">厂商确认</Button>
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

        <Modal
            v-model="modal1"
            title="是否确认安装"
            :loading="loading"
            @on-ok="confirmInstall"
            >
            <Form :model="installInfo" :label-width="150">
                <FormItem label="安装情况">
                    <RadioGroup v-model="installInfo.success">
                        <Radio :label="1">成功</Radio>
                        <Radio :label="-1">不成功</Radio>
                    </RadioGroup>
                </FormItem>
            
                <FormItem label="备注">
                    <Input v-model="installInfo.remark" style="width: 250px;"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal
            v-model="modal2"
            title="厂商是否同意"
            :loading="loading2"
            @on-ok="confirmCompany"
            >
            <Form :model="companyConfirmInfo" :label-width="150">
                <FormItem label="审核情况">
                    <RadioGroup v-model="companyConfirmInfo.success">
                        <Radio :label="1">同意</Radio>
                        <Radio :label="-1">不同意</Radio>
                    </RadioGroup>
                </FormItem>
            
                <FormItem label="备注">
                    <Input v-model="companyConfirmInfo.remark" style="width: 250px;"></Input>
                </FormItem>
            </Form>
        </Modal>
      
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
            roleType: 0,
            modal1: false,
            modal2: false,
            loading: true,
            loading2: true,
            installInfo: {
                success: 1,
                remark: ''
            },
            companyConfirmInfo: {
                success: 1,
                remark: ''
            }
        }
    },
    filters: {
        isAgree (val) {
            if (val === 0) {
                return '待确认'
            } else if (val === 1) {
                return '同意'
            } else if (val === -1) {
                return '不同意'
            } else {
                return ''
            }
        },

        agreementStatus (val) {
            if (val === 0) {
                return '正常'
            } else if (val === 1) {
                return '删除'
            } else if (val === 3) {
                return '隐藏'
            } else {
                return ''
            }
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
        },

        showInstallMod () {
            this.modal1 = true
        },

        showCompanyMod () {
            this.modal2 = true
        },

        confirmInstall () {
            let act = {
                id: this.agreementId,
                equipment_install_is_success: this.installInfo.success,
                equipment_install_result_operation_remark: this.installInfo.remark
            }

            user.equipmentIsInstall(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '确认成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.getAgreement()
                        this.modal1 = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '确认失败',
                        desc: res.message
                    })
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },

        confirmCompany () {
            let act = {
                id: this.agreementId,
                company_operatier_is_agree: this.companyConfirmInfo.success,
                company_operation_remark: this.companyConfirmInfo.remark
            }

            user.equipmentAgreeApply(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '确认成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.getAgreement()
                        this.modal2 = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '确认失败',
                        desc: res.message
                    })
                    this.loading2 = false
                    this.$nextTick(() => {
                        this.loading2 = true
                    })
                }
            })
        }
    },
    mounted: function () {
        this.agreementId = this.$route.params.id
        this.init()
    }
}
</script>
