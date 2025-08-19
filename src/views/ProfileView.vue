<script>
    import DeleteAlert from '../components/DeleteAlert.vue'
    import PasswordAlert from '../components/ConfirmPassword.vue'
    import {useUserStore} from '../stores/user'
    import api from '@/api'

    export default {

        components: { DeleteAlert, PasswordAlert },

        data() {
            return {
                userStore: useUserStore(),
                editing: false,
                form: {
                    email: '',
                    name: '',
                    password: '',
                    age: null,
                    employment_years: null
                },
                errors: [],
                showPasswordAlert: false,
                showDeleteAlert: false,
                emptyFields: []
            }
        },

        methods: {

            getEmptyFields(form) {
                return Object.entries(form).reduce((emptyFields, [key, value]) => {
                    const isEmpty =
                        value === null ||
                        value === undefined ||
                        (typeof value === 'string' && value.trim() === '');

                    if (isEmpty) emptyFields.push(key);
                        return emptyFields;
                    }, []);
            },

            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },

            submitForm(){

                this.errors = []

                if (!this.form.email) {
                    this.form.email = this.userStore.user.email
                }else if (!this.isValidEmail(this.form.email)) {
                    this.errors.push('Please enter a valid email address.')
                }

                if (this.form.password.length < 7) {
                    this.errors.push('You need a larger password')
                }


                if (this.errors.length === 0) {

                    this.emptyFields = this.getEmptyFields(this.form)

                    if(this.emptyFields.length === 0) {
                        api.put('api/user/me/', this.form)
                        .then(response => {
                            if (response.data.message === "User information updated successfully.") {

                                this.form.email = ""
                                this.form.password = ""
                                this.form.name = ""
                                this.form.age = ""
                                this.form.employment_years = ""

                                this.userStore.setUserInfo(response.data.user)
                                this.editing = false

                            } else {
                                console.log('Something went wrong')
                            }
                        }).catch(error => {
                            console.log('error', error)
                        })
                    } else {

                        // filters all the empty fields from the form
                        const filteredForm = Object.fromEntries(
                            Object.entries(this.form).filter(([key, value]) =>
                                value !== null && value !== undefined && !(typeof value === 'string' && value.trim() === '') 
                            )
                        );

                        console.log(filteredForm)

                        if(!filteredForm.isEmpty)
                            api.patch('api/user/me/', filteredForm)
                            .then(response => {
                                if (response.data.message === "User information updated successfully.") {

                                for (let key in filteredForm) {
                                    this.form[key] = "";
                                }

                                this.userStore.setUserInfo(response.data.user);
                                this.editing = false;
                                } else {
                                    console.log('Something went wrong');
                                }
                            })
                            .catch(error => {
                                console.log('error', error);
                            });
                    }
                }
            },

            deletionAlert() {
                this.showDeleteAlert = true
            },
            
            async deleteUser() {
                console.log('Delete user')
                try {
                    await api.delete('api/user/me/')

                    this.userStore.removeToken()

                    this.$router.push('/signup')

                } catch(error) {
                    console.log('Delete error:', error)
                }

            },

            passwordCheck() {
                this.showPasswordAlert = true
            },

            addPasswordtoRequest(password) {
                this.form.password = password
                this.showPasswordAlert = false
                this.editing = true
            }

        }
    }

</script>

<template>

    <PasswordAlert
      :visible="showPasswordAlert"
      :isEditing="editing"
      title="Before we continue!!"
      message="Enter your password to confirm your identity."
      @submitted="addPasswordtoRequest"
      @close="showPasswordAlert = false"
    />

    <DeleteAlert
      :visible="showDeleteAlert"
      title="Be careful!!"
      message="Are you sure that you want to delete your profile?"
      :onConfirm="() => deleteUser()"
      @close="showDeleteAlert = false"
    />

    <div class=" flex justify-center items-center h-[50.6rem]">
        <div >
            <div class="px-20 py-20  bg-white border border-gray-200 rounded-lg">
                <p class="mb-10 text-2xl text-blue-500 font-bold"> Your profile</p>
                    <div v-if="!editing" class="space-y-6">
                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Email</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>{{ userStore.user.email }}</strong></p></div>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Name</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>{{ userStore.user.name }}</strong></p></div>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Age</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>{{ userStore.user.age }}</strong></p></div>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Employment years</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>{{ userStore.user.employment_years }}</strong></p></div>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Role</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <div><p><strong>{{ userStore.user.role }}</strong></p></div>
                        </div>
                    </div>

                    <form v-else @submit.prevent="submitForm" class="space-y-6">

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <!-- We set type="button" to prevent the button from being treated as a submit button inside the form -->
                            <div><p><strong>Email</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <input v-model="form.email" class='border border-blue-300 rounded-lg pl-1.5 pb-0.5' type='email' :placeholder="userStore.user.email"></input>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Name</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <input v-model="form.name" type='text' class='border border-blue-300 rounded-lg pl-1.5 pb-0.5' :placeholder="userStore.user.name"></input>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Age</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <input v-model="form.age" type='text' class='border border-blue-300 rounded-lg pl-1.5 pb-0.5' :placeholder="userStore.user.age"></input>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Employment years</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <input v-model="form.employment_years" type='text' class='border border-blue-300 rounded-lg pl-1.5 pb-0.5' :placeholder="userStore.user.employment_years"></input>
                        </div>

                        <div class="flex items-center text-blue-500 justify-left space-x-4 col-span-4">
                            <div><p><strong>Password</strong></p></div>
                            <div class="w-px h-5 bg-gray-400"></div>
                            <input v-model="form.password" type='password' class='border border-blue-300 rounded-lg pl-1.5 pb-0.5' placeholder="Password"></input>
                        </div>

                        <template v-if="errors && errors.length">
                            <div class="bg-red-300 text-black font-bold rounded-lg p-6">
                                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                            </div>
                        </template>

                    </form>



                    <div class=" space-x-2 mt-6">
                        <button @click="passwordCheck()" class="bg-blue-500 py-4 mt-2 px-8.5 text-white rounded-lg font-bold  hover:bg-orange-400">
                            {{ editing ? 'Cancel' : 'Edit' }}
                        </button>
                        <button v-if="!editing" @click="deletionAlert()" class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-red-400">Delete</button>
                        <button @click="submitForm()" v-if="editing" class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-blue-300">Submit</button>
                    </div>
            </div>
        </div>
    </div>
</template>

