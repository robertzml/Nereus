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
                        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                    </Upload>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import config from '../../utility/config.js'

export default {
    name: 'equipment-upload',
    data () {
        return {
            header: {
                
            },
            uploadUrl: config.apihost + 't_store/addStoreByCompanyTxt/uploadTxt'
        }
    },
    methods: {
        handleSuccess (res, file) {
            this.$Message.info(res.message)
        },

        handleError (err, file) {
            console.log(err)
            this.$Message.error('上传文件失败')
        }
    }
}
</script>

