<template>
    <div class="equipment-history">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        历史设备列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="search">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel" style="margin-bottom:15px;">
                        <span>设备主人电话：</span>
                        <Input v-model="consumerPhone" style="width: 200px"></Input>

                        <Button type="primary" @click="search">查询</Button>
                    </div>
                    
                    <history-list :item-list="equipmentData"></history-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import historyList from '../components/equipment/history-list.vue'

export default {
    name: 'equipment-history',
    components: {
        historyList
    },
    data () {
        return {
            consumerPhone: '',
            equipmentData: []
        }
    },
    methods: {
        init () {
            
        },
        search () {
            if (this.consumerPhone === '') {
                this.$Message.warning({
                    content: '请输入电话号码',
                    duration: 2
                })
                return
            }

            let vm = this
            equipment.getHistory(this.consumerPhone).then(res => {
                if (res.status === 0) {
                    vm.equipmentData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
