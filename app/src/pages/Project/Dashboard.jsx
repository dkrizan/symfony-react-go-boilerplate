import {gql, useApolloClient, useQuery} from "@apollo/client";
import {PROJECT} from "../../graphql/queries/projectQueries";
import {Link, useParams} from "react-router-dom";

export function ProjectDashboard() {
    const {id} = useParams();

    const client = useApolloClient();
    let project = client.readFragment({
        id: 'Project:' + id,
        fragment: gql`
            fragment GetProject on Project {
                name
                description
            } 
        `
    })

    const {loading, data} = useQuery(PROJECT, { variables: { id: id }});

    if (loading && !project) {
        return null;
    }

    if (data) {
        project = data.project;
    }

    return (
        <div className="">
            <Link to="/" className="text-lg px-6 text-gray-500 dark:text-slate-200 hover:text-gray-900 flex items-center">
                <svg className="w-6 h-6 rotate-180" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"></path>
                </svg>
                Back
            </Link>
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 grid-cols-1 p-4">
                    <div className="head">
                        <h1 className="text-4xl font-medium dark:text-slate-100">{project.name}</h1>
                        <div className="py-4">
                            <p className="text-slate-700 dark:text-slate-300">{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}