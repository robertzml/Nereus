<template>
    <div id="equipment-status">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                设备实时状态查询
            </p>
            <a href="#" slot="extra" @click.prevent="loadStatus">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <span>查询类型：</span>
                <Select v-model="sType" style="width:300px" placeholder="选择类型">
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
               
                <span>设备类型</span>
                <Select v-model="sProductType" style="width:300px" placeholder="选择类型">
                    <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <Button type="primary" @click="loadStatus">查询</Button>
            </div>

            <div v-if="sProductType === 1">
                <water-heater-status-list :itemList="statusData"></water-heater-status-list>
            </div>
            <div v-else-if="sProductType === 2">
                <water-cleaner-status-list :itemList="statusData"></water-cleaner-status-list>
            </div>
        </Card>
    </div>
</template>


<script>
/** 厂商账单 */
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import product from '@/controllers/product.js'
import waterHeaterStatusList from '../components/bill/waterheater-status-list.vue'
import waterCleanerStatusList from '../components/bill/watercleaner-status-list.vue'

export default {
    name: 'equipment-status',
    components: {
        waterHeaterStatusList,
        waterCleanerStatusList
    },
    data () {
        return {
            roleType: 0,
            typeList: [
                { id: 1, name: '锁定设备' },
                { id: 2, name: '离线设备' },
                { id: 3, name: '待维护设备' },
                { id: 4, name: '故障设备' }
            ],
            sType: 0,
            sProductType: 0,
            productTypeList: [
                { id: 1, name: '热水器' },
                { id: 2, name: '直饮机' }
            ],
            statusData: []
        }
    },
    computed: {
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
        },

        loadStatus () {
            if (this.sType === 0) {
                this.$Message.warning({
                    content: '请选择查询类型',
                    duration: 2
                })
                return
            }
           
            if (this.sProductType === 0) {
                 this.$Message.warning({
                    content: '请选择设备类型',
                    duration: 2
                })
                return
            }
          
            let vm = this
           
            bill.getEquipmentStatus(this.sType, this.sProductType).then(res => {
                if (res.status === 0) {
                    vm.statusData = res.entities
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

<style scoped>
</style>
