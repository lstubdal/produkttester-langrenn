<template>
    <header class="header">
        <div v-if="role === 'waxTech'" class="header--waxTech">
            <h2>Smører</h2>
            <img src="/icons/hamburger-dark.svg" alt="hamburgermenu">
        </div>

        <div v-if="role === 'tester'" class="header--tester">
            <h2>Tester</h2>
            <img src="/icons/hamburger-light.svg" alt="hamburgermenu">
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            
            }
        },

        props: {
            role: {
                type: String
            }
        },

        comuted: {
          /*   waxTechDone() {
                this.waxTechDone =  this.$store.getters.getWaxTechStatus;
            }
 */
          
        }
    }
</script>

<style>
    .header--waxTech, .header--tester {
        height: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-small) var(--padding-medium);
    }

    .header--tester {
        color: var(--light);
        background-color: var(--main-color);
    }

    .header--waxTech {
        color: var(--main-color);
        background-color: var(--light);
        border-bottom: 2px solid;
    }
</style>