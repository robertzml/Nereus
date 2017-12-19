<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    编辑设备信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="equipmentInfo" :label-width="80">
                            <FormItem label="序列号">
                                <Input v-model="equipmentInfo.serial_number"></Input>
                            </FormItem>
                            <FormItem label="主板序列号">
                                <Input v-model="equipmentInfo.mainboard_serial_number"></Input>
                            </FormItem>
                            <FormItem label="产品">
                                <Input v-model="equipmentInfo.product_id"></Input>
                            </FormItem>
                            <FormItem label="生产厂商">
                                <Input v-model="equipmentInfo.company_id"></Input>
                            </FormItem>
                            <FormItem label="代理商">
                                <Input v-model="equipmentInfo.agent_id"></Input>
                            </FormItem>

                            <FormItem>
                                <Button type="success" @click="updateEquipment">保存</Button>
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
    name: 'equipment-edit',
    data () {
        return {
            equipmentId: 0,
            equipmentInfo: {
                id: 0,
                serial_number: '',
                mainboard_serial_number: '',
                product_id: 0,
                company_id: 0,
                agent_id: 0
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

        updateEquipment () {
            let vm = this

            equipment.update(this.equipmentInfo).then(res => {
                vm.$Message.info(res.message)
                vm.$router.push({ name: 'equipment-index' })
            })
        },

        toIndex () {
            this.$router.push({ name: 'equipment-index' })
        }
    },
    activated: function () {
        this.equipmentId = this.$route.params.id
        this.getEquipment(this.equipmentId)
    }
}
</script>
