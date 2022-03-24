import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import './styles/post.css'

const Post= (props) => {
  return (
      <div className='post'>
        <Card sx={{ width: 600 }}>
            <CardHeader
                avatar={
                <Avatar src={props.ownerPhoto} aria-label="recipe"/>
                }
                title={props.title}
                subheader={props.publish}
            />
            <CardMedia
                component="img"
                height= "auto"
                src={props.photo}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {props.tags}
                </Typography>
            </CardContent>
        </Card>
    </div>
  );
}

export default Post