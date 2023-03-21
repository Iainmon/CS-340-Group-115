import * as fetcher from './fetcher.js';
import * as store from 'store2';

export const state = {
    viewStateModifier: null
};

export function setComeBack(view) {
    store.set('view', view);
    location.reload();
}

export function getComeBack() {
    if (store.has('view')) {
        const view = store.get('view');
        store.remove('view');
        return view;
    }
    return 'home';
}

export async function reloadView(view) {
    if (!state.viewStateModifier) {
        console.error('No view state modifier defined.');
    }
    await fetcher.primeTables();
    state.viewStateModifier(view);
    console.log('Reloaded view:', view);

}