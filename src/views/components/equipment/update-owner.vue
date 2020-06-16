<template>
    <div class="equipment-update-owner">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                更改设备用户信息
            </p>

            <Form :model="ownerInfo" :label-width="100">
                <FormItem label="新设备主人姓名" prop="product_code">
                    <Input v-model="ownerInfo.owner_name"></Input>
                </FormItem>
                <FormItem label="新设备主人电话" prop="name">
                    <Input v-model="ownerInfo.owner_phone"></Input>
                </FormItem>
                <FormItem label="申请状态">
                    <Checkbox v-model="auditing_state">账单未结清</Checkbox>
                </FormItem>

                <FormItem>
                    <Button type="success" @click="saveInfo">修改</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'

export default {
    name: 'equipment-update-owner',
    props: {
        serialNumber: { type: String }
    },
    data () {
        return {
            ownerInfo: {
                serial_number: '',
                owner_name: '',
                owner_phone: '',
                auditing_state: 0
            },
            auditing_state: false
        }
    },
    methods: {
        saveInfo () {
            if (this.ownerInfo.owner_name === '') {
                this.$Message.warning({
                    content: '请输入用户名',
                    duration: 2
                })
                return
            }
            if (this.ownerInfo.owner_phone === '') {
                this.$Message.warning({
                    content: '请输入用户电话',
                    duration: 2
                })
                return
            }

            this.ownerInfo.serial_number = this.serialNumber
            if (this.auditing_state) {
                this.ownerInfo.auditing_state = 5
            } else {
                this.ownerInfo.auditing_state = 0
            }

            equipment.updateOwner(this.ownerInfo).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '更新用户成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '更新用户失败',
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>
