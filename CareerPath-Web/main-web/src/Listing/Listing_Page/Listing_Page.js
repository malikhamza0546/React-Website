import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Colors from '../../Colors/Colors'
import axios from 'axios';
import FilterUsers from '../FilterUsers/FilterUsers'


const Listing_Page = (props) => {
    let navigate = useNavigate();
    let color = '00C4FF';
    let [flag, setFlag] = useState(0);
    const [Featured, setFeatured] = useState([]);
    const [array, setArray] = useState([{
        sort: null,
        industry: getQuery().get('industry') ? [String(getQuery().get('industry'))] : [],
        price: [],
        search: (getQuery().get('search')) ? String(getQuery().get('search')) : null,
    }])
    console.log(getQuery().get('industry'), "getQuery().get('industry')")
    console.log(array[0].industry, "i am hamza")
    const [industry, setIndustry] = useState([]);
    const [searchQuery, setSearchQuery] = useState(array[0].search);
    const [filters, setFilters] = useState([
        {
            label: 'Sort By',
            boxes: [{
                label: "Recommended",
                actualValue: "recommended",
            },
            {
                label: "Price:High-Low",
                actualValue: "highToLow",
            },
            {
                label: "Price:Low-High",
                actualValue: "lowToHigh",
            },
            {
                label: "Newest",
                actualValue: "newest",
            },
            ]

        },
        {
            label: 'Price',
            boxes: [{
                label: "$0-$100",
                actualValue: "0,100",
            },
            {
                label: "$100-$200",
                actualValue: "100,200",
            },
            {
                label: "$300-$400",
                actualValue: "300,400",
            },
            {
                label: "$500+",
                actualValue: "500,50000",
            },
            ]
        },
        {
            label: 'Industry',
            boxes: []
        },

    ])

    function getQuery() {
        return new URLSearchParams(window.location.search);
    }
    const handleChanger = event => {
        setSearchQuery(event.target.value);
        if (event.target.value === '') {

            return;
        }
    }

    const handleChangeForSort = (event) => {
        var arrayCopy = [];
        var objCopy = {};
        arrayCopy = [...array];
        var objCopy = { ...arrayCopy[0] };
        objCopy = { ...objCopy, sort: event.target.value };
        arrayCopy = [{ ...objCopy }];
        setArray(arrayCopy);
        setFlag(1);

    }

    const handleChangeForPrice = (event) => {

        var value = event.target.value;

        value = value.split(",");
        var arrayCopy = [];
        var objCopy = {};
        arrayCopy = [...array];
        var objCopy = { ...arrayCopy[0] };
        objCopy = { ...objCopy, price: value };
        arrayCopy = [{ ...objCopy }];
        setArray(arrayCopy);
        setFlag(1);

    }


    const handleChangeForIndustry = (event, indexer) => {
        //for handling value of our actual state
        console.log(typeof event.target.value, "values of checkbox")
        var arrayCopy = [];
        var tempIndustryCopy = [];
        var objCopy = {};
        arrayCopy = [...array];
        var objCopy = { ...arrayCopy[0] };
        tempIndustryCopy = [...objCopy.industry];
        if (!array[0].industry.includes(String(event.target.value)))
            objCopy = { ...objCopy, industry: [...tempIndustryCopy, (event.target.value)] };
        arrayCopy = [{ ...objCopy }];
        setArray(arrayCopy);
        // for handling checkbox status value
        var industryCopy = [...industry];
        const new_industry = industryCopy.map(((obj) => {
            if (String(obj.id) === event.target.value) {
                console.log(obj.id, "value obj.id");
                console.log(indexer, "indexer")
                const new_status = obj.status ? false : true;
                const new_id = obj.id;
                if (!new_status) {
                    let values = [...array];
                    let objCopy = { ...values[0] };
                    let tempIndustryCopy = [...objCopy.industry];
                    const element_index = tempIndustryCopy.indexOf(event.target.value)
                    tempIndustryCopy.splice(element_index, 1);
                    objCopy = { ...objCopy, industry: [...tempIndustryCopy] };
                    values = [{ ...objCopy }];
                    setArray(values);
                }

                return { id: new_id, status: new_status };
            }
            else {

                return { id: obj.id, status: obj.status }
            }
        }))
        setIndustry(new_industry);
        setFlag(1);


    }


    const setFilter = () => {

        let copyArray = [...industry];
        let copyallStates = [...array];
        let settingAraay = copyArray.map((obj) => {
            return { ...obj, status: false };
        })
        setIndustry([...settingAraay]);
        copyallStates[0].sort = null;
        copyallStates[0].industry = [];
        copyallStates[0].price = [];
        copyallStates[0].search = null;
        setArray(copyallStates);
        setSearchQuery('')
        setFlag(1);
    }


    const getResults = () => {
        let searchData = null;
        let industryId = null;
        let startPrice = null;
        let endPrice = null;
        let sort = null;


        if (array[0].search === null) {
            searchData = null;

        }
        if (array[0].search !== null) {
            searchData = array[0].search;


        }
        if (array[0].sort === null) {
            sort = null;
        }
        if (array[0].sort !== null) {
            sort = array[0].sort;
        }


        if (array[0].price.length < 1) {
            startPrice = null;
            endPrice = null;
        }
        if (array[0].price.length > 0) {

            startPrice = array[0].price[0];
            endPrice = array[0].price[1];
        }
        if (array[0].industry.length < 1) {
            console.log("error block")
            industryId = null;
        }
        if (array[0].industry.length > 0) {
            industryId = "";
            for (let i = 0; i < array[0].industry.length; i++) {
                industryId = industryId + array[0].industry[i] + ",";
            }
            if (industryId[industryId.length - 1] === ",") {
                industryId = industryId.substring(0, industryId.length - 1);
            }
        }

        axios.get(`${process.env.REACT_APP_SERVER_PATH}/professionals/?industry_id=${industryId}&end_price=${endPrice}&start_price=${startPrice}&sortby=${sort}&search=${searchData}`).then((response) => {
            setFeatured(response.data);

        }).catch((e) => {
            console.log('catch block is runing')
        })
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_PATH}/industry`).then((response) => {
            return response.json()
        }).then((response) => {
            var arrayCopyoffilters = [];
            var arrayCopyofboxes = [];
            var objCopyoffilterindex2 = {};
            var objCopyoffilterindexofall = {};
            var objCopy = {};
            arrayCopyoffilters = [...filters];
            objCopyoffilterindexofall = { ...arrayCopyoffilters };
            objCopyoffilterindex2 = { ...arrayCopyoffilters[2] };
            arrayCopyofboxes = [...response];
            objCopyoffilterindex2 = { ...objCopyoffilterindex2, boxes: arrayCopyofboxes };
            arrayCopyoffilters = [arrayCopyoffilters[0], arrayCopyoffilters[1], objCopyoffilterindex2]
            setFilters(arrayCopyoffilters);
        })
    }, [searchQuery])

    const setIndustriesData = (data) => {
        const dataArr = []
        data.forEach((item) => {
            dataArr.push({ id: item.id, status: array[0].industry.includes(String(item.id)) ? true : false })
        })
        setIndustry(dataArr)
        console.log(industry, "array sort industry")
    }
    useEffect(() => {
        getResults();
        axios.get(process.env.REACT_APP_SERVER_PATH + `/Industry`)
            .then((response) => {
                console.log(response.data, "count response");
                setIndustriesData(response.data)
            }).catch((e) => {
                console.log("Error is identified");
                console.log('hamza');
            })

    }, [array])

    if (flag === 1) {

        if (array[0].sort === null && array[0].price.length < 1 && array[0].industry.length < 1 && array[0].search === null) {
            navigate('/listing');
        }
        if (array[0].sort !== null) {
            navigate(`?${array[0].sort === null ? "" : `sortby=${array[0].sort}`}${array[0].industry.length < 1 ? "" : `&industry=${array[0].industry}`}${array[0].price < 1 ? "" : `&end_price=${array[0].price[1]}`}${array[0].price < 1 ? "" : `&start_price=${array[0].price[0]}`}${array[0].search === null ? "" : `&searchby=${array[0].search}`}`);
        }
        if (array[0].price.length > 0) {
            navigate(`?${array[0].price < 1 ? "" : `end_price=${array[0].price[1]}`}${array[0].price < 1 ? "" : `&start_price=${array[0].price[0]}`}${array[0].sort === null ? "" : `&sortby=${array[0].sort}`}${array[0].industry.length < 1 ? "" : `&industry=${array[0].industry}`}${array[0].search === null ? "" : `&searchby=${array[0].search}`}`);
        }
        if (array[0].industry.length > 0) {
            navigate(`?${array[0].industry.length < 1 ? "" : `industry=${array[0].industry}`}${array[0].price < 1 ? "" : `&end_price=${array[0].price[1]}`}${array[0].price < 1 ? "" : `&start_price=${array[0].price[0]}`}${array[0].sort === null ? "" : `&sortby=${array[0].sort}`}${array[0].search === null ? "" : `&searchby=${array[0].search}`}`);
        }
        setFlag(0);
    }
    console.log(industry, "array is industry")
    return (
        <div className="container mx-auto my-6 px-16 flex justify-center">
            <div className="mx-2">
                <p className="text-2xl font-bold text-gray-600 pb-2">Featured</p>
                <div className="flex flex-row items-center border-2 border-gray-100 bg-white h-10 px-2 rounded-lg text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-5" viewBox="0 0 20 20" fill="gray">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        navigate(`/listing?search=${searchQuery}`)
                        window.location.reload(true)
                    }}>
                        <input placeholder="Search" className="focus:outline-none" onChange={handleChanger}
                            value={searchQuery} />
                        {/* <input style={{ backgroundColor: 'transparent', color: "black" }} value={searchQuery} placeholder="Search..." className="mt-1 sm:w-36 md:w-64 lg:w-96 pl-5 focus:outline-none" onChange={handleChanger} /> */}
                    </form>

                </div>
                {/* CheckBox filters */}
                <div>
                    {/* Sort By */}
                    <div className="block text-gray-800 my-4 ">
                        <span className="text-gray-500">{filters[0].label}</span>
                        {filters[0].boxes.map((m, i) => {
                            return <div>
                                <label className="inline-flex items-center text-2">
                                    <input type="radio" value={m.actualValue} checked={(String(m.actualValue)) === String(array[0].sort)} onChange={handleChangeForSort} />
                                    <span className="ml-3">{m.label}</span>
                                </label>
                            </div>

                        })}
                    </div>
                    <hr />

                    {/* Price */}

                    <div className="block text-gray-800 my-4 ">
                        <span className="text-gray-500">{filters[1].label}</span>
                        {filters[1].boxes.map((m, i) => {
                            return <div>
                                <label className="inline-flex items-center text-2">
                                    <input type="radio" value={m.actualValue} checked={(String(m.actualValue)) === String(array[0].price)} onChange={handleChangeForPrice} />
                                    <span className="ml-3">{m.label}</span>
                                </label>
                            </div>

                        })}
                    </div>
                    <hr />

                    {/* Industry */}
                    <div className="block text-gray-800 my-4 ">
                        <span className="text-gray-500">{filters[2].label}</span>
                        {console.log(filters[2].boxes, "filters[2].boxes")}
                        {filters[2].boxes.map((m, i) => {
                            return <div>
                                <label className="inline-flex items-center text-2">

                                    <input type="checkbox" value={m.id} checked={industry[i] && industry[i].status} onChange={(e) => handleChangeForIndustry(e, i)} />
                                    <span className="ml-3">{m.name}</span>
                                </label>
                            </div>

                        })}
                    </div>
                    <hr />
                </div>
                {/* <CheckBoxFilters filters={filters} location={this.props.location} /> */}
                <button className={`bg-blue-300 text-white p-3 rounded w-full hover:bg-blue-200`}
                    style={{ backgroundColor: Colors.blue }} onClick={setFilter}>Clear Filters</button>

            </div>
            <div className="w-full">
                <FilterUsers Featured={Featured} />
            </div>
        </div>
    )
}


export default Listing_Page
