<template>
  <section :class="`information ${page === 'previousTest' ? 'information--previousTest' : ''}`">
        <div class="information__place">
          <img v-if="page === 'tester'" src="/icons/location.svg" alt="location tag">
          <img v-if="page === 'previousTest'" src="/icons/location-red.svg" alt="location tag">
          <span>{{ test.place }}</span>
        </div>

        <h2 v-if="page === 'tester'">{{ test.name }}</h2>

        <span class="information__temperature">{{ test.temperature }} 
          <img v-if="page === 'tester'" src="/icons/celsius.svg" alt="celsius icon">
          <img v-if="page === 'previousTest'" src="/icons/celsius-red.svg" alt="celsius icon">
        </span>
    </section>
</template>

<script>
    export default {
        props: {
            test: {
                type: Object 
            },

            page: {
                type: String
            }
        }
    }
</script>

<style>
    .information {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-medium);
        font-family: var(--main-font);
        margin-bottom: var(--margin-large);
    }

    .information--previousTest {
        color: var(--second-color);
        margin-bottom: var(--margin-medium);
    }

    .information__place {
        display: flex;
        align-items: center;
    }

    .information__place {
        font-size: 1.3em;
    }

    .information__temperature {
        font-size: 1.8em;
    }

    .information__place span {
        padding-left: var(--padding-small);
    }
</style>