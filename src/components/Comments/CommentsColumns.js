// import {format} from "data-fns";
export const COLUMNS = [

    {
        Header:"No",
        accessor:d=>d.index,
        id:"row",
        Cell:({row})=>{
            return<div>{row.index+1}</div>
        }
    },
    {
        Header:"TITLE",
        accessor:"title",
        // Cell:({row})=>{
        //     return row.original.email.slice(0,1).toUpperCase() + row.original.email.slice(1)
        //  }
    },
    {
        Header:"AUTHOR",
        accessor:"userId",
        Cell:({row})=>{
            return <span>{row.original.userId.firstname} {row.original.userId.lastname}</span>  }
    
    },
    {
        Header:"DESCRIPTION", 
        accessor:"content",
        Cell:({row})=>{
            return <span>{row.original.content && row.original.content.slice(0,40)}...</span>
            // return <span>{row.original.content >= 40 ? row.original.content.slice(0,40) : row.original.content} </span>;

        }  
    },
    {
        Header:"STATUS",
        accessor:"isActive",
           Cell:({row})=>{
           return row.original.isActive === true ? <span>Active</span> : <span>Block</span>;
        }
    },
    {
        Header:"CREATED DATE", 
        accessor:"createdAt",
          Cell:({row})=>{
           return <span>{row.original.createdAt.slice(0,10)}</span>
        }
    }
    
]

