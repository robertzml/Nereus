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
                    
                    <agent-store-list :item-list="agentStoreData"></agent-store-list>
                </Card>
            </Col>
        </Row>

        <Modal
            v-model="modal1"
            :loading="loading"
            title="添加库存信息"
            @on-ok="saveStore">
            <agent-store-create ref="com1"></agent-store-create>
        </Modal>
    </div>
</template>

<script>
import agentStoreList from '../components/equipment/agent-store-list.vue'
import agentStoreCreate from '../components/equipment/agent-store-create.vue'

export default {
    name: 'agent-store',
    components: {
        agentStoreList,
        agentStoreCreate
    },
    data () {
        return {
            agentStoreData: [],
            modal1: false,
            loading: true
        }
    },
    methods: {
        init () {

        },

        showCreate () {
            this.modal1 = true
        },

        saveStore () {
            let r = this.$refs.com1.saveStore()
            console.log(r)
            if (r) {
                this.$Message.success('This is a info tip')
                this.loading = false
                this.$Modal.remove()
                this.$refs.com1.visible = false
            } else {
                this.$Message.warning('This is a info tip')
                this.loading = true
            }
            /*
            setTimeout(() => {
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
            }, 2000)
            */
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
