<template>
  <TheModal
    v-if="model"
    v-model="model"
    max-width="800px"
    :title="computeModalTitle"
  >
    <VForm
      ref="form"
      class="px-4"
      validate-on="submit"
      @submit.prevent="handleSubmit"
    >
      <VRow>
        <VCol md="4" sm="6" cols="12">
          <VTextField
            v-model="formModel.Title"
            label="عنوان"
            :rules="[requiredValidator]"
            prepend-inner-icon="mdi-tag-outline"
          />
        </VCol>
        <VCol md="4" sm="6" cols="12">
          <VTextField
            v-model.number="formModel.Price"
            type="number"
            number
            label="قیمت"
            hide-spin-buttons
            :rules="[requiredValidator, (value) => minValueValidator(value, 1)]"
            :hint="computePriceHintMessage"
            prepend-inner-icon="mdi-currency-usd"
          />
        </VCol>
        <VCol md="4" cols="12">
          <VTextField
            v-model="formModel.Image"
            label="تصویر"
            :rules="[
              requiredValidator,
              (value) => maxLengthValidator(value, 50),
            ]"
            prepend-inner-icon="mdi-image-outline"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            v-model="formModel.Description"
            label="توضیحات"
            no-resize
            :rules="[requiredValidator]"
          />
        </VCol>
      </VRow>
      <VRow justify="end" class="pb-4">
        <VBtn
          variant="tonal"
          color="success"
          type="submit"
          class="ml-3"
          :loading
          >تائید</VBtn
        >
        <VBtn variant="tonal" color="error" :loading @click="handleCancel"
          >انصراف</VBtn
        >
      </VRow>
    </VForm>
  </TheModal>
</template>
<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { minValueValidator } from "~/utils/validator";
interface Props {
  loading: boolean;
  product: Product;
}

const model = defineModel<boolean>();

const emits = defineEmits<{
  create: [product: Product];
  update: [product: Product];
}>();
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const formModel = ref<Product>({
  Id: props.product.Id || undefined,
  Title: props.product.Title || "",
  Description: props.product.Description || "",
  Price: props.product.Price || undefined,
  Image: props.product.Image || "",
  // This 2 fields are hard coded for testing
  Category: props.product.Category || "test",
  C_OR_R: props.product.C_OR_R || "T",
});

const form = ref<VForm>();

const computePriceHintMessage = computed(() =>
  formModel.value.Price
    ? `${Number(formModel.value.Price).toLocaleString()} تومان`
    : ""
);
const computeModalTitle = computed(() =>
  formModel.value.Id ? `ویرایش ${props.product.Title}` : "افزودن محصول"
);

// Watch for changes in the product prop
watch(
  () => props.product,
  (newProduct) => {
    formModel.value = {
      ...formModel.value,
      Id: newProduct.Id,
      Title: newProduct.Title,
      Description: newProduct.Description,
      Price: newProduct.Price,
      Image: newProduct.Image,
      Category: newProduct.Category || "test",
      C_OR_R: newProduct.C_OR_R || "T",
    };
  }
);

const handleCancel = () => {
  model.value = false;
};

const handleSubmit = async () => {
  if (!form.value) return;
  const { valid: isValid } = await form.value?.validate();
  if (!isValid) return;
  if (formModel.value.Id) {
    emits("update", formModel.value);
  } else {
    emits("create", formModel.value);
  }
};
</script>
