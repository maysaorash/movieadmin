import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import { BsFileArrowDown,BsFileArrowUp,BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill,BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import Modal from 'react-modal';
import {COLUMNS} from './ColumnsCategory'
import './table.css'


Modal.setAppElement('#root');

export default function Categories() {
    
    let initial=[{name:'Comedy',count:0,description:""},{name:'Drama', count:0, description:""},{name:'Crime', count:0, description:""}]
    
    const [data,setData]=useState(initial)
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [modalPost,setModalPost]=useState('')
    const [number,setNumber]=useState('')
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [movie,setMovie]=useState()

    console.log(movie)
    

    const handleSubmit=(categoryId)=>{
        const updatedCategory={
            // number,
            name,
            description
            // movie
            
        }
        axios.put(`https://movieapp-server.herokuapp.com/categories/${categoryId}`,updatedCategory)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{console.log(err)})
    }


    const editCategory=async (categoryId)=>{
       await  axios
        .get(`https://movieapp-server.herokuapp.com/categories/${categoryId}`)
        .then((res) => {  
            setModalPost(res.data);
            // setNumber(res.data.number)
            setName(res.data.name)
            setDescription(res.data.description)
            setMovie(res.data.movieCount)
            
        })
        .catch((err) => {
            console.log(err);
        });
            setModalIsOpen(true)
            
    }



    const deleteCategory=(categoryId)=>{
        axios
        .delete(`https://movieapp-server.herokuapp.com/categories/${categoryId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        });
       
    }


    useEffect(() => {
        axios
			.get('https://movieapp-server.herokuapp.com/categories')
			.then((res) => {
               console.log(res.data)  
               setData(res.data)            
               setNumber(res.data.number)
               setName(res.data.name)
               setDescription(res.data.description)
               setMovie(res.data.movieCount)
              })

			.catch((err) => {
				console.log(err);
			});
    }, [])



    const columns = useMemo(() => COLUMNS,[])
    const categories = useMemo(() =>data,[])
  

    useTable({
        columns:columns,
        data:categories
    })
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
      data
    },
    useGlobalFilter,useSortBy,usePagination)
 
    const { globalFilter,pageIndex,pageSize }=state


    return (
        <div>
        <div>
            <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						top: 35,
						backgroundColor: 'rgba(211, 211, 211, 0.60)',
                        marginTop:"30px"
                
                        
					},
					content: {
						padding: 2,
						height: 500,
                        marginTop:"10px",
                        backgroundColor: '#181818',
                        border:"none",
                        width:"70%",
                        margin:"auto",
                        paddingTop:"2%",
                        paddingBottom:"2%"

                        
                        
					},
				}}
			>
				<div className="modal-container">
                        <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                        <form onSubmit={(e)=>{e.preventDefault();handleSubmit(modalPost._id)}} className="modal-form">
                            {/* <div className="modal-column-one">
                            </div> */}
                            <div className="modal-column-two">
                                <div>
                                    {/* <div className="modal-number-container form-item">
                                        <label>No</label>
                                        <input value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                                    </div> */}
                                    <div className="modal-name-container form-item">
                                        <label>Name</label>
                                        <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                    </div>
                                    <div className="modal-description-container form-item">
                                        <label>Description</label>
                                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                                    </div>
                                  </div>
                               <div className="category-update-button-container" >
                                  <button className="category-update-button submit-btn" type="submit">Submit</button>
                               </div>
                             </div>
                           </form>
                        </div>
			</Modal>
        </div>
        <div className="categorylist-container">
            <h1 className="categorylist-title">Category Lists</h1>
           
            <hr className="hr-category"/>
        <div className="search-show-bar-container" >
            <div className="category-show-bar">
                Show&nbsp;  <select  value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                    {
                        [5,10,20,50].map(pageSize=>(
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))
                    } 
            </select>&nbsp; entries
            </div>
                <div className="category-search-bar">
                Search:&nbsp;&nbsp;
                <input value={globalFilter || ''}
                onChange={e=>setGlobalFilter(e.target.value)}
                />
            </div>
        </div>
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> */}
        <table {...getTableProps()}>
            <thead>
               {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {/* <th></th> */}
                            {headerGroup.headers.map((column)=>(
                           <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                               <div className="category-icon-container">
                                   <div>{column.render('Header')}</div>
                                   <div className="category-sort-icon"><BsArrowUpDown/></div>
                               </div>
                               </th> ))}
                            <th>ACTION</th>
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row=>{
                        prepareRow(row)
                        return(
                            <tr  {...row.getRowProps()}>
                               
                                {row.cells.map((cell)=>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                <td className="row-icon-container">
                                      
                                    <BsPencilSquare className="edit-category-icon" onClick={()=>{editCategory(row.original._id)}}/>&nbsp; 
                                    <BsFillTrashFill className="delete-category-icon" onClick={()=>{deleteCategory(row.original._id)}}/>
                                </td>
                                            
                            </tr>
                        )
                    })
                }
              
            </tbody>
            
        </table>
        
       <div className="category-button-container">
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button className="category-page-nav" onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <div className="category-current-page">{pageIndex+1}</div>
            <button className="category-page-nav" onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
       </div>
       
        
        </div>
        </div> 
    )
}