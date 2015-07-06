import React, { PropTypes } from 'react';

class Item extends React.Component {
    render() {
        const { title, description } = this.props;

        return (
            <div>{title} - {description}</div>
        );
    }
}

Item.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

export default Item;
