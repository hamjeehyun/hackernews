import React, {Component} from "react";
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectId: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 5,
        points: 2,
        objectId: 1,
    },
];

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());     // searchTerm과 title 값이 일치하는지 확인

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list,
            searchTerm: '..',
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const isNotId = item => item.objectId !== id;
        const updateList = this.state.list.filter(isNotId);
        this.setState({list: updateList});
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        const {searchTerm, list} = this.state;

        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange()}
                />
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss()}
                />
            </div>
        );
    }
}

class Search extends Component {
    render() {
        const {value, onChange} = this.props;
        return (
            <form>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>
        )
    }
}

class Table extends Component {
    render() {
        const {list, pattern, onDismiss} = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern)).map(item =>
                    <div key={item.objectId}>
                        return (
                        <span>
                            <a href={item.url}>{item.title}</a>
                            </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <button
                                onClick={() => onDismiss(item.objectId)}
                                type="button"
                            >
                            Dismiss
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}


export default App;