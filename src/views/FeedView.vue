<script>
    import RequestTemplate from '../components/RequestTemplate.vue'
    import NotAuthAlert from '../components/NotAuthAlert.vue'
    import {useUserStore} from '../stores/user'
    import api from "@/api"
    import DeleteAlert from '../components/DeleteAlert.vue'

    export default {

        components: { NotAuthAlert, RequestTemplate, DeleteAlert },

        data() {
            return {
                token: "",
                unauthorizedAlert: false,
                deleteAlert: false,
                requests: [],
                requestToDeleteId: null,
                isExpanded: false
            }
        },
        
        
        // watch puts a listener to a ref in DOM
        watch: {
            requests: {
                handler() {
                    // nextTick() runs after the DOM gets updated
                    this.$nextTick(() => {
                        const wrapper = this.$refs.templateWrapper
                        if (wrapper) {
                            // checks if the height of requests' elements has expanded
                            this.isExpanded = wrapper.scrollHeight > 700
                        }
                    });
                },
                immediate: true,
                deep: true,
            },
        },

        computed: {
            userStore() {
                return useUserStore()
            }
        },

        methods: {
            handleNoToken() {
                this.unauthorizedAlert = true
            },
            showDeleteAlert(id) {
                this.deleteAlert = true
                this.requestToDeleteId = id
            },
            async fetchRequests() {
                try{
                    const response = await api.get('request/requests/')
                    this.requests = response.data
                    console.log(this.requests)
                } catch(error) {
                    console.error('Fetching error:', error)
                }
            },
            async deleteRequest(requestToDeleteId) {
                console.log('Delete request')
                const url = 'request/requests/' + requestToDeleteId + "/"
                try {
                    await api.delete(url)
                    this.deleteAlert = false;
                    this.requestToDeleteId = null;
                    await this.fetchRequests()
                } catch(error) {
                    console.log('Delete error:', error)
                }
            }
        },

        async mounted() {
            this.fetchRequests()
        },

        created() {

            this.userStore.initStore()

            this.token = this.userStore.user.access

            if(this.token) {
                api.defaults.headers.common["Authorization"] = "Token " + this.token
            } else {
                api.defaults.headers.common["Authorization"] = ""
                this.handleNoToken()
            }

        },
    }
</script>

<template>

    <NotAuthAlert
      :visible="unauthorizedAlert"
      title="Not Authorized!"
      message="You need to create an account or log in to have access on the app!"
      @close="unauthorizedAlert = false"
    />
    
    <DeleteAlert
      :visible="deleteAlert"
      title="Be careful!!"
      message="Are you sure that you want to delete the request?"
      :onConfirm="() => deleteRequest(this.requestToDeleteId)"
      @close="deleteAlert = false"
    />


    <div :class="[isExpanded ? 'h-auto' : 'h-[50.5rem]']" class=" flex justify-center items-left h-AUTO">
        <div >
            <div class="pl-20 pr-30 pt-5 pb-18 w-[100rem] space-y-4 bg-white border border-gray-200 rounded-lg">
                <p class="text-xl mb-6 font-bold font-geologica text-blue-700">Requests</p>
                
                <div v-if="requests.length == 0" class="flex items-center justify-center">
                    <p  class="text-xl mb-6 font-bold font-geologica text-blue-700"> There is no available requests</p>
                </div>
                
                <div ref="templateWrapper" class="flex flex-wrap justify-left items-center gap-8">
                    <RequestTemplate
                        v-for="request in requests"
                        v-if="requests.length != 0"
                        :key="request.id"
                        :requestData="request"
                        :onDeleteButton="() => showDeleteAlert(request.id)"
                        :manualFetching="fetchRequests"
                    />
                </div>

            </div>
        </div>

    </div>
</template>