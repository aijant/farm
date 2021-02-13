<template>
  <div id="q-app">
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        :data="currData"
        :columns="columns"
        row-key="name"
        binary-state-sort
      >
        <template v-slot:top>
          <q-btn
            dense
            color="teal"
            label="Add"
            @click="show_dialog = true"
            no-caps
          ></q-btn>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Add new cow!</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <q-input v-model="editedItem.name" label="name"></q-input>
                    <q-input v-model="editedItem.email" label="email"></q-input>
                    <q-input
                      v-model="editedItem.phone"
                      prefix="+(996)"
                      label="phone"
                    ></q-input>
                  </div>
                </q-card-section>
              </q-card>
              <q-card-actions align="right">
                <q-btn
                  label="OK"
                  color="primary"
                  v-close-popup
                  @click="addRow"
                ></q-btn>
              </q-card-actions>
            </q-dialog>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name">
                <q-input
                  v-model="props.row.name"
                  dense
                  autofocus
                  counter
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
              <q-popup-edit
                v-model="props.row.email"
                title="Update email"
                buttons
              >
                <q-input
                  type="number"
                  v-model="props.row.email"
                  dense
                  autofocus
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="phone" :props="props">
              <div class="text-pre-wrap">{{ props.row.phone }}</div>
              <q-popup-edit v-model="props.row.phone">
                <q-input
                  type="textarea"
                  v-model="props.row.phone"
                  dense
                  autofocus
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                color="positive"
                label="Update"
                @click="editItem(props.row)"
                size="sm"
                no-caps
              ></q-btn>
              <q-btn
                color="negative"
                label="Delete"
                @click="deleteItem(props.row)"
                size="sm"
                no-caps
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async addRow() {
      console.log("Hey");
      if (this.editedIndex > -1) {
        // Object.assign(this.currData[this.editedIndex], this.editedItem);
        // Update cow
        await this.$store.dispatch("updateCow", {
          id: this.editedItem.id,
          cow: {
            ...this.editedItem
          }
        });
      } else {
        this.currData.push(this.editedItem);
      }
      this.close();
    },
    deleteItem(item) {
      const index = this.currData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.currData.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.currData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    close() {
      this.show_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  },
  data() {
    return {
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
        phone: ""
      },
      defaultItem: {
        name: "",
        email: "",
        phone: ""
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "email",
          align: "center",
          label: "email",
          field: "email",
          sortable: true
        },
        {
          name: "phone",
          label: "phone",
          field: "phone",
          sortable: true,
          style: "width: 10px"
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions"
        }
      ]
    };
  },
  computed: {
    currData: {
      get() {
        return this.$store.state.listCows.cows;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("loadCows");
  }
};
</script>
