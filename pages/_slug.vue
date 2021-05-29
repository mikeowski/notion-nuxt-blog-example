<template>
  <div class='max-w-screen-md mx-auto pt-10 prose'>
    <h1 v-show='isLoading' class='text-center'>LOADİNG</h1>
    <template v-for='el in data'>
      <component :is='setElement(el.type)'>
          {{getContent(el)}}
      </component>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BlogPage',
  data(){
    return{
      data:[],
      isLoading: true,
    }
  },
  async asyncData({ params }) {
    console.log(params.slug)
    const slug = params.slug
    return { slug }
  },
  created() {
    this.getBlocks()
  },
  methods:{
    async getBlocks(){
      let d = this.$route.fullPath
      const url = `/api/getPageContent?pageId=${d.split('').slice(1).join('')}`
      await fetch(url,{
        method:'GET',
      }).then(res =>{
        return res.json()
      }
      ).then(res => {
        this.data = res
        this.isLoading = false
      })
    },
  getContent(block){
      const {type} = block
      if(block.type !== 'unsupported' && block.type !== 'child_page' && block[type].text.length) {
        const text = block[type].text.map(v => {
          return v.plain_text
        }).join('')
        return text
      }else if(block.type === 'child_page'){
        return block[type].title
      }

    return ''
  },
    setElement(type){
      switch (type){
        case 'paragraph':
          return 'p'
        case 'heading_2':
          return 'h2'
        case 'heading_1':
          return 'h1'
        case 'heading_3':
          return 'h3'
        case "bulleted_list_item":
        case "numbered_list_item":
          return 'li'
        case 'child_page':
          return 'p'
        default:
          return 'p'
      }
    }
  }

}
</script>

<style scoped>
</style>
