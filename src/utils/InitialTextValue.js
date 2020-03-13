import { Value } from 'slate'

const initialValue = Value.fromJSON(

    {

        document: {
            nodes: [{

                object: 'black',
                type: 'paragraph',
                
                nodes: [{
                    object: 'text',
                    leaves: [
                        {
                            text: 'My first paragraph!',
                        }
                    ]
                }]
            }]
        }
    })


export default initialValue 