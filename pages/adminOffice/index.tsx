import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { HomeAdminHook } from "@/hooks/adminOffice/home";
import React from "react";
import { SideProps } from "@/service/sideProps";
import LayoutAdmin from "@/app/layout/admin";

const Child = ({ ...props }: any) => {

    const { auth, hooks }: any = props

    const { fromLogin, validate, setFormFiled, handleSubmit, socket } = hooks || {}
    const isValidSubmit = (validate?.email?.success && validate?.password?.success) || false

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Authors table</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Function</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                                            <th className="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">John Michael</h6>
                                                        <p className="text-xs text-secondary mb-0">john@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Manager</p>
                                                <p className="text-xs text-secondary mb-0">Organization</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Online</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-3.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user2" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Alexa Liras</h6>
                                                        <p className="text-xs text-secondary mb-0">alexa@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Programator</p>
                                                <p className="text-xs text-secondary mb-0">Developer</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-secondary">Offline</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">11/01/19</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-4.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user3" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Laurent Perrier</h6>
                                                        <p className="text-xs text-secondary mb-0">laurent@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Executive</p>
                                                <p className="text-xs text-secondary mb-0">Projects</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Online</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">19/09/17</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-3.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user4" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Michael Levi</h6>
                                                        <p className="text-xs text-secondary mb-0">michael@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Programator</p>
                                                <p className="text-xs text-secondary mb-0">Developer</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Online</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">24/12/08</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user5" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Richard Gran</h6>
                                                        <p className="text-xs text-secondary mb-0">richard@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Manager</p>
                                                <p className="text-xs text-secondary mb-0">Executive</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-secondary">Offline</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">04/10/21</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="../assets/img/team-4.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user6" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Miriam Eric</h6>
                                                        <p className="text-xs text-secondary mb-0">miriam@creative-tim.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Programator</p>
                                                <p className="text-xs text-secondary mb-0">Developer</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-secondary">Offline</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">14/09/20</span>
                                            </td>
                                            <td className="align-middle">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Projects table</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Budget</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Completion</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-asana.svg" className="avatar avatar-sm rounded-circle me-2" alt="spotify" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Asana</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$2,500</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">working</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">60%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-info" ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/github.svg" className="avatar avatar-sm rounded-circle me-2" alt="invision" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Github</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$5,000</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">done</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">100%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-success"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm rounded-circle me-2" alt="jira" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Atlassian</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$3,400</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">canceled</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">30%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-danger" ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/bootstrap.svg" className="avatar avatar-sm rounded-circle me-2" alt="webdev" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Bootstrap</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$14,000</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">working</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">80%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-info"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm rounded-circle me-2" alt="slack" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Slack</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$1,000</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">canceled</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">0%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-success"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="../assets/img/small-logos/devto.svg" className="avatar avatar-sm rounded-circle me-2" alt="xd" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">Devto</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">$2,300</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">done</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="me-2 text-xs font-weight-bold">100%</span>
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-success" ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer py-4  ">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © <script>
                                    document.write(new Date().getFullYear())
                                </script>,
                                made with <i className="fa fa-heart"></i> by
                                <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Creative Tim</a>
                                for a better web.
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export const getServerSideProps = SideProps;


export default function Login(props: any) {
    return (<LayoutAdmin {...props} title="Admin | Home" ><Child {...props} hooks={HomeAdminHook()} /></LayoutAdmin>);
}
