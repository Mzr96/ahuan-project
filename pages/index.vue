<template>
  <VContainer>
    <ConfirmationModal
      v-model="isConfirmModalVisible"
      :text="computeConfirmationMessage"
      :loading="isDeleting"
      @ok="handleOk"
    />
    <ProductCreateModal
      v-model="isProductModalVisible"
      :loading="isCreating || isUpdating"
      :product
      @create="handleCreate"
      @update="handleUpdate"
    />
    <VCard class="p-4" style="margin: 6px">
      <ProductTable
        :table-data="products"
        :is-fetching
        @delete="handleDelete"
        @refresh="getProducts"
        @add="handleAdd"
        @edit="handleEdit"
      />
    </VCard>
  </VContainer>
</template>
<script lang="ts" setup>
const isProductModalVisible = ref(false);
const isConfirmModalVisible = ref(false);
const product = ref<Product>({
  Id: undefined,
  Title: "",
  Description: "",
  Price: undefined,
  Image: "",
  // This 2 fields are hard coded for testing
  Category: "test",
  C_OR_R: "T",
});

const {
  products,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  isFetching,
  isCreating,
  isUpdating,
  isDeleting,
} = useProduct(product);

const computeConfirmationMessage = computed(
  () => `آیا از حذف ${product.value.Title} اطمینان دارید؟`
);

const resetProduct = () => {
  product.value = {
    Id: undefined,
    Title: "",
    Description: "",
    Price: undefined,
    Image: "",
    Category: "test",
    C_OR_R: "T",
  };
};

const toggleProductModal = () =>
  (isProductModalVisible.value = !isProductModalVisible.value);

const toggleConfirmationModal = () =>
  (isConfirmModalVisible.value = !isConfirmModalVisible.value);

const handleEdit = (editingProduct: Product) => {
  product.value = editingProduct;
  toggleProductModal();
};

const handleAdd = () => {
  resetProduct();
  toggleProductModal();
};

const handleDelete = (deleteProduct: Product) => {
  product.value = { ...deleteProduct };
  toggleConfirmationModal();
};

const handleOk = async () => {
  try {
    await deleteProduct();
    resetProduct();
    getProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
  } finally {
    toggleConfirmationModal();
  }
};

const handleCreate = async (newProduct: Product) => {
  try {
    product.value = newProduct;
    await createProduct();
    getProducts();
    toggleProductModal();
  } catch (error) {
    console.error("Error creating product", error);
  }
};

const handleUpdate = async (updatedProduct: Product) => {
  try {
    product.value = updatedProduct;
    await updateProduct();
    getProducts();
    toggleProductModal();
  } catch (error) {
    console.error("Error creating product", error);
  }
};
</script>
