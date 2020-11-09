<template>
     <v-expansion-panels class="mt">
        <v-expansion-panel :key="i">
          <v-expansion-panel-header>
            Récapitulatif
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
</template>

<script>
export default {
    
}
</script>

<style>
.mt {
  margin-top: 2rem;
}
</style>