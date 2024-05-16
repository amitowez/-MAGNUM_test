<template>
    <div class="desc-line-card">
        <p class="line-card-desc">  {{ props.desc }}</p>
        <p class="line-card-value"> {{ props.value }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['desc','value'])
</script>