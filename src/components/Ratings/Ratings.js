// import React from 'react'
// import SingleRating from './SingleRating'
// import './ratings.css'

// export default function Ratings() {

//     const array=[1,2,3,4,5]
//     return (
//         <div style={{marginLeft:"500px",marginTop:"100px",height:"520px"}}>
//            <h1>Ratings List </h1> 
//             {array.map(arr=>
//                 <SingleRating/>)}

//         </div>
//     )
// }
import React, { useMemo, useEffect, useState } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Modal from 'react-modal';
import './ratings.css'
import { Row } from 'react-bootstrap';
import {Link} from 'react-router-dom'


Modal.setAppElement('#root');
export default function Rating() {

  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState('')
  const [title, setTitle] = useState('')


  

  const COLUMNS = [
    {
      Header: 'NO',
      accessor: 'id',
      Cell: ({ row }) => {
        return <p>{row.index + 1}</p>
      }
    },
    {
      Header: 'TYPE',
      accessor: 'type', // accessor is the "key" in the data
    },
    {
      Header: 'NAME',
      accessor: 'title',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
      Cell:({row})=>{
        return <span>{row.original.description && row.original.description.slice(0,40)}...</span>  }
    },
    {
      Header: 'Releasy DATE',
      accessor: 'createdAt',
      Cell: ({ value }) => { return format(new Date(value), 'yyyy') },
    },
    {
      Header: 'RATING',
      accessor: 'likes',
      // Cell: ({ value }) => { return format(new Date(value), 'yyyy') },
    },
  ];



  const viewTrailerDetail = (trailerId) => {
    console.log(trailerId)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title)
  }

  useEffect(() => {
    axios
      .get('https://movieapp-server.herokuapp.com/trailers')
      .then((res) => {
        setData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  
  //delete
  const deleteComment = (id) => {
    console.log(id)
    axios
      .delete(`https://movieapp-server.herokuapp.com/ratings/${id}`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const editTrailer=async (trailerId)=>{
    await  axios
     .get(`https://movieapp-server.herokuapp.com/trailers/${trailerId}`)
     .then((res) => {  
         setModalPost(res.data);
         setTitle(res.data.title)
        //  setEpisodeTitle(res.data.episodeTitle)
        //  setType(res.data.type)
        //  setYear(res.data.year)
        //  setDuration(res.data.duration)
        //  setMediaUrl(res.data.mediaId.url)
        //  setBannerUrl(res.data.bannerId.url)
        //  setDescription(res.data.description)
        //  setAgeRestriction(res.data.ageRestriction)
        //  setTotalSeasons(res.data.totalSeasons)
        //  setSeasonNumber(res.data.seasonNumber)
        //  setEpisodeNumber(res.data.episodeNumber)
        //  setTrailerUrl(res.data.trailerUrl)
     })
     .catch((err) => {
         console.log(err);
     });
         setModalIsOpen(true)
         
 }

  const columns = useMemo(() => COLUMNS, [])
  const comments = useMemo(() => data, [])


  useTable({
    columns: columns,
    data: comments
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
    // pageOptions,
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
    useGlobalFilter, useSortBy, usePagination)

  const { globalFilter, pageIndex, pageSize } = state


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
            },
            content: {
              padding: 2,
              height: 700,
            },
          }}
        >
          <div>
            <h1 style={{ marginTop: "100px", color: "black" }}>
              <form onSubmit={handleSubmit}>
                <input
                  value={title}
                  onChange={(e) => { setTitle(e.target.value) }}
                />
                <p>{title}</p>
                <button type="submit">Submit</button>
              </form>

            </h1>
          </div>
        </Modal>
      </div>
      <div className="trailerlist-container">
        <h1 className="trailerlist-title">Rating List</h1>

        <hr className="hr-trailer" />
        <div className="search-show-bar-container" >
          <div className="trailer-show-bar">
            Show&nbsp;  <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {
                [5,10, 20, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))
              }
            </select>&nbsp; entries

          </div>

          <div className="trailer-search-bar">
            Search:&nbsp;&nbsp;
            <input value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </div>


        </div>

        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> */}
        <table {...getTableProps()}>
          <thead>

            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {/* <th></th> */}
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div className="trailers-icon-container">
                        <div>{column.render('Header')}</div>
                        <div className="trailers-sort-icon"><BsArrowUpDown /></div>
                      </div>

                    </th>))}
                  <th>ACTIONS</th>
                </tr>
              ))
            }
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr  {...row.getRowProps()}>

                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td role='cell' className="row-icon-container">
                     <Link  to={`/ratingdetails/${row.original._id}`}>
                      <BsFillEyeFill className="view-trailer-icon" onClick={() => { viewTrailerDetail(row.original._id) }} />&nbsp;
                      </Link>
                      {/* <BsPencilSquare className="edit-trailer-icon" onClick={() => { editTrailer(row.original._id) }} />&nbsp; */}
                      <BsFillTrashFill className="delete-trailer-icon" onClick={() => { deleteComment(row.original._id) }} />
                    </td>


                  </tr>
                )
              })
            }

          </tbody>

        </table>

        <div className="trailer-button-container">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button className="trailer-page-nav" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
          <div className="trailer-current-page">{pageIndex + 1}</div>
          <button className="trailer-page-nav" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>


      </div>
    </div>
  )
}