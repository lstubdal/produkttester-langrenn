<template>
    <header class="header">
        <div :class="`header--waxTech ${page === 'tester' ? 'header--tester' : '' || page === 'tests' ? 'header--tests' : '' || page === 'previousTest'  ? 'header--previousTest' : ''}`">
            <h2 v-if="page === 'waxTech'">Smører</h2>
            <h2 v-if="page === 'tester'">Tester</h2>
            <h2 v-if="page === 'tests'">Tidligere tester</h2>

            <RouterLink :to="{name: 'findTests'}" v-if="page === 'previousTest'" class="header--previousTest-back">
                <svg width="60" height="50" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M46.8749 20C46.8749 19.6685 46.7102 19.3505 46.4172 19.1161C46.1242 18.8817 45.7268 18.75 45.3124 18.75H8.45924L18.2936 10.885C18.4389 10.7688 18.5541 10.6308 18.6327 10.479C18.7114 10.3271 18.7518 10.1644 18.7518 9.99999C18.7518 9.83563 18.7114 9.67288 18.6327 9.52103C18.5541 9.36918 18.4389 9.23121 18.2936 9.11499C18.1483 8.99877 17.9759 8.90658 17.7861 8.84368C17.5963 8.78079 17.3928 8.74841 17.1874 8.74841C16.9819 8.74841 16.7785 8.78079 16.5887 8.84368C16.3989 8.90658 16.2264 8.99877 16.0811 9.11499L3.58111 19.115C3.4356 19.2311 3.32016 19.369 3.24139 19.5209C3.16262 19.6728 3.12207 19.8356 3.12207 20C3.12207 20.1644 3.16262 20.3272 3.24139 20.4791C3.32016 20.6309 3.4356 20.7689 3.58111 20.885L16.0811 30.885C16.2264 31.0012 16.3989 31.0934 16.5887 31.1563C16.7785 31.2192 16.9819 31.2516 17.1874 31.2516C17.3928 31.2516 17.5963 31.2192 17.7861 31.1563C17.9759 31.0934 18.1483 31.0012 18.2936 30.885C18.4389 30.7688 18.5541 30.6308 18.6327 30.4789C18.7114 30.3271 18.7518 30.1643 18.7518 30C18.7518 29.8356 18.7114 29.6729 18.6327 29.521C18.5541 29.3692 18.4389 29.2312 18.2936 29.115L8.45924 21.25H45.3124C45.7268 21.25 46.1242 21.1183 46.4172 20.8839C46.7102 20.6495 46.8749 20.3315 46.8749 20Z" fill="#7B0303"/>
                </svg>
            </RouterLink>
     
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
        padding: var(--padding-small);
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
        text-decoration: none;
        color: var(--second-color);
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    @media screen and (max-width: 800px) {
        .header--previousTest {
            border:none;
        }
    }
</style>