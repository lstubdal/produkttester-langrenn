<template>
    <div class="home">
        <section class="home__headline">
            <h1 class="home__title">{{ title }}</h1>
            <hr class="home__headline-seperator">
            <p>{{ undertitle}}</p>
        </section>

        <section class="home__links">
            <RouterLink :to="{ name: 'tests'}" class="home__link">
                <button class="home__tests">{{ buttonText[0] }}</button>
            </RouterLink>

            <RouterLink :to="{ name: 'waxTech'}" class="home__link">
                <button class="home__newTest">
                    <img src="/icons/add.svg" alt="add icon">
                    {{ buttonText[1] }}
                </button>
            </RouterLink>
        </section>
    </div>
</template>

<script>
 
    export default {
        data() {
            return {
                title: 'PRODUKTTESTEREN',
                undertitle: 'Langrenn',
                buttonText: ['Finn tidligere tester', 'Opprett ny test']
            }
        }
      
    }
</script>

<style>
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        background-image: url('/images/home.png');
        background-size: cover;
        font-family: var(--main-font);
    }

    .home__headline {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .home__title {
        font-size: 3em;
    }

    .home__title, .home__headline p {
        color: var(--light);
    }

    .home__headline-seperator {
        width: 100%;
        border: 0.5px solid var(--light);
        background-color: var(--light);
        margin: var(--margin-small);
    }

    .home__links {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .home__link {
        text-decoration: none;
    }

    .home__tests, .home__newTest {
        height: 60px;
        width: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--light);
        border: none;
        padding: var(--padding-small) var(--padding-medium);
        font-size: var(--button-text);
        border-radius: var(--button-corners);
        margin: var(--margin-small) 0%;   
        cursor: pointer;  
    }

    .home__tests {
        background-color: var(--light);
        border: 2px solid var(--main-color);
        color: var(--main-color);
    }

    .home__newTest {
        background-color: var(--main-color);
    }
</style>
