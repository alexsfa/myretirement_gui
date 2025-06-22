<template>
    
    <div class="pl-20 pr-30 pt-5 pb-5 space-y-4 bg-blue-200 border border-gray-200 rounded-lg">
        <div class=" grid grid-cols-12 gap-y-4 gap-x-20 items-center ">

            <div class=" flex items-center space-x-4 col-span-2">
                <div><p><strong>User</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.email }}</strong></p></div>
            </div>


            <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                <div><p><strong>Title</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.title }}</strong></p></div>
            </div>

            <div class="p-4 flex items-center justify-center space-x-4 col-span-4">
                <div><p><strong>Description</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.description }}</strong></p></div>
            </div>

            <div class=" p-4 flex items-center justify-center space-x-4 col-span-2">
                <div><p><strong>State</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.state }}</strong></p></div>
            </div>
        </div>

        <div class=" grid grid-cols-12  gap-y-4 gap-x-20 items-center ">

            <div class=" p-4 flex items-center space-x-4 col-span-2">
                <div><p><strong>Name</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.name }}</strong></p></div>
            </div>


            <div class=" p-4 flex items-center justify-center space-x-4 col-span-4">
                <div><p><strong>Age</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.age }}</strong></p></div>
            </div>

            <div class="flex items-center justify-center space-x-4 col-span-4">
                <div><p><strong>Employment years</strong></p></div>
                <div class="w-px h-5 bg-gray-400"></div>
                <div><p><strong>{{ requestData.user.employment_years }}</strong></p></div>
            </div>

            <div class="flex items-center justify-center space-x-2 col-span-2">
                <button class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-orange-400 ">
                    Update
                </button>
                <button @click="deleteFunction()" class="bg-white w-20 h-11 text-black rounded-2xl font-medium hover:bg-red-400 ">
                    Delete
                </button>
            </div>

        </div>
    </div>
</template>

<script>

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
            }
        },
        
        methods: {
            deleteFunction() {
                this.onDeleteButton()
            }
        }
    }


</script>