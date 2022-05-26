<template>
  <div class="skipairs__user-title">
        <span class="skipairs__user-number">Par</span>
        <span class="skipairs__user-product">Verdi</span>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
 .skipairs {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--main-color);
    margin: var(--margin-small);
    color: var(--main-color)
}

.skipairs h3, .skipairs__number label  {
    padding: var(--padding-small);
    color: var(--main-color)  
}

.skipairs__number select {
    color: var(--main-color);
    padding: 1.5%;
}

.skipairs__number {
    display: flex;
    flex-direction: column;
}

.skipairs__user-product {
    min-width: 220px;
}
</style>