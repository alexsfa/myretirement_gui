<script>
    import elderlyImage from '@/assets/images/elderly_couple_on_laptop.webp'
    import api from '@/api'

    export default {

        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    password: ''
                },
                errors: [],
                elderlyImage,
                success: false
            }
        },

        methods: {
            isValidEmail(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
            },

            submitForm(){
                this.errors = []
                this.success


                if (this.form.email === '') {
                    this.errors.push('Your email is missing')
                }

                if (!this.form.email || !this.isValidEmail(this.form.email)) {
                    this.errors.push('Please enter a valid email address.')
                }

                if (this.form.name === '') {
                    this.errors.push('Your name is missing')
                }

                if (this.form.password === '') {
                    this.errors.push('Your password is missing')
                }

                if (this.form.password.length < 7) {
                    this.errors.push('You need a larger password')
                }

                if (this.errors.length === 0) {
                    api.post('api/user/create/', this.form)
                    .then(response => {
                        if (response.data.message === "User created successfully") {

                            this.form.email = ""
                            this.form.name = ""
                            this.form.password = ""

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
    <div class="max-w-7xl  my-[5.1rem] mx-auto grid grid-cols-2 pl-24">
        <div class="main-left h-full pl-12 pt-12 mr-12 bg-white border border-gray-200 rounded-lg">
            <div class=" px-2 py-12 space-y-6 -mt-10 pb-12 items-center justify-center">
                <div>
                    <p class="text-blue-500 font-geologica font-bold text-xl">
                        MyRetirement app is a place where <br>
                        the citizens can apply for their retirement plan <br>
                        from their comfort of their home!
                    </p>
                </div>
                <div class="text-blue-500 text-xl font-geologica">
                    <p class="pb-4">
                        Our goal is to make the process of applying<br>
                        for a retirement plan, as easy as possible.
                    </p>
                    <p class="pb-4">
                        All we need for you to do is to create a profile<br>
                        with all the required information filled in and<br>
                        submit a request.<br>
                    </p>
                    <p class="pb-6">
                        An employee of ours will review your request <br>
                        and it will approve your retirement.<br>
                    </p>
                    <img :src="elderlyImage" class="w-90 h-45 rounded-lg">
                </div>
            </div>
        </div>

        <div class="main-right w-120 py-14 pl-8 pr-20  bg-white border border-gray-200 rounded-lg">

            <form class="space-y-6 pl-4 pb-8" v-on:submit.prevent="submitForm">
                <div>
                    <label class="text-blue-500 fnt-geologica font-bold">Name</label><br>
                    <input v-model="form.name" type="text" placeholder="Your full name" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                </div>

                <div>
                    <label class="text-blue-500 fnt-geologica font-bold">E-mail</label><br>
                    <input v-model="form.email" type="email" placeholder="Your e-mail address" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg  text-blue-900">
                </div>

                <div>
                    <label class="text-blue-500 fnt-geologica font-bold">Password</label><br>
                    <input v-model="form.password" type="password" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                </div>

                <div>
                    <button class="py-4 px-6 bg-blue-500 text-white font-bold rounded-lg">Sign up</button>
                </div>

                <template v-if="errors && errors.length">
                    <div class="bg-red-300 text-black font-bold rounded-lg p-6">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                </template>

                <template v-if="success">
                    <div class="bg-green-300 text-black font-bold rounded-lg p-6">
                        <p>You have created a new account</p>
                    </div>
                </template>

            </form>
            <p class="pl-4">Already have an account? <RouterLink to="/login" class="text-blue-500">Click here</RouterLink> to log in!</p>
        </div>
    </div>
</template>
