import { useParams } from 'react-router-dom';
import { getEpisode } from '../../api/index.js';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, amber } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from 'react';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Category = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {

        const fetchCategories = async () => {
            const data = await getEpisode(id);

            if (data.length === 0) {
                setData([]);
                return;
            }
            setData(data);
        };

        fetchCategories();

    }, []); // The empty array makes this useEffect run only on component mount


    return (
        <div>

            {data && data.map((item, index) => (
                <div className='categories' key={index}>
                    {/* Replace `item.property` with the actual properties you want to display */}

                    <Card sx={{ maxWidth: 345, bgcolor: amber }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.name[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.name}
                            subheader={item.airdate}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.image.medium}
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">

                                {item.summary.replace(/(<([^>]+)>)/gi, "")}

                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    {item.summary.replace(/(<([^>]+)>)/gi, "")}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>

                    {/* <p>{item.otherProperty}</p> */}
                </div>
            ))}
        </div>);
};

export default Category;
