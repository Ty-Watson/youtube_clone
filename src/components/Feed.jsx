import {useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {SideBar , Videos} from './';
import { fetchFromAPI } from '../Utils/fetchFromAPI';

{/*useEffect is a lifecycle hook that is called when component initially loads*/}
{/*`` makes the url dynamic so you make a template string*/}

export const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items));
  }, [selectedCategory]); {/*have to provide selectedCategory in dependency arrary so it recalls the function whenever we change the category*/}

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: "row" } }} >
      <Box sx={{height: { sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2} }} > {/*px is paddding horrizontal. sx: means usually. md is medium devices. mt is margin top*/}
        <SideBar 
          selectedCategory = {selectedCategory} 
          setSelectedCategory = {setSelectedCategory}
        />

        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff'}}>
          Copyright 2023 React App
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: 'auto', height: "90vh", flex: 2}}>
        <Typography variant='h4' fontWeight="bold" mb={2} sx={{ color: 'white'}}>
          {selectedCategory} <span style={{ color: '#f31503'}} >videos</span>
          
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed