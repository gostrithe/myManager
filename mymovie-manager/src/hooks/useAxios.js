import { onMounted, ref, reactive, toRefs } from "vue";

function useAxios(promiseApi, args = [], callback = null, delay = 0) {
  const state = reactive({
    data: null,
    err: null,
    loading: false,
  });

  onMounted(async () => {
    state.loading = true;
    try {
      const data = await promiseApi(...args);
      callback && callback(data);
      state.data = data;
    } catch (err) {
      state.err = err;
    }

    setTimeout(() => {
      state.loading = false;
    }, delay);
  });

  return toRefs(state);
}

export default useAxios;
