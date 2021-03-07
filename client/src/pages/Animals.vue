<template>
  <div class="q-pa-md">
    <q-table title="Animals" :data="data" :columns="columns" row-key="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Animal name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "age",
          align: "center",
          label: "Age",
          field: "age",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          field: "status",
          sortable: true
        }
      ]
    };
  },
  computed: {
    data: {
      get() {
        return this.$store.state.listAnimals.animals;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("loadAnimals");
  }
};
</script>
