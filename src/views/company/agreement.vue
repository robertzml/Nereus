<template>
    <div class="agreement">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                标准协议
            </p>

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

export default {
    name: 'agreement',
    data () {
        return {
            name: '标准协议',
            editor: null,
            editorContent: ''            
        }
    },
    methods: {
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
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        this.editor.create()
        this.editor.$textElem.attr('contenteditable', false)
    }
}
</script>
