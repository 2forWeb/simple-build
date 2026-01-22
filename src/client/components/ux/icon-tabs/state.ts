import { reactive } from 'vue';

export const iconTabsState = reactive<{ selectedTabIndex: number }>({
    selectedTabIndex: 0,
});
