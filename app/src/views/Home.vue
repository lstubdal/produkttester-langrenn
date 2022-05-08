<template>
    <div class="home">
        <section class="home__headline">
            <h1>{{ title }}</h1>
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
    }

    .home__headline h1, .home__headline p {
        color: var(--light);
    }

    .home__headline-seperator {
        /* create line */
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
        display: flex;
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
        background-color: var(--second-color);
    }

    .home__newTest {
        background-color: var(--main-color);
    }
</style>
