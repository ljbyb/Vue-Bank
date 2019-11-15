<template>
  <v-card
    class="mx-auto"
    tile
    flat
  >
    <v-toolbar
      color="primary"
      dark
      flat
    >

      <v-toolbar-title>我的</v-toolbar-title>

      <div class="flex-grow-1"></div>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card
      class="mx-auto"
      width="300"
      tile
      flat
    >
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          @click=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>


    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      items: [
        {
          action: 'mdi-ticket',
          title: 'Attractions',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'mdi-silverware-fork-knife',
          title: 'Dining',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' }
          ]
        },
        {
          action: 'mdi-school',
          title: 'Education',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'mdi-run',
          title: 'Family',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'mdi-heart-pulse',
          title: 'Health',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'mdi-content-cut',
          title: 'Office',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'mdi-tag',
          title: 'Promotions',
          items: [
            { title: 'List Item' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
