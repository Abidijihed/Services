
import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import React, { Component } from 'react'
import { Row, Col } from 'react-native-responsive-grid-system';
export default class about extends Component {
    constructor(props){
        super(props)
        this.state={
         
        }
    }
    render() {
        return (
<Row>
<Col  xs={6} sm={4} md={3} lg={3}>
            <View style={styles.containr} >
            <CheckBox
             left
              title='plombier'
              checkedColor='red'
            />
                    </View>
                    </Col>
                  
                    <Col  xs={6} sm={4} md={3} lg={3}>
            <View style={styles.containr} >
            <CheckBox
             left
              title='plombier'
              checked={this.state.checked}
            />
                    </View>
                    </Col>
                        <CheckBox
              center
              title='More...'
              iconRight
              iconType='material'
              checkedIcon='clear'
              uncheckedIcon='add'
              checkedColor='red'
              checked={this.state.checked}
            />
           
                     </Row>
        )
    }
}

 

const styles = StyleSheet.create({
    containr:{
        width:180
    }
})
