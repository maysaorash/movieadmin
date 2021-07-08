// import {format} from "data-fns";
export const COLUMNS = [

    {
        Header:"PROFILE",
        accessor:"profileImageId",
        // Cell: ({row})=>{       
        // return <img src={row.original.profileImageId.url} alt="profile_img" style={{width:"100px",height:"100px"}}></img>}
    },
    {
        Header:"NAME",
        accessor:"user",
        Cell:({row})=>{
            return <span>{row.original.firstname} {row.original.lastname}</span>  }
    
    },
    // {
    //     Header:"CONTACT",
    //     accessor:"contact",
    //     // Cell:({row})=>{
    //     //     return row.original.email.slice(0,1).toUpperCase() + row.original.email.slice(1)
    //     //  }
    // },
    {
        Header:"EMAIL",
        accessor:"email",
        // Cell:({row})=>{
        //     return row.original.email.slice(0,1).toUpperCase() + row.original.email.slice(1)
        //  }
    },
    {
        Header:"COUNTRY",
        accessor:"country",
        // Cell:({row})=>{
        //    return row.original.genre.map(item=>item + ' ')
        // }
       
    },
    {
        Header:"STATUS",
        accessor:"isActive",
        Cell:({row})=>{
            return row.original.isActive === true ? <span>Active</span> : <span>Block</span>
        }
    },
    {
        Header:"JOIN DATE", 
        accessor:"createdAt",
          Cell:({row})=>{
           return <span>{row.original.createdAt.slice(0,10)}</span>
        }
    }
    
]

