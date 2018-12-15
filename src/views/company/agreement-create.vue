<template>
    <div class="agreement-create">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                平台协议
            </p>
            <Form ref="formTrade" :model="agreementInfo" :label-width="150">
                <FormItem label="名称">
                    <Input v-model="agreementInfo.name"  style="width: 300px;"></Input>
                </FormItem>

                <FormItem label="备注">
                    <Input v-model="agreementInfo.remark" style="width: 300px;"></Input>
                </FormItem>

                <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption">
                </quill-editor>
                <div id="editor-wrapper"></div>

                <FormItem>
                    <Button type="success">保存</Button>
                    <Button type="primary">返回</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import company from '@/controllers/company.js'

export default {
    name: 'agreement-create',
    components: {
        quillEditor
    },
    data () {
        return {
            id: 0,
            agreementInfo: {
                name: '',
                remark: '',
                apply_protocol_template: ''
            },
            content: '<p>example content</p>',
            editorOption: {
                bounds: '#editor-container',
                scrollingContainer: '#editor-container',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['clean']
                    ]}
            },
            showModal: false,
            loading: true
        }
    },
    computed: {
        editor () {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        init () {
            if (this.id !== 0) {
                this.getAgreement(this.id)
            } else {
                this.agreementInfo.name = ''
                this.agreementInfo.remark = ''
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
    },
    mounted: function () {
        console.log('this is my editor, example 2', this.editor)
    }
}
</script>

<style scoped>
#editor-wrapper {
    height: 300px;
    overflow-y: auto;
}
</style>
