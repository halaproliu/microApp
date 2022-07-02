import { h } from 'vue';
const button = {
  name: 'btn-component',
  props: {
    name: {
      type: String,
      default: 'World'
    }
  },
  render() {
    return h(
      'button',
      {
        id: 'btn-primary',
      },
      'Hello ' + this.name,
    );
  },
};
export default button;
