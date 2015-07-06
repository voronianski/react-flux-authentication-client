import { Actions } from 'flummox';

class ItemActions extends Actions {
    constructor(api) {
        super();
        this.api = api;
    }

    async requestItems() {
        const items = await this.api.getUserItems();
        return items;
    }
}

export default ItemActions;
