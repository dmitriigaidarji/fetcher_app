import React from "react"
import AppBar from 'material-ui/AppBar';
import InputQuery from '../components/InputQuery'
import ResultsContainer from './ResultsContainer'
import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import {getUserQueries} from '../actions/queries'
import {hot} from 'react-hot-loader'

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
    }
};

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    setQueriesInterval = () => {
        let {dispatch} = this.props;
        dispatch(getUserQueries());

        this.queriesInterval = setInterval(() => {
            dispatch(getUserQueries());
        }, 5000)
    };

    componentDidMount() {
        this.setQueriesInterval();
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    }

    render() {
        let yqueries = [];
        let gqueries = [];
        let node;
        let {queries} = this.props;
        if (queries != undefined) {
            for (let i = 0; i < queries.length; i++) {
                let q = queries[i]
                if (q.type != 'g') yqueries.push(q)
                else gqueries.push(q)
            }
            if (queries.length > 0)
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
                    </div>
                )
        }
        return (
            <div>
                <AppBar
                    title="Fetcher App"
                    showMenuIconButton={false}
                    iconElementRight={<FlatButton onClick={() => window.location = django_context.logout_url}
                                                  label="Log out"/>}
                />
                <InputQuery/>
                {node}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    queries: state.queries.items
});


export default hot(module)(connect(mapStateToProps)(Layout))
