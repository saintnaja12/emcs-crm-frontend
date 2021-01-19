<template>
  <div class="uk-card-header" :class="{'sc-card-header-separator': separator}">
    <slot></slot>
  </div>
</template>

<script>
export default {
    props: {
        separator: Boolean
    }
}
</script>
