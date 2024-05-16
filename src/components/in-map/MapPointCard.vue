<template>
    <div class="map-point-card" >
        <LineCard :desc="'Идентификатор'" :value="props.card.id" />
        <LineCard :desc="'Описание'" :value="props.card.desc" />
        <LineCard :desc="'Адрес'" :value="props.card.place" />
    </div>
</template>

<script setup lang="ts">
import LineCard from '../common/LineCard.vue'
const props = defineProps(['card'])

console.log(props.card)
</script>

<style lang="scss" />