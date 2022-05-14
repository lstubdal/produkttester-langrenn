<template>
  <div class="banner">
      <div class="banner__line"></div>
      <h3 class="banner__title">{{ bannerTitle }}</h3>
      <div class="banner__line"></div>
  </div>
</template>

<script>
    export default {
        props: {
            bannerTitle: {
                type: String
            }
        }

    }
</script>

<style>
    .banner {
        display: flex;
        align-items: center;
    }

    .banner__title {
        font-size: 1.5em;
        background-color: var(--light);
        padding: 1% var(--padding-xlarge);
        border-radius: 6px;
        border: 2px solid var(--main-color);
    }

    .banner__line {
        width: 100px;
        border: 1px solid var(--main-color);
        background-color: var(--main-color) ;
    }
</style>