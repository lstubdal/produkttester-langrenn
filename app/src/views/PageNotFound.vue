<template>
    <div class="pageNotFound">
        <span>404</span>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_219_182" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="4" width="84" height="92">
        <path d="M20.8333 16.6667V33.3334H79.1667L87.5 25L79.1667 16.6667H20.8333ZM79.1667 47.9167V64.5834H20.8333L12.5 56.25L20.8333 47.9167H79.1667Z" fill="white" stroke="white" stroke-width="8.33333" stroke-linejoin="round"/>
        <path d="M39.583 91.6667H60.4163M49.9997 64.5833V91.6667V64.5833ZM49.9997 33.3333V47.9167V33.3333ZM49.9997 8.33334V16.6667V8.33334Z" stroke="white" stroke-width="8.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </mask>
        <g mask="url(#mask0_219_182)">
        <path d="M0 0H100V100H0V0Z" fill="white"/>
        </g>
        </svg>

        <h2 class="pageNotFound__title">Oisann! Her ser det ut som du har gått deg bort</h2>
        <RouterLink :to="{name: 'home'}" class="pageNotFound__button pageLink ">Gå til forsiden</RouterLink>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .pageNotFound {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: var(--main-font);
        color: var(--light);
        background-color: var(--main-color);
        border: 2px solid var(--light);
        padding: var(--padding-medium);
    }

    .pageNotFound__title {
        padding: var(--padding-small);
        font-size: 2em;
    }

    .pageNotFound__button {
        background-color: var(--light);
        color: var(--main-color);
        width: 250px;
    }
</style>