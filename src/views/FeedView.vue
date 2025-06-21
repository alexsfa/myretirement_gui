<script>
  import NotAuthAlert from '../components/NotAuthAlert.vue'
  import {useUserStore} from '../stores/user'
  import axios from 'axios'

export default {

    components: { NotAuthAlert },

    data() {
        return {
            token: "",
            showAlert: false
        }
    },

    computed: {
        userStore() {
            return useUserStore()
        }
    },

    methods: {
        handleNoToken() {
            this.showAlert = true
        }
    },

    created() {

        this.userStore.initStore()

        this.token = this.userStore.user.access

        if(this.token) {
            axios.defaults.headers.common["Authorization"] = "Token " + this.token
        } else {
            axios.defaults.headers.common["Authorization"] = ""
            this.handleNoToken()
        }

    },
}


</script>

<template>

    <NotAuthAlert
      :visible="showAlert"
      title="Not Authorized!"
      message="You need to create an account or log in to have access on the app!"
      @close="showAlert = false"
    />

    <div class=" flex justify-center items-left h-[50.5rem]">
        <div >
            <div class="pl-20 pr-30 pt-5 pb-18 space-y-4 bg-white border border-gray-200 rounded-lg">
                <p class="text-xl mb-6 font-bold font-geologica text-blue-700">Requests</p>
                <div class="p-4 w-full grid grid-rows-2 gap-y-8 divide-y bg-blue-200 rounded-lg ">
                    <div class=" grid grid-cols-12 gap-y-4 gap-x-20 items-center ">

                        <div class=" flex items-center space-x-4 col-span-2">
                            <div><p><strong>User</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>alex@gmail.com</strong></p></div>
                        </div>


                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Title</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>My retirement request</strong></p></div>
                        </div>

                        <div class="p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Description</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>My request description</strong></p></div>
                        </div>

                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-2">
                            <div><p><strong>State</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>Rejected</strong></p></div>
                        </div>
                    </div>

                    <div class=" grid grid-cols-12  gap-y-4 gap-x-20 items-center ">

                        <div class=" p-4 flex items-center space-x-4 col-span-2">
                            <div><p><strong>Name</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>Alex</strong></p></div>
                        </div>


                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Age</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>60</strong></p></div>
                        </div>

                        <div class="flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Employment years</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>40</strong></p></div>
                        </div>

                        <div class="flex items-center justify-center space-x-2 col-span-2">
                            <button class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-orange-400 ">
                                Update
                            </button>
                            <button class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-red-400 ">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div class="p-4 w-full grid grid-rows-2 gap-y-8 divide-y bg-blue-200 rounded-lg ">
                    <div class=" grid grid-cols-12 gap-y-4 gap-x-20 items-center ">

                        <div class="  flex items-center space-x-4 col-span-2">
                            <div><p><strong>User</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>alex@gmail.com</strong></p></div>
                        </div>


                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Title</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>My retirement request</strong></p></div>
                        </div>

                        <div class="p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Description</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>My request description</strong></p></div>
                        </div>

                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-2">
                            <div><p><strong>State</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>Rejected</strong></p></div>
                        </div>
                    </div>

                    <div class=" grid grid-cols-12  gap-y-4 gap-x-20 items-center ">

                        <div class=" p-4 flex items-center space-x-4 col-span-2">
                            <div><p><strong>Name</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>Alex</strong></p></div>
                        </div>


                        <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Age</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>60</strong></p></div>
                        </div>

                        <div class="flex items-center justify-center space-x-4 col-span-4">
                            <div><p><strong>Employment years</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>40</strong></p></div>
                        </div>

                        <div class="flex items-center justify-center space-x-4 col-span-2">
                            <button class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-orange-400 ">
                                Update
                            </button>
                            <button class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-red-400 ">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>