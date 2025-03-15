import React, { useState, useEffect } from 'react';
import { Card, Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import TimeAgo from 'react-timeago'
import { useAuth } from '../lib/AuthHook';
import { addRequest, deleteItemById, getItemsById, updateItem } from '../lib/Items';
import { fetchUserData } from '../lib/User';
import { getUserDataById, TraderyProfiles } from '../lib/UserProfile';
import { TraderyItems } from '../lib/ItemsInterface';
import { useNavigate } from 'react-router-dom';

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

export const ItemCard = ({ name, date, author, image }: ItemCardProps) => {
    return (
        <Card className="itemcontent" style={{ width: '100%', height: '100%' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                {image?.url && (
                <>
                <Card.Img className="Card-Image" variant="top"
                        width={image.width && (100)}
                        height={image.height && (100)}
                        src={image.url} />
                <img className="Card-ImageBG"
                        width={image.width && (100)}
                        height={image.height && (100)}
                        src={image.url} ></img>
                </>
                )}
            </div>
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