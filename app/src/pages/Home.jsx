import {useMutation, useQuery} from '@apollo/client';
import {PROJECTS } from '../graphql/queries/meQueries'
import {ActionButton} from "../components/Controls/ActionButton";
import {LoadingList} from "../components/Skeletons/LoadingList";
import {useState} from "react";
import {Dialog} from '../components/Dialog/Dialog'
import {ProjectForm} from "./components/Projects/ProjectForm";
import {CREATE_PROJECT, DELETE_PROJECT} from "../graphql/mutations/projectMutations";
import {EllipsisVerticalIcon} from "@heroicons/react/24/outline";
import {SimpleDropDown} from "../components/Dropdown/SimpleDropDown";
import {Link} from "react-router-dom";
import {HealthBadge} from "../components/Badges/HealthBadge";
import ReactTimeAgo from "react-time-ago";
import {useTranslation} from "react-i18next";

export function Home() {

    const { loading, error, data } = useQuery(PROJECTS);
    const [ addProjectOpen, setAddProjectOpen ] = useState(false);
    const { t } = useTranslation();
    const [createProject] = useMutation(CREATE_PROJECT, {
        update(cache, { data: { createProject } }) {
            const { projects } = cache.readQuery({query: PROJECTS});
            cache.writeQuery({
                query: PROJECTS,
                data: { projects: projects.concat([createProject]) }
            });
        }
    });

    function submitAddForm({name, description}) {
        return createProject({variables: {input: { name: name, description: description }}}).then(() => {
            setAddProjectOpen(false);
        });
    }

    const [deleteProject] = useMutation(DELETE_PROJECT);

    function clickDeleteProject(e, id) {
        e.stopPropagation();
        e.preventDefault();
        return deleteProject({
            variables: {id: id},
            update(cache) {
                const normalizedId = cache.identify({id, __typename: 'Project'});
                cache.evict({id: normalizedId});
                cache.gc();
            }
        })
    }

    if (error) {
        return;
    }

    return (
        <div className="container mx-auto max-w-7xl divide-y px-3">
            <div className="project">
                { loading &&
                    <LoadingList rows={4}/>
                }
                { !loading &&
                    <div className="project-list">
                        {data.projects.length === 0
                            ?
                            <div className="text-center mt-12 p-5">
                                <h3 className="text-4xl font-bold text-gray-600">{t('no-projects-yet')}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 650 512" className="opacity-70 w-80 mx-auto h-auto">
                                    <path fill="#dbe8ec" d="M568.90415,220.74547V202.55431a13.07945,13.07945,0,0,0-13.07945-13.07945h-46.166a13.07945,13.07945,0,0,1-13.07946-13.07945V158.20424a13.07945,13.07945,0,0,1,13.07946-13.07945h1.45764a13.07945,13.07945,0,0,0,13.07945-13.07945V113.85418a13.07945,13.07945,0,0,0-13.07945-13.07945H169.20918a13.07945,13.07945,0,0,0-13.07945,13.07945v18.19116a13.07945,13.07945,0,0,0,13.07945,13.07945h0a13.07945,13.07945,0,0,1,13.07945,13.07945v18.19117a13.07945,13.07945,0,0,1-13.07945,13.07945H118.6298a13.07945,13.07945,0,0,0-13.07945,13.07945v18.19116a13.07945,13.07945,0,0,0,13.07945,13.07945h19.84658a13.07945,13.07945,0,0,1,13.07945,13.07946v18.19124a13.07945,13.07945,0,0,1-13.07945,13.07946h-.048A13.07945,13.07945,0,0,0,125.349,291.25453V309.4456a13.07945,13.07945,0,0,0,13.07945,13.07946h2.87139a13.07945,13.07945,0,0,1,13.07945,13.07945v18.19125a13.07945,13.07945,0,0,1-13.07945,13.07945H94.1753a13.07945,13.07945,0,0,0-13.07945,13.07945v18.19116A13.07945,13.07945,0,0,0,94.1753,411.22527h423.963a13.07945,13.07945,0,0,0,13.07945-13.07945V379.95466a13.07945,13.07945,0,0,0-13.07945-13.07945H506.79779a13.07945,13.07945,0,0,1-13.07945-13.07945V335.60451a13.07945,13.07945,0,0,1,13.07945-13.07945h26.73986A13.07945,13.07945,0,0,0,546.6171,309.4456V291.25453a13.07945,13.07945,0,0,0-13.07945-13.07945H525.426a13.07945,13.07945,0,0,1-13.07945-13.07946V246.90438A13.07945,13.07945,0,0,1,525.426,233.82492H555.8247A13.07945,13.07945,0,0,0,568.90415,220.74547Z"/>
                                    <rect width="159.84" height="145.44" x="217.561" y="231.797" fill="#409cb5"/>
                                    <rect width="84.96" height="145.44" x="377.401" y="231.797" fill="#3086a3"/>
                                    <path fill="#25788e" d="M462.36121,232.15729h-84.96l29.101-39.69379a3,3,0,0,1,2.41944-1.22621h77.52026a3,3,0,0,1,2.41944,4.77378Z"/>
                                    <path fill="#3086a3" d="M217.95637,232.15729h84.96l-29.101-39.69379a3,3,0,0,0-2.41944-1.22621H193.87565a3,3,0,0,0-2.41944,4.77378Z"/>
                                    <path fill="#25788e" d="M510.29292,285.1577l-47.93164-53.00043h0v57.96h45.66016A3,3,0,0,0,510.29292,285.1577Z"/>
                                    <path fill="#47acc4" d="M325.66717,290.11729H173.75124a3,3,0,0,1-2.27157-4.9596l45.72154-53.0004h159.84l-49.10248,56.91959A3,3,0,0,1,325.66717,290.11729Z"/>
                                </svg>
                                <ActionButton action={() => setAddProjectOpen(true)}>{t('get-started')}</ActionButton>
                            </div>
                            :
                            <div className="mt-2">
                                <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.projects.map((project, index) =>
                                        <Link to={`/project/${project.id}`} key={project.id}
                                            className="flex flex-col pl-6 px-2 py-4 cursor-pointer bg-white rounded-lg transition-shadow duration-300 shadow-[0_10px_15px_-15px_rgba(0,0,0,0.3)] border border-slate-100 hover:border-slate-200 hover:shadow-[0_10px_15px_-10px_rgba(0,0,0,0.3)]
                                                        dark:bg-gray-800 dark:border dark:border-gray-600 dark:hover:bg-blue-900">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-light text-gray-600 dark:text-gray-400">{project.lastEvent && <span>Last pinged <ReactTimeAgo date={new Date(project.lastEvent.received)}/></span>}</span>
                                                <div className="flex items-center justify-end">
                                                    <HealthBadge status={project.status} />
                                                    <SimpleDropDown
                                                        button={<EllipsisVerticalIcon className="h-7 w-7 stroke-gray-400 stroke-2 hover:stroke-gray-600 rounded-lg"/>}
                                                        right={true}
                                                    >
                                                        <button onClick={(e) => clickDeleteProject(e, project.id)}>{t('delete')}</button>
                                                    </SimpleDropDown>
                                                </div>
                                            </div>

                                            <div className="space-y-2 flex flex-1 flex-col">
                                                <div className="flex-1">
                                                    <div
                                                        className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
                                                        tabIndex="0" role="link">{project.name}</div>
                                                    <p className="ext-gray-600 dark:text-gray-300">{project.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <div className="flex justify-center w-full mt-5">
                                    <ActionButton action={() => setAddProjectOpen(true)}>{t('add-project')}</ActionButton>
                                </div>
                            </div>
                        }
                    </div>
                }
                <Dialog title={t('add-project')} isOpen={addProjectOpen} setIsOpen={setAddProjectOpen}>
                    <ProjectForm submit={submitAddForm} />
                </Dialog>
            </div>
        </div>
    );
}
