<template>
    <div class="history-details">
        <Row>
            <Col span="24">
                <div v-if="this.productTypeId === 1">
                    <water-heater-statis-list :item-list="historyInfo" :show-pager="false"></water-heater-statis-list>
                </div>
                <div v-else-if="this.productTypeId === 2">
                    <water-cleaner-statis-list :item-list="historyInfo" :show-pager="false"></water-cleaner-statis-list>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import waterHeaterStatisList from '../statistic/water-heater-statis-list.vue'
import waterCleanerStatisList from '../statistic/water-cleaner-statis-list.vue'

export default {
    name: 'history-details-mod',
    components: {
        waterHeaterStatisList,
        waterCleanerStatisList
    },
    data () {
        return {
            productTypeId: 0,
            historyInfo: []
        }
    },
    methods: {
        getInfo (productTypeId, serialNumber, startTime, endTime) {
            this.productTypeId = productTypeId
            let vm = this

            if (this.productTypeId === 1) {
                equipment.getHotWaterHistoryStatistic(serialNumber, startTime, endTime).then(res => {
                    if (res.status === 0) {
                        vm.historyInfo = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message,
                            duration: 5
                        })
                    }
                })
            } else if (this.productTypeId === 2) {
                equipment.getWaterCleanerHistoryStatistic(serialNumber, startTime, endTime).then(res => {
                    if (res.status === 0) {
                        vm.historyInfo = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message,
                            duration: 5
                        })
                    }
                })
            }
        }
    }
}
</script>
