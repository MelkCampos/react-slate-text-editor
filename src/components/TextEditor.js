import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'

import InitialTextValue from '../utils/InitialTextValue'

import Icon from 'react-icons-kit'

import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { link2 } from 'react-icons-kit/feather/link2';

import { ic_title } from 'react-icons-kit/md/ic_title';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { BoldMark, ItalicMark, FormatToolbar } from './index';
import { wrap } from 'module';

export default class TextEditor extends Component {

    state = {
        value: InitialTextValue,
    }

    // update app's React state - mutation
    onChange = ({ value }) => 

        this.setState({ value })
    }

    KeyDown = (event, change) => {

        // commands to start with the user pressing "ctrl"
        // if they don't -- we cancel the action

        if(!event.ctrlKey) {
            return
        }

        event.preventDefault()

        // commands by key code
        switch(event.key) {

            // bold text
            case 'b': {

                change.toggleMark('bold')
                return true
            }

            case 'i': {

                change.toggleMark('italic')
                return true
            }

            case 'c': {

                change.toggleMark('code')
                return true
            }

            case 'l': {

                change.toggleMark('list')
                return true
            }

            case 'u': {

                change.toggleMark('underline')
                return true
            }

            case 'q': {

                change.toggleMark('quote')
                return true
            }

            case 'h': {
                
                change.toggleMark('title')
                return true
            }

            default: {

                return
            }
        }
}

renderNode = (props) => {
    switch (props.node.type) {

        case 'link': {
            return (
                <a href={props.node.data.get('href')} {...props.attributes}>

                        {props.children}
                </a>
            )
        }

        default: {
            return
        }
    }
}

renderMark = (props) => {
    switch (props.mark.type) {
        
        case 'bold': 
            return <BoldMark {...props} />

        case 'italic':
            return <ItalicMark {...props} />

        case 'code': 
            return <code {...props.attributes}> {props.children} </code> 

        case 'list': 
            return (
                <ul {...props.attributes}>

                     <li> {props.children} </li>
                </ul>
            )
        case 'underline':

            return <u {...props.attributes}> {props.children} </u>
            
        case 'quote':

            return <blockquote {...props.attributes}> {props.children} </blockquote>

        case 'title':

            return <h1 {...props.attributes}> {props.children} </h1>
            
        default: {

            return
        }
    }

}

hasLinks = () => {

    const { value } = this.state
    return value.inlines.some((inline) => inline.type === 'link')
}


wrapLink = (change, href) => {

    change.wrapLine({

        type: 'link',
        data: { href }
    })

    change.collapseToEnd()
}

unwrapLink = (change) => change.unwrapLine('link')

// disabling brower default behavior like page refresh
onLinkClick = (event) => {

    event.preventDefault()

    const { value } = this.state
    const hasLinks = this.hasLinks()
    const change = value.change() 

    if(hasLinks) {

        change.call(this.unwrapLink)
    } 
    
    else if(value.isExpanded) {

        const href = window.prompt("Enter the 'URL' of the link")
        href.length > 0 ? change.call(this.wrapLink, href) : null
    }

    else {

        const href = window.prompt("Enter the 'URl' of the link: ")
        const text = window.prompt("Enter the text for the link: ")

        href.length > 0
        
            ? change
                      .insertText(text) 
                      .extend(0 - text.length)
                      .call(this.wrapLink. href)
            :null      
    }


}