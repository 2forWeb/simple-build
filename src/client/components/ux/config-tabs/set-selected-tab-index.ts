import { configTabsState } from '@client/components/ux/config-tabs/state';

export function setSelectedTabIndex(index: number) {
    configTabsState.selectedTabIndex = index;
}
