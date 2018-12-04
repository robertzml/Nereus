<template>
    <div class="agreement">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                标准协议
            </p>

            <agreement-list :item-list="agreementData"></agreement-list>

            <span>搜索</span>
            <Input v-model="name"></Input>

            <div ref="editor" style="text-align:left"></div>

            <br />
            <Button type="warning" @click="startEdit">编辑</Button>
            <Button type="default" @click="cancelEdit">取消</Button>
            <Button type="primary" @click="saveEdit">保存</Button>
        </Card>
    </div>
</template>

<script>
// 协议管理
import E from 'wangeditor'
import company from '@/controllers/company.js'
import agreementList from '../components/company/agreement-list.vue'

export default {
    name: 'agreement',
    components: {
        agreementList
    },
    data () {
        return {
            name: '标准协议',
            agreementData: [],
            editor: null,
            editorContent: ''            
        }
    },
    methods: {
        init () {
            this.getAgreements()
        },

        // 获取所有协议模版
        getAgreements () {
            let vm = this

            company.findAllAgreement().then(res => {
                if (res.status === 0) {
                    vm.agreementData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取协议信息失败',
                        desc: res.message
                    })
                }
            })
        },

        startEdit: function () {
            this.editor.$textElem.attr('contenteditable', true)
        },

        cancelEdit: function () {
            this.editor.$textElem.attr('contenteditable', false)
        },

        saveEdit: function () {
            // alert(this.editorContent)
            let vm = this
            let model = {
                name: this.name,
                apply_protocol_template: this.editorContent
            }

            company.addAgreement(model).then(res => {
                vm.$Message.info(res.message)
            })
        }
    },
    mounted () {
        this.init()
        
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        this.editor.create()
        this.editor.$textElem.attr('contenteditable', false)
    }
}
</script>
