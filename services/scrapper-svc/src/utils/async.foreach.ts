// tslint:disable no-any
import { AnyFunction } from '../types/types';

export async function asyncForEach(array: any[], callback: AnyFunction) {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
    }
}
