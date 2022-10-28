import React, { useEffect, useState } from "react"
import Category from './Category'
import { getAllCategories } from "../../modules/catManager";
import "./category.css"

export function CategoriesList() {
    const [cats, setCats] = useState([]);
    const getCatsFromApi = () => {
        getAllCategories().then(ts => setCats(ts));
    }
    useEffect(() => {
        getCatsFromApi();
    }, []);

    return (
        <div className="catcontainer">
            <div className="row justify-content-center">
                <h1 className="catPageHeader">View Games By Category</h1>
                {
                    cats.map((cat) => (
                        <Category cat={cat} key={cat.id} update={getCatsFromApi} />
                    ))
                }

            </div>
        </div>
    )
}