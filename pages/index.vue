<template>
  <div>
    <header class='flex items-center justify-center flex-col space-y-6'>
      <h1 class='uppercase text-gray-800 text-8xl font-bold'>Built with</h1>
      <IconNuxt/>
      <h1 class='uppercase text-gray-800 text-8xl font-bold'> & </h1>
      <IconNotion class='w-32 h-32'/>
    </header>
  <div class='flex space-x-4 flex-wrap justify-center items-center pt-24'>
    <div v-for='page in pages' :key='page.id' class='border shadow-2xl px-2 py-4 text-gray-800 uppercase'>
      <nuxt-link :to='`/${page.id}`'>{{page.properties.Name.title[0].text.content}}</nuxt-link>
    </div>
  </div>
  </div>
</template>

<script>
import IconNotion from '../assets/icons/notion-logo-1.svg'
import IconNuxt from '../assets/icons/nuxt.svg'
export default {
  components:{
    IconNotion,
    IconNuxt
  },
  data(){
    return{
      pages:[],
    }
  },
  mounted() {
    this.getPages()
  },
  methods:{
    async getPages(){
        await fetch('/api/getPages',{
        method:'GET'
      }).then(res => {
       return res.json()

      }).then(res =>{
        this.pages = res
        })
    }
  }

}
</script>


