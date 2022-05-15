<template>
  <div class="banner">
      <div :class="`banner__line ${bannerPage === 'findTest' ? 'banner__line--tests' : '' || bannerPage === 'previousTest' ? 'banner__line--previousTest' : ''}`"></div>
      <h3 :class="`banner__title ${bannerPage === 'findTest' ? 'banner__title--tests' : '' || bannerPage === 'previousTest' ? 'banner__title--previousTest' : ''}`">{{ bannerTitle }}</h3>
      <div :class="`banner__line ${bannerPage === 'findTest' ? 'banner__line--tests' : '' || bannerPage === 'previousTest' ? 'banner__line--previousTest' : ''}`"></div>
  </div>
</template>

<script>
    export default {
        props: {
            bannerPage: {
                type: String
            },

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
        font-family: var(--main-font);
    }

    .banner__title {
        font-size: 1.5em;
        background-color: var(--light);
        padding: 1% var(--padding-xlarge);
        border: 2px solid var(--main-color);
        border-radius: 6px;
        color: var(--main-color);
    }

    .banner__title--tests {
        font-size: 1.5em;
        background-color: var(--light);
        padding: 1% var(--padding-xlarge);
        border-radius: 6px;
        border: 2px solid var(--second-color);
        color: var(--second-color);
    }

    .banner__title--previousTest {
        background-color: var(--second-color);
        color: var(--light);
        border: 2px solid var(--second-color);
    }

    .banner__line {
        width: 100px;
        border: 1px solid var(--main-color);
        background-color: var(--main-color) ;
    }

    .banner__line--tests, .banner__line--previousTest {
        border: 1px solid var(--second-color);
        background-color: var(--second-color) ;
    }
</style>