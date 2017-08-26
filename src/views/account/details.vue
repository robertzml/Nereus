<template>
    <div>
        <h2>{{ msg }}</h2>
        <h3>{{ accountId }}</h3>
    </div>
</template>


<script>
export default {
  name: 'details',
  data () {
      return {
          msg: 'details',
          accountId: this.$route.params.id
      }
  }
}
</script>