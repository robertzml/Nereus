<template>
    <div class="agent-store">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商库存
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreate">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getEquipments">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    
                    <div class="filter-panel">
                       
                    </div>
                    
                    
                </Card>
            </Col>
        </Row>

        <Modal
            v-model="modal1"
            title="添加库存信息"
            @on-ok="saveStore">
            <agent-store-create></agent-store-create>
        </Modal>
    </div>
</template>

<script>
import agentStoreCreate from '../components/equipment/agent-store-create.vue'

export default {
    name: 'agent-store',
    components: {
        agentStoreCreate
    },
    data () {
        return {
            modal1: false
        }
    },
    methods: {
        init () {

        },

        showCreate () {
            this.modal1 = true
        },

        saveStore () {

        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
