export default (product: Ref<Product>) => {
  const {
    data: products,
    execute: getProducts,
    status: getStatus,
  } = useAPI<Product[]>("/api/foods", {
    default() {
      return [];
    },
    query: { type: "T", cat: "test" },
  });

  const { status: deleteStatus, execute: deleteProduct } = useAPI(
    () => `/api/foods/${product.value.Id}`,
    {
      method: "delete",
      immediate: false,
      watch: false,
    }
  );

  const { status: createStatus, execute: createProduct } = useAPI(
    "/api/foods",
    {
      method: "post",
      immediate: false,
      watch: false,
      body: product,
    }
  );

  const { status: updateStatus, execute: updateProduct } = useAPI(
    () => `/api/foods/${product.value.Id}`,
    {
      method: "put",
      immediate: false,
      watch: false,
      body: product,
    }
  );

  const isDeleting = computed(() => deleteStatus.value === "pending");
  const isCreating = computed(() => createStatus.value === "pending");
  const isUpdating = computed(() => updateStatus.value === "pending");
  const isFetching = computed(() => getStatus.value === "pending");

  return {
    products,
    getProducts,
    isFetching,
    deleteProduct,
    isDeleting,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
  };
};
