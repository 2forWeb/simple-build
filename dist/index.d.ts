import { IConfig } from './types/config';
import BuildTask from './process/build-task';
import BuildScss from './process/build-scss';
import CopyFiles from './process/copy-files';
import BuildTypeScript from './process/typescript';
declare function build(config: IConfig): Promise<void>;
export { build, BuildTask, BuildScss, CopyFiles, BuildTypeScript };
