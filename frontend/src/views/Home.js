import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron'
import Categories from '../components/Categories'
import styled from 'styled-components'

const Styles = styled.div`

    #pageContent {
        display: flex;
        width: 99%;
    }

`;

class Home extends Component {
    render() {
        return (
            <Styles>
                <Jumbotron />
                <div id="pageContent">
                    <Categories />
                      {this.props.children}  
                </div>
            </Styles>
        )
    }
}

export default Home;