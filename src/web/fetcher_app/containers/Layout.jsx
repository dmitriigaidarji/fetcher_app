import React from "react"
import AppBar from 'material-ui/AppBar';
import InputQuery from '../components/InputQuery'
import RaisedButton from 'material-ui/RaisedButton';
import ResultsContainer from './ResultsContainer'
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import SeoApi from '../SeoApi'

let styles = {
    imageContainer: {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 9999,
    },
    image: {
        maxHeight: '64px'
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
}

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            queries: undefined,
        };
    }

    setQueriesInterval() {
        this.queriesInterval = setInterval(() => {
            SeoApi.getUserQueries((response) => {
                if (response != undefined) {
                    this.setState({queries: response})
                }
            })
        }, 5000)
    }

    componentDidMount() {
        this.setQueriesInterval();
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    }

    render() {
        let yqueries = []
        let gqueries = []
        let node
        if (this.state.queries != undefined) {
            for (let i = 0; i < this.state.queries.length; i++) {
                let q = this.state.queries[i]
                if (q.type != 'g') yqueries.push(q)
                else yqueries.push(q)
            }
            if (this.state.queries.length > 0)
                node = (<div>
                        <Tabs
                            onChange={this.handleChange}
                            value={this.state.slideIndex}
                        >
                            <Tab label="Google" value={0}/>
                            <Tab label="YouTube" value={1}/>
                        </Tabs>
                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange}
                        >
                            <div style={styles.slide}>
                                <ResultsContainer type={'g'} queries={gqueries}/>
                            </div>
                            <div style={styles.slide}>
                                <ResultsContainer type={'y'} queries={yqueries}/>
                            </div>
                        </SwipeableViews>

                        <div style={styles.slide}>
                            <ResultsContainer type={'y'} queries={yqueries}/>
                        </div>
                    </div>
                )
        }
        return (
            <div>
                <AppBar
                    title="Query Tools"
                />
                <InputQuery />

                { node }
                <div style={styles.imageContainer}>
                </div>
            </div>
        )
    }
}