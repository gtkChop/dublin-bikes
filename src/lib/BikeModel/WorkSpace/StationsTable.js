import React, {Component} from 'react'
import Pagination from './Pagination'
import SearchInput from '../../BikeModel/WorkSpace/SearchInput'
import {FuzzyMatch} from '../utils'
import StationsRows from './StationsRows'


class StationsTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rowIdentifier: props.rowIdentifier || "id",
            data: props.data || [],
            itemsPerPage: props.itemsPerPage || 5,
            columns: props.columns || [],
            selectedData: [],
            noOfPages: null,
            searchFields: ["st_NAME"],
            currentPage: props.currentPage || 1,
            searchValue: props.searchValue || '',
            _searchedRecords: props.data || []
        }
    }

    getCurrentDataGivenPageNumber(pageNo, data=null) {
        /*
            Min page = 1
            Max page = noOfPages
        */
        if (data == null) {
            return this.state._searchedRecords.slice((pageNo-1)*this.state.itemsPerPage, pageNo*this.state.itemsPerPage)
        } else {
            return data.slice((pageNo-1)*this.state.itemsPerPage, pageNo*this.state.itemsPerPage)
        }
    }

    search(searchValue) {
        searchValue = searchValue.trim()
        if (searchValue.length == 0){
            return this.state.data
        }
        const data = []
        this.state.data.map(item => {
            let isMatch = () => {
                for (let idx=0; idx < this.state.searchFields.length; idx++) {
                    if (FuzzyMatch(item[this.state.searchFields[idx]], searchValue)) {
                        return true
                    }
                }
                return false
            }
            if (isMatch()) {
                data.push(item)
            }
            return null
        })

        return data
    }

    setPaginationResults(val, reset=false) {
        if (!reset) {
            this.setState(prevState => {
                return {
                    currentPage: prevState.currentPage + val, 
                    selectedData: this.getCurrentDataGivenPageNumber(prevState.currentPage + val)
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    currentPage: val, 
                    selectedData: this.getCurrentDataGivenPageNumber(val)
                }
            })
        }
    }

    calculateNumberOfPages(totalRecordsCnt) {

        var noOfPages = 1
        if (totalRecordsCnt <= this.state.itemsPerPage) {
            noOfPages = 1
        } else {
            const minPages = Math.floor(totalRecordsCnt/this.state.itemsPerPage)
            noOfPages = (totalRecordsCnt/this.state.itemsPerPage) > minPages ? minPages+1 : minPages
        }
        return noOfPages
    }

    componentDidMount() {
        /*
        Populate the sate from props
        */
        if ((!this.state.data.length) || (this.state.columns == 0)){
            throw new Error("Tbale is initialised without data or column information")
        }

        this.setState(prevState => {
            var _searchedRecords = this.search(prevState.searchValue)
            var noOfPages = this.calculateNumberOfPages(_searchedRecords.length)
            return {
                selectedData: this.getCurrentDataGivenPageNumber(prevState.currentPage, _searchedRecords),
                _searchedRecords: _searchedRecords,
                noOfPages: noOfPages
            }
        })


    }

    searchHandler = (e) => {
        const searchValue = e.target.value
        const _searchedRecords = this.search(searchValue)
        const noOfPages = this.calculateNumberOfPages(_searchedRecords.length)
        this.setState(prevState => {
            return {
                searchValue: searchValue,
                selectedData: this.getCurrentDataGivenPageNumber(1, _searchedRecords),
                _searchedRecords: _searchedRecords,
                currentPage: 1,
                noOfPages: noOfPages
            }
        })
    }

    paginationHandler = (action) => {
        switch(action) {
            case 'next': {
                if ((this.state.currentPage+1) > this.state.noOfPages){ break } else { this.setPaginationResults(+1) }
                break
            }
            case 'previous': {
                if ((this.state.currentPage-1) < 1) { break } else { this.setPaginationResults(-1) }
                break
            }
            case 'first': {
                this.setPaginationResults(1, true)
                break
            }
            case 'last': {
                this.setPaginationResults(this.state.noOfPages, true)
                break
            }
            default: {
                break
            }
        }

    }

    render() {
        return (
            <>
                <SearchInput searchHandler={this.searchHandler} searchValue={this.state.searchValue}/>
                <div className="bikes__component">
                    <table className="table table-striped table-sm table-condensed stations__table">
                        <thead>
                            <tr>
                                {
                                    this.state.columns.map(column => {
                                        return <th key={column.id}>{column.label}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <StationsRows 
                                selectedData={this.state.selectedData} 
                                rowIdentifier={this.state.rowIdentifier} 
                                columns={this.state.columns}
                                locationInMapEvent={this.props.locationInMapEvent}
                            />
                        </tbody>
                    </table>
                    <Pagination 
                        currentPage={this.state.currentPage} 
                        noOfPages={this.state.noOfPages} 
                        paginationHandler={this.paginationHandler}
                    />
                </div>
            </>
        )
    }
}

export default StationsTable