import React, { Component } from 'react';
import GrommetApp from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';
import Status from 'grommet/components/icons/Status';
// import logo from './logo.svg';
import Infos from './infos';
import './App.css';

class App extends Component {
  state = {
    deployment: null,
    project: null,
  }
  componentDidMount() {
    fetch('/api/info') // TODO change
    .then(res => res.json())
    .then((res) => {
      this.setState({
        deployment: res.deployment,
        project: res.project,
      });
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    let image = <Image fit='contain' src='hero.png'></Image>;

    return (
      <GrommetApp centered={false}>
        <Header colorIndex='brand'>
          <Box direction='row' margin='medium'>
            <Heading tag='h2' align='center'>HPE CIC Azure deployment from GitHub</Heading>
          </Box>

        </Header>
        {/* <Columns responsive={false} masonry={false}>
          <Box size='medium' pad='medium' align='center'>
            <Heading margin='medium' >
              VM is deployed <Status value='ok' />
            </Heading>
            <Hero background={image} size='medium'></Hero>
          </Box>
          <Box align='center' pad='medium' size='medium'>
            <Infos project={this.state.project} deployment={this.state.deployment} />
          </Box>
        </Columns> */}
        <Split>
          <Box
            justify='center'
            align='center'
            pad='medium'>
            <Heading margin='medium'>
              VM is deployed <Status value='ok' />
            </Heading>
            <Hero background={image} size='medium'></Hero>
          </Box>
          <Box
            align='center'
            pad='medium'>
            <Heading margin='medium'>
              Informations:
            </Heading>
            <Infos project={this.state.project} deployment={this.state.deployment} />
          </Box>
        </Split>
        {/* <Box pad='medium' align='center' justify='center'>
        </Box> */}
      </GrommetApp>
    );
  }
}

export default App;
