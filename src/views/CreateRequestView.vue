<template>
    <div class=" flex justify-center items-center h-[50.5rem]">
        <div >
            <div class="pl-20 pr-40 py-20  bg-white border border-gray-200 rounded-lg">
                <p class="mb-10 text-2xl text-blue-500 font-bold"> Create a new request!</p>
                <form class="space-y-6">
                    <div>
                        <label class="text-blue-500 font-bold">Title</label><br>
                        <input type="text" placeholder="Your request's title" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900 block   mb-2">
                    </div>

                    <div>
                        <label class="text-blue-500 font-bold">Description</label><br>
                        <input type="text" placeholder="Your request's description" class="w-[40rem] mt-2 py-4 px-6 border border-gray-200 rounded-lg text-blue-900">
                    </div>

                    <div>
                        <button class="py-4 mt-2 px-6 bg-blue-500 text-white rounded-lg font-bold">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>