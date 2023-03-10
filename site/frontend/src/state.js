import * as fetcher from './fetcher.js';

export const state = {
    viewStateModifier: null
};

export async function reloadView(view) {
    if (!state.viewStateModifier) {
        console.error('No view state modifier defined.');
    }
    await fetcher.primeTables();
    state.viewStateModifier('home');
    state.viewStateModifier(view);
    console.log('Reloaded view:', view);

}