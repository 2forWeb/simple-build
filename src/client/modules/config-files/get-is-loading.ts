import { configFilesState } from '@client/modules/config-files/state';

export function getIsLoading() {
    return configFilesState.isLoading;
}
