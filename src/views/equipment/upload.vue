<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                     <p slot="title">
                        <Icon type="grid"></Icon>
                        上传设备数据
                    </p>

                    <Upload name="file" 
                        :action="uploadUrl" 
                        :headers="header" 
                        accept=".txt" 
                        :format="['txt']" 
                        :show-upload-list="false" 
                        :withCredentials="true"
                        :on-success="handleSuccess"
                        :on-error="handleError">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传设备文件</Button>
                    </Upload>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from '@/utility/config.js'

export default {
    name: 'equipment-upload',
    data () {
        return {
            header: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            uploadUrl: config.apihost + 't_store/addStoreByCompanyTxt/uploadTxt'
        }
    },
    methods: {
        handleSuccess (res, file) {
            if (res.status === 0) {
                this.$Notice.success({
                    title: '上传成功',
                    desc: res.message
                })
            } else {
                this.$Notice.error({
                    title: '上传失败',
                    duration: 0,
                    desc: res.message
                })
            }
        },

        handleError (err, file) {
            console.log(err)
            this.$Notice.error({
                title: '上传文件出错',
                duration: 0,
                desc: err
            })
            // this.$Message.error('上传文件失败')
        }
    }
}
</script>

