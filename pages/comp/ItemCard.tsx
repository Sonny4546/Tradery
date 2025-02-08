import React from 'react';
import Card from 'react-bootstrap/Card';
import TimeAgo from 'react-timeago'

interface ItemCardProps {
    name: string;
    date: string;
    image?: {
        height: number;
        url: string;
        width: number;
    }
    author: string;
}

const ItemCard = ({ name, date, author, image }: ItemCardProps) => {
    return (
        <Card className="itemcontent" style={{ width: '100%' }}>
                {image?.url && (
                <Card.Img variant="top"
                    width={image.width && (100)}
                    height={image.height && (100)}
                    src={image.url}
                />
                )}
                <Card.Body>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Text>
                    { author }
                    </Card.Text>
                    <Card.Text>
                        <TimeAgo date={ date }/>
                    </Card.Text>
                </Card.Body>
        </Card>
    )
}

export default ItemCard