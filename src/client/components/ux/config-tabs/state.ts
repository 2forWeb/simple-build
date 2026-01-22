import { reactive } from 'vue';

export const configTabsState = reactive<{ selectedTabIndex: number }>({
    selectedTabIndex: 0,
});
