<template>
    <div class="water-cleaner-key">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                直饮机解锁状态
            </p>

            <div slot="extra">
                <i-switch v-model="openReal" @on-change="changeReal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </div>

            <Form :model="realInfo" :label-width="100">
                <Row>
                    <Col span="10" push="2">
                        <FormItem label="激活状态">
                            {{ realInfo.is_activation | activateState }}
                        </FormItem>

                        <FormItem label="解锁状态">
                            {{ realInfo.is_lock | lockState }}
                        </FormItem>

                        <FormItem label="在线状态">
                            {{ realInfo.is_online | onlineState }}
                        </FormItem>

                          <FormItem label="主板序列号">
                            {{ realInfo.mainboard_serial_number }}
                        </FormItem>
                    </Col>

                    <Col span="10">
                        <FormItem label="激活日期">
                            {{ realInfo.active_time | displayDateTime }}
                        </FormItem>

                        <FormItem label="使用截止日期">
                            {{ realInfo.device_deadline_date | displayDateTime }}
                        </FormItem>

                        <FormItem label="日志时间">
                            {{ realInfo.log_time | displayDateTime }}
                        </FormItem>

                        <FormItem label="刷新次数">
                            {{ counter }}
                        </FormItem>
                    </Col>
                </Row>
               
            </Form>
        </Card>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import moment from 'moment'

export default {
    name: 'water-cleaner-key',
    props: {
        serial_number: { type: String, require: true }
    },
    data () {
        return {
            counter: 0,
            intervalId1: 0,
            openReal: false,
            realInfo: {} // 实时状态
        }
    },
    filters: {
        displayDateTime: function (date) {
            if (date === null || date === '' || date === undefined) {
                return ''
            } else {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        activateState: function (isActivate) {
            if (isActivate === '1') {
                return '已激活'
            } else {
                return '未激活'
            }
        },
        lockState: function (isUnlock) {
            if (isUnlock === '1') {
                return '已解锁'
            } else {
                return '未解锁'
            }
        },
        onlineState: function (online) {
            if (online === '1') {
                return '在线'
            } else { 
                return '离线'
            }
        }
    },
    methods: {
        init () {
            this.counter = 0
            this.openReal = true
        },

        // 获取直饮机解锁状态
        readKeyStatus () {
            let vm = this
            this.counter += 1

            equipment.getWaterCleanerLockStatus(this.serial_number).then(res => {
                if (res.status === 0) {
                    vm.realInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取实时状态出错',
                        desc: res.message
                    })
                }
            })
        },

        changeReal (status) {
            if (status === true) {
                this.intervalId1 = setInterval(() => {
                    this.readKeyStatus()
                }, 10000)
            } else {
                clearInterval(this.intervalId1)
            }
        }
    },
    mounted: function () {
        this.init()
        this.changeReal(true)
    },
    beforeDestroy: function () {
        clearInterval(this.intervalId1)
        this.openReal = false
    }
}
</script>
