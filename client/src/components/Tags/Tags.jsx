import React from 'react'
import Chip from '@mui/material/Chip';

export default function Tags({tags }) {
  return (
    <>
        {
            tags.map( (tag) => 
                <Chip sx={{margin:"0.3rem"}} key={tag.name} label={tag.name + " " + tag.count} component="a" href={`/tag/${tag.name}`} clickable />
            )
        }
    </>
  )
}
