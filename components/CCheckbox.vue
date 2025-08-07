<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()
</script>

<template>
  <label class="checkbox">
    <input
      class="checkbox"
      :name="props.name"
      type="checkbox"
      v-bind="$attrs"
    ><slot /></label>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  font-family:
    'PingFang TC',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: normal;
  color: var(--color-gray-600);

  /* Hide the browser's default checkbox */
  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  &:not(:has(input:checked))::before {
    border: solid 1px #d1d5dc;
  }

  &:has(input:checked)::before {
    content: '✓';
    color: white;
    font-weight: 900;
    text-align: center;
    line-height: 1;
    background-color: #7f73fe;
  }
}
</style>
