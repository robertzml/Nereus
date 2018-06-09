<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    代理商用户信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="accountInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="用户名">
                                <Input v-model="accountInfo.user_name" readonly></Input>
                            </FormItem>
                            <FormItem label="姓名">
                                <Input v-model="accountInfo.name"></Input>
                            </FormItem>
                            <FormItem label="电话" prop="phone">
                                <Input v-model="accountInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="Email">
                                <Input v-model="accountInfo.email"></Input>
                            </FormItem>
                            <FormItem label="所属角色" prop="role_id">
                                 <Select v-model="accountInfo.role_id" :disabled="roleType === 3">
                                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="所属公司" v-if="roleType === 2">
                                <Input readonly v-model="companyName"></Input>
                            </FormItem>
                            <FormItem label="账户状态">
                                <i-switch v-model="accountEnabled" size="large">
                                    <span slot="open">启用</span>
                                    <span slot="close">禁用</span>
                                </i-switch>
                            </FormItem>

                            <FormItem>
                                <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                <Button type="primary" @click="toIndex">返回</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <br />
            </Card>
        </Col>
    </Row>
</template>

<script>
import account from '@/controllers/account.js'
import role from '@/controllers/role.js'
import company from '@/controllers/company.js'
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'account-agent-edit',
    data () {
        return {
            accountId: 0,
            accountInfo: {
                id: 0,
                user_name: '',
                name: '',
                phone: '',
                email: '',
                role_id: 0,
                company_id: 0
            },
            accountEnabled: false,
            roleList: [],
            companyName: '',
            ruleValidate: {
                phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择角色', type: 'number', trigger: 'change' }
                ]
            },
            roleType: '',
            editType: 0
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.accountId = this.$route.params.id

            if (this.$route.params.type !== undefined) {
                this.editType = this.$route.params.type
            } else {
                this.editType = 0
            }

            this.getAccount(this.accountId)
            this.getRoles()
        },

        getAccount () {
            let vm = this

            account.details(this.accountId).then(res => {
                if (res.status === 0) {
                    vm.accountInfo = res.admin
                    vm.accountEnabled = vm.accountInfo.status === 0

                    this.getCompany(vm.accountInfo.company_id)
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        getRoles () {
            let vm = this

            role.list().then(res => {
                if (vm.roleType === 2) {
                    vm.roleList = res.entities.filter(r => r.type === 3)
                } else if (vm.roleType === 3) {
                    vm.roleList = res.entities.filter(r => r.type === 3 && r.role_id !== 8)
                }
            })
        },

        getCompany (companyId) {
            let vm = this

            company.details(companyId).then(res => {
                vm.companyName = res.entity.name
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.accountEnabled) {
                        this.accountInfo.status = 0
                    } else {
                        this.accountInfo.status = 2
                    }
                    account.update(this.accountInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'account-agent-index' })
                    })
                } else {
                    this.$Message.error('输入数据有误')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },

        toIndex () {
            this.$router.push({ name: 'account-agent-index' })
        }
    },
    computed: {
        companyType: function () {
            return nereus.displayCompanyType(this.accountInfo.company_type)
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
