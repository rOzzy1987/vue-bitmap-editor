<template>
  <header><h1>Vue3 Bitmap Editor</h1></header>
  <main>
    <BitmapEditor :width="8" :height="8" :bitmap="bitmap" :zoom="zoom" :pen="pen" :tool="tool"/>
    <BitmapEditor :width="8" :height="8" :bitmap="bitmap2" :zoom="zoom" :pen="customPen" :tool="tool"/>
    <BitmapToolbox v-model:tool="tool" v-model:pen="pen" v-model:zoom="zoom"/>
  </main>
  <footer>
  </footer>
</template>

<script lang="ts">
import {PENS, Tool} from '../../src/Bitmap.ts'
import BitmapEditor from '../../src/BitmapEditor.vue'
import BitmapToolbox from '../../src/BitmapToolbox.vue'

export default {
  data(){
    const pen = PENS[0];
    pen.color = -1;
    return {
      bitmap: [
      [0,0,1,1,1,1,0,0],
      [0,1,0,0,0,0,1,0],
      [1,0,0,1,1,0,0,1],
      [0,1,0,0,0,0,1,0],
      [0,1,0,1,1,0,1,0],
      [0,0,1,0,0,1,0,0],
      [0,0,1,1,1,1,0,0],
      [0,0,0,1,1,0,0,0],
    ],
    bitmap2: [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
    customPen: {center: {x:2,y:2}, bitmap: [
      [1,1,1],
      [1,0,1],
      [1,0,0]
    ],
    color: -1},
    pen,
    tool: Tool.PEN,
    zoom: 30
    }
  },
  components: { BitmapEditor, BitmapToolbox }
}
</script>

<style>
:root {
  --vue-bitmap-editor-font-size: 8pt;
  --vue-bitmap-editor-tip-background: white;
  --vue-bitmap-editor-tip-icon-size: 32px;
  --vue-bitmap-editor-tip-icon-color: #08F;
}
</style>
