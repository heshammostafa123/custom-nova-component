<template>
    <div class="avatar-wrapper">
        <img 
            v-if="avatarUrl"
            :src="avatarUrl"
            class="profile-photo"
            :alt="name"
        />
        <div v-else class="nickname">{{ nickname }}</div>
    </div>
</template>

<script>
export default {
    computed: {
        nickname(){
        return this.name.split(" ").map((name) => name.charAt(0)).join("");}
    },
    props: {
        name: {
            type: String,
            default: null,
            required: true,
        },
        avatarUrl: {
            type: String,
            default: null,
            required: true,
        },
    }
};
</script>
