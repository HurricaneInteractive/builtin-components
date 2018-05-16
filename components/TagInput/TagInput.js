import React, { Component, Fragment } from 'react'

export default class TagInput extends Component {
    constructor(props) {
        super(props);

        let defaultTags = [];

        if (this.props.defaultTags) {
            defaultTags = this.props.defaultTags.join('\n').toLowerCase().split('\n');
        }

        this.state = {
            tag: '',
            currentTags: defaultTags
        }

        this.onChange = this.onChange.bind(this)
        this.generateTags = this.generateTags.bind(this)
        this.removeTag = this.removeTag.bind(this)
        this.checkDuplication = this.checkDuplication.bind(this)
        this.checkDelete = this.checkDelete.bind(this)
    }

    checkDuplication(tag) {
        return this.state.currentTags.indexOf(tag) > -1 ? true : false;
    }

    onChange(e) {
        let val = e.target.value;
        let lastChar = val.substr(val.length - 1);
        let tags = this.state.currentTags;

        if (lastChar === ',') {
            let tagName = val.replace(',', '').toLowerCase();
            
            if (this.checkDuplication(tagName)) {
                this.setState({
                    tag: tagName
                })
                return false;
            }

            tags.push(tagName);
            val = '';
        }

        this.setState({
            tag: val,
            currentTags: tags
        });
    }

    checkDelete(e) {
        if (this.state.currentTags.length > 0) {
            if (e.keyCode === 13 || e.keyCode === 8) {
                if (e.target.value === '') {
                    let allTags = this.state.currentTags;
                    let lastVal = allTags.pop();
                    this.setState({
                        tag: lastVal + ' ',
                        currentTags: allTags
                    })
                }
            }
        }
    }

    removeTag(e, tag) {
        e.preventDefault();
        let index = this.state.currentTags.indexOf(tag);
        let tags = this.state.currentTags;

        if (index > -1) {
            tags.splice(index, 1);
        }

        this.setState({
            currentTags: tags
        })
    }

    generateTags() {
        let allTags = this.state.currentTags.map((tag, i) => {
            return (
                <span key={i} className="tag">{tag.trim()}<a href="#" className="close" onClick={(e) => this.removeTag(e, tag)}>X</a></span>
            )
        });

        return allTags;
    }

    render() {
        return (
            <div className="tag-input">
                <span>{this.generateTags()}</span>
                <input 
                    name="tag" 
                    id="tag" 
                    value={this.state.tag} 
                    onChange={(e) => this.onChange(e)} 
                    placeholder="tag - comma separated"
                    onKeyDown={(e) => this.checkDelete(e)}
                />
            </div>
        )
    }
}