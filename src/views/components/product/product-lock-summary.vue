<template>
    <div>
        <Table :data="itemList" :columns="columns" stripe border></Table>
    </div>
</template>

<script>
export default {
    name: 'product-lock-summary',
    props: {
        itemList: { type: Array, required: true }
    },
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产品名称',
                    key: 'name'
                },
                {
                    title: '总数量',
                    key: 'total'
                },
                {
                    title: '已解锁的总数量',
                    key: 'total_of_is_unlock'
                },
                {
                    title: '未解锁的总数量',
                    key: 'total_of_is_lock'
                }
            ]
        }
    }
}
</script>
