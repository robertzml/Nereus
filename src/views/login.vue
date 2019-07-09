<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名和密码</p>
                </div>

                <Modal
                    v-model="modal1"
                    title="请输入验证码"
                    :width="400"
                    @on-ok="inputVerifyCode"
                    >
                    <p>
                        <span>{{ codeTip }}</span>
                        <Input v-model="verifyCode" placeholder="请输入验证码" style="width: 300px" @keyup.enter.native="inputVerifyCode()"></Input>
                    </p>
                </Modal>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'login',
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            modal1: false,
            codeTip: '',
            verifyCode: '',
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions(['login']),

        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let vm = this
                    
                    this.login({ user_name: this.form.userName, password: this.form.password })
                        .then(res => {
                            console.log('login status:' + res.status)
                            if (res.status === 0) {
                                vm.$router.push('/')
                            } else if (res.status === 3) {
                                vm.codeTip = res.message
                                vm.modal1 = true
                            } else {
                                alert(res.message)
                            }
                    })
                }
            })
        },

        inputVerifyCode () {
            if (this.verifyCode === '') {
                alert('请输入验证码')
            }
            
            let vm = this
            
            this.login({ user_name: this.form.userName, password: this.form.password, verifyCode: this.verifyCode })
                .then(res => {
                    console.log('login status:' + res.status)
                    if (res.status === 0) {
                        vm.$router.push('/')
                    } else if (res.status === 5) {
                        alert(res.message)
                        vm.modal1 = true
                    } else {
                        vm.modal1 = false
                        alert(res.message)
                    }
            })
        }
    }
}
</script>

<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 340px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>
