
export const COLUMNS = [

    {
        Header:"BANNER",
        accessor:"mediaId",
        Cell: ({row})=>{       
        return <img src={row.original.bannerId.url} alt="trailer_img" style={{width:"100px",height:"100px"}}></img>}
    },
    {
        Header:"TITLE",
        accessor:"title"
    },
    {
        Header:"TYPE",
        accessor:"type",
        Cell:({row})=>{
            return row.original.type.slice(0,1).toUpperCase() + row.original.type.slice(1)
         }
    },
    {
        Header:"GENRE",
        accessor:"genre",
        Cell:({row})=>{
           return row.original.genre.map(item=>item + ' ')
        }
       
    },
    {
        Header:"DESCRIPTION", 
        accessor:"description",
        Cell:({row})=>{
            return <span>{row.original.description && row.original.description.slice(0,40)}...</span>  }
    },
    {
        Header:"YEAR",
        accessor:"year"
    }

    
]

