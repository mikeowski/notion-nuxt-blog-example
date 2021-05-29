<template>
  <div class='flex space-x-4 flex-wrap justify-center items-center'>
    <div v-for='page in pages' :key='page.id'>
      <nuxt-link :to='`/${page.id}`'>{{page.properties.Name.title[0].text.content}}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
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


