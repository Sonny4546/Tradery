import React from 'react';
import Card from 'react-bootstrap/Card';
import TimeAgo from 'react-timeago'

interface ItemCardProps {
    name: string;
    date: string;
    image?: {
        alt: string;
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
                    width={image.width}
                    height={image.height}
                    src={image.url}
                    alt={image.alt}
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