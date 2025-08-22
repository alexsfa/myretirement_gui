
<script>
    import api from "@/api"

    export default {

        data() {
            return {
                form: {
                    title: '',
                    description: '',
                },
                errors: [],
                success: false
            }
        },

        methods: {

            submitForm(){
                this.errors = []
                this.success

                if (this.form.title === '') {
                    this.errors.push('Your title is missing')
                }

                if (this.form.description === '') {
                    this.errors.push('Your description is missing')
                }

                if (this.errors.length === 0) {
                    api.post('request/requests/', this.form)
                    .then(response => {
                        if (response.data.message === "Request created successfully") {

                            this.form.title = ""
                            this.form.description = ""

                            this.success = true

                        } else {
                            console.log('Something went wrong')
                        }
                    }).catch(error => {
                        console.log('error', error)
                    })
                }
            }
        }
    }

</script>


<template>
    <div class=" flex justify-center items-center h-[50.5rem]">
        <div >
            <div class="pl-20 pr-40 py-20  bg-white border border-gray-200 rounded-lg">
                <p class="mb-10 text-2xl text-blue-500 font-bold"> Create a new request!</p>
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label class="text-blue-500 font-bold">Title</label><br>
                        <input type="text" v-model=this.form.title placeholder="Your request's title" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900 block   mb-2">
                    </div>

                    <div>
                        <label class="text-blue-500 font-bold">Description</label><br>
                        <input type="text" v-model=this.form.description placeholder="Your request's description" class="w-[40rem] mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                    </div>

                    <template v-if="errors && errors.length">
                        <div class="bg-red-300 text-black font-bold rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <template v-if="success">
                        <div class="bg-green-300 text-black font-bold rounded-lg p-6">
                            <p>You have created a new request</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 mt-2 px-6 bg-blue-500 text-white rounded-lg font-bold">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>