<template>
    <div>
        <Row>
            <Col span="24">
                    <Form :model="info" :label-width="260">
                    <FormItem label="设备主人钱包金额">
                        {{ info.wallet_amount }}
                    </FormItem>
                    <FormItem label="设备主人钱包优惠券">
                        {{ info.waller_coupon }}
                    </FormItem>

                    <FormItem label="扣款后退还押金金额(若为负数则表示死账金额)" class='imp' style="font-weight: bold; color: #F00;">
                        {{ info.return_equipment_deposit }}
                    </FormItem>
                    <FormItem label="总应付金额">
                        {{ info.equipment_total_unpaid_bill }}
                    </FormItem>

                    <FormItem label="设备押金">
                        {{ info.create_date | displayDateTime }}
                    </FormItem>
                    </Form>
            </Col>
        </Row>        
    </div>
</template>

<script>
import bill from '@/controllers/bill.js'

export default {
    name: 'inactivate-bill-mod',
    data () {
        return {
            info: {}
        }
    },
    methods: {
        getInfo (id) {
            let vm = this           
           
            bill.findInactivateBill(id).then(res => {
                if (res.status === 0) {
                    vm.info = res.entity
                } else {
                    vm.$Message.error(res.message)
                }
            })
        }
    }
}
</script>
