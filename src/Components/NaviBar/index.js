import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Logout } from "../../Utils";


export default function NaviBar() {
    // JS
    return (
        <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
            {/* <p class="navbar-brand">Dashboard</p> */}
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-left">
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                {/* <i class="fa fa-dashboard"></i> */}
                                {/* <p class="hidden-lg hidden-md">Dashboard</p> */}
                            </a>
                        </li>                     
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/" onClick={Logout}>Sair</Link>
                        </li>
                        <li class="separator hidden-lg"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}