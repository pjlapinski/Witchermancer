<template lang="pug">
router-link.site-logo(:to='{ name: "Home" }')
  h1 Witchermancer
</template>

<style scoped lang="scss">
.site-logo {
  @extend .text-center, .decor-none;

  & * {
    font-family: 'Josefin Sans', sans-serif;
  }
}
</style>
