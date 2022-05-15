<template>
    <Header :page="'tests'" />
    <div class="findTests">
        <Banner :bannerPage="'findTest'" :bannerTitle="'Finn tester'" />
        
        <RouterLink :to="{ name : 'findTest', params: { typeOfTest: type} }">
            <button @click="getChoosenTest" class="pageButton">Sted</button>
        </RouterLink>

        <RouterLink :to="{ name : 'findTest', params: { typeOfTest: type} }">
            <button @click="getChoosenTest" class="pageButton">Værdata</button>
        </RouterLink>

        <RouterLink :to="{ name : 'findTest', params: { typeOfTest: type} }">
            <button @click="getChoosenTest" class="pageButton">Årstall</button>
        </RouterLink>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Banner from '../components/Banner.vue';
    
    export default {
        data() {
            return {
                type: 'chosen'
            }
        },

        components: {
            Header,
            Banner
        },

        methods: {
            getChoosenTest(event) {
                return this.type = event.target.innerText;
            }
        }
    }
</script>

<style>
    .findTests {
        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-image: url('/images/background-tests.png');
    }
</style>