<template>
    <div :class="props.point.iconActive ? 'background-point-active' : 'background-point-passive'" class="background-point centried">
        <div class="up-point" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['point'])
console.log(props.point)
</script>

<style lang="scss"/>
