<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="equipmentInfo" :label-width="80">
                            <FormItem label="序列号">
                                <Input v-model="equipmentInfo.serial_number" readonly></Input>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="equipmentInfo.remark" type="textarea" :rows="4" readonly></Input>
                            </FormItem>

                            <FormItem>
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
import equipment from '../../controllers/equipment.js'

export default {
    name: 'equipment-details',
    data () {
        return {
            equipemntId: 0,
            equipmentInfo: {
                id: 0,
                serial_number: '',
                remark: ''
            }
        }
    },
    methods: {
        getEquipment (id) {
            let vm = this
            equipment.details(id).then(res => {
                vm.equipmentInfo = res.entity
            })
        },

         toIndex () {
            this.$router.push({ name: 'equipment' })
        }
    },
    activated: function () {
        this.equipemntId = this.$route.params.id
        this.getEquipment(this.equipemntId)
    }
}
</script>
