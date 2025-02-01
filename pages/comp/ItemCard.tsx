import Card from 'react-bootstrap/Card';

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
            <a className="itemLink">
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
                    { date }
                    </Card.Text>
                </Card.Body>
            </a>
        </Card>
    )
}

export default ItemCard