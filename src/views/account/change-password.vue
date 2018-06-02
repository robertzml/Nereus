<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    个人中心 - 修改密码
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="passwordInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="原密码" prop="old_password">
                                <Input type="password" v-model="passwordInfo.oldPassword"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input type="password" v-model="passwordInfo.password"></Input>
                            </FormItem>
                            <FormItem label="密码确认" prop="passwordConfirm">
                                <Input type="password" v-model="passwordInfo.passwordConfirm"></Input>
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
import account from '../../controllers/account.js'
import * as nereus from '../../utility/nereus.js'

export default {
    name: 'change-password',
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            }
            callback()
        }

        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.passwordInfo.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
  
        return {
            accountId: 0,
            passwordInfo: {
                accountId: '',
                oldPassword: '',
                password: '',
                passwordConfirm: ''
            },
            ruleValidate: {
                oldPassword: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwordConfirm: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        init () {
            this.accountId = this.$store.state.user.id
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.passwordInfo.accountId = this.accountId
                    account.changePassword(this.passwordInfo).then(res => {
                        if (res.status === 0) {
                            vm.$Message.info(res.message)
                            vm.$router.push({ name: 'account-info' })
                        } else {
                            vm.$Message.error(res.message)
                        }
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
            this.$router.push({ name: 'account-info' })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
