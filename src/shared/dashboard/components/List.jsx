import React, { PropTypes } from 'react';

import Item from './Item';

class List extends React.Component {
    render() {
        const { items } = this.props;

        if (!items) {
            return <div>Loading...</div>;
        }

        const itemNodes = items.map(item => {
            return (
                <Item key={item.id} title={item.title} price={item.description} />
            );
        });

        return (
            <div>{itemNodes}</div>
        );
    }
}

List.defaultProps = {
    items: []
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default List;
