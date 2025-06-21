<template>
  <div v-if="visible" class="fixed inset-0 bg-blue-200 flex items-center justify-center z-50">
    <div class="bg-white rounded p-6 max-w-sm w-full">
        <h3 class="mb-10 text-2xl text-blue-500 font-bold">{{ title }}</h3>
        <p class="mb-6"><strong>{{ message }}</strong></p>
        <div class=" space-x-2 mt-8 mb-4">
            <RouterLink to="/login" v-slot="{ navigate: LoginRedirection }" >
                <button @click="LoginRedirection(); $emit('close')" class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-blue-300">
                    Log in
                </button>
            </RouterLink>
            <RouterLink to="/signup" v-slot="{ navigate: SignupRedirection }" >
                <button @click="SignupRedirection(); $emit('close')" class="bg-blue-500 py-4 mt-2 px-6 text-white rounded-lg font-bold  hover:bg-blue-300">
                    Sign up
                </button>
            </RouterLink>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotAuthAlert',
  props: {
    visible: { type: Boolean, required:true },
    title: { type: String },
    message: { type: String }
  },
}
</script>