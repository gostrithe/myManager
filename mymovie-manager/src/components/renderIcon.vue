<script>
import { h } from 'vue';

export default {
  props: ["iconName"],
  render() {
    return h(this.iconName);
  },
};
</script>
