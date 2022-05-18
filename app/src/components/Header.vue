<template>
    <header class="header">
        <div :class="`header--waxTech ${page === 'tester' ? 'header--tester' : '' || page === 'tests' ? 'header--tests' : '' || page === 'previousTest' ? 'header--previousTest' : ''}`">
            <h2 v-if="page === 'waxTech'">Smører</h2>
            <h2 v-if="page === 'tester'">Tester</h2>
            <h2 v-if="page === 'tests'">Tidligere tester</h2>

            <div v-if="page === 'previousTest'" class="header--previousTest-back">
                <img src="/icons/back.svg" alt="back arrow">
                <RouterLink :to="{name: 'home'}" class="header--previousTest-link">Tilbake</RouterLink>
            </div>
            
            <Hamburger :page="page" />
        </div>
    </header>
</template>

<script>
    import Hamburger from '../components/Hamburger.vue';

    export default {
        components: {
            Hamburger
        },

        props: {
            page: {
                type: String
            }
        }
    }
</script>

<style>
    .header--waxTech, .header--tester, .header--tests, .header--previousTest {
        width: 100vw;
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding-small) var(--padding-medium);
        font-family: var(--main-font);
    }

    .header--waxTech {
        color: var(--main-color);
        background-color: var(--light);
        border-bottom: 2px solid;
    }

    .header--tester {
        color: var(--light);
        background-color: var(--main-color);
    }

    .header--tests, .header--previousTest {
        color: var(--second-color);
        background-color: var(--light);
    }

    .header--previousTest-back {
        width: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header--previousTest-link {
        text-decoration: none;
        color: var(--second-color);
    }
</style>