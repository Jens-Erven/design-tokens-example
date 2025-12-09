import { createApp } from 'vue/dist/vue.esm-bundler.js';
import Button from './Button.vue';
import '../../dist/figma-variables/css/tokens.css';

const App = {
  components: { Button },
  template: `
    <div>
      <Button @click="onClick">button</Button>
    </div>
  `,
  methods: {
    onClick() {
      alert('Button clicked!');
    },
  },
};

createApp(App).mount('#root');
