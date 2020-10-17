import React, { useState, useEffect, useCallback, useRef } from 'react';
import { baseUrl, elementsPerPage, mapBookToViewModel } from '../../core/defaults';
import VolumeComponent from './VolumeComponent';
import { FormComponent } from './FormComponent'
import axios, { CancelToken } from 'axios'
import LoadingComponent from '../ctrls/LoadingComponent'

const useSearch = (filters, page) => {

    const [books, setBooks] = useState([])
    const [inProgress, setInProgress] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setBooks([])
        setIsError(false)
    }, [filters])

    useEffect(() => {

        console.log(filters)
        setInProgress(true)
        setIsError(false)
        if(filters.q === '') return
        let cancel

        axios({
            method: 'GET',
            url: baseUrl,
            params: { q: filters.q, startIndex: elementsPerPage * page, langRestrict: filters.langRestrict, maxResults: elementsPerPage },
            cancelToken: new CancelToken(ct => cancel = ct)

        }).then(result => {
            setInProgress(false)

            if(!result.data.items) {
                setIsError(true)
                setHasMore(false)
                return
            }
            setBooks(prevBooks => [...prevBooks, ...result.data.items.map(mapBookToViewModel)])
            setHasMore(result.data.items.length === elementsPerPage)
            
        }).catch( error => {
            
            if(axios.isCancel(error)) {
                
                return
            }
        })

        return () => cancel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, page])

    return { books, inProgress, hasMore, isError }
}

const VolumesList = (props) => {
    
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState({ maxResults: elementsPerPage * page, q: '', langRestrict:'' })

    const { books, inProgress, hasMore, isError } = useSearch(filters, page)

    const observer = useRef()
    
    const lastElemRef = useCallback(elem => {
        if(inProgress) 
            return

        if(observer.current) 
            observer.current.disconnect()
        
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore)
                setPage(prevPage => prevPage + 1)
        })
        if(elem) observer.current.observe(elem)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inProgress, hasMore])

    const filterChanged = (values) => {
        const q = values.q + ( values.authors !== "" ? "+inauthors=" + values.authors : "")
        setFilters(prevFilters => ({ q: q , langRestrict: values.langRestrict, maxResults: elementsPerPage }))
        setPage(0)
    }

    return (
        <div>
            <FormComponent {...props} handleSubmit={filterChanged}  />

            {
                filters.q !== '' ? <div className="list-container">
                {
                    books ? books.map((book, index) => {
                        if(books.length === index + 1)
                            return <VolumeComponent key={index} Ref={lastElemRef} {...book} />
                        else
                            return <VolumeComponent key={index} {...book} />
                    }) : <span>Brak ksiąek do wyświetlenia</span>
                }
                </div> : 
                <div className="empty-state-component-volumes-list">
                    <p>Wpisz tytuł, aby wyświetlić pozycje</p>
                </div>

            }
            {
                isError ? <div className="empty-state-component-volumes-list">
                            <p>Przepraszamy, nie ma takiej ksiąki na naszej półce</p>
                        </div> : null
            }

            <LoadingComponent isVisible={inProgress && filters.q !== ''} />
            {
                !hasMore && filters.q !== '' && !inProgress && books.length !== 0 ? <div className='center-content'><p>Brak kolejnych wyników</p></div> : null
            }
        </div>
    )
}
export default VolumesList;