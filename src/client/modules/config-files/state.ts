import { reactive } from 'vue';
import { ConfigFilesResponse } from '@interfaces/api';

export const configFilesState = reactive<ConfigFilesResponse>({
    files: {},
});
