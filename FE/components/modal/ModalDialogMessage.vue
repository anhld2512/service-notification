<template>
    <dialog ref="my_modal" id="my_modal_1" class="modal">
      <div class="modal-box p-3">
        <div class="flex flex-col items-center p-3">
            <h3 class="font-bold text-lg">{{ title }}</h3>
            <p v-if="message" class="mt-2">{{ message }}</p>
        </div>
        <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button @click="closeDialog" class="btn btn-sm">Close</button>
        </form>
        </div>
      </div>
    </dialog>
  </template>
<script setup>
const title = ref('');
const message = ref('');
const my_modal = ref(null);

const openDialog = (newTitle, newMessage) => {
  title.value = newTitle;
  message.value = newMessage;
  my_modal.value.showModal();
};

const closeDialog = () => {
  my_modal.value.close();
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style lang="scss" scoped>

</style>