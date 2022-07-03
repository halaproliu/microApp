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
        style: 'padding: 10px;border: none; color: #fff;background-color: #007bff; border-color: #007bff;border-radius: .25rem;font-weight:400;'
      },
      'Hello ' + this.name,
    );
  },
};
export default button;
