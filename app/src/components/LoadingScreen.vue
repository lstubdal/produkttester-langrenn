<template>
    <div class="loading">
        <p class="loading__title">Henter data</p>

        <div class="loading__mans">
            <img src="/images/loadingMan.svg" alt="man" class="loading__man man-1">
            <img src="/images/loadingMan.svg" alt="man" class="loading__man man-2">
            <img src="/images/loadingMan.svg" alt="man" class="loading__man man-3">
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style>
.loading {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--padding-medium);
}

.loading__title {
    color: var(--main-color);
    font-size: 4em;
    font-family: var(--main-font);
    padding: var(--padding-small);
}

.loading__mans {
    display: flex;
    justify-content: center;
}

.loading__man {
    width: 30px;
    height: 30px;
    position: relative;
    margin:  2% 25% 0% 25%;
    animation: loading 2.5s ease-in-out infinite;
}

.man-1 {
    animation-delay: 0.3s;
}

.man-2 {
    animation-delay: 0.6s;
}

.man-3{
    animation-delay: 0.9s;
}

@keyframes loading {
   0%, 100%  {
       transform: scale(0.2);
       }

   50%  {
       transform: scale(1);
       }
}
</style>