<template>
    <header class="header">
        <div :class="`header--waxTech ${role === 'tester' ? 'header--tester' : ''}`">
            <h2 v-if="role === 'waxTech'">Smører</h2>
            <h2 v-else>Tester</h2>
            <img src="/icons/hamburger-dark.svg" alt="hamburgermenu">
        </div>
    </header>
</template>

<script>
    export default {
        props: {
            role: {
                type: String
            }
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

    .header--waxTech {
        color: var(--main-color);
        background-color: var(--light);
        border-bottom: 2px solid;
    }

    .header--tester {
        color: var(--light);
        background-color: var(--main-color);
    }
</style>