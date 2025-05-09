<template>
  <VDataTable
    :items="tableData"
    :loading="isFetching"
    :search="searchValue"
    :filter-keys="['Title']"
    :headers
    items-per-page="10"
  >
    <template #top>
      <VToolbar class="px-4">
        <VResponsive max-width="320" class="pt-2">
          <VTextField
            v-model="searchValue"
            prepend-inner-icon="mdi-magnify"
            label="جست‌وجو"
            placeholder="جست‌وجو در عنوان محصولات"
            hide-details
            :disabled="isFetching"
          />
        </VResponsive>
        <template #append>
          <VBtn
            icon
            size="x-small"
            rounded="large"
            variant="text"
            :disabled="isFetching"
            @click="$emit('add')"
          >
            <VIcon>mdi-plus</VIcon>
            <VTooltip activator="parent" text="افزودن" location="top" />
          </VBtn>
          <VBtn
            icon
            size="x-small"
            rounded="large"
            variant="text"
            :disabled="isFetching"
            @click="$emit('refresh')"
          >
            <VIcon>mdi-refresh</VIcon>
            <VTooltip activator="parent" text="بروزرسانی" location="top" />
          </VBtn>
        </template>
      </VToolbar>
    </template>
    <template #item.Price="{ item }">
      {{ item.Price?.toLocaleString() }}
    </template>
    <template #item.Image="{ item }">
      <VCard class="my-2" elevation="2" rounded
        ><VImg :src="item.Image" :lazy-src="item.Image" min-height="96" cover>
          <template #error>
            <VImg
              class="mx-auto"
              min-height="96"
              width="100%"
              src="https://demofree.sirv.com/nope-not-here.jpg"
            ></VImg>
          </template> </VImg
      ></VCard>
    </template>
    <template #item.Id="{ item }">
      <div>
        <VBtn
          icon
          size="x-small"
          rounded="large"
          variant="text"
          @click="$emit('edit', item)"
        >
          <VIcon>mdi-pencil</VIcon>
          <VTooltip activator="parent" text="ویرایش" location="top" />
        </VBtn>
        <VBtn
          icon
          size="x-small"
          rounded="large"
          variant="text"
          @click="$emit('delete', item)"
        >
          <VIcon>mdi-delete</VIcon>
          <VTooltip activator="parent" text="حذف" location="top" />
        </VBtn>
      </div>
    </template>
  </VDataTable>
</template>
<script lang="ts" setup>
interface Props {
  tableData: Product[];
  isFetching?: boolean;
}

withDefaults(defineProps<Props>(), {
  isFetching: false,
});

const emits = defineEmits<{
  delete: [product: Product];
  refresh: [];
  add: [];
  edit: [product: Product];
}>();

const headers = [
  { key: "Image", title: "", sortable: false, minWidth: "130px" },
  { key: "Title", title: "عنوان محصول" },
  { key: "Description", title: "توضیحات", sortable: false },
  { key: "Price", title: "قیمت", sortable: false },
  { key: "Category", title: "دسته‌بندی", sortable: false },
  { key: "Id", title: "اقدام", sortable: false, maxWidth: "80px" },
];

const searchValue = ref<string>("");
</script>
