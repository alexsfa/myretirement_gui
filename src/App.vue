<script>
  import {useUserStore} from './stores/user'
  import LogOutAlert from './components/LogOutAlert.vue'
  import axios from 'axios'

  export default {

    components: { LogOutAlert },

    data() {
        return {
            token: "",
            showAlert: false,
            userStore: useUserStore()
        }
    },

    methods: {
      logOut() {
          this.showAlert = true
      },
    },

    // data is run before created and after beforeCreate lifecycle hook
    // so we use the created hook, because our data will be initialized
    created() {
      // we restore the user info to use it on this page
      this.userStore.initStore()

      const token = this.userStore.user.access

      if(this.token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token
      } else {
        axios.defaults.headers.common["Authorization"] = ""
      }
    },

  }


</script>

<template>

  <LogOutAlert
      :visible="showAlert"
      title="Be careful!!"
      message="Are you sure that you want to log out?"
      @close="showAlert = false"
    />

  <nav class="py-8 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between ml-10">
        <div class="menu-left">
          <RouterLink to="/" class="text-2xl font-bold font-geologica text-blue-700">MyRetirement</RouterLink>
        </div>

        <div class="menu-right" v-if="userStore.user.isAuthenticated">
          <div class="grid grid-cols-3 space-x-8  text-blue-700 font-bold items-center">
            <RouterLink to="/profile" class="col-span-1 hover:scale-110 transition-transform ">Profile</RouterLink>
            <RouterLink to="/newrequest" class="col-span-1 hover:scale-110 transition-transform ">New request</RouterLink>
            <button @click='logOut()' class="ml-10 font-bold hover:scale-110 transition-transform " >Log out</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="px-8 py-6 bg-blue-200">
    <RouterView />
  </main>

</template>


