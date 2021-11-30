<template>
  <div class="code">
       <codemirror ref="myCm" v-model="code" :options="cmOptions"
        @ready="onCmReady"
        @focus="onCmFocus"
        @input="onCmCodeChange"></codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/keymap/sublime.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/juejin.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/idea.css'
import { codemirror } from 'vue-codemirror'

export default {
  name: 'CodeViewer',
  components: {
    codemirror
  },
  props: {
    sourceCode:{
        type:String,
        default:""
    },
    theme:{
        type:String,
        default:"juejin"
    }
  },
  data() {
      return {
        code:this.sourceCode,
        cmOptions: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          lineWrapping:true,
          foldGutter: true,
          styleSelectedText: true,
          mode: 'text/javascript',
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: this.theme,
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
          }
        }
      }
    },
    watch:{
        sourceCode:function(val){
            this.code=val
        }
    },
    methods: {
      onCmReady(cm) {
        console.log('the editor is readied!', cm)
      },
      onCmFocus(cm) {
        console.log('the editor is focus!', cm)
      },
      onCmCodeChange(newCode) {
        this.code = newCode
        this.$emit("code-change",this.code)
     }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.code{
    text-align: left;
}
.CodeMirror{
    height:400px!important;
}
</style>
