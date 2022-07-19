import './App.css';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

const GET_TOPIC = gql`
  query Topic($name: String!){
    topic(name: $name) {
      id
      name
      stargazerCount
      relatedTopics{
        id
        name
        stargazerCount
      }
    }
  }
  `;

function MainTopic(props) {
  let name = props.name
  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: { name },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let topic = data?.topic;

  return (
    <div className='container'>
      <h1>Main Topic : {topic.name.toUpperCase()}</h1>
      <h2>Total Stargazers : {topic.stargazerCount}</h2>
      <h2>RelatedTopics :</h2>
      <RelatedTopics topics={topic.relatedTopics}></RelatedTopics>
    </div>
  );
}


function RelatedTopics(props) {
  let topics = props.topics;

  let [topic, setTopic] = useState([]);

  return (
    <div className='container'>
      <Grid container spacing={1}>
        {topics.map((topic, index) => (
          <Grid key={index} item xs={4}>
            <Grid item>
              <Card sx={{ width: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Topic
                  </Typography>
                  <Typography variant="h5" component="div">
                    {topic.name.toUpperCase()}
                  </Typography>
                  <Typography variant="h6" component="div" color="text.secondary">
                    Stargazers : {topic.stargazerCount}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setTopic(topic)}>Related Topics</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <SubReletedTopics topic={topic}></SubReletedTopics>
    </div>
  )
}

function SubReletedTopics(props) {
  let topic = props.topic;
  let name = props.topic.name;
  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: { name },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Click releted topic button from above card to see more releted topics.</p>;

  let sub_topics = data?.topic.relatedTopics;
  return (
    <div className='container'>
      <h2>{name}'s Releted Topics</h2>
      <Grid container spacing={1}>
        {sub_topics.map((topic, index) => (
          <Grid key={index} item xs={4}>
            <Grid item>
              <Card sx={{ width: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Topic
                  </Typography>
                  <Typography variant="h5" component="div">
                    {topic.name.toUpperCase()}
                  </Typography>
                  <Typography variant="h6" component="div" color="text.secondary">
                    Stargazers : {topic.stargazerCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

class App extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <MainTopic name="react"></MainTopic>
      </div>
    );
  }
}
export default App;
