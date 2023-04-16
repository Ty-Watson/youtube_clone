import {useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {SideBar , Videos} from './';
import { fetchFromAPI } from '../Utils/fetchFromAPI';

{/*useEffect is a lifecycle hook that is called when component initially loads*/}
{/*useEffect is a built-in hook in React that allows you to perform side effects in functional components. A side effect is anything that changes the state of your application or interacts with something outside your component, such as fetching data from an API, updating the DOM, setting up event listeners, etc.
The useEffect hook takes two arguments: a callback function and a dependency array. The callback function contains the code that should be executed whenever the component is mounted, updated, or unmounted. The dependency array is an optional parameter that determines when the callback function should be called.
If any of the values in the dependency array change, the callback function will be called again. If the dependency array is empty, the callback function will only be called once when the component is mounted.
In the code snippet you provided, the useEffect hook is used to fetch data from an API and set the state variable videos with the fetched data. The dependency array contains only selectedCategory, which means that the callback function will be called again whenever selectedCategory changes.
This ensures that the videos state variable is updated with the correct data whenever the selected category changes. */}
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
        <Videos videos={videos} /> {/* the videos prop passed to the Videos component contains the video data that was fetched from the API using the useEffect hook.*/}
      </Box>
    </Stack>
  )
}

export default Feed