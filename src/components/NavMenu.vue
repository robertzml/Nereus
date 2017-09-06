<<template>
    <div class="navmenu">
        <b-btn block v-b-toggle.accordion1 variant="primary">系统用户管理</b-btn>
        <b-collapse id="accordion1" visible accordion="my-accordion">
            <b-card>
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <router-link :to="{ name: 'hello' }" class="nav-link">测试</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'role' }" class="nav-link">角色管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'member' }" class="nav-link">用户管理</router-link>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion2 variant="primary">厂家管理</b-btn>
        <b-collapse id="accordion2" accordion="my-accordion">
            <b-card>
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <router-link :to="{ name: 'company' }" class="nav-link">厂家管理</router-link>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion3 variant="primary">产品管理</b-btn>
        <b-collapse id="accordion3" accordion="my-accordion">
            <b-card>
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                         <a class="nav-link" href="#">产品类别</a>
                    </li>
                    <li class="nav-item">
                         <router-link :to="{ name: 'product' }" class="nav-link">产品信息</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Another nav item</a>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion4 variant="primary">订单管理</b-btn>
        <b-collapse id="accordion4" accordion="my-accordion">
            <b-card>
                Accordion 3 contents Here
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion4 variant="primary">客户管理</b-btn>
        <b-collapse id="accordion4" accordion="my-accordion">
            <b-card>
                <ul class="nav nav-pills flex-column">
                   <li class="nav-item">
                        <router-link :to="{ name: 'account' }" class="nav-link">用户管理</router-link>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
    </div>
</template>

<<script>
export default {
  name: 'navmenu',
  data () {
      return {
      }
  }
}
</script>

<style scoped>
.navmenu .nav {
    margin-bottom: 20px;
}

.navmenu .nav-item {
    width: 100%;
}

.navmenu .nav-item+.nav-item {
    margin-left: 0;
}

.navmenu .nav-link {
    border-radius: 0;
}
</style>
