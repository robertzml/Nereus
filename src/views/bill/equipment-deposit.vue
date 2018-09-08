<template>
    <div id="equipment-deposit">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备押金
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadDeduct">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel">
                        <span v-if="roleType !== 3">代理商：</span>
                        <Select v-model="sAgent" style="width:300px" placeholder="选择代理商" v-if="roleType !== 3">
                            <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>选择产品类型: </span>
                        <Select v-model="sProductType" style="width:300px" placeholder="选择产品类型">
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime"></DatePicker>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime"></DatePicker>

                        <Button type="primary" @click="loadDeduct">查询</Button>
                    </div>

                    <br />

                    <agent-deduct-list :item-list="deductData"></agent-deduct-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'equipment-deposit',
    data () {
        return {

        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType

            // this.getProductType()
            if (this.roleType === 0 || this.roleType === 1) {
                // this.getAllAgents()
            } else if (this.roleType === 2) {
                // this.getAgentCompany()
            } else if (this.roleType === 3) {
                this.sAgent = this.$store.state.user.companyId
            }
        }
    },
    created: function () {
        this.init()
    }
}
</script>
