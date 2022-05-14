<template>
  <section class="information">
        <div class="information__place">
          <img src="/icons/location.svg" alt="location tag">
          <span>{{ test.place }}</span>
        </div>

        <h2>{{ test.name }}</h2>

        <span class="information__temperature">{{ test.temperature }} 
          <img src="/icons/celsius.svg" alt="celsius icon">
        </span>
    </section>
</template>

<script>
    export default {
        props: {
            test: {
                type: Object 
            }
        }

    }
</script>

<style>
    .information {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-medium);
        margin-bottom: var(--margin-large);
    }

    .information__place {
        display: flex;
        align-items: center;
    }

    .information__temperature, .information__temperature {
        font-size: 1.8em;
    }

    .information__place span {
        padding-left: var(--padding-small);
    }
</style>