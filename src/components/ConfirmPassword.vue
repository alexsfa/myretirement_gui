<template>
    <div v-if="visible" class="fixed inset-0 bg-blue-200 flex items-center justify-center z-50">
        <div class="bg-white rounded p-6 max-w-xl w-full">
            <h3 class="mb-7 text-3xl text-red-500 font-bold">{{ title }}</h3>
            <p class="mb-3 text-blue-500"><strong>{{ message }}</strong></p>
            <div>
                <input type="password" v-model="form.password" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
            </div>

            <template v-if="errors && errors.length">
                <div class="bg-red-300 text-black font-bold rounded-lg mt-4 p-6">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
            </template>

            <div class=" space-x-2 mt-4 mb-4">
                <button @click="checkPassword()" class="bg-blue-500 py-4 px-7 text-white rounded-lg font-bold  hover:bg-green-400">
                    Enter
                </button>
                <button @click="$emit('close')"  class="bg-blue-500 py-4 px-6 text-white rounded-lg font-bold  hover:bg-red-400">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {useUserStore} from '../stores/user'
    import api from '@/api'

    export default {

        name: 'PasswordAlert',

        props: {
            visible: { type: Boolean, required:true },
            isEditing: { type: Boolean, required: true},
            title: { type: String },
            message: { type: String }
        },

        data() {
            return {
                userStore: useUserStore(),
                form: {
                    password: ''
                },
                errors: []
            }
        },

        methods: {
            submit() {
                this.$emit('submitted', this.form.password)
            },

            async checkPassword() {
                this.userStore.initStore()
                this.errors = []

                if(this.form.password === '') {
                    this.errors.push('Your have not entered a password')
                }

                if (this.errors.length === 0) {
                    try {
                        const response = await api.post('api/user/check-password/', this.form,
                            {
                                headers: {
                                    Authorization: `Token ${this.userStore.user.access}`
                                }
                            }
                        )
                        this.submit()
                        this.form.password = ''
                    } catch (error) {
                        console.error('Password check error:', error)
                        console.log(this.form)
                        this.errors.push('Something went wrong! Please enter your correct password.')
                    }
                }
            },

        }
}
</script>