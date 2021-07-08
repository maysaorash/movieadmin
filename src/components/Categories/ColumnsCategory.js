
export const COLUMNS = [
{
  Header:"NO",
  accessor:d=>d.index,
  id:"row",
  Cell:({row})=>{
      return<div>{row.index+1}</div>
  }
},
{
  Header:"NAME",
  accessor:"name"
},

{
  Header:"MOVIE",
  accessor:"movieCount",
},
{
  Header:"DESCRIPTION", 
  accessor:"description",
}
]
