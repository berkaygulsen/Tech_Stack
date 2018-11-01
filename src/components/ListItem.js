import React, { Component } from 'react';
import { CardSection } from './common';
import { 
  Text,
  TouchableWithoutFeedback, 
  View,
  LayoutAnimation,
  Platform,
  UIManager
 } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {

  componentWillUpdate() {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.easeInEaseOut();
    } else {
      LayoutAnimation.easeInEaseOut();
    }

  }

  renderDescription() {
    const { library, expanded } = this.props;

    if(expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1, fontSize: 16 }}>{library.description}</Text>
        </CardSection>
        
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library;


    return (
      <TouchableWithoutFeedback 
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
