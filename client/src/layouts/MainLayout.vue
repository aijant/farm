<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_drop_up"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Farm
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="767"
      :width="250"
      content-class="bg-cyan-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <EssentialLink v-for="link in navs" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.title"
          :icon="nav.icon"
          :label="nav.title"
          :to="nav.to"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          title: "Animals",
          to: "/",
          icon: "eco"
        },
        {
          title: "Cows",
          to: "/cows",
          icon: "eco"
        },
        {
          title: "Sheaps",
          to: "/sheaps",
          icon: "eco"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@media screen and (max-with: 768) {
  q.footer {
    display: none;
  }
}
</style>
