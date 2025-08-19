<template>
    
    <div class="pl-10 pr-10 pt-5 pb-5 w-[20rem] space-y-4 bg-blue-200 border border-gray-200 rounded-lg">
        <div class=" grid auto-rows-auto space-y-4 gap-x-20 items-center ">

            <div class=" flex items-center space-x-4 row-span-1">
                <div><p><strong>User</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.email }}</strong></p></div>
            </div>


            <div class=" flex  space-x-4 row-span-1">
                <div><p><strong>Title</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.title }}</strong></p></div>
            </div>

            <div class=" flex space-x-4 row-span-1">
                <div><p><strong>Description</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.description }}</strong></p></div>
            </div>

            <div class=" flex space-x-4 row-span-1">
                <div><p><strong>State</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p :class="stateStyle(requestData.state)"><strong>{{ requestData.state }}</strong></p></div>
            </div>
        </div>

        <div class=" grid auto-rows-auto space-y-4 gap-x-20 items-center ">

            <div class=" flex items-center space-x-4 row-span-1">
                <div><p><strong>Name</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.name }}</strong></p></div>
            </div>


            <div class="flex  space-x-4 row-span-1">
                <div><p><strong>Age</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.age }}</strong></p></div>
            </div>

            <div class="flex space-x-4 row-span-1">
                <div><p><strong>Employment years</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.employment_years }}</strong></p></div>
            </div>

            <div class="grid auto-rows-auto space-y-2">
                <button v-if="userStore.user.role == 'employee'" @click="changeState('accepted')" class="bg-white w-40 h-11 text-black rounded-2xl font-medium hover:bg-green-400 ">
                    <strong>Accept</strong>
                </button>
                <button v-if="userStore.user.role == 'employee'" @click="changeState('rejected')" class="bg-white w-40 h-11 text-black rounded-2xl font-medium hover:bg-red-400 ">
                    <strong>Reject</strong>
                </button>
                <button @click="deleteFunction()" class="bg-white w-40 h-11 text-black rounded-2xl font-medium hover:bg-red-400 ">
                    <strong>Delete</strong>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import {useUserStore} from '../stores/user'
import api from '@/api'

    export default {
        
        name: 'PostTemplate',

        props: {
            requestData: {
                type: Object,
                required: true
            },
            onDeleteButton: {
                type: Function,
                required: true
            },
            manualFetching: {
                type: Function,
                required: true
            }     
        },
        
        data() {
            return {
                form: {
                    state: ''
                },
                userStore: useUserStore()
            }
        },
        
        methods: {
            deleteFunction() {
                this.onDeleteButton()
            },
            
            stateStyle(state) {
                switch(state) {
                    case 'pending':
                        return 'text-blue-700'
                    case 'accepted':
                        return 'text-green-600'
                    case 'rejected':
                        return 'text-red-500'
                }
            },
            async changeState(stateValue) {
                const url = 'api/request/requests/' + this.requestData.id + "/"
                this.form.state = stateValue
                try {
                    await api.patch(url,this.form)
                    .then(response => {
                        if (response.data.message === "Request information updated successfully.") {
                            this.form.state = ''
                        } else {
                            console.log(response)
                            console.log('Something went wrong');
                        }
                    })
                    await this.manualFetching()
                } catch(error) {
                    console.log('Delete error:', error)
                }
            }
        }
    }


</script>