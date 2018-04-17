import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning';

export default class Infos extends Component {
  render() {
    const { project, deployment } = this.props;
    if (project === null || deployment === null || project === undefined || deployment === undefined) {
      return (
        <Box pad="medium" align="center" justify="center">
          <Heading margin='medium' >
            Loading...
          </Heading>
          <Spinning />
        </Box>
      );
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <td>Project name</td>
            <td className='secondary'>{project.name}</td>
          </TableRow>
          <TableRow>
            <td>Project description</td>
            <td className='secondary'>{project.description}</td>
          </TableRow>
          <TableRow>
            <td>OneSphere VM's name</td>
            <td className='secondary'>{deployment.name}</td>
          </TableRow>
          <TableRow>
            <td>CPU</td>
            <td className='secondary'>{deployment.cpuCount} ({deployment.cpuGhz} Ghz)</td>
          </TableRow>
          <TableRow>
            <td>RAM</td>
            <td className='secondary'>{deployment.memorySizeGB} GB</td>
          </TableRow>
          <TableRow>
            <td>Created at</td>
            <td className='secondary'>
              <Moment format='YYYY/MM/DD - HH:MM'>{deployment.created}</Moment>
            </td>
          </TableRow>
          <TableRow>
            <td>Modified at</td>
            <td className='secondary'>
              <Moment format="YYYY/MM/DD - HH:MM">{deployment.modified}</Moment>
            </td>
          </TableRow>
        </tbody>
      </Table>
    );
  }
}


Infos.propTypes = {
  project: PropTypes.object,
  deployment: PropTypes.object,
};
