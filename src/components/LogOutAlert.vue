<template>
  <div v-if="visible" class="fixed inset-0 bg-blue-200 flex items-center justify-center z-50">
    <div class="bg-white rounded p-6 max-w-sm w-full">
        <h3 class="mb-7 text-3xl text-red-500 font-bold">{{ title }}</h3>
        <p class="mb-3"><strong>{{ message }}</strong></p>
        <div class=" space-x-2 mt-4 mb-4">
                <button @click="LogOut(); $emit('close')"  class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-green-400">
                    Log out
                </button>
                <button @click="$emit('close')"  class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-red-400">
                    Cancel
                </button>
        </div>
    </div>
  </div>
</template>

<script>
    import {useUserStore} from '../stores/user'

    export default {

        name: 'LogOutAlert',

        props: {
            visible: { type: Boolean, required:true },
            title: { type: String },
            message: { type: String }
        },

        data() {
            return {
                userStore: useUserStore()
            }
        },

        methods: {
                LogOut() {
                    this.userStore.initStore()
                    this.userStore.removeToken()
                    this.$router.push('/login')
                }
            }

    }
</script>