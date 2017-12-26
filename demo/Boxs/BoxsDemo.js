/**
 * Box Component Demo for tingle
 * @author
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

import classnames from 'classnames';

import { HBox, VBox, Box } from 'salt-boxs';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const t = this;
    return (<div>

      <HBox className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
        <Box className="box3" flex={1}>flex:1</Box>
      </HBox>

      <HBox vAlign="start" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
        <Box className="box3" flex={1}>flex:1</Box>
      </HBox>

      <HBox vAlign="center" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
        <Box className="box3" flex={1}>flex:1</Box>
      </HBox>

      <HBox vAlign="end" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
        <Box className="box3" flex={1}>flex:1</Box>
      </HBox>

      <VBox className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </VBox>

      <VBox hAlign="start" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </VBox>

      <VBox hAlign="center" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </VBox>
      <VBox hAlign="end" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </VBox>
      <HBox vAlign="center" hAlign="center" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </HBox>
      <VBox vAlign="center" hAlign="center" className="wrapper">
        <Box className="box1">60 * 60</Box>
        <Box className="box2">
                    auto * auto
        </Box>
      </VBox>

      <HBox className="wrapper">
        <VBox className="t-BCa" flex={2}>
          <Box className="t-BCd" flex={1}>1</Box>
          <Box className="t-BCe" flex={2}>2</Box>
        </VBox>
        <Box className="t-BCb" flex={2}>2</Box>
        <Box className="t-BCc" flex={1}>1</Box>
      </HBox>
    </div>);
  }
}

export default Demo;
