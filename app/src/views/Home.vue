<template>
    <div class="home" :style="{ backgroundImage: `url(${ backgroundImageUrl })` }">
        <section class="home__headline">
            <h1 class="home__headline-title">{{ title }}</h1>
            <hr class="home__headline-seperator">
            <p class="home__headline-undertitle">{{ undertitle}}</p>
        </section>

        <section class="home__links">
            <RouterLink :to="{ name: 'findTests'}" class="home__link">
                <button class="home__tests">Finn tidligere tester</button>
            </RouterLink>

            <RouterLink :to="{ name: 'waxTech'}" class="home__link">
                <button class="home__newTest">
                    <svg width="48" height="39" viewBox="0 0 48 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.5 18.2812V9.75H22.5V18.2812H12V20.7188H22.5V29.25H25.5V20.7188H36V18.2812H25.5Z" fill="white"/>
                    </svg>
                    Opprett ny test
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
                backgroundImageUrl: '',
                backgroundImages: []
            }
        },

        async created() {
            this.fetchBackgroundImage();
        },

        mounted() {
            /* this.delayBackgroundImage() */
        },

        methods: {
            async fetchBackgroundImage() {
                const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
                const collectionId = 542909
                const imageUrl = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}`;

                const response = await fetch(imageUrl, {
                    headers: {
                        Authorization: `Client-ID ${key}`
                    } 
                });
                
                const images = await response.json();
                
                this.backgroundImages = images;
                this.backgroundImageUrl = this.backgroundImages[0].urls.regular // default background
            },

            delayBackgroundImage() {
                let index = 1;
                setInterval(() => {
                    this.backgroundImageUrl = this.backgroundImages[index].urls.regular
                    if (index <= this.backgroundImages.length-1) {
                        index +=1;
                        console.log(index)
                    } else {
                        index = 0
                        console.log('else', index)
                    }
                }, 4000);
            }
        }
    }
</script>

<style>
    .home {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        background-size: cover;
        font-family: var(--main-font);
    }

    .home__headline {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .home__headline-title {
        font-size: 3em;
    }

    .home__headline-title, .home__headline-headline p {
        color: var(--light);
    }

    .home__headline-undertitle {
        color: var(--light);
        font-size: 2em;
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

    @media screen and (max-width: 800px) {
        .home__headline-title {
            font-size: 2em;
        }

        .home__headline-undertitle {
            font-size: 1.5em;
        }

        .home__newTest, .home__tests {
            height: 75px;
            width: 240px;
            font-size: var(--button-text-mobile);
        }
    }
</style>
