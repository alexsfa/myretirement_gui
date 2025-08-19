<script>
    import api from '@/api'
    import {useUserStore} from '@/stores/user'

    export default {

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                user: useUserStore(),
                errors: []
            }
        },
        methods: {
            isValidEmail(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
            },

            async submitForm() {
                this.user.initStore()
                this.errors = []

                if(this.form.email === '') {
                    this.errors.push('Your email is missing')
                }

                if(this.form.password === '') {
                    this.errors.push('Your password is missing')
                }

                if (!this.form.email || !this.isValidEmail(this.form.email)) {
                    this.errors.push('Please enter a valid email address.')
                }

                if (this.errors.length === 0) {
                    try {
                        const response = await api.post('api/user/token/', this.form)
                        this.user.setToken(response.data)
                        api.defaults.headers.common["Authorization"] = "Token " + response.data.token

                        const userResponse = await api.get('api/user/me/')
                        this.user.setUserInfo(userResponse.data)
                        this.$router.push('/')
                    } catch (error) {
                        console.error('Login error:', error)
                        this.errors.push('Something went wrong! Please check your credentials and try again.')
                    }
                }
            }
        }
    }


</script>

<template>
    <div class=" flex justify-center items-center h-[50.5rem]">
        <div >
            <div class="pl-20 pr-60 py-20  bg-white border border-gray-200 rounded-lg">
                <p class="mb-10 text-2xl text-blue-500 font-bold"> Log in to your MyRetirement account!</p>
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label class="text-blue-500 font-bold">E-mail</label><br>
                        <input type="email" v-model="form.email" placeholder="Your e-mail address" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                    </div>

                    <div>
                        <label class="text-blue-500 font-bold">Password</label><br>
                        <input type="password" v-model="form.password" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                    </div>

                    <template v-if="errors && errors.length">
                        <div class="bg-red-300 text-black font-bold rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 mt-2 px-6 bg-blue-500 text-white rounded-lg font-bold">Log in</button>
                    </div>
                    <p > Don't have an account? <RouterLink to="/signup" class="text-blue-500">Click here</RouterLink> to sign up!</p>
                </form>
            </div>
        </div>
    </div>
</template>

