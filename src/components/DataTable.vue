<template>
  <div class="table-comp-wrapper">
    <b-table :data="data">
      <b-table-column v-for="column in columns" :key="column.id" :field="column.field ? column.field : 'No'"
        :label="column.label" v-slot="props">

        <span>{{ props.row[column.field] }}</span>
        <div v-if="column.label === 'Actions'" class="buttons">
          <b-button type="is-primary" size="is-small" @click.prevent="emitEditUser(props.row, props.index)">Edit</b-button> |
          <b-button type="is-danger" size="is-small" @click.prevent="emitDeleteUser(props.index)">Delete</b-button>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
    editAction: Function,
    deleteAction: Function,
  },   
	emits: ['edit-user', 'delete-user'],
  methods: {
		emitEditUser(id) {
			this.$emit('edit-user', id);
		},
		emitDeleteUser(id) {
			this.$emit('delete-user', id);
		}
	}
};
</script>