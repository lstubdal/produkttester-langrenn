<template>
    <div class="hamburger">
        <svg v-if="page === 'waxTech'" alt="hamburgermenu" @click="toggleHamburger" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.75 37.5H6.25V33.3333H43.75V37.5ZM43.75 27.0833H6.25V22.9167H43.75V27.0833ZM43.75 16.6667H6.25V12.5H43.75V16.6667Z" fill="#190D61"/>
        </svg>
        
        <svg v-if="page === 'tester'" alt="hamburgermenu" @click="toggleHamburger" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.75 37.5H6.25V33.3333H43.75V37.5ZM43.75 27.0833H6.25V22.9167H43.75V27.0833ZM43.75 16.6667H6.25V12.5H43.75V16.6667Z" fill="white"/>
        </svg>

        <svg v-if="page === 'tests' || page === 'previousTest'" alt="hamburgermenu" @click="toggleHamburger" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.75 37.5H6.25V33.3333H43.75V37.5ZM43.75 27.0833H6.25V22.9167H43.75V27.0833ZM43.75 16.6667H6.25V12.5H43.75V16.6667Z" fill="#7B0303"/>
        </svg>

        <div v-if="clicked" :class="`hamburger__menu ${page === 'tests' || page === 'previousTest' ? 'hamburger__menu--tests' : ''}`">
            <svg v-if="page === 'waxTech' || page === 'tester'" alt="exit icon" class="hamburger__menu-exit" @click="toggleHamburger" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.694 0.30599C24.791 0.402739 24.8679 0.517674 24.9204 0.64421C24.9729 0.770746 24.9999 0.906398 24.9999 1.0434C24.9999 1.18039 24.9729 1.31605 24.9204 1.44258C24.8679 1.56912 24.791 1.68405 24.694 1.7808L1.78071 24.6946C1.58514 24.8901 1.31989 25 1.04332 25C0.76674 25 0.501493 24.8901 0.305925 24.6946C0.110357 24.499 0.000488281 24.2337 0.000488281 23.9571C0.000488281 23.6806 0.110357 23.4153 0.305925 23.2197L23.2192 0.30599C23.3159 0.208995 23.4309 0.132041 23.5574 0.0795343C23.6839 0.0270275 23.8196 0 23.9566 0C24.0936 0 24.2292 0.0270275 24.3557 0.0795343C24.4823 0.132041 24.5972 0.208995 24.694 0.30599Z" fill="#190D61"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.305983 0.30599C0.208991 0.402739 0.132038 0.517674 0.0795325 0.64421C0.0270269 0.770746 0 0.906398 0 1.0434C0 1.18039 0.0270269 1.31605 0.0795325 1.44258C0.132038 1.56912 0.208991 1.68405 0.305983 1.7808L23.2192 24.6946C23.4148 24.8901 23.6801 25 23.9566 25C24.2332 25 24.4984 24.8901 24.694 24.6946C24.8896 24.499 24.9995 24.2337 24.9995 23.9571C24.9995 23.6806 24.8896 23.4153 24.694 23.2197L1.78076 0.30599C1.68402 0.208995 1.56908 0.132041 1.44255 0.0795343C1.31602 0.0270275 1.18037 0 1.04337 0C0.906379 0 0.770729 0.0270275 0.644196 0.0795343C0.517662 0.132041 0.40273 0.208995 0.305983 0.30599Z" fill="#190D61"/>
            </svg>

            <svg v-if="page === 'tests' || page === 'previousTest'" alt="exit icon" class="hamburger__menu-exit" @click="toggleHamburger" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.694 0.30599C24.791 0.402739 24.8679 0.517674 24.9204 0.64421C24.9729 0.770746 24.9999 0.906398 24.9999 1.0434C24.9999 1.18039 24.9729 1.31605 24.9204 1.44258C24.8679 1.56912 24.791 1.68405 24.694 1.7808L1.78071 24.6946C1.58514 24.8901 1.31989 25 1.04332 25C0.76674 25 0.501493 24.8901 0.305925 24.6946C0.110357 24.499 0.000488281 24.2337 0.000488281 23.9571C0.000488281 23.6806 0.110357 23.4153 0.305925 23.2197L23.2192 0.30599C23.3159 0.208995 23.4309 0.132041 23.5574 0.0795343C23.6839 0.0270275 23.8196 0 23.9566 0C24.0936 0 24.2292 0.0270275 24.3557 0.0795343C24.4823 0.132041 24.5972 0.208995 24.694 0.30599Z" fill="#7B0303"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.305983 0.30599C0.208991 0.402739 0.132038 0.517674 0.0795325 0.64421C0.0270269 0.770746 0 0.906398 0 1.0434C0 1.18039 0.0270269 1.31605 0.0795325 1.44258C0.132038 1.56912 0.208991 1.68405 0.305983 1.7808L23.2192 24.6946C23.4148 24.8901 23.6801 25 23.9566 25C24.2332 25 24.4984 24.8901 24.694 24.6946C24.8896 24.499 24.9995 24.2337 24.9995 23.9571C24.9995 23.6806 24.8896 23.4153 24.694 23.2197L1.78076 0.30599C1.68402 0.208995 1.56908 0.132041 1.44255 0.0795343C1.31602 0.0270275 1.18037 0 1.04337 0C0.906379 0 0.770729 0.0270275 0.644196 0.0795343C0.517662 0.132041 0.40273 0.208995 0.305983 0.30599Z" fill="#7B0303"/>
            </svg>
            
            <RouterLink :to="{name: 'home'}" :class="`hamburger__menu-text ${page === 'tests' || page === 'previousTest' ? 'hamburger__menu-text--tests' : ''}`" >HJEM</RouterLink>
            <RouterLink :to="{name: 'findTests'}" :class="`hamburger__menu-text ${page === 'tests' || page === 'previousTest' ? 'hamburger__menu-text--tests' : ''}`" >FINN TESTER</RouterLink>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clicked: false
            }
        },

        props: {
            page: {
                type: String
            }
        },

        methods: {
            toggleHamburger() {
                return this.clicked = !this.clicked;
            }
        }
    }
</script>

<style>
    .hamburger__menu {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50%;
        width: 100%;
        background-color: var(--light);
        border: 2px solid var(--main-color);
    }

    .hamburger__menu--tests {
        border: 2px solid var(--second-color);
    }

    .hamburger__menu-text {
        font-size: 1.4em;
        text-decoration: none;
        color: var(--main-color);
        padding: var(--padding-medium);
    }

    .hamburger__menu-text--tests {
        color: var(--second-color)
    }
 
    .hamburger__menu-exit {
        position: absolute;
        top: 20;
        right: 30
    }

    @media screen and (min-width: 700px) {
        .hamburger__menu {
            height: 50%;
            width: 40%;
        }
    }
</style>