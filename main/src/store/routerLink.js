import { ref } from 'vue';

export const routerLink = ref(() => {});

export const routerPush = (path) => {
  routerLink.value.push(path)
};
