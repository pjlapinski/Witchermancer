<template lang="pug">
router-link.site-logo(:to='{ name: "Home" }') Witchermancer
</template>

<style scoped lang="scss">
.site-logo {
  @extend .text-center, .decor-none, .h1, .no-select;

  font-family: 'Josefin Sans', sans-serif;
}
</style>
