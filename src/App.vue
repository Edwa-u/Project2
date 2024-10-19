
<template>
  <div>
    <h1>Meme Poster</h1>
    <MemeForm @add-meme="addMeme" />
    <MemeGallery :memes="memes" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Meme } from './types'
import MemeForm from './components/MemeForm.vue'
import MemeGallery from './components/MemeGallery.vue'

const memes = ref<Meme[]>([])

function addMeme(newMeme: Meme) {
  memes.value.push(newMeme)
}
</script>